import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import { convertInputToElementor } from "@/lib/geminiClient.js";
import { sanitizeAndRepairElementor } from "@/lib/autoSanitizeElementor.js";
import { validateTemplate } from "@/lib/validateElementor.js";
import { buildThemeZip } from "@/lib/packageTheme.js";
import { saveConversion } from "@/lib/dbService.js";
import { executeIterativeConversion } from "@/lib/iterativeConverter.js";

function sanitizeSlug(text) {
  return (text || "theme")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .slice(0, 30) || "theme";
}

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let inputType = "prompt";
    let payload = "";
    let mimeType = "image/png";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      inputType = formData.get("input_type") || "image";

      if (inputType === "folder" || inputType === "multi_files") {
        const filesDataStr = formData.get("folder_data") || formData.get("files_data");
        if (filesDataStr) {
          payload = JSON.parse(filesDataStr);
        } else {
          // Parse multiple uploaded files
          const files = formData.getAll("files");
          const extractedFiles = [];

          for (const fileObj of files) {
            if (fileObj && typeof fileObj !== "string") {
              const fileName = fileObj.name || "file";
              const arrayBuffer = await fileObj.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
              const fileType = fileObj.type || "";

              if (fileType.startsWith("image/")) {
                extractedFiles.push({
                  name: fileName,
                  isImage: true,
                  mimeType: fileType,
                  base64: buffer.toString("base64"),
                });
              } else if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
                try {
                  const pdfRes = await pdfParse(buffer);
                  extractedFiles.push({
                    name: fileName,
                    content: pdfRes.text,
                  });
                } catch {
                  // Fallback
                }
              } else {
                // Text file (HTML, CSS, JS, JSON)
                extractedFiles.push({
                  name: fileName,
                  content: buffer.toString("utf-8"),
                });
              }
            }
          }
          payload = extractedFiles;
        }

        if (!Array.isArray(payload) || payload.length === 0) {
          return NextResponse.json(
            { success: false, errors: ["No files found in uploaded bundle."] },
            { status: 400 }
          );
        }
      } else {
        const file = formData.get("file");

        if (!file || typeof file === "string") {
          return NextResponse.json(
            { success: false, errors: ["No file uploaded for file input."] },
            { status: 400 }
          );
        }

        mimeType = file.type || (inputType === "pdf" ? "application/pdf" : "image/png");
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        if (inputType === "pdf") {
          const parsedPdf = await pdfParse(buffer);
          payload = parsedPdf.text;
          if (!payload || !payload.trim()) {
            return NextResponse.json(
              { success: false, errors: ["Failed to extract text from the provided PDF file."] },
              { status: 422 }
            );
          }
        } else {
          // Image input
          payload = buffer;
        }
      }
    } else {
      // JSON body input
      const body = await req.json();
      inputType = body.input_type || "prompt";

      if (inputType === "folder" || inputType === "multi_files") {
        payload = body.files || body.folder_files || body.content || [];
      } else {
        payload = body.content || body.payload || "";
      }

      if (!payload || (typeof payload === "string" && !payload.trim())) {
        return NextResponse.json(
          { success: false, errors: ["Content payload is empty."] },
          { status: 400 }
        );
      }
    }

    // 1. Check if input is HTML / CSS text for Section-by-Section Iterative Engine
    let geminiResult;
    let sanitizedResult;

    if (inputType === "html" || inputType === "css_js" || (typeof payload === "string" && payload.includes("<"))) {
      const conversionId = `page-${Date.now()}`;
      const conversionDir = path.join(process.cwd(), "data", "conversions", conversionId);
      await fs.mkdir(conversionDir, { recursive: true });

      const iterativeRes = await executeIterativeConversion({
        pageId: conversionId,
        htmlContent: typeof payload === "string" ? payload : JSON.stringify(payload),
        cssContent: "",
        title: "Converted Website",
        conversionDir,
      });

      sanitizedResult = iterativeRes.elementorJson;
      geminiResult = {
        jsonOutput: sanitizedResult,
        usageMetadata: { promptTokenCount: 1500, candidatesTokenCount: 2000, totalTokenCount: 3500 },
        usedModelName: "iterative-section-engine",
      };
    } else {
      try {
        geminiResult = await convertInputToElementor({ inputType, payload, mimeType });
      } catch (err) {
        if (err.rawResponse) {
          return NextResponse.json(
            {
              success: false,
              errors: [`Failed to parse Gemini response as JSON. Raw model output:\n\n${err.rawResponse}`],
            },
            { status: 422 }
          );
        }
        return NextResponse.json(
          { success: false, errors: [`Gemini API Error: ${err.message}`] },
          { status: 500 }
        );
      }
      sanitizedResult = sanitizeAndRepairElementor(geminiResult.jsonOutput);
    }

    const {
      title = "AI Converter Custom Theme",
      summary = {},
      header_template = [],
      footer_template = [],
      content_template = [],
      global_classes = {},
    } = sanitizedResult;

    const usageMetadata = geminiResult?.usageMetadata || {};
    const usedModelName = geminiResult?.usedModelName || "iterative-section-engine";

    // Calculate token usage metrics
    const promptTokens = usageMetadata?.promptTokenCount || 0;
    const outputTokens = usageMetadata?.candidatesTokenCount || 0;
    const totalTokens = usageMetadata?.totalTokenCount || (promptTokens + outputTokens);
    const tokenLimitPerMinute = 250000;
    const tokensRemainingPerMinute = Math.max(0, tokenLimitPerMinute - promptTokens);

    const tokenUsage = {
      promptTokens,
      outputTokens,
      totalTokens,
      tokenLimitPerMinute,
      tokensRemainingPerMinute,
      usedModelName,
    };

    // 2. Validate against Elementor Rules
    let validationResult = validateTemplate({
      header_template,
      footer_template,
      content_template,
    });

    if (!validationResult.valid) {
      // Automatic auto-repair pass
      const repaired = sanitizeAndRepairElementor({
        title,
        summary,
        header_template,
        footer_template,
        content_template,
        global_classes,
      });

      header_template.length = 0;
      header_template.push(...(repaired.header_template || []));

      footer_template.length = 0;
      footer_template.push(...(repaired.footer_template || []));

      content_template.length = 0;
      content_template.push(...(repaired.content_template || []));

      validationResult = validateTemplate({
        header_template,
        footer_template,
        content_template,
      });

      if (!validationResult.valid) {
        return NextResponse.json(
          {
            success: false,
            errors: validationResult.errors,
            tokenUsage,
          },
          { status: 422 }
        );
      }
    }

    // 3. Package Theme ZIP
    const zipBuffer = await buildThemeZip({
      header: header_template,
      footer: footer_template,
      content: content_template,
      globalClasses: global_classes,
      siteMeta: { title, summary },
    });

    // 4. Save to /data/outputs/<timestamp>-<slug>/
    const timestamp = Date.now();
    const slug = sanitizeSlug(title);
    const id = `${timestamp}-${slug}`;
    const outputDir = path.join(process.cwd(), "data", "outputs", id);

    await fs.mkdir(outputDir, { recursive: true });

    const zipPath = path.join(outputDir, "theme.zip");
    const jsonPath = path.join(outputDir, "elementor-export.json");
    const metaPath = path.join(outputDir, "meta.json");

    // Standard Elementor Export JSON Format (Directly importable into Elementor)
    const rawExportJson = {
      version: "0.4",
      title: title,
      type: "page",
      page_settings: {
        page_template: "elementor_canvas",
        template: "elementor_canvas",
      },
      content: [
        ...(Array.isArray(header_template) ? header_template : []),
        ...(Array.isArray(content_template) ? content_template : []),
        ...(Array.isArray(footer_template) ? footer_template : []),
      ],
      summary,
      global_classes,
    };

    const downloadUrl = `/api/download/${id}?type=zip`;
    const jsonDownloadUrl = `/api/download/${id}?type=json`;

    const metaData = {
      id,
      timestamp,
      title,
      inputType,
      summary: {
        colors: summary.colors || [],
        fonts: summary.fonts || [],
        section_count: summary.section_count || (Array.isArray(content_template) ? content_template.length : 1),
      },
      tokenUsage,
      downloadUrl,
      jsonDownloadUrl,
      createdAt: new Date(timestamp).toISOString(),
    };

    await fs.writeFile(zipPath, zipBuffer);
    await fs.writeFile(jsonPath, JSON.stringify(rawExportJson, null, 2));
    await fs.writeFile(metaPath, JSON.stringify(metaData, null, 2));

    // Save to MongoDB (non-blocking fallback)
    await saveConversion(metaData, rawExportJson).catch((dbErr) => {
      console.warn("MongoDB Non-Blocking Save Notice:", dbErr.message);
    });

    return NextResponse.json({
      success: true,
      id,
      title,
      summary: metaData.summary,
      tokenUsage,
      templates: {
        header: header_template,
        footer: footer_template,
        content: content_template,
      },
      downloadUrl,
      jsonDownloadUrl,
    });
  } catch (error) {
    console.error("Error in /api/convert handler:", error);
    return NextResponse.json(
      { success: false, errors: [error.message || "Internal server error occurred."] },
      { status: 500 }
    );
  }
}
