/**
 * Widget Mapper - Translates visual nodes into native Elementor Widgets
 */
import { generateRandomId } from "../../types/schemas.js";
import { PixelFidelityEngine } from "./pixelFidelity.js";

export class WidgetMappers {
  /**
   * Maps visual node to an Elementor Widget JSON object
   * @param {Object} node 
   * @returns {Object} elementorWidget
   */
  static mapNodeToWidget(node) {
    const tag = (node.tag || "").toLowerCase();
    const id = generateRandomId();
    const styles = PixelFidelityEngine.extractElementorSettings(node.computed);

    // 1. Heading Widget (h1, h2, h3, h4, h5, h6)
    if (/^h[1-6]$/.test(tag)) {
      return {
        id,
        elType: "widget",
        isInner: false,
        widgetType: "heading",
        settings: {
          title: node.text || "Heading",
          header_size: tag,
          ...styles
        },
        elements: []
      };
    }

    // 2. Image Widget (img)
    if (tag === "img") {
      const src = node.attributes?.src || "";
      return {
        id,
        elType: "widget",
        isInner: false,
        widgetType: "image",
        settings: {
          image: {
            url: src,
            id: ""
          },
          caption: node.attributes?.alt || "",
          ...styles
        },
        elements: []
      };
    }

    // 3. Button Widget (button, a.btn, input[type="submit"])
    if (tag === "button" || (tag === "a" && (node.className || "").includes("btn")) || node.attributes?.type === "submit") {
      return {
        id,
        elType: "widget",
        isInner: false,
        widgetType: "button",
        settings: {
          text: node.text || "Click Here",
          link: {
            url: node.attributes?.href || "#",
            is_external: false,
            nofollow: false
          },
          ...styles
        },
        elements: []
      };
    }

    // 4. Video Widget (video)
    if (tag === "video") {
      return {
        id,
        elType: "widget",
        isInner: false,
        widgetType: "video",
        settings: {
          video_type: "hosted",
          hosted_url: node.attributes?.src || "",
          ...styles
        },
        elements: []
      };
    }

    // 5. Text Editor Widget (p, span, default text)
    if (node.text && node.text.trim().length > 0) {
      return {
        id,
        elType: "widget",
        isInner: false,
        widgetType: "text-editor",
        settings: {
          editor: `<p>${node.text}</p>`,
          ...styles
        },
        elements: []
      };
    }

    // 6. SVG / Custom Fallback HTML Widget
    if (tag === "svg") {
      return {
        id,
        elType: "widget",
        isInner: false,
        widgetType: "html",
        settings: {
          html: `<svg class="${node.className || ''}" width="${node.rect.width}" height="${node.rect.height}"></svg>`,
          ...styles
        },
        elements: []
      };
    }

    // Default HTML widget fallback
    return {
      id,
      elType: "widget",
      isInner: false,
      widgetType: "html",
      settings: {
        html: `<div class="${node.className || ''}">${node.text || ''}</div>`,
        ...styles
      },
      elements: []
    };
  }
}
