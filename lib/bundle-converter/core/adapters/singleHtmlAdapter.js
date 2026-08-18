/**
 * Single HTML Adapter - Unpacks self-contained single HTML files
 */
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { BaseBundleAdapter } from "./baseAdapter.js";
import { createUnpackedWebsite } from "../../types/schemas.js";

export class SingleHTMLAdapter extends BaseBundleAdapter {
  constructor() {
    super("SingleHTMLAdapter");
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
    let cssContent = "";
    let jsContent = "";
    let imageCounter = 0;
    let fontCounter = 0;

    // 1. Extract inline <style> blocks
    $("style").each((idx, el) => {
      const styleText = $(el).text();
      cssContent += `/* Extracted Style Block ${idx + 1} */\n` + styleText + "\n\n";
      $(el).remove();
    });

    // Extract inline base64 images inside CSS content
    cssContent = cssContent.replace(/url\(\s*['"]?(data:image\/([a-zA-Z0-9+-]+);base64,([^'"]+))['"]?\s*\)/gi, (match, dataUrl, ext, base64Data) => {
      imageCounter++;
      let cleanExt = ext === "svg+xml" ? "svg" : ext;
      const fileName = `assets/images/css-img-${imageCounter}.${cleanExt}`;
      try {
        const buffer = Buffer.from(base64Data, "base64");
        virtualFiles.set(fileName, buffer);
        return `url("../${fileName}")`;
      } catch (err) {
        return match;
      }
    });

    // 2. Extract Base64 images inside <img> src
    $("img").each((idx, el) => {
      const src = $(el).attr("src") || "";
      if (src.startsWith("data:image/")) {
        imageCounter++;
        const match = src.match(/^data:image\/([a-zA-Z0-9+-]+);base64,(.+)$/);
        if (match) {
          let ext = match[1] === "svg+xml" ? "svg" : match[1];
          const fileName = `assets/images/img-${imageCounter}.${ext}`;
          try {
            const buffer = Buffer.from(match[2], "base64");
            virtualFiles.set(fileName, buffer);
            $(el).attr("src", fileName);
          } catch (e) {}
        }
      }
    });

    // 3. Extract inline <script> blocks (excluding external src)
    $("script").each((idx, el) => {
      const src = $(el).attr("src");
      if (!src) {
        const scriptText = $(el).text();
        if (scriptText.trim().length > 0) {
          jsContent += `/* Extracted Script Block ${idx + 1} */\n` + scriptText + "\n;\n";
        }
        $(el).remove();
      }
    });

    // Link reconstructed CSS and JS files cleanly into HTML head/body
    if (cssContent.trim().length > 0) {
      virtualFiles.set("css/style.css", cssContent);
      $("head").append('  <link rel="stylesheet" href="css/style.css">\n');
    }
    if (jsContent.trim().length > 0) {
      virtualFiles.set("js/main.js", jsContent);
      $("body").append('  <script src="js/main.js"></script>\n');
    }

    const reconstructedHtml = $.html();
    virtualFiles.set("index.html", reconstructedHtml);

    return createUnpackedWebsite({
      entryHtmlFile: "index.html",
      htmlFiles: ["index.html"],
      cssFiles: cssContent ? ["css/style.css"] : [],
      jsFiles: jsContent ? ["js/main.js"] : [],
      assetFiles: Array.from(virtualFiles.keys()).filter(k => k.startsWith("assets/")),
      virtualFiles,
      metadata: {
        extractedImagesCount: imageCounter,
        extractedFontsCount: fontCounter
      }
    });
  }
}
