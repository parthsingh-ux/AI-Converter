/**
 * Custom Bundle Adapter - Unpacks single HTML files with embedded runtime loaders, templates, & manifests
 */
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { BaseBundleAdapter } from "./baseAdapter.js";
import { createUnpackedWebsite } from "../../types/schemas.js";

export class CustomBundleAdapter extends BaseBundleAdapter {
  constructor() {
    super("CustomBundleAdapter");
  }

  async unpack(inputPath, detectionResult) {
    let rawHtml = "";
    if (fs.statSync(inputPath).isFile()) {
      rawHtml = fs.readFileSync(inputPath, "utf-8");
    } else {
      const entryFile = path.join(inputPath, detectionResult.entryPoint || "index.html");
      rawHtml = fs.readFileSync(entryFile, "utf-8");
    }

    const $ = cheerio.load(rawHtml);
    const virtualFiles = new Map();
    let extractedHtml = "";
    let extractedCss = "";
    let extractedJs = "";
    let manifestData = null;

    // Check for script tag containing __bundler/manifest or JSON manifest
    $("script").each((idx, el) => {
      const text = $(el).text();
      if (text.includes("__bundler/manifest") || text.includes("manifest")) {
        const manifestMatch = text.match(/window\.__bundler_manifest\s*=\s*({[\s\S]+?});/) ||
                              text.match(/const manifest\s*=\s*({[\s\S]+?});/) ||
                              text.match(/({"files"[\s\S]+?})/);
        if (manifestMatch) {
          try {
            manifestData = JSON.parse(manifestMatch[1]);
          } catch (e) {}
        }
      }

      // Extract Base64 blob resources or template content
      if (text.includes("data:text/javascript;base64,") || text.includes("data:text/css;base64,")) {
        const cssMatches = text.matchAll(/data:text\/css;base64,([a-zA-Z0-9+/=]+)/g);
        for (const match of cssMatches) {
          try {
            extractedCss += Buffer.from(match[1], "base64").toString("utf-8") + "\n";
          } catch (e) {}
        }

        const jsMatches = text.matchAll(/data:text\/javascript;base64,([a-zA-Z0-9+/=]+)/g);
        for (const match of jsMatches) {
          try {
            extractedJs += Buffer.from(match[1], "base64").toString("utf-8") + "\n;\n";
          } catch (e) {}
        }
      }
    });

    // Check if DOM template or inner body contains rendered layout
    $("style").each((idx, el) => {
      extractedCss += $(el).text() + "\n";
      $(el).remove();
    });

    // Strip out bundler runtime scripts while keeping page content
    $("script").each((idx, el) => {
      const text = $(el).text();
      if (text.includes("Blob") && text.includes("createObjectURL") && text.includes("window.__bundler")) {
        $(el).remove();
      }
    });

    // Clean body
    extractedHtml = $.html();

    if (extractedCss.trim().length > 0) {
      virtualFiles.set("css/style.css", extractedCss);
    }
    if (extractedJs.trim().length > 0) {
      virtualFiles.set("js/main.js", extractedJs);
    }
    virtualFiles.set("index.html", extractedHtml);

    return createUnpackedWebsite({
      entryHtmlFile: "index.html",
      htmlFiles: ["index.html"],
      cssFiles: extractedCss ? ["css/style.css"] : [],
      jsFiles: extractedJs ? ["js/main.js"] : [],
      assetFiles: Array.from(virtualFiles.keys()).filter(k => k.startsWith("assets/")),
      virtualFiles,
      manifest: manifestData
    });
  }
}
