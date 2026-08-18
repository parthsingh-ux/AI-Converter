/**
 * Base Adapter Interface for Universal Website Bundles
 */
export class BaseBundleAdapter {
  constructor(name) {
    this.name = name;
  }

  /**
   * Evaluates if adapter matches input
   * @param {import("../analyzer/inputAnalyzer.js").InputAnalyzer} analyzer 
   * @param {import("../../types/schemas.js").DetectionResult} detectionResult 
   * @returns {boolean}
   */
  supports(detectionResult) {
    return detectionResult.adapterName === this.name;
  }

  /**
   * Unpacks and normalizes website structure
   * @param {string} inputPath 
   * @param {import("../../types/schemas.js").DetectionResult} detectionResult 
   * @returns {Promise<import("../../types/schemas.js").UnpackedWebsite>}
   */
  async unpack(inputPath, detectionResult) {
    throw new Error(`unpack method not implemented in ${this.name}`);
  }
}
