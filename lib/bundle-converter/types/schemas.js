/**
 * Universal Website Converter Data Schemas & Default Factories
 */

export function createDetectionResult(overrides = {}) {
  return {
    inputType: "unknown", // "single-html" | "zip" | "vite" | "webpack" | "react" | "vue" | "next" | "angular" | "custom-bundle" | "generic-html"
    framework: "none",
    bundler: "none",
    entryPoint: "index.html",
    htmlFiles: 0,
    cssFiles: 0,
    jsFiles: 0,
    images: 0,
    fonts: 0,
    videos: 0,
    svg: 0,
    hasSourceMaps: false,
    hasPackageJson: false,
    hasManifest: false,
    confidence: 0,
    adapterName: "GenericHTMLAdapter",
    details: {},
    ...overrides
  };
}

export function createUnpackedWebsite(overrides = {}) {
  return {
    entryHtmlFile: "index.html",
    htmlFiles: [], // Array of relative paths
    cssFiles: [],
    jsFiles: [],
    assetFiles: [],
    virtualFiles: new Map(), // relativePath -> string content or Buffer
    manifest: null,
    metadata: {},
    ...overrides
  };
}

export function createNormalizedPageModel(overrides = {}) {
  return {
    version: "1.0.0",
    metadata: {
      generatedAt: new Date().toISOString(),
      title: "",
      description: "",
      language: "en"
    },
    viewport: {
      width: 1440,
      height: 900
    },
    pages: [
      {
        route: "/",
        file: "index.html",
        title: "Home"
      }
    ],
    headerSection: null,
    footerSection: null,
    sections: [],
    assets: [],
    fonts: [],
    responsive: {
      breakpoints: {
        desktop: 1440,
        laptop: 1024,
        tablet: 768,
        mobile: 390
      }
    },
    interactions: [],
    warnings: [],
    ...overrides
  };
}

export function createElementorDocument(overrides = {}) {
  return {
    title: "Page",
    type: "page",
    version: "0.4",
    elements: [],
    settings: {
      post_title: "Converted Page",
      post_status: "publish",
      page_template: "elementor_canvas"
    },
    ...overrides
  };
}

export function generateRandomId(length = 7) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
