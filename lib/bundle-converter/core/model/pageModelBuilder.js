/**
 * Page Model Builder - Constructs page-model.json from visual DOM tree
 */
import { createNormalizedPageModel } from "../../types/schemas.js";
import { SectionDetector } from "./sectionDetector.js";
import { SpatialAnalyzer } from "../browser/spatialAnalyzer.js";

export class PageModelBuilder {
  /**
   * Converts browser visual DOM tree into Normalized Page Model
   * @param {Object} domTree 
   * @param {Array} assetMap 
   * @returns {import("../../types/schemas.js").NormalizedPageModel}
   */
  build(domTree, assetMap = []) {
    const pageModel = createNormalizedPageModel();

    if (!domTree) {
      return pageModel;
    }

    // Top-level children of body are candidates for sections
    const topContainers = domTree.children && domTree.children.length > 0 ? domTree.children : [domTree];
    const sections = [];
    let headerSection = null;
    let footerSection = null;

    topContainers.forEach((container, idx) => {
      const type = SectionDetector.classifySection(container, idx);
      const layoutInfo = SpatialAnalyzer.analyzeLayoutDirection(container.children);

      const sectionObj = {
        id: container.id || `section-${idx + 1}`,
        type,
        rect: container.rect,
        computed: container.computed,
        layout: {
          direction: layoutInfo.direction,
          isMultiColumn: layoutInfo.isMultiColumn
        },
        children: container.children || []
      };

      if (type === "header" && !headerSection) {
        headerSection = sectionObj;
      } else if (type === "footer" && !footerSection) {
        footerSection = sectionObj;
      } else {
        sections.push(sectionObj);
      }
    });

    pageModel.sections = sections;
    pageModel.headerSection = headerSection;
    pageModel.footerSection = footerSection;
    pageModel.assets = assetMap;

    return pageModel;
  }
}
