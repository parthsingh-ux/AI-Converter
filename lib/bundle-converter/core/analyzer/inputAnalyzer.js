/**
 * Universal Website Input Analyzer
 */
import fs from "fs";
import path from "path";
import admZip from "adm-zip";
import { createDetectionResult } from "../../types/schemas.js";
import { runHeuristicRules } from "./heuristics.js";

export class InputAnalyzer {
  /**
   * Analyzes an input path (directory, zip, or HTML file)
   * @param {string} inputPath 
   * @returns {Promise<import("../../types/schemas.js").DetectionResult>}
   */
  async analyze(inputPath) {
    if (!fs.existsSync(inputPath)) {
      throw new Error(`Input path does not exist: ${inputPath}`);
    }

    const stats = fs.statSync(inputPath);
    let isZipFile = false;
    let files = [];
    let fileContents = new Map();
    let entryPoint = "index.html";

    if (stats.isFile()) {
      if (inputPath.endsWith(".zip")) {
        isZipFile = true;
        try {
          const zip = new admZip(inputPath);
          const zipEntries = zip.getEntries();
          files = zipEntries.map(e => e.entryName);
          for (const entry of zipEntries) {
            if (!entry.isDirectory && (entry.entryName.endsWith(".html") || entry.entryName.endsWith(".js") || entry.entryName.endsWith(".json"))) {
              if (entry.getData().length < 500000) { // Limit snippet read
                fileContents.set(entry.entryName, entry.getData().toString("utf-8"));
              }
            }
          }
        } catch (err) {
          console.warn(`Failed to inspect ZIP file: ${err.message}`);
        }
      } else if (inputPath.endsWith(".html") || inputPath.endsWith(".htm")) {
        files = [path.basename(inputPath)];
        entryPoint = path.basename(inputPath);
        const content = fs.readFileSync(inputPath, "utf-8");
        fileContents.set(entryPoint, content);
      }
    } else if (stats.isDirectory()) {
      files = this._scanDirRecursively(inputPath, inputPath);
      for (const relFile of files) {
        if (relFile.endsWith(".html") || relFile.endsWith(".js") || relFile.endsWith(".json") || relFile.endsWith(".css")) {
          const fullPath = path.join(inputPath, relFile);
          try {
            if (fs.statSync(fullPath).size < 1000000) {
              fileContents.set(relFile, fs.readFileSync(fullPath, "utf-8"));
            }
          } catch (e) {
            // Ignore unreadable files
          }
        }
      }
    }

    let htmlCount = 0, cssCount = 0, jsCount = 0, images = 0, fonts = 0, videos = 0, svg = 0;
    let hasSourceMaps = false, hasPackageJson = false, hasManifest = false;

    for (const f of files) {
      const lower = f.toLowerCase();
      if (lower.endsWith(".html") || lower.endsWith(".htm")) htmlCount++;
      else if (lower.endsWith(".css")) cssCount++;
      else if (lower.endsWith(".js")) jsCount++;
      else if (/\.(png|jpe?g|gif|webp|avif|ico)$/i.test(lower)) images++;
      else if (/\.(woff2?|ttf|otf|eot)$/i.test(lower)) fonts++;
      else if (/\.(mp4|webm|ogg)$/i.test(lower)) videos++;
      else if (lower.endsWith(".svg")) svg++;
      
      if (lower.endsWith(".map")) hasSourceMaps = true;
      if (lower.endsWith("package.json")) hasPackageJson = true;
      if (lower.includes("manifest")) hasManifest = true;
    }

    // Determine entry HTML file score candidate
    const htmlCandidates = files.filter(f => f.toLowerCase().endsWith(".html"));
    if (htmlCandidates.length > 0) {
      const scored = htmlCandidates.map(f => {
        let score = 0;
        const name = path.basename(f).toLowerCase();
        if (name === "index.html") score += 100;
        else if (name === "main.html") score += 80;
        else if (name === "home.html") score += 70;
        else score += 10;
        return { file: f, score };
      });
      scored.sort((a, b) => b.score - a.score);
      entryPoint = scored[0].file;
    }

    const context = {
      isZipFile,
      files,
      fileContents,
      htmlCount,
      cssCount,
      jsCount,
      images,
      fonts,
      videos,
      svg,
      hasSourceMaps,
      hasPackageJson,
      hasManifest
    };

    const heuristicMatch = runHeuristicRules(context);

    return createDetectionResult({
      inputType: heuristicMatch.inputType,
      framework: heuristicMatch.framework,
      bundler: heuristicMatch.bundler,
      entryPoint,
      htmlFiles: htmlCount,
      cssFiles: cssCount,
      jsFiles: jsCount,
      images,
      fonts,
      videos,
      svg,
      hasSourceMaps,
      hasPackageJson,
      hasManifest,
      confidence: Math.round(heuristicMatch.confidence * 100) / 100,
      adapterName: heuristicMatch.adapterName,
      details: {
        totalFilesScanned: files.length,
        isZip: isZipFile
      }
    });
  }

  _scanDirRecursively(dir, rootDir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative(rootDir, fullPath);
      if (entry.isDirectory()) {
        if (entry.name !== "node_modules" && entry.name !== ".git") {
          results = results.concat(this._scanDirRecursively(fullPath, rootDir));
        }
      } else {
        results.push(relPath);
      }
    }
    return results;
  }
}
