/**
 * In-Browser DOM and Computed CSS Style Extractor Script
 * Executed via Playwright page.evaluate()
 */

export function extractDomAndStylesScript() {
  function getComputedStylesObj(element) {
    const cs = window.getComputedStyle(element);
    return {
      display: cs.display,
      position: cs.position,
      width: cs.width,
      height: cs.height,
      minWidth: cs.minWidth,
      maxWidth: cs.maxWidth,
      minHeight: cs.minHeight,
      maxHeight: cs.maxHeight,
      marginTop: cs.marginTop,
      marginRight: cs.marginRight,
      marginBottom: cs.marginBottom,
      marginLeft: cs.marginLeft,
      paddingTop: cs.paddingTop,
      paddingRight: cs.paddingRight,
      paddingBottom: cs.paddingBottom,
      paddingLeft: cs.paddingLeft,
      gap: cs.gap,
      flexDirection: cs.flexDirection,
      flexWrap: cs.flexWrap,
      justifyContent: cs.justifyContent,
      alignItems: cs.alignItems,
      gridTemplateColumns: cs.gridTemplateColumns,
      gridTemplateRows: cs.gridTemplateRows,
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      fontStyle: cs.fontStyle,
      lineHeight: cs.lineHeight,
      textAlign: cs.textAlign,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      backgroundImage: cs.backgroundImage,
      borderTop: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
      borderRadius: cs.borderRadius,
      boxShadow: cs.boxShadow,
      opacity: cs.opacity,
      zIndex: cs.zIndex,
      overflow: cs.overflow,
      visibility: cs.visibility
    };
  }

  function walkElement(element, idCounter = { val: 0 }) {
    if (!element || element.nodeType !== 1) return null;
    const tag = element.tagName.toLowerCase();
    
    // Skip invisible/irrelevant tags
    if (["script", "style", "meta", "link", "head", "noscript", "svg", "path"].includes(tag) && tag !== "img") {
      if (tag === "svg") {
        const rect = element.getBoundingClientRect();
        return {
          id: `elem-${++idCounter.val}`,
          tag: "svg",
          className: element.className || "",
          text: "",
          attributes: { src: "" },
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          computed: getComputedStylesObj(element),
          children: []
        };
      }
      return null;
    }

    const rect = element.getBoundingClientRect();
    const computed = getComputedStylesObj(element);

    // Skip zero width/height elements unless they have visible children
    if (rect.width === 0 && rect.height === 0 && tag !== "body") {
      return null;
    }

    let textContent = "";
    // Get direct text content
    for (const child of element.childNodes) {
      if (child.nodeType === 3 && child.nodeValue.trim().length > 0) {
        textContent += child.nodeValue.trim() + " ";
      }
    }

    const attributes = {};
    if (element.id) attributes.id = element.id;
    if (element.href) attributes.href = element.getAttribute("href");
    if (element.src) attributes.src = element.getAttribute("src");
    if (element.alt) attributes.alt = element.getAttribute("alt");
    if (element.type) attributes.type = element.getAttribute("type");

    const children = [];
    for (const childEl of element.children) {
      const node = walkElement(childEl, idCounter);
      if (node) children.push(node);
    }

    return {
      id: `elem-${++idCounter.val}`,
      tag,
      className: typeof element.className === "string" ? element.className : "",
      text: textContent.trim(),
      attributes,
      rect: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      },
      computed,
      children
    };
  }

  const root = walkElement(document.body || document.documentElement);
  return root;
}
