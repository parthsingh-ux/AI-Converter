/**
 * Adapter Registry - Selects adapter for detected website bundle
 */
import { SingleHTMLAdapter } from "./singleHtmlAdapter.js";
import { ZipAdapter } from "./zipAdapter.js";
import { ViteAdapter } from "./viteAdapter.js";
import { WebpackAdapter } from "./webpackAdapter.js";
import { CustomBundleAdapter } from "./customBundleAdapter.js";
import { GenericHTMLAdapter } from "./genericHtmlAdapter.js";

export class AdapterRegistry {
  constructor() {
    this.adapters = [
      new SingleHTMLAdapter(),
      new ZipAdapter(),
      new CustomBundleAdapter(),
      new ViteAdapter(),
      new WebpackAdapter(),
      new GenericHTMLAdapter()
    ];
  }

  /**
   * Registers a new custom adapter
   * @param {import("./baseAdapter.js").BaseBundleAdapter} adapter 
   */
  register(adapter) {
    this.adapters.unshift(adapter);
  }

  /**
   * Resolves the best matching adapter for the given detection result
   * @param {import("../../types/schemas.js").DetectionResult} detectionResult 
   * @returns {import("./baseAdapter.js").BaseBundleAdapter}
   */
  getAdapter(detectionResult) {
    const matched = this.adapters.find(a => a.name === detectionResult.adapterName);
    if (matched) {
      return matched;
    }
    return this.adapters.find(a => a.name === "GenericHTMLAdapter");
  }
}
