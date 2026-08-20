import fs from "fs/promises";
import path from "path";
import { chromium } from "playwright";

/**
 * 1. INTRINSIC IMAGE DIMENSION EXTRACTOR
 * Programmatically parses image buffer headers to extract intrinsic width, height, and aspect ratio.
 */
export function extractIntrinsicDimensions(buffer, mimeType = "") {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    return { width: null, height: null, aspectRatio: null };
  }

  try {
    // 1. PNG Header (Bytes 16-23: Width and Height 4-byte big-endian integers)
    if (buffer.length >= 24 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      return { width, height, aspectRatio: parseFloat((width / height).toFixed(4)), format: "png" };
    }

    // 2. JPEG Header
    if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
      let offset = 2;
      while (offset < buffer.length) {
        const marker = buffer.readUInt16BE(offset);
        offset += 2;
        if (marker >= 0xffc0 && marker <= 0xffc3) {
          const height = buffer.readUInt16BE(offset + 3);
          const width = buffer.readUInt16BE(offset + 5);
          return { width, height, aspectRatio: parseFloat((width / height).toFixed(4)), format: "jpg" };
        } else {
          const length = buffer.readUInt16BE(offset);
          offset += length;
        }
      }
    }

    // 3. GIF Header (Bytes 6-9: Width and Height 2-byte little-endian integers)
    if (buffer.length >= 10 && buffer.toString("ascii", 0, 3) === "GIF") {
      const width = buffer.readUInt16LE(6);
      const height = buffer.readUInt16LE(8);
      return { width, height, aspectRatio: parseFloat((width / height).toFixed(4)), format: "gif" };
    }

    // 4. WEBP Header (Bytes 12-30)
    if (buffer.length >= 30 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") {
      const vp8 = buffer.toString("ascii", 12, 16);
      if (vp8 === "VP8 ") {
        const width = buffer.readUInt16LE(26) & 0x3fff;
        const height = buffer.readUInt16LE(28) & 0x3fff;
        return { width, height, aspectRatio: parseFloat((width / height).toFixed(4)), format: "webp" };
      } else if (vp8 === "VP8L") {
        const b0 = buffer[21];
        const b1 = buffer[22];
        const b2 = buffer[23];
        const b3 = buffer[24];
        const width = 1 + (((b1 & 0x3f) << 8) | b0);
        const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
        return { width, height, aspectRatio: parseFloat((width / height).toFixed(4)), format: "webp" };
      }
    }

    // 5. SVG Header
    if (mimeType.includes("svg") || buffer.toString("utf-8", 0, 100).includes("<svg")) {
      const svgStr = buffer.toString("utf-8");
      const wMatch = svgStr.match(/width=["'](\d+(?:\.\d+)?)(?:px)?["']/i);
      const hMatch = svgStr.match(/height=["'](\d+(?:\.\d+)?)(?:px)?["']/i);
      const vbMatch = svgStr.match(/viewBox=["']\s*\d+\s+\d+\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*["']/i);

      let width = wMatch ? parseFloat(wMatch[1]) : vbMatch ? parseFloat(vbMatch[1]) : 800;
      let height = hMatch ? parseFloat(hMatch[1]) : vbMatch ? parseFloat(vbMatch[2]) : 600;
      return { width, height, aspectRatio: parseFloat((width / height).toFixed(4)), format: "svg" };
    }
  } catch (err) {
    console.warn("[Intrinsic Dimension Warning]:", err.message);
  }

  return { width: null, height: null, aspectRatio: null };
}

/**
 * 2. BROWSER-RENDERED IMAGE ANALYSIS PIPELINE
 * Renders the original HTML/CSS page across Desktop, Tablet, and Mobile viewports using Playwright.
 * Programmatically extracts exact boundingClientRect, computed styles, container hierarchy, and object-fit/position.
 */
export async function analyzePageImagesWithBrowser({ htmlContent = "", cssContent = "", assets = [] }) {
  let browser = null;
  const imageAnalysisMap = {};

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const fullDoc = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${cssContent}</style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;

    await page.setContent(fullDoc, { waitUntil: "networkidle" });

    // Wait for images and fonts stabilization
    await page.evaluate(async () => {
      if (document.fonts) await document.fonts.ready;

      const imgs = Array.from(document.querySelectorAll("img"));
      await Promise.all(
        imgs.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) return resolve();
              img.addEventListener("load", resolve);
              img.addEventListener("error", resolve);
            })
        )
      );
    });

    const viewports = [
      { name: "desktop", width: 1440, height: 900 },
      { name: "tablet", width: 1024, height: 768 },
      { name: "mobile", width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200); // Layout stabilization

      const viewportImages = await page.evaluate((vpName) => {
        const results = [];
        const elements = Array.from(document.querySelectorAll("img, svg, [style*='background-image']"));

        elements.forEach((el, index) => {
          const rect = el.getBoundingClientRect();
          const comp = window.getComputedStyle(el);

          const parent = el.parentElement;
          const parentRect = parent ? parent.getBoundingClientRect() : null;
          const parentComp = parent ? window.getComputedStyle(parent) : null;

          const grandParent = parent ? parent.parentElement : null;
          const grandParentRect = grandParent ? grandParent.getBoundingClientRect() : null;

          let src = el.src || el.getAttribute("src") || "";
          if (!src && comp.backgroundImage && comp.backgroundImage !== "none") {
            const bgMatch = comp.backgroundImage.match(/url\(["']?([^"']+)["']?\)/i);
            if (bgMatch) src = bgMatch[1];
          }

          results.push({
            assetId: `img-${index + 1}`,
            src,
            tagName: el.tagName.toLowerCase(),
            viewport: vpName,
            rendered: {
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              aspectRatio: rect.height > 0 ? parseFloat((rect.width / rect.height).toFixed(4)) : null,
            },
            computed: {
              width: comp.width,
              height: comp.height,
              maxWidth: comp.maxWidth,
              maxHeight: comp.maxHeight,
              objectFit: comp.objectFit || "cover",
              objectPosition: comp.objectPosition || "center center",
              display: comp.display,
              position: comp.position,
              margin: comp.margin,
              padding: comp.padding,
              transform: comp.transform !== "none" ? comp.transform : null,
            },
            container: parentRect
              ? {
                  width: Math.round(parentRect.width),
                  height: Math.round(parentRect.height),
                  padding: parentComp?.padding || "0px",
                  margin: parentComp?.margin || "0px",
                  display: parentComp?.display || "flex",
                }
              : null,
            grandContainer: grandParentRect
              ? {
                  width: Math.round(grandParentRect.width),
                  height: Math.round(grandParentRect.height),
                }
              : null,
          });
        });

        return results;
      }, vp.name);

      viewportImages.forEach((imgData) => {
        const key = imgData.src || imgData.assetId;
        if (!imageAnalysisMap[key]) {
          imageAnalysisMap[key] = {
            assetId: imgData.assetId,
            source: imgData.src,
            tagName: imgData.tagName,
            viewports: {},
          };
        }
        imageAnalysisMap[key].viewports[vp.name] = {
          rendered: imgData.rendered,
          computed: imgData.computed,
          container: imgData.container,
          grandContainer: imgData.grandContainer,
        };
      });
    }
  } catch (err) {
    console.warn("[Browser Image Analysis Notice]:", err.message);
  } finally {
    if (browser) await browser.close().catch(() => {});
  }

  return imageAnalysisMap;
}
