/**
 * Universal Website Heuristic Detection Rules
 */

export const HEURISTIC_RULES = [
  {
    name: "CustomBundle",
    inputType: "custom-bundle",
    framework: "custom",
    bundler: "custom-bundle",
    adapterName: "CustomBundleAdapter",
    check: ({ files, fileContents, htmlCount }) => {
      let confidence = 0;
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string") {
          if (content.includes("__bundler/manifest") || content.includes("__bundler/template") || content.includes("__bundler/ext_resources")) {
            confidence += 0.95;
          }
          if (content.includes("data:text/javascript;base64,") && content.includes("Blob") && content.includes("URL.createObjectURL")) {
            confidence += 0.3;
          }
        }
      }
      return { confidence: Math.min(confidence, 1.0) };
    }
  },
  {
    name: "SingleHTML",
    inputType: "single-html",
    framework: "static",
    bundler: "none",
    adapterName: "SingleHTMLAdapter",
    check: ({ files, fileContents, htmlCount, cssCount, jsCount }) => {
      let confidence = 0;
      if (htmlCount === 1 && cssCount === 0 && jsCount === 0) {
        confidence += 0.7;
      }
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string" && path.endsWith(".html")) {
          const hasBase64Images = /data:image\/[a-zA-Z]+;base64,/i.test(content);
          const hasInlineStyles = (content.match(/<style[^>]*>/gi) || []).length > 0;
          const hasInlineScripts = (content.match(/<script[^>]*>/gi) || []).length > 0;
          if (hasBase64Images || (hasInlineStyles && hasInlineScripts)) {
            confidence += 0.25;
          }
        }
      }
      return { confidence: Math.min(confidence, 0.95) };
    }
  },
  {
    name: "ZipArchive",
    inputType: "zip",
    framework: "unknown",
    bundler: "unknown",
    adapterName: "ZipAdapter",
    check: ({ isZipFile }) => {
      return { confidence: isZipFile ? 1.0 : 0 };
    }
  },
  {
    name: "Vite",
    inputType: "vite",
    framework: "vite",
    bundler: "vite",
    adapterName: "ViteAdapter",
    check: ({ files, fileContents }) => {
      let confidence = 0;
      const fileListStr = files.join(" ");
      if (files.some(f => f.includes("/@vite/client") || f.includes("vite.config"))) confidence += 0.6;
      if (/assets\/index-[a-zA-Z0-9_-]+\.js/i.test(fileListStr)) confidence += 0.4;
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string" && (content.includes("__vite__") || content.includes("import.meta.env"))) {
          confidence += 0.3;
        }
      }
      return { confidence: Math.min(confidence, 1.0) };
    }
  },
  {
    name: "Webpack",
    inputType: "webpack",
    framework: "webpack",
    bundler: "webpack",
    adapterName: "WebpackAdapter",
    check: ({ files, fileContents }) => {
      let confidence = 0;
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string") {
          if (content.includes("webpackChunk") || content.includes("__webpack_require__") || content.includes("webpackExports")) {
            confidence += 0.5;
          }
        }
      }
      if (files.some(f => /chunk-[a-zA-Z0-9_-]+\.js/i.test(f))) confidence += 0.3;
      return { confidence: Math.min(confidence, 1.0) };
    }
  },
  {
    name: "NextStatic",
    inputType: "next",
    framework: "next",
    bundler: "webpack",
    adapterName: "NextStaticAdapter",
    check: ({ files, fileContents }) => {
      let confidence = 0;
      if (files.some(f => f.includes("_next/") || f.includes("next.config"))) confidence += 0.6;
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string" && content.includes("__NEXT_DATA__")) {
          confidence += 0.4;
        }
      }
      return { confidence: Math.min(confidence, 1.0) };
    }
  },
  {
    name: "React",
    inputType: "react",
    framework: "react",
    bundler: "webpack",
    adapterName: "ReactAdapter",
    check: ({ fileContents }) => {
      let confidence = 0;
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string") {
          if (content.includes("data-reactroot") || content.includes("ReactDOM") || content.includes("_reactDom")) {
            confidence += 0.4;
          }
        }
      }
      return { confidence: Math.min(confidence, 0.9) };
    }
  },
  {
    name: "Vue",
    inputType: "vue",
    framework: "vue",
    bundler: "vite",
    adapterName: "VueAdapter",
    check: ({ fileContents }) => {
      let confidence = 0;
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string") {
          if (content.includes("data-v-") || content.includes("__vue__") || content.includes("vue.runtime")) {
            confidence += 0.4;
          }
        }
      }
      return { confidence: Math.min(confidence, 0.9) };
    }
  },
  {
    name: "Angular",
    inputType: "angular",
    framework: "angular",
    bundler: "webpack",
    adapterName: "AngularAdapter",
    check: ({ files, fileContents }) => {
      let confidence = 0;
      if (files.some(f => f.includes("polyfills.") && f.includes(".js"))) confidence += 0.3;
      for (const [path, content] of fileContents.entries()) {
        if (typeof content === "string" && (content.includes("ng-version") || content.includes("ng-reflect"))) {
          confidence += 0.6;
        }
      }
      return { confidence: Math.min(confidence, 1.0) };
    }
  }
];

export function runHeuristicRules(analysisContext) {
  let bestMatch = {
    inputType: "generic-html",
    framework: "unknown",
    bundler: "unknown",
    adapterName: "GenericHTMLAdapter",
    confidence: 0.1
  };

  for (const rule of HEURISTIC_RULES) {
    const result = rule.check(analysisContext);
    if (result.confidence > bestMatch.confidence) {
      bestMatch = {
        inputType: rule.inputType,
        framework: rule.framework,
        bundler: rule.bundler,
        adapterName: rule.adapterName,
        confidence: result.confidence
      };
    }
  }

  return bestMatch;
}
