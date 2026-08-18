/**
 * Section Detector - Classifies DOM containers into semantic website sections
 */
export class SectionDetector {
  /**
   * Identifies section type based on semantic tags, IDs, class names, text content, & position
   * @param {Object} visualNode 
   * @param {number} sectionIndex 
   * @returns {string} sectionType
   */
  static classifySection(visualNode, sectionIndex = 0) {
    if (!visualNode) return "content";

    const tag = (visualNode.tag || "").toLowerCase();
    const className = (visualNode.className || "").toLowerCase();
    const id = (visualNode.attributes?.id || "").toLowerCase();
    const text = (visualNode.text || "").toLowerCase();

    const combinedStr = `${tag} ${className} ${id}`;

    if (tag === "header" || combinedStr.includes("header") || combinedStr.includes("navbar") || combinedStr.includes("topbar")) {
      return "header";
    }
    if (tag === "footer" || combinedStr.includes("footer") || combinedStr.includes("copyright")) {
      return "footer";
    }
    if (sectionIndex === 0 || combinedStr.includes("hero") || combinedStr.includes("banner") || combinedStr.includes("intro") || combinedStr.includes("jumbotron")) {
      return "hero";
    }
    if (combinedStr.includes("service") || combinedStr.includes("what-we-do")) {
      return "services";
    }
    if (combinedStr.includes("feature") || combinedStr.includes("benefit")) {
      return "features";
    }
    if (combinedStr.includes("testimonial") || combinedStr.includes("review") || combinedStr.includes("quote")) {
      return "testimonials";
    }
    if (combinedStr.includes("pricing") || combinedStr.includes("plan") || combinedStr.includes("tier")) {
      return "pricing";
    }
    if (combinedStr.includes("team") || combinedStr.includes("member") || combinedStr.includes("staff")) {
      return "team";
    }
    if (combinedStr.includes("faq") || combinedStr.includes("question") || combinedStr.includes("accordion")) {
      return "faq";
    }
    if (combinedStr.includes("cta") || combinedStr.includes("call-to-action") || combinedStr.includes("contact") || combinedStr.includes("get-in-touch")) {
      return "cta";
    }
    if (combinedStr.includes("gallery") || combinedStr.includes("portfolio") || combinedStr.includes("work")) {
      return "gallery";
    }

    return "content";
  }
}
