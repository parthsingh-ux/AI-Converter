/**
 * ZIP Adapter - Unpacks ZIP website archives
 */
import admZip from "adm-zip";
import path from "path";
import { BaseBundleAdapter } from "./baseAdapter.js";
import { createUnpackedWebsite } from "../../types/schemas.js";

export class ZipAdapter extends BaseBundleAdapter {
  constructor() {
    super("ZipAdapter");
  }

  async unpack(inputPath, detectionResult) {
    const zip = new admZip(inputPath);
    const zipEntries = zip.getEntries();
    const virtualFiles = new Map();
    let entryHtmlFile = "index.html";

    // Detect common root folder inside zip (e.g. dist/ or site/)
    let prefix = "";
    const htmlEntries = zipEntries.filter(e => !e.isDirectory && e.entryName.toLowerCase().endsWith(".html"));
    if (htmlEntries.length > 0) {
      const topHtml = htmlEntries[0].entryName;
      if (topHtml.includes("/")) {
        const parts = topHtml.split("/");
        if (parts.length > 1 && parts[parts.length - 1].toLowerCase().endsWith(".html")) {
          // Check if all files share the same root folder
          const firstFolder = parts[0];
          if (zipEntries.every(e => e.entryName.startsWith(firstFolder + "/"))) {
            prefix = firstFolder + "/";
          }
        }
      }
    }

    const htmlFiles = [];
    const cssFiles = [];
    const jsFiles = [];
    const assetFiles = [];

    for (const entry of zipEntries) {
      if (entry.isDirectory) continue;
      
      let normPath = entry.entryName;
      if (prefix && normPath.startsWith(prefix)) {
        normPath = normPath.substring(prefix.length);
      }
      if (!normPath) continue;

      const buffer = entry.getData();
      virtualFiles.set(normPath, buffer);

      const lower = normPath.toLowerCase();
      if (lower.endsWith(".html") || lower.endsWith(".htm")) htmlFiles.push(normPath);
      else if (lower.endsWith(".css")) cssFiles.push(normPath);
      else if (lower.endsWith(".js")) jsFiles.push(normPath);
      else assetFiles.push(normPath);
    }

    if (htmlFiles.length > 0) {
      entryHtmlFile = htmlFiles.find(f => path.basename(f).toLowerCase() === "index.html") || htmlFiles[0];
    }

    return createUnpackedWebsite({
      entryHtmlFile,
      htmlFiles,
      cssFiles,
      jsFiles,
      assetFiles,
      virtualFiles
    });
  }
}
