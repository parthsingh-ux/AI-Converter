/**
 * Vite Adapter - Unpacks Vite production builds
 */
import { GenericHTMLAdapter } from "./genericHtmlAdapter.js";

export class ViteAdapter extends GenericHTMLAdapter {
  constructor() {
    super();
    this.name = "ViteAdapter";
  }
}
