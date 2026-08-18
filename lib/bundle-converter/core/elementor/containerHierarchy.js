/**
 * Container Hierarchy - Builds Elementor Flexbox Container hierarchy
 */
import { generateRandomId } from "../../types/schemas.js";
import { WidgetMappers } from "./widgetMappers.js";
import { PixelFidelityEngine } from "./pixelFidelity.js";

export class ContainerHierarchy {
  /**
   * Translates a section object into a root Elementor Container
   * @param {Object} section 
   * @returns {Object} elementorContainer
   */
  static buildSectionContainer(section) {
    const containerId = generateRandomId();
    const isRow = section.layout?.direction === "row";
    const styles = PixelFidelityEngine.extractElementorSettings(section.computed);

    const childElements = [];

    if (section.children && section.children.length > 0) {
      if (isRow) {
        // Create sub-containers for columns in row layout
        section.children.forEach((childNode) => {
          const colId = generateRandomId();
          const colStyles = PixelFidelityEngine.extractElementorSettings(childNode.computed);
          const colWidgets = this._convertNodeTreeToElements(childNode);

          childElements.push({
            id: colId,
            elType: "container",
            isInner: true,
            settings: {
              flex_direction: "column",
              flex_wrap: "nowrap",
              width: { unit: "%", size: Math.round(100 / section.children.length), sizes: [] },
              ...colStyles
            },
            elements: colWidgets
          });
        });
      } else {
        // Direct stacked elements or inner containers
        section.children.forEach(childNode => {
          const converted = this._convertNodeToElement(childNode);
          if (converted) childElements.push(converted);
        });
      }
    }

    return {
      id: containerId,
      elType: "container",
      isInner: false,
      settings: {
        flex_direction: isRow ? "row" : "column",
        flex_wrap: isRow ? "wrap" : "nowrap",
        content_width: "boxed",
        ...styles
      },
      elements: childElements
    };
  }

  static _convertNodeToElement(node) {
    if (!node) return null;
    if (node.children && node.children.length > 0 && !["p", "button", "a", "h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tag)) {
      const containerId = generateRandomId();
      const styles = PixelFidelityEngine.extractElementorSettings(node.computed);
      const isRow = (node.computed?.display || "").includes("flex") && (node.computed?.flexDirection || "").includes("row");

      const innerElements = [];
      node.children.forEach(child => {
        const el = this._convertNodeToElement(child);
        if (el) innerElements.push(el);
      });

      return {
        id: containerId,
        elType: "container",
        isInner: true,
        settings: {
          flex_direction: isRow ? "row" : "column",
          ...styles
        },
        elements: innerElements
      };
    }

    return WidgetMappers.mapNodeToWidget(node);
  }

  static _convertNodeTreeToElements(node) {
    const elements = [];
    const mainWidget = WidgetMappers.mapNodeToWidget(node);
    if (mainWidget) elements.push(mainWidget);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        const el = this._convertNodeToElement(child);
        if (el) elements.push(el);
      });
    }

    return elements;
  }
}
