/**
 * URL Rewriter for asset path normalization
 */
export class UrlRewriter {
  constructor(mappingTable = new Map()) {
    this.mappingTable = mappingTable;
  }

  /**
   * Rewrites asset paths in CSS content
   * @param {string} cssContent 
   * @returns {string}
   */
  rewriteCssUrls(cssContent) {
    return cssContent.replace(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g, (match, rawUrl) => {
      const trimmed = rawUrl.trim();
      if (this.mappingTable.has(trimmed)) {
        const norm = this.mappingTable.get(trimmed);
        return `url("../${norm}")`;
      }
      return match;
    });
  }

  /**
   * Rewrites attribute links in Cheerio DOM
   * @param {import("cheerio").CheerioAPI} $ 
   */
  rewriteHtmlAttributes($) {
    $("[src], [href]").each((idx, el) => {
      const src = $(el).attr("src");
      if (src && this.mappingTable.has(src)) {
        $(el).attr("src", this.mappingTable.get(src));
      }
      const href = $(el).attr("href");
      if (href && this.mappingTable.has(href)) {
        $(el).attr("href", this.mappingTable.get(href));
      }
    });
  }
}
