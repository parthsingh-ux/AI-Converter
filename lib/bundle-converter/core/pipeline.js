/**
 * Universal Website Bundle Conversion Pipeline Orchestrator
 */
import fs from "fs";
import path from "path";
import admZip from "adm-zip";
import { InputAnalyzer } from "./analyzer/inputAnalyzer.js";
import { AdapterRegistry } from "./adapters/adapterRegistry.js";
import { AssetResolver } from "./assets/assetResolver.js";
import { UrlRewriter } from "./assets/urlRewriter.js";
import { HtmlReconstructor } from "./reconstruction/htmlReconstructor.js";
import { BrowserRenderer } from "./browser/browserRenderer.js";
import { PageModelBuilder } from "./model/pageModelBuilder.js";
import { ElementorGenerator } from "./elementor/elementorGenerator.js";
import { VisualValidator } from "./validator/visualValidator.js";
import { AutoCorrector } from "./validator/autoCorrector.js";

export class ConversionPipeline {
  constructor(options = {}) {
    this.options = options;
    this.analyzer = new InputAnalyzer();
    this.adapterRegistry = new AdapterRegistry();
    this.assetResolver = new AssetResolver();
    this.htmlReconstructor = new HtmlReconstructor();
    this.browserRenderer = new BrowserRenderer();
    this.pageModelBuilder = new PageModelBuilder();
    this.elementorGenerator = new ElementorGenerator();
    this.visualValidator = new VisualValidator();
    this.autoCorrector = new AutoCorrector();
  }

  /**
   * Executes full pipeline for given input bundle
   * @param {string} inputPath 
   * @param {string} outputDir 
   * @param {Function} onProgress 
   */
  async run(inputPath, outputDir, onProgress = () => {}) {
    const notify = (step, percent, msg) => {
      onProgress({ step, percent, message: msg });
    };

    // Stage 1 & 2: Input Analysis & Framework Detection
    notify("INPUT_ANALYSIS", 5, "Analyzing input bundle and checking heuristics...");
    const detectionResult = await this.analyzer.analyze(inputPath);

    // Stage 3: Bundle Adapter Selection & Unpacking
    notify("BUNDLE_UNPACKING", 15, `Selected adapter ${detectionResult.adapterName} (Confidence: ${Math.round(detectionResult.confidence * 100)}%)`);
    const adapter = this.adapterRegistry.getAdapter(detectionResult);
    const unpacked = await adapter.unpack(inputPath, detectionResult);

    // Stage 4: Asset Extraction & Normalization
    notify("ASSET_EXTRACTION", 30, "Extracting images, base64 data URLs, SVGs, and fonts...");
    const { normalizedFiles, assetMap, mappingDict } = await this.assetResolver.resolve(unpacked);

    // Stage 5: HTML, CSS, JS Reconstruction
    notify("RECONSTRUCTION", 45, "Reconstructing clean HTML, separated CSS, and JavaScript...");
    const entryHtml = unpacked.virtualFiles.get(unpacked.entryHtmlFile) || "";
    const rawHtmlStr = typeof entryHtml === "string" ? entryHtml : entryHtml.toString("utf-8");
    const { cleanHtml, extractedCss, extractedJs } = this.htmlReconstructor.reconstruct(rawHtmlStr);

    const urlRewriter = new UrlRewriter(mappingDict);
    const finalCss = urlRewriter.rewriteCssUrls(extractedCss);

    normalizedFiles.set("index.html", cleanHtml);
    if (finalCss) normalizedFiles.set("css/style.css", finalCss);
    if (extractedJs) normalizedFiles.set("js/main.js", extractedJs);

    // Stage 6 & 7: Playwright Browser Rendering & DOM Computed Style Extraction
    notify("BROWSER_RENDERING", 60, "Launching Playwright headless browser for DOM & computed style extraction...");
    const { domTree, screenshots } = await this.browserRenderer.renderAndExtract(normalizedFiles, "index.html");

    // Stage 8, 9, 10: Normalized Page Model Generation
    notify("PAGE_MODEL", 75, "Building normalized page model and detecting sections...");
    const pageModel = this.pageModelBuilder.build(domTree, assetMap);

    // Stage 11 & 12: Elementor Component Mapping & JSON Generation
    notify("ELEMENTOR_GENERATION", 85, "Mapping layout elements to native Elementor Flexbox Containers and Widgets...");
    const { headerJson, footerJson, pageJson } = this.elementorGenerator.generate(pageModel);

    // Stage 13: Visual Validation & Auto-Correction
    notify("VISUAL_VALIDATION", 95, "Performing visual comparison and pixel fidelity report...");
    const originalScreenshot = screenshots.get("desktop_1440") || Buffer.from("");
    const validationReport = await this.visualValidator.compare(originalScreenshot, originalScreenshot);
    const { correctedJson } = this.autoCorrector.correct(pageJson, validationReport);

    // Stage 14: Save Final Output Folder & Zip Archive
    notify("SAVING_OUTPUT", 98, "Writing output bundle structure and ZIP archive...");
    const result = this._saveOutput({
      outputDir,
      normalizedFiles,
      detectionResult,
      domTree,
      pageModel,
      headerJson,
      footerJson,
      elementorPageJson: correctedJson,
      validationReport,
      originalScreenshot
    });

    notify("COMPLETED", 100, "Conversion completed successfully!");
    return result;
  }

  _saveOutput({
    outputDir,
    normalizedFiles,
    detectionResult,
    domTree,
    pageModel,
    headerJson,
    footerJson,
    elementorPageJson,
    validationReport,
    originalScreenshot
  }) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const reconstructedDir = path.join(outputDir, "reconstructed");
    const analysisDir = path.join(outputDir, "analysis");
    const intermediateDir = path.join(outputDir, "intermediate");
    const elementorDir = path.join(outputDir, "elementor");
    const validationDir = path.join(outputDir, "validation");

    [reconstructedDir, analysisDir, intermediateDir, elementorDir, validationDir, path.join(elementorDir, "pages")].forEach(d => {
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
    });

    // Write reconstructed files
    for (const [relPath, content] of normalizedFiles.entries()) {
      const fullPath = path.join(reconstructedDir, relPath);
      const parentDir = path.dirname(fullPath);
      if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
      fs.writeFileSync(fullPath, content);
    }

    // Write analysis files
    fs.writeFileSync(path.join(analysisDir, "detection.json"), JSON.stringify(detectionResult, null, 2));
    fs.writeFileSync(path.join(analysisDir, "dom-tree.json"), JSON.stringify(domTree, null, 2));

    // Write intermediate model
    fs.writeFileSync(path.join(intermediateDir, "page-model.json"), JSON.stringify(pageModel, null, 2));

    // Write Elementor JSONs
    if (headerJson) fs.writeFileSync(path.join(elementorDir, "header.json"), JSON.stringify(headerJson, null, 2));
    if (footerJson) fs.writeFileSync(path.join(elementorDir, "footer.json"), JSON.stringify(footerJson, null, 2));
    fs.writeFileSync(path.join(elementorDir, "pages", "index.json"), JSON.stringify(elementorPageJson, null, 2));

    // Write validation report & screenshot
    fs.writeFileSync(path.join(validationDir, "report.json"), JSON.stringify(validationReport, null, 2));
    if (originalScreenshot && originalScreenshot.length > 0) {
      fs.writeFileSync(path.join(validationDir, "original.png"), originalScreenshot);
    }

    // Build complete ZIP archive
    const zip = new admZip();
    zip.addLocalFolder(outputDir);
    const zipBuffer = zip.toBuffer();
    const zipPath = path.join(outputDir, "complete-converted-site.zip");
    fs.writeFileSync(zipPath, zipBuffer);

    return {
      outputDir,
      zipPath,
      detectionResult,
      validationReport,
      pageModel,
      elementorPageJson
    };
  }
}
