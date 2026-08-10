/**
 * Automatically sanitizes and repairs an Elementor JSON template tree.
 * Fixes missing IDs, legacy elType names, flex alignment keys, inner container flags,
 * text property normalization across widgets, full-bleed edge-to-edge container widths,
 * contrast-aware background & text coloring, comprehensive section recovery,
 * deep container unwrapping, and ensures native Elementor visual styling properties are fully populated!
 */

function generateUniqueId(seenIds) {
  let newId;
  do {
    newId = Math.random().toString(36).substring(2, 9);
  } while (seenIds.has(newId));
  seenIds.add(newId);
  return newId;
}

/**
 * Calculates luminance to determine if a color hex code is dark or light.
 */
function isDarkColor(colorStr) {
  if (!colorStr || typeof colorStr !== "string") return false;
  const hex = colorStr.trim().toLowerCase();

  if (hex === "transparent" || hex === "none" || hex === "inherit") return false;

  if (hex === "#000" || hex === "#000000" || hex.startsWith("#0") || hex.startsWith("#1") || hex.startsWith("#2")) {
    return true;
  }

  const cleanHex = hex.replace("#", "");
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.45;
    }
  }

  return false;
}

/**
 * Recursively collects all unique hex colors and font families used in the tree.
 */
function collectSummaryMetadata(tree, collectedColors, collectedFonts) {
  if (!tree) return;

  const nodes = Array.isArray(tree) ? tree : [tree];

  nodes.forEach((node) => {
    if (!node || typeof node !== "object") return;
    const settings = node.settings || {};

    // Collect colors
    const colorKeys = [
      "background_color",
      "title_color",
      "text_color",
      "button_text_color",
      "primary_color",
      "secondary_color",
      "border_color",
      "color",
    ];

    for (const key of colorKeys) {
      const val = settings[key];
      if (typeof val === "string" && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(val.trim())) {
        collectedColors.add(val.trim());
      }
    }

    // Collect fonts
    if (settings.typography_font_family && typeof settings.typography_font_family === "string") {
      collectedFonts.add(settings.typography_font_family.trim());
    }

    if (Array.isArray(node.elements)) {
      collectSummaryMetadata(node.elements, collectedColors, collectedFonts);
    }
  });
}

export function sanitizeAndRepairElementor(rawResult) {
  if (!rawResult || typeof rawResult !== "object") {
    return {
      title: "AI Converter Custom Theme",
      summary: { colors: ["#ffffff", "#0f172a", "#3b82f6"], fonts: ["Inter"], section_count: 1 },
      header_template: [],
      footer_template: [],
      content_template: [],
      global_classes: {},
    };
  }

  const seenIds = new Set();

  const title = rawResult.title || rawResult.name || "AI Converter Custom Theme";
  const summary = rawResult.summary || {};

  let header = rawResult.header_template || rawResult.header || rawResult.header_sections || [];
  let footer = rawResult.footer_template || rawResult.footer || rawResult.footer_sections || [];

  // Multi-key aggregation: gather sections across all possible returned keys
  let rawSections = [];

  const possibleKeys = [
    "content_template",
    "content",
    "sections",
    "elements",
    "blocks",
    "components",
    "body",
    "pages",
    "items",
    "nodes",
  ];

  for (const k of possibleKeys) {
    if (Array.isArray(rawResult[k]) && rawResult[k].length > 0) {
      rawSections.push(...rawResult[k]);
    } else if (rawResult[k] && typeof rawResult[k] === "object" && !Array.isArray(rawResult[k])) {
      rawSections.push(rawResult[k]);
    }
  }

  if (Array.isArray(rawResult)) {
    rawSections = rawResult;
    header = [];
    footer = [];
  }

  let content = rawSections;

  if (!Array.isArray(header)) header = header ? [header] : [];
  if (!Array.isArray(footer)) footer = footer ? [footer] : [];
  if (!Array.isArray(content)) content = content ? [content] : [];

  // Deduplicate identical section references while preserving distinct sections
  const uniqueContent = [];
  const seenSignatures = new Set();

  for (const sec of content) {
    if (!sec || typeof sec !== "object") continue;
    const sig = JSON.stringify(sec).slice(0, 120);
    if (!seenSignatures.has(sig)) {
      seenSignatures.add(sig);
      uniqueContent.push(sec);
    }
  }
  content = uniqueContent;

  // Deep unwrapping: if content is wrapped in 1 or 2 outer wrapper containers (e.g. #page or body wrapper),
  // flatten all child containers into individual top-level sections!
  while (
    content.length === 1 &&
    content[0] &&
    Array.isArray(content[0].elements) &&
    content[0].elements.length > 0
  ) {
    const childContainers = content[0].elements.filter(
      (child) => child && typeof child === "object" && (child.elType === "container" || child.elType === "section" || (!child.widgetType && Array.isArray(child.elements)))
    );

    if (childContainers.length >= 1) {
      content = childContainers;
    } else {
      break;
    }
  }

  const globalClasses = rawResult.global_classes || rawResult.globalClasses || rawResult.styles || {};

  // Default content fallback if completely empty
  if (content.length === 0) {
    content = [
      {
        id: generateUniqueId(seenIds),
        elType: "container",
        settings: {
          display: "flex",
          content_width: "full",
          flex_direction: "column",
          flex_justify_content: "center",
          flex_align_items: "center",
          background_background: "classic",
          background_color: "#ffffff",
          padding: { unit: "px", top: "80", right: "0", bottom: "80", left: "0" },
        },
        elements: [
          {
            id: generateUniqueId(seenIds),
            elType: "container",
            isInner: true,
            settings: {
              display: "flex",
              content_width: "boxed",
              boxed_width: { size: 1200, unit: "px" },
              flex_direction: "column",
              flex_align_items: "center",
              flex_gap: { size: 24, unit: "px" },
            },
            elements: [
              {
                id: generateUniqueId(seenIds),
                elType: "widget",
                widgetType: "heading",
                settings: {
                  title: title,
                  header_size: "h1",
                  title_color: "#0f172a",
                  typography_typography: "custom",
                  typography_font_family: "Inter",
                  typography_font_size: { size: 42, unit: "px" },
                  typography_font_weight: "700",
                },
              },
            ],
          },
        ],
      },
    ];
  }

  const sanitizedHeader = sanitizeNodeOrArray(header, 0, seenIds, null);
  const sanitizedFooter = sanitizeNodeOrArray(footer, 0, seenIds, null);
  const sanitizedContent = sanitizeNodeOrArray(content, 0, seenIds, null);

  // Aggregate detected colors & font families
  const collectedColors = new Set(summary.colors || []);
  const collectedFonts = new Set(summary.fonts || []);

  collectSummaryMetadata(sanitizedHeader, collectedColors, collectedFonts);
  collectSummaryMetadata(sanitizedFooter, collectedColors, collectedFonts);
  collectSummaryMetadata(sanitizedContent, collectedColors, collectedFonts);

  const colorsArray = Array.from(collectedColors);
  const fontsArray = Array.from(collectedFonts);

  return {
    title,
    summary: {
      colors: colorsArray.length > 0 ? colorsArray : ["#ffffff", "#0f172a", "#3b82f6"],
      fonts: fontsArray.length > 0 ? fontsArray : ["Inter"],
      section_count: summary.section_count || sanitizedContent.length,
    },
    header_template: sanitizedHeader,
    footer_template: sanitizedFooter,
    content_template: sanitizedContent,
    global_classes: globalClasses,
  };
}

function sanitizeNodeOrArray(node, depth, seenIds, parentBgColor) {
  if (!node) return [];

  if (Array.isArray(node)) {
    return node
      .map((item) => sanitizeSingleNode(item, depth, seenIds, parentBgColor))
      .filter(Boolean);
  }

  const sanitized = sanitizeSingleNode(node, depth, seenIds, parentBgColor);
  return sanitized ? [sanitized] : [];
}

function sanitizeSingleNode(node, depth, seenIds, parentBgColor) {
  if (!node || typeof node !== "object") return null;

  const copy = JSON.parse(JSON.stringify(node));

  // 1. Unique ID
  if (!copy.id || typeof copy.id !== "string" || copy.id.trim() === "" || seenIds.has(String(copy.id))) {
    copy.id = generateUniqueId(seenIds);
  } else {
    seenIds.add(String(copy.id));
  }

  // 2. Legacy elType conversion
  if (copy.elType === "section" || copy.elType === "column" || !copy.elType) {
    copy.elType = copy.widgetType ? "widget" : "container";
  }

  // 3. Widget Type normalization
  if (copy.widgetType === "html" || copy.widgetType === "shortcode") {
    copy.widgetType = "text-editor";
  }

  copy.settings = copy.settings || {};
  const settings = copy.settings;

  // Determine current effective background color
  let currentBgColor = parentBgColor;

  // 4. Container Flex & Width Rules
  if (copy.elType === "container") {
    settings.display = "flex";

    if (depth === 0) {
      delete copy.isInner;
      if (!settings.content_width) settings.content_width = "full";
      if (!settings.padding) {
        settings.padding = { unit: "px", top: "60", right: "0", bottom: "60", left: "0" };
      }
      if (!settings.background_background && !settings.background_color) {
        settings.background_background = "classic";
        // Default root section background to light #ffffff unless explicitly set
        settings.background_color = "#ffffff";
      }
    } else {
      copy.isInner = true;
      if (!settings.content_width) settings.content_width = "boxed";
      if (settings.content_width === "boxed" && !settings.boxed_width) {
        settings.boxed_width = { size: 1200, unit: "px" };
      }
      if (!settings.padding) {
        settings.padding = { unit: "px", top: "16", right: "20", bottom: "16", left: "20" };
      }
    }

    if (settings.background_color && settings.background_color !== "transparent") {
      currentBgColor = settings.background_color;
    }

    if (!settings.flex_direction) settings.flex_direction = "column";
    if (!settings.flex_justify_content) settings.flex_justify_content = "flex-start";
    if (!settings.flex_align_items) settings.flex_align_items = "stretch";

    // Fix Flex key names
    const keyMap = {
      justify_content: "flex_justify_content",
      align_items: "flex_align_items",
      "flex-justify": "flex_justify_content",
      "flex-align": "flex_align_items",
      flex_justify: "flex_justify_content",
      flex_align: "flex_align_items",
      justifyContent: "flex_justify_content",
      alignItems: "flex_align_items",
      flexJustifyContent: "flex_justify_content",
      flexAlignItems: "flex_align_items",
    };

    for (const [badKey, goodKey] of Object.entries(keyMap)) {
      if (badKey in settings) {
        settings[goodKey] = settings[badKey];
        delete settings[badKey];
      }
    }
  }

  // 5. Widget Native Visual Styling & Text Property Normalization
  if (copy.elType === "widget") {
    const wType = copy.widgetType;
    const parentIsDark = isDarkColor(currentBgColor);

    if (wType === "heading") {
      // Normalize Title Text Property
      if (!settings.title) {
        settings.title =
          settings.text ||
          settings.editor ||
          settings.content ||
          settings.label ||
          settings.value ||
          settings.heading ||
          settings.title_text ||
          "Headline Title";
      }

      // Normalize Heading Color with Contrast Awareness
      if (!settings.title_color) {
        settings.title_color = settings.color || settings.text_color || (parentIsDark ? "#ffffff" : "#0f172a");
      }

      if (!settings.header_size) settings.header_size = "h2";
      if (!settings.typography_typography) settings.typography_typography = "custom";
      if (!settings.typography_font_size) settings.typography_font_size = { size: 32, unit: "px" };
      if (!settings.typography_font_weight) settings.typography_font_weight = "700";
    } else if (wType === "text-editor") {
      // Normalize Text Editor Property
      if (!settings.editor) {
        settings.editor =
          settings.text ||
          settings.content ||
          settings.description ||
          settings.body ||
          settings.title ||
          settings.value ||
          settings.editor_text ||
          "<p>Sample descriptive text content.</p>";
      }

      // Wrap raw text strings without HTML tags in <p>
      if (typeof settings.editor === "string" && !/<[a-z][\s\S]*>/i.test(settings.editor)) {
        settings.editor = `<p>${settings.editor}</p>`;
      }

      // Normalize Text Color with Contrast Awareness
      if (!settings.text_color) {
        settings.text_color = settings.color || settings.title_color || (parentIsDark ? "#cbd5e1" : "#475569");
      }

      if (!settings.typography_typography) settings.typography_typography = "custom";
      if (!settings.typography_font_size) settings.typography_font_size = { size: 16, unit: "px" };
    } else if (wType === "button") {
      // Normalize Button Text Property
      if (!settings.text) {
        settings.text =
          settings.button_text ||
          settings.label ||
          settings.title ||
          settings.caption ||
          settings.editor ||
          settings.value ||
          "Click Here";
      }

      if (!settings.button_text_color && !settings.color) settings.button_text_color = "#ffffff";
      if (!settings.background_color) settings.background_color = "#3b82f6";
      if (!settings.border_radius) {
        settings.border_radius = { unit: "px", top: "8", right: "8", bottom: "8", left: "8" };
      }
      if (!settings.padding) {
        settings.padding = { unit: "px", top: "12", right: "24", bottom: "12", left: "24" };
      }
      if (!settings.typography_typography) settings.typography_typography = "custom";
      if (!settings.typography_font_weight) settings.typography_font_weight = "600";
    } else if (wType === "icon-box" || wType === "image-box") {
      if (!settings.title_text) {
        settings.title_text = settings.title || settings.heading || settings.text || "Feature Heading";
      }
      if (!settings.description_text) {
        settings.description_text = settings.editor || settings.description || settings.content || "Feature detail description.";
      }
    } else if (wType === "image") {
      // Normalize Image Object Format
      if (typeof settings.image === "string") {
        settings.image = { url: settings.image };
      } else if (settings.image_url || settings.url) {
        settings.image = { url: settings.image_url || settings.url };
      } else if (!settings.image || !settings.image.url) {
        settings.image = { url: "https://via.placeholder.com/600x400?text=Elementor+Image" };
      }
      if (!settings.image_size) settings.image_size = "full";
    }
  }

  // 6. Recurse Child Elements
  if (Array.isArray(copy.elements)) {
    const nextDepth = copy.elType === "container" ? depth + 1 : depth;
    copy.elements = copy.elements
      .map((child) => sanitizeSingleNode(child, nextDepth, seenIds, currentBgColor))
      .filter(Boolean);
  }

  return copy;
}
