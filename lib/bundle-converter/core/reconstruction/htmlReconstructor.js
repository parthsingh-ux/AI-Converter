/**
 * Clean HTML Reconstructor & Document Structure Separator
 */
import * as cheerio from "cheerio";

export class HtmlReconstructor {
  /**
   * Reconstructs clean HTML structure separated from inline CSS/JS
   * @param {string} rawHtml 
   * @returns {{ cleanHtml: string, extractedCss: string, extractedJs: string }}
   */
  reconstruct(rawHtml) {
    const $ = cheerio.load(rawHtml);
    let extractedCss = "";
    let extractedJs = "";

    // 1. Extract inline <style> tags
    $("style").each((idx, el) => {
      extractedCss += $(el).text() + "\n\n";
      $(el).remove();
    });

    // 2. Extract inline <script> tags without src (ignoring type="application/json" or template data)
    $("script").each((idx, el) => {
      const src = $(el).attr("src");
      const type = $(el).attr("type");
      if (!src && (!type || type.includes("javascript") || type.includes("ecmascript"))) {
        const scriptContent = $(el).text().trim();
        if (scriptContent.length > 0) {
          extractedJs += scriptContent + "\n;\n";
        }
        $(el).remove();
      }
    });

    // Ensure essential head tags exist
    if ($("head").length === 0) {
      $("html").prepend("<head></head>");
    }
    if ($("meta[name='viewport']").length === 0) {
      $("head").append('  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n');
    }

    // Ensure CSS link exists
    if (extractedCss.trim().length > 0 && $("link[href*='style.css']").length === 0) {
      $("head").append('  <link rel="stylesheet" href="css/style.css">\n');
    }

    // Ensure JS script exists
    if (extractedJs.trim().length > 0 && $("script[src*='main.js']").length === 0) {
      if ($("body").length > 0) {
        $("body").append('  <script src="js/main.js"></script>\n');
      } else {
        $("html").append('  <script src="js/main.js"></script>\n');
      }
    }

    const cleanHtml = $.html();
    return { cleanHtml, extractedCss, extractedJs };
  }
}
