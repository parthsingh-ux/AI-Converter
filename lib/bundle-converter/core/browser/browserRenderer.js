/**
 * Browser Renderer - Playwright Headless Rendering & Computed Style Extraction Engine
 */
import { chromium } from "playwright";
import http from "http";
import path from "path";
import mime from "mime-types";
import { extractDomAndStylesScript } from "./domExtractor.js";

export class BrowserRenderer {
  /**
   * Renders website virtual files using Playwright across multiple viewports
   * @param {Map<string, Buffer | string>} virtualFiles 
   * @param {string} entryHtmlFile 
   * @returns {Promise<{ domTree: any, screenshots: Map<string, Buffer> }>}
   */
  async renderAndExtract(virtualFiles, entryHtmlFile = "index.html") {
    // 1. Create temporary in-memory HTTP server to serve virtual files
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split("?")[0].replace(/^\//, "");
      if (!reqPath || reqPath === "") reqPath = entryHtmlFile;

      if (virtualFiles.has(reqPath)) {
        const content = virtualFiles.get(reqPath);
        const mimeType = mime.lookup(reqPath) || "text/html";
        res.writeHead(200, { "Content-Type": mimeType });
        res.end(typeof content === "string" ? Buffer.from(content) : content);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    });

    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
    const port = server.address().port;
    const targetUrl = `http://127.0.0.1:${port}/${entryHtmlFile}`;

    const screenshots = new Map();
    let domTree = null;

    let browser;
    try {
      browser = await chromium.launch({ headless: true });
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();

      // Navigate to reconstructed site
      await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(500);

      // Extract DOM + Computed CSS tree for Desktop (1440x900)
      domTree = await page.evaluate(extractDomAndStylesScript);

      // Capture desktop screenshot
      const desktopScreenshot = await page.screenshot({ fullPage: true });
      screenshots.set("desktop_1440", desktopScreenshot);

      // Mobile viewport screenshot & extraction
      await page.setViewportSize({ width: 390, height: 844 });
      await page.waitForTimeout(300);
      const mobileScreenshot = await page.screenshot({ fullPage: true });
      screenshots.set("mobile_390", mobileScreenshot);

      await context.close();
    } catch (err) {
      console.warn(`Playwright rendering notice: ${err.message}`);
    } finally {
      if (browser) await browser.close();
      server.close();
    }

    return { domTree, screenshots };
  }
}
