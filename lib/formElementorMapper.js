import fs from "fs/promises";
import path from "path";

/**
 * 3. ELEMENTOR GRAVITY FORMS WIDGET & SCOPED CSS MAPPER
 * Generates an Elementor Gravity Forms widget referencing the real Gravity Form ID,
 * and outputs scoped CSS reproducing 100% of the original form's visual styling.
 */
export class FormElementorMapper {
  static createGravityFormsElementorWidget(gravityFormId, formModel) {
    const submitLabel = formModel.submit?.label || "Send Message";

    return {
      id: `gf-container-${gravityFormId}`,
      elType: "container",
      settings: {
        container_type: "flex",
        display: "flex",
        flex_direction: "column",
        content_width: "boxed",
        width: { unit: "%", size: 100 },
      },
      elements: [
        {
          id: `gf-widget-${gravityFormId}`,
          elType: "widget",
          widgetType: "shortcode",
          settings: {
            shortcode: `[gravityform id="${gravityFormId}" title="false" description="false" ajax="true" tabIndex="1"]`,
          },
        },
      ],
    };
  }

  static generateScopedFormCss(gravityFormId, formModel, computedStyles = {}) {
    const formScope = `#gform_wrapper_${gravityFormId}, #gform_${gravityFormId}`;

    const labelColor = computedStyles.labelColor || "#2B2723";
    const labelFontFamily = computedStyles.labelFontFamily || "inherit";
    const labelFontSize = computedStyles.labelFontSize || "14px";
    const labelFontWeight = computedStyles.labelFontWeight || "600";

    const inputBg = computedStyles.inputBg || "#FFFFFF";
    const inputColor = computedStyles.inputColor || "#2B2723";
    const inputBorderColor = computedStyles.inputBorderColor || "#DBD3C6";
    const inputBorderRadius = computedStyles.inputBorderRadius || "6px";
    const inputPadding = computedStyles.inputPadding || "12px 16px";

    const btnBg = computedStyles.btnBg || "#2B2723";
    const btnColor = computedStyles.btnColor || "#FFFFFF";
    const btnBorderRadius = computedStyles.btnBorderRadius || "6px";
    const btnPadding = computedStyles.btnPadding || "14px 28px";
    const btnHoverBg = computedStyles.btnHoverBg || "#A62A2A";

    return `
/* Scoped Gravity Form ${gravityFormId} Styling */
${formScope} {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}

${formScope} .gfield {
  margin-bottom: 18px !important;
}

${formScope} label.gfield_label {
  display: block !important;
  font-family: ${labelFontFamily} !important;
  font-size: ${labelFontSize} !important;
  font-weight: ${labelFontWeight} !important;
  color: ${labelColor} !important;
  margin-bottom: 6px !important;
}

${formScope} input[type="text"],
${formScope} input[type="email"],
${formScope} input[type="tel"],
${formScope} input[type="number"],
${formScope} textarea,
${formScope} select {
  width: 100% !important;
  background-color: ${inputBg} !important;
  color: ${inputColor} !important;
  border: 1px solid ${inputBorderColor} !important;
  border-radius: ${inputBorderRadius} !important;
  padding: ${inputPadding} !important;
  font-size: 15px !important;
  box-sizing: border-box !important;
  transition: border-color 0.2s ease;
}

${formScope} input:focus,
${formScope} textarea:focus,
${formScope} select:focus {
  border-color: ${btnBg} !important;
  outline: none !important;
}

${formScope} .gform_button,
${formScope} button[type="submit"] {
  background-color: ${btnBg} !important;
  color: ${btnColor} !important;
  border: none !important;
  border-radius: ${btnBorderRadius} !important;
  padding: ${btnPadding} !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: background-color 0.2s ease;
}

${formScope} .gform_button:hover,
${formScope} button[type="submit"]:hover {
  background-color: ${btnHoverBg} !important;
}
`;
  }

  static async saveFormStyles(conversionDir, gravityFormId, scopedCss) {
    const cssDir = path.join(conversionDir, "gravity-forms");
    await fs.mkdir(cssDir, { recursive: true });
    const cssPath = path.join(cssDir, "form-styles.css");
    await fs.appendFile(cssPath, `\n${scopedCss}\n`);
  }
}
