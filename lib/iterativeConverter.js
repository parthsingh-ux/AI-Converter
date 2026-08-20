import fs from "fs/promises";
import path from "path";
import { convertInputToElementor } from "./geminiClient.js";
import { sanitizeAndRepairElementor } from "./autoSanitizeElementor.js";
import { validateTemplate } from "./validateElementor.js";
import { analyzePageImagesWithBrowser } from "./imageAnalyzer.js";
import { validateAndRepairImageDimensions } from "./imageValidator.js";
import { FormDetector } from "./formDetector.js";
import { GravityFormsService } from "./gravityFormsService.js";
import { FormElementorMapper } from "./formElementorMapper.js";
import { FormValidator } from "./formValidator.js";

const MAX_SECTION_CONTEXT_CHARS = 40000; // Safety context threshold
const MAX_ATTEMPTS = 4;

/**
 * 1. SECTION DETECTOR SERVICE
 * Stack-balanced HTML parser that extracts 100% complete top-level structural sections
 * without truncating nested <div>s, card grids, text, colors, or closing tags.
 */
export class SectionDetector {
  static detectSections(htmlContent, cssContent = "") {
    if (typeof htmlContent !== "string") {
      htmlContent = String(htmlContent || "");
    }

    const sections = [];
    const cleanHtml = htmlContent.trim();

    if (!cleanHtml) {
      return [
        {
          id: "section-001",
          order: 1,
          name: "Main Section",
          html: "<section><div>No content provided</div></section>",
          css: "",
          status: "pending",
        },
      ];
    }

    // Stack-balanced tag extractor
    const candidates = [];
    const tagStartRegex = /<(header|footer|section|main|nav|article|div)\b[^>]*>/gi;
    let match;
    let lastIndex = 0;

    while ((match = tagStartRegex.exec(cleanHtml)) !== null) {
      const startIdx = match.index;
      if (startIdx < lastIndex) continue;

      const tagName = match[1].toLowerCase();
      let depth = 1;
      let curr = startIdx + match[0].length;

      const tokenRegex = new RegExp(`</?${tagName}\\b[^>]*>`, "gi");
      tokenRegex.lastIndex = curr;
      let token;

      while ((token = tokenRegex.exec(cleanHtml)) !== null) {
        if (token[0].startsWith("</")) {
          depth--;
        } else {
          depth++;
        }
        if (depth === 0) {
          const endIdx = token.index + token[0].length;
          const fullMatch = cleanHtml.slice(startIdx, endIdx);

          if (fullMatch.length >= 60 || tagName === "header" || tagName === "footer" || tagName === "section") {
            candidates.push({
              tagName,
              html: fullMatch,
              length: fullMatch.length,
            });
          }

          lastIndex = endIdx;
          tagStartRegex.lastIndex = endIdx;
          break;
        }
      }
    }

    const semanticCandidates = candidates.filter((m) =>
      ["header", "footer", "section", "main", "article", "nav"].includes(m.tagName)
    );

    const finalCandidates = semanticCandidates.length > 0 ? semanticCandidates : candidates;

    if (finalCandidates.length === 0) {
      const chunkSize = Math.ceil(cleanHtml.length / 4);
      for (let i = 0; i < cleanHtml.length; i += chunkSize) {
        const order = sections.length + 1;
        sections.push({
          id: `section-${String(order).padStart(3, "0")}`,
          order,
          name: `Section ${order}`,
          html: cleanHtml.slice(i, i + chunkSize),
          css: cssContent,
          status: "pending",
        });
      }
    } else {
      finalCandidates.forEach((cand, idx) => {
        const order = idx + 1;
        let name = `${cand.tagName.toUpperCase()} Section ${order}`;

        const nameMatch = cand.html.match(
          /(?:id|class)=["']([^"']*(?:hero|about|service|feature|testimonial|pricing|team|contact|cta|header|footer|banner|nav|intro)[^"']*)["']/i
        );
        if (nameMatch && nameMatch[1]) {
          const rawName = nameMatch[1].split(/[\s_-]+/)[0];
          name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
        }

        sections.push({
          id: `section-${String(order).padStart(3, "0")}`,
          order,
          name,
          html: cand.html,
          css: cssContent,
          status: "pending",
        });
      });
    }

    return sections;
  }
}

/**
 * 2. CONTEXT BUILDER & CSS EXTRACTOR SERVICE
 * Builds global context and extracts relevant CSS selectors/assets for a specific section.
 */
export class ContextBuilder {
  static buildGlobalContext(htmlContent = "", cssContent = "") {
    const fonts = new Set();
    const colors = new Set();

    // Extract font-family references
    const fontMatches = (cssContent + htmlContent).matchAll(/font-family\s*:\s*([^;}]+)/gi);
    for (const m of fontMatches) {
      if (m[1]) {
        m[1].split(",").forEach((f) => {
          const cleaned = f.replace(/['"]/g, "").trim();
          if (cleaned && !["sans-serif", "serif", "monospace", "inherit", "initial"].includes(cleaned.toLowerCase())) {
            fonts.add(cleaned);
          }
        });
      }
    }

    // Extract HEX & RGB colors
    const colorMatches = (cssContent + htmlContent).matchAll(/#(?:[0-9a-fA-F]{3,6})\b|rgba?\([^)]+\)|color\(srgb[^)]+\)/gi);
    for (const cm of colorMatches) {
      colors.add(cm[0]);
    }

    return {
      pageWidth: "1200px",
      globalFonts: Array.from(fonts).slice(0, 5),
      globalColors: Array.from(colors).slice(0, 10),
      breakpoints: { desktop: "1200px", tablet: "1024px", mobile: "767px" },
    };
  }

  static extractSectionContext(section, globalContext) {
    // Extract CSS selectors relevant to section HTML classes/ids
    const classMatches = section.html.match(/class=["']([^"']+)["']/g) || [];
    const classes = new Set();
    classMatches.forEach((m) => {
      m.replace(/class=["']|["']/g, "").split(/\s+/).forEach((c) => c.trim() && classes.add(c.trim()));
    });

    let relevantCss = "";

    // 1. Extract embedded <style> blocks in section HTML
    const embeddedStyles = [];
    const styleRegex = /<style[^>]*?>([\s\S]*?)<\/style>/gi;
    let sMatch;
    while ((sMatch = styleRegex.exec(section.html)) !== null) {
      if (sMatch[1]) embeddedStyles.push(sMatch[1]);
    }
    if (embeddedStyles.length > 0) {
      relevantCss += "\n/* Embedded Styles */\n" + embeddedStyles.join("\n");
    }

    // 2. Extract CSS variables and matching class selectors from global CSS
    if (section.css) {
      const cssLines = section.css.split("\n");

      // Extract :root CSS variables
      const rootLines = cssLines.filter((line) => line.includes("--") || line.includes(":root"));
      if (rootLines.length > 0) {
        relevantCss += "\n/* CSS Variables */\n" + rootLines.slice(0, 30).join("\n");
      }

      // Extract matching class selectors and @media queries
      const matchedLines = cssLines.filter((line) => {
        return (
          line.includes("@media") ||
          Array.from(classes).some((cls) => line.includes(`.${cls}`) || line.includes(`#${cls}`))
        );
      });
      if (matchedLines.length > 0) {
        relevantCss += "\n/* Section Selectors & Media Queries */\n" + matchedLines.slice(0, 150).join("\n");
      }
    }

    return {
      sectionId: section.id,
      name: section.name,
      html: section.html,
      css: relevantCss || section.css?.slice(0, 2500) || "",
      globalContext,
    };
  }
}

/**
 * 3. TOKEN ESTIMATOR & SUB-SECTION SPLITTER
 */
export class TokenEstimator {
  static estimateTokens(text) {
    if (typeof text !== "string") return 0;
    return Math.ceil(text.length / 4);
  }

  static shouldSplitSection(sectionContext) {
    const totalChars = (sectionContext.html || "").length + (sectionContext.css || "").length;
    return totalChars > MAX_SECTION_CONTEXT_CHARS;
  }

  static splitSection(section) {
    const halfLen = Math.ceil(section.html.length / 2);
    const sub1 = {
      ...section,
      id: `${section.id}-part1`,
      name: `${section.name} Part 1`,
      html: section.html.slice(0, halfLen),
    };
    const sub2 = {
      ...section,
      id: `${section.id}-part2`,
      name: `${section.name} Part 2`,
      html: section.html.slice(halfLen),
    };
    return [sub1, sub2];
  }
}

/**
 * 4. STATE MANAGER & CHECKPOINT SERVICE
 * Manages state.json and section-map.json persistence. Supports resuming.
 */
export class StateManager {
  constructor(conversionDir) {
    this.dir = conversionDir;
    this.stateFilePath = path.join(conversionDir, "state.json");
    this.sectionsDir = path.join(conversionDir, "sections");
  }

  async init(pageId, sections, globalContext) {
    await fs.mkdir(this.sectionsDir, { recursive: true });

    const state = {
      pageId,
      status: "in_progress",
      totalSections: sections.length,
      completedSections: 0,
      currentSection: sections[0]?.id || null,
      progress: 0,
      sections: sections.map((s) => ({
        id: s.id,
        order: s.order,
        name: s.name,
        status: s.status || "pending",
        attempts: 0,
      })),
      globalContext,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(this.stateFilePath, JSON.stringify(state, null, 2));
    return state;
  }

  async getState() {
    try {
      const data = await fs.readFile(this.stateFilePath, "utf-8");
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async updateSectionState(sectionId, update) {
    const state = await this.getState();
    if (!state) return;

    const sec = state.sections.find((s) => s.id === sectionId);
    if (sec) {
      Object.assign(sec, update);
    }

    const completed = state.sections.filter((s) => s.status === "completed" || s.status === "converted").length;
    state.completedSections = completed;
    state.progress = parseFloat(((completed / state.totalSections) * 100).toFixed(2));

    const nextPending = state.sections.find((s) => s.status === "pending" || s.status === "failed");
    state.currentSection = nextPending ? nextPending.id : null;
    if (!nextPending && completed === state.totalSections) {
      state.status = "completed";
    }

    state.updatedAt = new Date().toISOString();
    await fs.writeFile(this.stateFilePath, JSON.stringify(state, null, 2));
    return state;
  }

  async saveSectionResult(sectionId, sectionJson) {
    const filePath = path.join(this.sectionsDir, `${sectionId}.json`);
    await fs.writeFile(filePath, JSON.stringify(sectionJson, null, 2));
  }

  async getSavedSectionResults() {
    const files = await fs.readdir(this.sectionsDir);
    const results = [];
    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(this.sectionsDir, file);
        const data = await fs.readFile(filePath, "utf-8");
        results.push(JSON.parse(data));
      }
    }
    return results;
  }
}

/**
 * 5. SECTION CONVERTER & VALIDATOR SERVICE
 */
export class SectionConverter {
  static async convertSingleSection(sectionContext, attempt = 1) {
    const sectionPrompt = `
REPLICATE THIS EXACT WEBSITE SECTION INTO ELEMENTOR 3.X JSON WITH 100% DESIGN & STYLING FIDELITY:
Section ID: ${sectionContext.sectionId}
Section Name: ${sectionContext.name}

HTML CONTENT:
\`\`\`html
${sectionContext.html}
\`\`\`

CSS STYLES & MEDIA QUERIES:
\`\`\`css
${sectionContext.css}
\`\`\`

GLOBAL DESIGN SYSTEM & PALETTE:
Primary Fonts: ${JSON.stringify(sectionContext.globalContext.globalFonts || [])}
Extracted Colors: ${JSON.stringify(sectionContext.globalContext.globalColors || [])}

MANDATORY STYLING & DESIGN RULES FOR THIS SECTION:
1. LAYOUT & FLEX DIRECTION:
   • Parent row sections MUST set flex_direction: "row", flex_wrap: "wrap", flex_direction_mobile: "column".
   • Column containers MUST receive percentage width ({ unit: "%", size: N }) with 100% width on tablet/mobile ({ unit: "%", size: 100 }).
2. COLORS & CONTRAST (ZERO MISSING COLORS):
   • Containers: "background_background": "classic", "background_color": "#HEX" or "rgba(...)".
   • Headings: "title_color": "#HEX" matching the exact source heading color.
   • Text Editors: "text_color": "#HEX" matching exact paragraph color.
   • Buttons: "button_text_color": "#HEX", "background_color": "#HEX".
   • Icons / Lists: "primary_color": "#HEX", "icon_color": "#HEX".
3. TYPOGRAPHY & FONTS:
   • Explicitly assign typography_font_family, typography_font_size ({ unit: "px", size: N }), typography_font_weight ("400", "600", "700"), and typography_line_height ({ unit: "em", size: N }).
   • Always set "typography_typography": "custom" on every text/button node.
4. SPACING & BORDERS:
   • Extract exact padding, margin, flex_gap ({ unit: "px", size: N }), border_width, border_color, border_radius, and box_shadow.

Return ONLY valid Elementor JSON for this section inside "content_template".
`;

    try {
      const res = await convertInputToElementor({
        inputType: "html",
        payload: sectionPrompt,
      });

      if (!res || !res.content_template) {
        throw new Error("Missing content_template in section conversion result.");
      }

      // Sanitize and validate section tree
      const sanitized = sanitizeAndRepairElementor(res);
      const validation = validateTemplate(sanitized);

      return {
        sectionId: sectionContext.sectionId,
        status: "converted",
        attempt,
        elementor: sanitized.content_template || [],
        warnings: validation.errors || [],
      };
    } catch (err) {
      if (attempt < MAX_ATTEMPTS) {
        console.warn(`[Section Retry] ${sectionContext.sectionId} attempt ${attempt} failed: ${err.message}. Retrying...`);
        return SectionConverter.convertSingleSection(sectionContext, attempt + 1);
      }

      // Fallback: Preserve section as raw Elementor HTML widget if AI attempts fail
      console.error(`[Section Fallback] ${sectionContext.sectionId} failed after ${MAX_ATTEMPTS} attempts. Emitting HTML fallback.`);
      return {
        sectionId: sectionContext.sectionId,
        status: "converted",
        attempt,
        elementor: [
          {
            id: `fallback-${sectionContext.sectionId}`,
            elType: "container",
            settings: { display: "flex", flex_direction: "column" },
            elements: [
              {
                id: `html-fallback-${sectionContext.sectionId}`,
                elType: "widget",
                widgetType: "html",
                settings: { html: sectionContext.html },
              },
            ],
          },
        ],
        warnings: [`Converted via HTML fallback due to API limit: ${err.message}`],
      };
    }
  }
}

/**
 * 6. SECTION ASSEMBLER SERVICE
 * Merges all completed section JSON files into the final Elementor JSON page structure in original order.
 */
export class SectionAssembler {
  static assembleFinalPage(sectionsMap, sectionResults, title = "Converted Website") {
    // Sort sections by original section map order
    const orderedSections = [...sectionsMap].sort((a, b) => a.order - b.order);
    const finalContentTemplate = [];

    orderedSections.forEach((sec) => {
      const result = sectionResults.find((r) => r.sectionId === sec.id);
      if (result && Array.isArray(result.elementor)) {
        finalContentTemplate.push(...result.elementor);
      }
    });

    const rawResult = {
      title,
      summary: { colors: [], fonts: [], section_count: orderedSections.length },
      header_template: [],
      content_template: finalContentTemplate,
      footer_template: [],
    };

    return sanitizeAndRepairElementor(rawResult);
  }
}

/**
 * 7. CORE ITERATIVE CONVERSION ENGINE EXECUTION LOOP
 */
export async function executeIterativeConversion({
  pageId = `page-${Date.now()}`,
  htmlContent = "",
  cssContent = "",
  title = "Converted Website",
  conversionDir,
  onProgress,
}) {
  const stateManager = new StateManager(conversionDir);

  // Check if state exists for resuming
  let state = await stateManager.getState();

  let sections = [];
  let globalContext = {};

  // 1. Run Deterministic Browser-Rendered Image Analysis Pipeline
  let imageAnalysisMap = {};
  try {
    imageAnalysisMap = await analyzePageImagesWithBrowser({ htmlContent, cssContent });
    const imgAnalysisPath = path.join(conversionDir, "image-analysis.json");
    await fs.writeFile(imgAnalysisPath, JSON.stringify(imageAnalysisMap, null, 2));
  } catch (imgErr) {
    console.warn("[Image Dimension Pipeline Notice]:", imgErr.message);
  }

  if (!state) {
    sections = SectionDetector.detectSections(htmlContent, cssContent);
    globalContext = ContextBuilder.buildGlobalContext(htmlContent, cssContent);
    globalContext.imageAnalysisMap = imageAnalysisMap;
    state = await stateManager.init(pageId, sections, globalContext);
  } else {
    // Resume existing conversion
    sections = SectionDetector.detectSections(htmlContent, cssContent);
    globalContext = state.globalContext || ContextBuilder.buildGlobalContext(htmlContent, cssContent);
    globalContext.imageAnalysisMap = imageAnalysisMap;
  }

  if (onProgress) onProgress(state);

  // Core Iterative Section Loop
  while (state.status === "in_progress") {
    const pendingSecState = state.sections.find((s) => s.status === "pending" || s.status === "failed");

    if (!pendingSecState) {
      break;
    }

    const sectionId = pendingSecState.id;
    const rawSection = sections.find((s) => s.id === sectionId) || {
      id: sectionId,
      order: pendingSecState.order,
      name: pendingSecState.name,
      html: htmlContent,
      css: cssContent,
    };

    await stateManager.updateSectionState(sectionId, { status: "converting" });

    let sectionContext = ContextBuilder.extractSectionContext(rawSection, globalContext);

    // Detect forms in section and integrate Gravity Forms
    const detectedForms = FormDetector.detectAndExtractForms(rawSection.html, rawSection.css);
    const gfService = new GravityFormsService(conversionDir);
    const gfWidgets = [];

    for (const formModel of detectedForms) {
      try {
        const gfResult = await gfService.createOrRetrieveGravityForm(formModel);
        const gfWidget = FormElementorMapper.createGravityFormsElementorWidget(gfResult.gravityFormId, formModel);
        const scopedCss = FormElementorMapper.generateScopedFormCss(gfResult.gravityFormId, formModel);
        await FormElementorMapper.saveFormStyles(conversionDir, gfResult.gravityFormId, scopedCss);

        const formValReport = FormValidator.validateFormMapping(formModel, gfResult);
        await FormValidator.saveFormsValidationReport(conversionDir, [formValReport]);
        gfWidgets.push(gfWidget);
      } catch (gfErr) {
        console.warn(`[Gravity Forms Integration Notice]: ${gfErr.message}`);
      }
    }

    // Sub-section splitting if context exceeds safety threshold
    if (TokenEstimator.shouldSplitSection(sectionContext)) {
      const subSections = TokenEstimator.splitSection(rawSection);
      const subResults = [];
      for (const sub of subSections) {
        const subContext = ContextBuilder.extractSectionContext(sub, globalContext);
        const subRes = await SectionConverter.convertSingleSection(subContext);
        subResults.push(subRes);
      }

      const mergedElementor = subResults.flatMap((r) => r.elementor || []);
      if (gfWidgets.length > 0) {
        mergedElementor.push(...gfWidgets);
      }

      const result = {
        sectionId,
        status: "converted",
        elementor: mergedElementor,
      };

      await stateManager.saveSectionResult(sectionId, result);
      state = await stateManager.updateSectionState(sectionId, { status: "completed" });
    } else {
      const result = await SectionConverter.convertSingleSection(sectionContext);
      if (gfWidgets.length > 0 && Array.isArray(result.elementor)) {
        result.elementor.push(...gfWidgets);
      }
      await stateManager.saveSectionResult(sectionId, result);
      state = await stateManager.updateSectionState(sectionId, { status: "completed" });
    }

    if (onProgress) onProgress(state);
  }

  // Final Assembly Pass
  const sectionResults = await stateManager.getSavedSectionResults();
  const rawFinalElementorJson = SectionAssembler.assembleFinalPage(state.sections, sectionResults, title);

  // Run Deterministic Image Dimension Validation & Auto-Correction
  const { template: finalElementorJson, correctionsApplied, warnings } = validateAndRepairImageDimensions(
    rawFinalElementorJson,
    imageAnalysisMap
  );

  if (correctionsApplied > 0) {
    console.log(`[Image Dimension Pipeline]: Auto-repaired ${correctionsApplied} image widgets to match exact browser dimensions.`);
  }

  // Save final.json
  const finalPath = path.join(conversionDir, "final.json");
  await fs.writeFile(finalPath, JSON.stringify(finalElementorJson, null, 2));

  return {
    success: true,
    state,
    elementorJson: finalElementorJson,
    imageAnalysisMap,
    imageWarnings: warnings,
  };
}
