/**
 * Elementor Generator - Generates Elementor 3.x+ JSON document schemas
 */
import { createElementorDocument } from "../../types/schemas.js";
import { ContainerHierarchy } from "./containerHierarchy.js";

export class ElementorGenerator {
  /**
   * Generates Elementor JSON document outputs from Normalized Page Model
   * @param {import("../../types/schemas.js").NormalizedPageModel} pageModel 
   * @returns {{ headerJson: Object | null, footerJson: Object | null, pageJson: Object }}
   */
  generate(pageModel) {
    const pageElements = [];

    // Process Page Body Sections
    if (pageModel.sections && pageModel.sections.length > 0) {
      pageModel.sections.forEach(section => {
        const container = ContainerHierarchy.buildSectionContainer(section);
        if (container) pageElements.push(container);
      });
    }

    const pageJson = createElementorDocument({
      title: pageModel.metadata?.title || "Converted Home Page",
      type: "page",
      elements: pageElements
    });

    // Process Global Header if present
    let headerJson = null;
    if (pageModel.headerSection) {
      const headerContainer = ContainerHierarchy.buildSectionContainer(pageModel.headerSection);
      headerJson = createElementorDocument({
        title: "Header",
        type: "header",
        elements: [headerContainer]
      });
    }

    // Process Global Footer if present
    let footerJson = null;
    if (pageModel.footerSection) {
      const footerContainer = ContainerHierarchy.buildSectionContainer(pageModel.footerSection);
      footerJson = createElementorDocument({
        title: "Footer",
        type: "footer",
        elements: [footerContainer]
      });
    }

    return { headerJson, footerJson, pageJson };
  }
}
