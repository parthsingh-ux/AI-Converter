/**
 * Base64 & Data URL Extractor
 */
import mime from "mime-types";

export class Base64Extractor {
  /**
   * Decodes data URLs to buffer and metadata
   * @param {string} dataUrl 
   * @returns {{ buffer: Buffer, mimeType: string, extension: string } | null}
   */
  static decodeDataUrl(dataUrl) {
    if (!dataUrl || !dataUrl.startsWith("data:")) return null;

    try {
      const parts = dataUrl.split(",");
      const meta = parts[0];
      const data = parts[1];
      const mimeMatch = meta.match(/data:([^;]+)/);
      const mimeType = mimeMatch ? mimeMatch[1] : "application/octet-stream";
      let extension = mime.extension(mimeType) || "bin";
      if (mimeType === "image/svg+xml") extension = "svg";

      const isBase64 = meta.includes(";base64");
      const buffer = isBase64 
        ? Buffer.from(data, "base64") 
        : Buffer.from(decodeURIComponent(data), "utf-8");

      return { buffer, mimeType, extension };
    } catch (e) {
      return null;
    }
  }
}
