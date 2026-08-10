import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "./systemPrompt.js";

/**
 * Smartly prunes and compresses large HTML/CSS/code content to keep token size low:
 * - Strips heavy inline JS <script> tags
 * - Strips huge base64 data URIs
 * - Simplifies inline SVG vectors
 * - Truncates excessive whitespace
 */
function optimizeTextContent(text) {
  if (typeof text !== "string") return text;

  let cleaned = text
    .replace(/<!--[\s\S]*?-->/g, "") // Remove HTML comments
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "<!-- [Script Tag Pruned] -->") // Strip JS
    .replace(/data:image\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+/g, "https://via.placeholder.com/600x400") // Replace huge base64 image strings
    .replace(/<svg[\s\S]*?<\/svg>/gi, '<img src="icon-placeholder.svg" alt="icon" />') // Replace heavy inline SVGs
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  // Cap maximum text character payload at 400,000 chars (~100,000 tokens) to ensure rapid processing without losing sections
  if (cleaned.length > 400000) {
    console.warn(`[Large File Optimization] Input payload size (${cleaned.length} chars) trimmed to 400,000 chars to fit token limits.`);
    cleaned = cleaned.slice(0, 400000) + "\n\n<!-- [Payload trimmed for size optimization] -->";
  }

  return cleaned;
}

/**
 * Helper to parse recommended retry delay from Google API 429 error messages.
 */
function parseRetryDelayMs(errorMessage) {
  if (!errorMessage) return 15000;
  
  // Look for "Please retry in 19.52s" or "retryDelay":"19s"
  const secMatch = errorMessage.match(/retry\s+in\s+(\d+(?:\.\d+)?)s/i) || errorMessage.match(/retryDelay"?:\s*"(\d+)s"/i);
  if (secMatch && secMatch[1]) {
    const sec = parseFloat(secMatch[1]);
    return Math.max(5000, Math.min(30000, Math.ceil(sec * 1000) + 1000));
  }
  return 15000;
}

/**
 * Safely parses JSON strings and automatically repairs truncated / unclosed JSON structures.
 */
function parseAndRepairJson(rawStr) {
  let cleaned = rawStr.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```(?:json)?\n?/i, "")
      .replace(/\n?```$/i, "")
      .trim();
  }

  // 1. Try direct standard parse
  try {
    return JSON.parse(cleaned);
  } catch (firstErr) {
    // 2. Defensive repair for truncated output (close open quotes, arrays, and objects)
    let repaired = cleaned;
    let stack = [];
    let inString = false;
    let isEscaped = false;

    for (let i = 0; i < repaired.length; i++) {
      const char = repaired[i];
      if (inString) {
        if (char === "\\") {
          isEscaped = !isEscaped;
        } else if (char === '"' && !isEscaped) {
          inString = false;
        } else {
          isEscaped = false;
        }
      } else {
        if (char === '"') {
          inString = true;
          isEscaped = false;
        } else if (char === "{" || char === "[") {
          stack.push(char === "{" ? "}" : "]");
        } else if (char === "}" || char === "]") {
          if (stack.length > 0 && stack[stack.length - 1] === char) {
            stack.pop();
          }
        }
      }
    }

    if (inString) {
      repaired += '"';
    }

    // Strip trailing commas before closing
    repaired = repaired.replace(/,\s*$/, "");

    while (stack.length > 0) {
      repaired += stack.pop();
    }

    try {
      return JSON.parse(repaired);
    } catch (secondErr) {
      const parseErr = new Error(`Failed to parse Gemini response as JSON.`);
      parseErr.rawResponse = rawStr;
      throw parseErr;
    }
  }
}

/**
 * Sends multi-format user input to Google Gemini API and returns parsed Elementor JSON.
 * Automatically handles 429 rate-limit backoffs by waiting for token bucket refill.
 * @param {Object} params
 * @param {string} params.inputType - html | css_js | image | prompt | json | email_quote | pdf | folder | multi_files
 * @param {string|Buffer|Array} params.payload - Text content, base64 string/buffer, array of files
 * @param {string} [params.mimeType] - Mime type for single file upload
 * @returns {Promise<Object>} Object containing parsed Elementor JSON structure and token usageMetadata
 */
export async function convertInputToElementor({ inputType, payload, mimeType }) {
  const rawKey = process.env.GEMINI_API_KEY || "";
  const apiKey = rawKey.trim().replace(/^["']|["']$/g, "");

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is empty in .env.local. Please paste your Google Gemini API key into .env.local after 'GEMINI_API_KEY=' and save the file."
    );
  }

  // Production Gemini models
  const configuredModel = (process.env.GEMINI_MODEL || "").trim();
  const candidateModels = Array.from(
    new Set(
      [
        configuredModel,
        "gemini-3.6-flash",
        "gemini-3.5-flash",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-2.0-flash-lite",
        "gemini-flash-latest",
      ].filter(Boolean)
    )
  );

  const genAI = new GoogleGenerativeAI(apiKey);

  let contents = [];

  const exhaustiveMandate = `EXHAUSTIVE FULL-SITE SECTION EXTRACTION MANDATE:
Extract 100% of ALL sections from top to bottom into separate top-level Elementor Containers in content_template, header_template, and footer_template.
A complete website page typically contains 6 to 15+ top-level sections (1. Top Announcement Bar, 2. Header Navigation Bar, 3. Hero Section, 4. Brand Logos / Partners, 5. Primary Features Grid, 6. Services Overview, 7. About / Value Prop, 8. Stats / Metrics Counter, 9. Portfolio / Case Studies, 10. Testimonials, 11. Team Members, 12. Pricing Tiers, 13. FAQ Accordion, 14. CTA Banner, 15. Footer).
DO NOT skip, omit, summarize, combine, or shorten ANY section. Generate EVERY section sequentially from top to bottom until the page is 100% complete!`;

  if ((inputType === "folder" || inputType === "multi_files") && Array.isArray(payload)) {
    // Process separate files bundle
    let bundleTextSummary = `SEPARATE FILES BUNDLE (${payload.length} files):\n\n`;
    const imageParts = [];

    for (const fileObj of payload) {
      const fileName = fileObj.name || fileObj.path || "file";
      
      if (fileObj.isImage && fileObj.base64) {
        imageParts.push({
          inlineData: {
            data: fileObj.base64.replace(/^data:image\/\w+;base64,/, ""),
            mimeType: fileObj.mimeType || "image/png",
          },
        });
        bundleTextSummary += `--- ATTACHED IMAGE FILE: ${fileName} ---\n[Image Attached as Inline Data]\n\n`;
      } else if (fileObj.content) {
        const trimmedContent = optimizeTextContent(fileObj.content);
        bundleTextSummary += `--- FILE: ${fileName} ---\n${trimmedContent}\n\n`;
      }
    }

    contents = [
      ...imageParts,
      `${exhaustiveMandate}\n\nAnalyze this set of ${payload.length} separate files (HTML markup, CSS stylesheets, JS components, images). Extract EVERY SINGLE section from top to bottom into top-level Elementor Container objects in content_template, header_template, and footer_template. Extract ALL exact text content verbatim into Elementor widgets ('title' for headings, 'editor' for text-editor, 'text' for buttons). Extract exact CSS background colors, text colors, font sizes, font weights, button colors, and card background colors into the corresponding Elementor container & widget settings. Do NOT skip, omit, summarize, or leave out ANY section, text, or color!\n\n${bundleTextSummary}`
    ];
  } else if (inputType === "image" && payload) {
    const base64Data = typeof payload === "string" 
      ? payload.replace(/^data:image\/\w+;base64,/, "") 
      : payload.toString("base64");
      
    contents = [
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType || "image/png",
        },
      },
      `${exhaustiveMandate}\n\nAnalyze this entire visual design/UI screenshot sequentially from top to bottom. Extract EVERY SINGLE visible section (Hero, Logos, Services, Features, About, Stats, Testimonials, Team, Pricing, FAQ, CTA, Footer) into top-level Elementor Containers and widgets. Extract ALL EXACT visible text strings into the corresponding Elementor widgets ('title' for headings, 'editor' for text-editor, 'text' for buttons). Set exact hex colors ('background_color', 'title_color', 'text_color', 'button_text_color') for every single node. Do NOT skip, omit, summarize, or substitute ANY section, text, heading, button, or container element.`
    ];
  } else {
    const rawText = typeof payload === "string" ? payload : JSON.stringify(payload);
    const textContent = optimizeTextContent(rawText);
    
    let promptPrefix = `${exhaustiveMandate}\n\n`;
    if (inputType === "html") {
      promptPrefix = `${exhaustiveMandate}\n\nEXHAUSTIVE HTML/CSS CONVERSION DIRECTIVE: Analyze this HTML code sequentially from top to bottom (including embedded <style> tags, inline style attributes, CSS classes, and HTML tags). Convert EVERY SINGLE <section>, <header>, <footer>, and major content block into top-level Elementor Containers in content_template, header_template, and footer_template. Replicate the exact layout, background colors, text colors, typography, and section containers into Elementor Flex Containers and widgets. Extract 100% of text verbatim into 'title' for headings, 'editor' for text-editor, and 'text' for buttons. Do NOT omit any section, text, or styling!\n\n`;
    }

    contents = [
      `${promptPrefix}Content to convert:\n${textContent}`
    ];
  }

  let lastError = null;
  let responseText = null;
  let usageMetadata = null;
  let usedModelName = candidateModels[0];

  // Up to 3 main execution attempts with automatic quota reset sleep
  for (let globalAttempt = 0; globalAttempt < 0 + 3; globalAttempt++) {
    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_PROMPT,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
            maxOutputTokens: 32768,
          },
        });

        const result = await model.generateContent(contents);
        responseText = result.response.text();
        usageMetadata = result.response.usageMetadata || null;
        usedModelName = modelName;

        if (responseText) {
          break; // Successfully got response
        }
      } catch (err) {
        lastError = err;
        const isRateLimit = err.message.includes("429") || err.message.toLowerCase().includes("quota");
        
        if (isRateLimit) {
          const delayMs = parseRetryDelayMs(err.message);
          console.warn(`[Quota 429 on ${modelName}] Sleeping ${(delayMs / 1000).toFixed(1)}s for token bucket refill...`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
          // Retry same model once after sleeping
          try {
            const modelRetry = genAI.getGenerativeModel({
              model: modelName,
              systemInstruction: SYSTEM_PROMPT,
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.1,
                maxOutputTokens: 32768,
              },
            });
            const resultRetry = await modelRetry.generateContent(contents);
            responseText = resultRetry.response.text();
            usageMetadata = resultRetry.response.usageMetadata || null;
            usedModelName = modelName;
            if (responseText) break;
          } catch (retryErr) {
            lastError = retryErr;
          }
        } else {
          console.warn(`Gemini model '${modelName}' call failed: ${err.message}. Trying next model...`);
        }
      }
    }

    if (responseText) break;

    // If all candidate models were rate limited, wait 15s before next global attempt
    if (lastError && (lastError.message.includes("429") || lastError.message.toLowerCase().includes("quota"))) {
      const globalDelay = parseRetryDelayMs(lastError.message);
      console.warn(`[Global Quota Delay] Waiting ${(globalDelay / 1000).toFixed(1)}s before automatic retry attempt ${globalAttempt + 2}/3...`);
      await new Promise((resolve) => setTimeout(resolve, globalDelay));
    }
  }

  if (!responseText) {
    const isRateLimit = lastError && (lastError.message.includes("429") || lastError.message.toLowerCase().includes("quota"));
    if (isRateLimit) {
      throw new Error("Gemini Free-Tier Rate Limit (429): Google's free API key quota limit (250,000 tokens/min) was reached. The server automatically retried, but Google is still refilling your key's token bucket. Please wait 20 seconds and click Convert again.");
    }
    throw new Error(`Failed to generate Elementor JSON from Gemini API: ${lastError ? lastError.message : "Unknown API error"}`);
  }

  const parsedJson = parseAndRepairJson(responseText);

  return {
    jsonOutput: parsedJson,
    usageMetadata,
    usedModelName,
  };
}
