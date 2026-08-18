/**
 * Webpack Adapter - Unpacks Webpack bundles
 */
import { GenericHTMLAdapter } from "./genericHtmlAdapter.js";

export class WebpackAdapter extends GenericHTMLAdapter {
  constructor() {
    super();
    this.name = "WebpackAdapter";
  }
}
