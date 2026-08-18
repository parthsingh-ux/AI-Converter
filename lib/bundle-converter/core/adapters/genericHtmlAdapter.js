/**
 * Generic HTML Adapter - Universal fallback adapter for static sites & directories
 */
import fs from "fs";
import path from "path";
import { BaseBundleAdapter } from "./baseAdapter.js";
import { createUnpackedWebsite } from "../../types/schemas.js";

export class GenericHTMLAdapter extends BaseBundleAdapter {
  constructor() {
    super("GenericHTMLAdapter");
  }

  async unpack(inputPath, detectionResult) {
    const virtualFiles = new Map();
    let stats;
    try {
      stats = fs.statSync(inputPath);
    } catch (e) {
      throw new Error(`Invalid input path: ${inputPath}`);
    }

    let rootDir = inputPath;
    if (stats.isFile()) {
      rootDir = path.dirname(inputPath);
    }

    const allFiles = this._readDirRecursive(rootDir, rootDir);
    const htmlFiles = [];
    const cssFiles = [];
    const jsFiles = [];
    const assetFiles = [];

    for (const relFile of allFiles) {
      const fullPath = path.join(rootDir, relFile);
      try {
        const buffer = fs.readFileSync(fullPath);
        virtualFiles.set(relFile, buffer);

        const lower = relFile.toLowerCase();
        if (lower.endsWith(".html") || lower.endsWith(".htm")) htmlFiles.push(relFile);
        else if (lower.endsWith(".css")) cssFiles.push(relFile);
        else if (lower.endsWith(".js")) jsFiles.push(relFile);
        else assetFiles.push(relFile);
      } catch (err) {}
    }

    let entryHtmlFile = detectionResult.entryPoint || "index.html";
    if (!virtualFiles.has(entryHtmlFile) && htmlFiles.length > 0) {
      entryHtmlFile = htmlFiles[0];
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

  _readDirRecursive(dir, rootDir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(rootDir, fullPath);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && entry.name !== ".git") {
          results = results.concat(this._readDirRecursive(fullPath, rootDir));
        }
      } else {
        results.push(relPath);
      }
    }
    return results;
  }
}
