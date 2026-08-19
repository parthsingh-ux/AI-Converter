import { validateTemplate } from "./validateElementor.js";

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
  const str = colorStr.trim().toLowerCase();

  if (str === "transparent" || str === "none" || str === "inherit") return false;

  if (str.startsWith("#0") || str.startsWith("#1") || str.startsWith("#2") || str.startsWith("#3")) {
    return true;
  }

  if (str.includes("srgb") || str.includes("rgb")) {
    const numbers = str.match(/[\d\.]+/g);
    if (numbers && numbers.length >= 3) {
      let r = parseFloat(numbers[0]);
      let g = parseFloat(numbers[1]);
      let b = parseFloat(numbers[2]);
      if (r <= 1 && g <= 1 && b <= 1) {
        r *= 255;
        g *= 255;
        b *= 255;
      }
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance < 0.45;
    }
  }

  const cleanHex = str.replace("#", "");
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

  // Unwrapping: Only unwrap if the single root container is an explicit outer page/site wrapper (e.g. #page, #wrapper, body)
  while (
    content.length === 1 &&
    content[0] &&
    Array.isArray(content[0].elements) &&
    content[0].elements.length > 0
  ) {
    const rootId = String(content[0].id || "").toLowerCase();
    const rootClasses = String(content[0].settings?.css_classes || "").toLowerCase();
    const isExplicitWrapper =
      rootId.includes("wrapper") ||
      rootId.includes("page-wrapper") ||
      rootId === "app" ||
      rootId === "root" ||
      rootId === "site" ||
      rootClasses.includes("wrapper") ||
      rootClasses.includes("site-container");

    const childContainers = content[0].elements.filter(
      (child) => child && typeof child === "object" && (child.elType === "container" || child.elType === "section" || (!child.widgetType && Array.isArray(child.elements)))
    );

    if (isExplicitWrapper && childContainers.length >= 1) {
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

  let result = {
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

  // Guaranteed Final Auto-Repair Pass: Ensures 0 backend validation violations
  const valRes = validateTemplate(result);
  if (!valRes.valid) {
    const repairSeenIds = new Set();
    result.header_template = sanitizeNodeOrArray(result.header_template, 0, repairSeenIds, null);
    result.footer_template = sanitizeNodeOrArray(result.footer_template, 0, repairSeenIds, null);
    result.content_template = sanitizeNodeOrArray(result.content_template, 0, repairSeenIds, null);
  }

  return result;
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

  // 1. Unique ID Generation / Reservation
  if (!copy.id || typeof copy.id !== "string" || copy.id.trim() === "" || seenIds.has(String(copy.id))) {
    copy.id = generateUniqueId(seenIds);
  } else {
    seenIds.add(String(copy.id));
  }

  // 2. Legacy / Invalid elType Normalization
  if (copy.elType !== "container" && copy.elType !== "widget") {
    copy.elType = copy.widgetType ? "widget" : "container";
  }

  // 3. Widget Type Normalization (Case-insensitive)
  if (copy.widgetType && typeof copy.widgetType === "string") {
    copy.widgetType = copy.widgetType.trim().toLowerCase();
  }

  copy.settings = copy.settings || {};
  const settings = copy.settings;

  // Global Flex & Direction Key Cleaning (Run for all containers and widgets)
  const keyMap = {
    direction: "flex_direction",
    flexDirection: "flex_direction",
    "flex-direction": "flex_direction",
    justify_content: "flex_justify_content",
    align_items: "flex_align_items",
    "justify-content": "flex_justify_content",
    "align-items": "flex_align_items",
    "flex-justify": "flex_justify_content",
    "flex-align": "flex_align_items",
    flex_justify: "flex_justify_content",
    flex_align: "flex_align_items",
    justifyContent: "flex_justify_content",
    alignItems: "flex_align_items",
    flexJustifyContent: "flex_justify_content",
    flexAlignItems: "flex_align_items",
    "flex-justify-content": "flex_justify_content",
    "flex-align-items": "flex_align_items",
  };

  for (const [badKey, goodKey] of Object.entries(keyMap)) {
    if (badKey in settings) {
      settings[goodKey] = settings[badKey];
      delete settings[badKey];
    }
  }

  // Determine current effective background color
  let currentBgColor = parentBgColor;

  // 4. Container Flex & Layout Rules
  if (copy.elType === "container") {
    // Enforce container_type === "flex" & display === "flex" for native Elementor 3.x PHP engine in WordPress
    settings.container_type = "flex";
    if (settings.display === "grid") {
      if (!settings.flex_direction) settings.flex_direction = "row";
      if (!settings.flex_wrap) settings.flex_wrap = "wrap";
    }
    settings.display = "flex";

    if (depth === 0) {
      delete copy.isInner;
      if (!settings.content_width) settings.content_width = "full";
    } else {
      copy.isInner = true;
      if (!settings.content_width) settings.content_width = "boxed";
    }

    if (settings.background_color && settings.background_color !== "transparent") {
      currentBgColor = settings.background_color;
      if (!settings.background_background) {
        settings.background_background = "classic";
      }
    }
    if (settings.background_color_b || settings.background_gradient_type) {
      settings.background_background = "gradient";
    }

    // MANDATORY ROW / COLUMN PARENT-CHILD RULE:
    // 1. If explicit flex_direction is set (row, column, row-reverse, column-reverse), PRESERVE IT 100%!
    // 2. If unassigned:
    //    - If container holds 2 or more CHILD CONTAINERS (e.g. Cards, Columns, Feature Boxes),
    //      assign "flex_direction": "row" so the child containers render HORIZONTALLY LEFT-TO-RIGHT!
    //    - If container holds WIDGETS (e.g. Heading, Text Editor, Button inside a card),
    //      assign "flex_direction": "column" so widgets stack VERTICALLY from top to bottom!
    if (settings.flex_direction === "row" || settings.flex_direction === "row-reverse") {
      if (!settings.flex_wrap) settings.flex_wrap = "wrap";
    } else if (settings.flex_direction === "column" || settings.flex_direction === "column-reverse") {
      // Preserve explicit column direction
    } else {
      const childContainers = Array.isArray(copy.elements)
        ? copy.elements.filter(
            (child) =>
              child &&
              typeof child === "object" &&
              (child.elType === "container" ||
                child.elType === "section" ||
                child.elType === "column" ||
                (!child.widgetType && Array.isArray(child.elements)))
          )
        : [];

      if (childContainers.length >= 2) {
        settings.flex_direction = "row";
        if (!settings.flex_wrap) settings.flex_wrap = "wrap";
      } else {
        settings.flex_direction = "column";
      }
    }

    // Standard Native Elementor 3.x Flex Helpers
    settings.flex__is_row = "row";
    settings.flex__is_column = "column";

    // 3-TIER ROW ARCHITECTURE (CLAUDE PATTERN):
    // When a container is row, set flex_direction_mobile = "column", wrap widget children into column containers,
    // and assign percentage widths (with 100% width on tablet/mobile) so elements render side-by-side on desktop!
    if ((settings.flex_direction === "row" || settings.flex_direction === "row-reverse") && Array.isArray(copy.elements)) {
      if (!settings.flex_wrap) settings.flex_wrap = "wrap";
      if (!settings.flex_direction_mobile) settings.flex_direction_mobile = "column";

      const numElements = copy.elements.length;
      if (numElements >= 2) {
        // Calculate child percentage width accounting for flex gap (~47.6% for 2 cols, ~30% for 3 cols, ~22% for 4 cols)
        let calcWidth = 100 / numElements;
        if (numElements === 2) calcWidth = 47.6;
        else if (numElements === 3) calcWidth = 30.0;
        else if (numElements === 4) calcWidth = 22.0;

        const defaultWidth = parseFloat(calcWidth.toFixed(2));

        const normalizedElements = [];

        copy.elements.forEach((child) => {
          if (!child || typeof child !== "object") return;

          // If direct child is a widget, wrap it in a column container
          if (child.elType === "widget") {
            normalizedElements.push({
              id: generateUniqueId(seenIds),
              elType: "container",
              isInner: true,
              settings: {
                content_width: "full",
                container_type: "flex",
                display: "flex",
                flex_direction: "column",
                width: { unit: "%", size: defaultWidth },
                width_tablet: { unit: "%", size: 100 },
                width_mobile: { unit: "%", size: 100 },
              },
              elements: [child],
            });
          } else {
            // Direct child is a container
            child.isInner = true;
            child.settings = child.settings || {};
            child.settings.container_type = "flex";
            child.settings.display = "flex";
            if (!child.settings.content_width) child.settings.content_width = "full";
            if (!child.settings.flex_direction) child.settings.flex_direction = "column";

            if (!child.settings.width && !child.settings._element_width && !child.settings.flex_basis) {
              child.settings.width = { unit: "%", size: defaultWidth };
            }
            if (!child.settings.width_tablet) {
              child.settings.width_tablet = { unit: "%", size: 100 };
            }
            if (!child.settings.width_mobile) {
              child.settings.width_mobile = { unit: "%", size: 100 };
            }

            normalizedElements.push(child);
          }
        });

        copy.elements = normalizedElements;
      }
    }
  } else {
    // Widgets must not carry isInner property
    delete copy.isInner;
  }

  // 5. Widget Typography & Color Property Normalization
  if (copy.elType === "widget") {
    const wType = copy.widgetType;

    // Normalize flex_gap into Elementor object format { size: N, unit: "px", row: "N", column: "N", isLinked: true }
    if (settings.flex_gap) {
      if (typeof settings.flex_gap === "number" || typeof settings.flex_gap === "string") {
        const gapVal = parseFloat(settings.flex_gap);
        if (!isNaN(gapVal)) {
          settings.flex_gap = {
            size: gapVal,
            unit: "px",
            row: String(gapVal),
            column: String(gapVal),
            isLinked: true,
          };
        }
      }
    }

    // Normalize typography font size into Elementor object format { unit: "px", size: N }
    if (settings.typography_font_size) {
      if (typeof settings.typography_font_size === "number" || typeof settings.typography_font_size === "string") {
        const sz = parseFloat(settings.typography_font_size);
        if (!isNaN(sz)) {
          const unit = String(settings.typography_font_size).includes("rem") ? "rem" : "px";
          settings.typography_font_size = { unit, size: sz };
        }
      }
    }

    // Normalize responsive font sizes (tablet & mobile)
    ["typography_font_size_tablet", "typography_font_size_mobile"].forEach((key) => {
      if (settings[key]) {
        if (typeof settings[key] === "number" || typeof settings[key] === "string") {
          const sz = parseFloat(settings[key]);
          if (!isNaN(sz)) {
            settings[key] = { unit: "px", size: sz };
          }
        }
      }
    });

    // Normalize typography line height into Elementor object format { unit: "em", size: N }
    if (settings.typography_line_height) {
      if (typeof settings.typography_line_height === "number" || typeof settings.typography_line_height === "string") {
        const lh = parseFloat(settings.typography_line_height);
        if (!isNaN(lh)) {
          const unit = String(settings.typography_line_height).includes("px") ? "px" : "em";
          settings.typography_line_height = { unit, size: lh };
        }
      }
    }

    // Ensure typography_typography is set to "custom" whenever custom font properties are present
    if (
      settings.typography_font_family ||
      settings.typography_font_size ||
      settings.typography_font_weight ||
      settings.typography_line_height ||
      settings.typography_letter_spacing
    ) {
      settings.typography_typography = "custom";
    }

    if (settings.typography_font_weight) {
      settings.typography_font_weight = String(settings.typography_font_weight);
    }

    const isDarkBg = isDarkColor(currentBgColor);

    if (wType === "heading") {
      if (!settings.title) {
        settings.title =
          settings.text ||
          settings.editor ||
          settings.content ||
          settings.label ||
          settings.value ||
          settings.heading ||
          settings.title_text ||
          "";
      }

      if (!settings.title_color) {
        settings.title_color = settings.color || settings.text_color || settings.heading_color || (isDarkBg ? "#FFFFFF" : "#2B2723");
      }

      if (!settings.header_size && settings.tag) {
        settings.header_size = settings.tag;
      }
    } else if (wType === "text-editor") {
      if (!settings.editor) {
        settings.editor =
          settings.text ||
          settings.content ||
          settings.description ||
          settings.body ||
          settings.title ||
          settings.value ||
          settings.editor_text ||
          "";
      }

      if (!settings.text_color) {
        settings.text_color = settings.color || settings.title_color || settings.body_color || (isDarkBg ? "#E6EAEF" : "#46525E");
      }

      if (typeof settings.editor === "string" && settings.editor.trim() && !/<[a-z][\s\S]*>/i.test(settings.editor)) {
        settings.editor = `<p>${settings.editor}</p>`;
      }
    } else if (wType === "button") {
      if (!settings.text) {
        settings.text =
          settings.button_text ||
          settings.label ||
          settings.title ||
          settings.caption ||
          settings.editor ||
          settings.value ||
          "";
      }

      if (!settings.button_text_color) {
        settings.button_text_color = settings.text_color || settings.color || (isDarkBg ? "#FFFFFF" : "#2B2723");
      }
    } else if (wType === "icon") {
      if (!settings.primary_color) {
        settings.primary_color = settings.color || settings.icon_color || settings.fill || (isDarkBg ? "#D9A566" : "#A62A2A");
      }
    } else if (wType === "divider") {
      if (!settings.color) {
        settings.color = settings.line_color || settings.divider_color || (isDarkBg ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.1)");
      }
    } else if (wType === "icon-box" || wType === "image-box") {
      if (!settings.title_text) {
        settings.title_text = settings.title || settings.heading || settings.text || "";
      }
      if (!settings.description_text) {
        settings.description_text = settings.editor || settings.description || settings.content || "";
      }
      if (!settings.primary_color) {
        settings.primary_color = settings.color || settings.icon_color || (isDarkBg ? "#D9A566" : "#A62A2A");
      }
    } else if (wType === "image") {
      const imgVal = settings.image;
      const rawUrl = typeof imgVal === "string"
        ? imgVal
        : (imgVal?.url || settings.image_url || settings.url || settings.src || settings.filename || settings.image_name || "");

      if (rawUrl) {
        settings.image = {
          id: imgVal?.id || "",
          source: imgVal?.source || "url",
          url: rawUrl,
          size: imgVal?.size || "",
        };
      }
      if (!settings.image_size) settings.image_size = "full";
    } else if (wType === "icon-list") {
      if (!settings.icon_color) {
        settings.icon_color = settings.color || settings.primary_color || (isDarkBg ? "#D9A566" : "#A62A2A");
      }
      if (!settings.text_color) {
        settings.text_color = isDarkBg ? "#E6EAEF" : "#46525E";
      }
    } else if (wType === "testimonial") {
      if (!settings.testimonial_content) settings.testimonial_content = settings.editor || settings.content || "";
      if (!settings.testimonial_name) settings.testimonial_name = settings.name || settings.title || "";
      if (!settings.testimonial_job) settings.testimonial_job = settings.job || settings.role || "";

      if (!settings.testimonial_name_color) settings.testimonial_name_color = isDarkBg ? "#FFFFFF" : "#2B2723";
      if (!settings.testimonial_job_color) settings.testimonial_job_color = isDarkBg ? "#D9A566" : "#6E665C";
      if (!settings.testimonial_content_color) settings.testimonial_content_color = isDarkBg ? "#E6EAEF" : "#46525E";
    } else if (wType === "accordion" || wType === "toggle") {
      if (!settings.title_color) settings.title_color = isDarkBg ? "#FFFFFF" : "#2B2723";
      if (!settings.content_color) settings.content_color = isDarkBg ? "#E6EAEF" : "#46525E";
      if (!settings.tab_active_color) settings.tab_active_color = isDarkBg ? "#D9A566" : "#A62A2A";

      if (
        settings.title_typography_font_family ||
        settings.title_typography_font_size ||
        settings.title_typography_font_weight
      ) {
        settings.title_typography_typography = "custom";
      }
      if (settings.content_typography_font_size || settings.content_typography_font_family) {
        settings.content_typography_typography = "custom";
      }
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
