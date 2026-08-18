/**
 * Asset Resolver - Normalizes assets into standardized paths
 */
import path from "path";
import { Base64Extractor } from "./base64Extractor.js";

export class AssetResolver {
  /**
   * Resolves and normalizes assets from unpacked virtual files
   * @param {import("../../types/schemas.js").UnpackedWebsite} unpacked 
   * @returns {Promise<{ normalizedFiles: Map<string, Buffer | string>, assetMap: Array<{ original: string, normalized: string }> }>}
   */
  async resolve(unpacked) {
    const normalizedFiles = new Map();
    const assetMap = [];
    const mappingDict = new Map();

    let imageCounter = 0;
    let fontCounter = 0;
    let iconCounter = 0;

    for (const [filePath, content] of unpacked.virtualFiles.entries()) {
      if (filePath.startsWith("assets/")) {
        // Already normalized or extracted virtual asset
        normalizedFiles.set(filePath, content);
        continue;
      }

      const lower = filePath.toLowerCase();
      if (/\.(png|jpe?g|gif|webp|avif|ico)$/i.test(lower)) {
        imageCounter++;
        const ext = path.extname(filePath).slice(1) || "png";
        const normPath = `assets/images/image-${String(imageCounter).padStart(3, "0")}.${ext}`;
        normalizedFiles.set(normPath, content);
        assetMap.push({ original: filePath, normalized: normPath });
        mappingDict.set(filePath, normPath);
      } else if (/\.(woff2?|ttf|otf|eot)$/i.test(lower)) {
        fontCounter++;
        const ext = path.extname(filePath).slice(1) || "woff2";
        const normPath = `assets/fonts/font-${String(fontCounter).padStart(3, "0")}.${ext}`;
        normalizedFiles.set(normPath, content);
        assetMap.push({ original: filePath, normalized: normPath });
        mappingDict.set(filePath, normPath);
      } else if (lower.endsWith(".svg")) {
        iconCounter++;
        const normPath = `assets/icons/icon-${String(iconCounter).padStart(3, "0")}.svg`;
        normalizedFiles.set(normPath, content);
        assetMap.push({ original: filePath, normalized: normPath });
        mappingDict.set(filePath, normPath);
      } else {
        // Keep non-asset files (HTML, CSS, JS, JSON) as is
        normalizedFiles.set(filePath, content);
      }
    }

    return { normalizedFiles, assetMap, mappingDict };
  }
}
