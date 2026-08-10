/**
 * Validates an Elementor template structure (or collection of templates) against strict Elementor rules.
 * @param {Array|Object} template - Elementor template node, template array, or full response object.
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateTemplate(template) {
  const errors = [];
  const seenIds = new Set();

  if (!template) {
    return { valid: false, errors: ["Template data is null or undefined."] };
  }

  // Handle case where user passes full object { header_template, footer_template, content_template }
  if (typeof template === "object" && !Array.isArray(template)) {
    let checkedAny = false;
    const parts = ["header_template", "footer_template", "content_template"];

    for (const partKey of parts) {
      if (template[partKey]) {
        checkedAny = true;
        validateNodeOrArray(template[partKey], 0, `${partKey}`, errors, seenIds);
      }
    }

    if (!checkedAny) {
      // Treat object itself as a single element node
      validateNodeOrArray(template, 0, "root", errors, seenIds);
    }
  } else if (Array.isArray(template)) {
    validateNodeOrArray(template, 0, "root", errors, seenIds);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateNodeOrArray(node, depth, path, errors, seenIds) {
  if (!node) return;

  if (Array.isArray(node)) {
    node.forEach((item, index) => {
      validateNodeOrArray(item, depth, `${path}[${index}]`, errors, seenIds);
    });
    return;
  }

  if (typeof node !== "object") return;

  const id = node.id || node.id === 0 ? String(node.id) : null;

  // 1. Non-empty unique ID
  if (!id || id.trim() === "") {
    errors.push(`Element at path '${path}' is missing a valid non-empty 'id'.`);
  } else {
    if (seenIds.has(id)) {
      errors.push(`Duplicate element id '${id}' found at path '${path}'.`);
    } else {
      seenIds.add(id);
    }
  }

  const elementLabel = id ? `container/element id '${id}'` : `element at path '${path}'`;

  // 2. Legacy elType check ("section", "column")
  if (node.elType === "section" || node.elType === "column") {
    errors.push(`Legacy elType '${node.elType}' found on ${elementLabel}. Must use 'container'.`);
  }

  // 3. Forbidden widgetType check ("html", "shortcode")
  if (node.widgetType === "html" || node.widgetType === "shortcode") {
    errors.push(`Forbidden widgetType '${node.widgetType}' found on ${elementLabel}.`);
  }

  // 4. Container flex & inner checks
  if (node.elType === "container") {
    const settings = node.settings || {};

    if (settings.display !== "flex") {
      errors.push(`${elementLabel} missing settings.display === 'flex' (found: '${settings.display || "none"}').`);
    }

    if (depth > 0) {
      if (node.isInner !== true) {
        errors.push(`Nested ${elementLabel} (depth ${depth}) missing isInner: true.`);
      }
    } else {
      if (node.isInner === true) {
        errors.push(`Root ${elementLabel} (depth 0) must not have isInner: true.`);
      }
    }
  }

  // 5. Check for invalid flex alignment key variants in settings
  if (node.settings && typeof node.settings === "object") {
    const invalidFlexKeys = [
      "justify_content",
      "align_items",
      "flex-justify",
      "flex-align",
      "flex_justify",
      "flex_align",
      "justifyContent",
      "alignItems",
      "flexJustifyContent",
      "flexAlignItems",
    ];

    for (const key of Object.keys(node.settings)) {
      if (invalidFlexKeys.includes(key)) {
        const correctKey = key.toLowerCase().includes("justify")
          ? "flex_justify_content"
          : "flex_align_items";
        errors.push(
          `Invalid flex key '${key}' found in ${elementLabel} settings. Must use exact key '${correctKey}'.`
        );
      }
    }
  }

  // 6. Recurse into child elements
  if (Array.isArray(node.elements)) {
    const nextDepth = node.elType === "container" ? depth + 1 : depth;
    node.elements.forEach((child, idx) => {
      validateNodeOrArray(child, nextDepth, `${path}.elements[${idx}]`, errors, seenIds);
    });
  }
}
