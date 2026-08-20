import * as cheerio from "cheerio";

/**
 * 1. FORM DETECTOR & NORMALIZER SERVICE
 * Parses HTML, DOM, and JS scripts to extract a complete normalized Form Model.
 */
export class FormDetector {
  static detectAndExtractForms(htmlContent, cssContent = "") {
    if (!htmlContent || typeof htmlContent !== "string") return [];

    const $ = cheerio.load(htmlContent);
    const forms = [];

    // 1. Detect native <form> tags
    $("form").each((idx, el) => {
      const formEl = $(el);
      const sourceFormId = formEl.attr("id") || formEl.attr("name") || `native-form-${idx + 1}`;
      const name = formEl.attr("name") || formEl.attr("id") || `Form ${idx + 1}`;
      const action = formEl.attr("action") || "";
      const method = (formEl.attr("method") || "POST").toUpperCase();

      const fields = FormDetector.extractFieldsFromContainer($, formEl);
      if (fields.length > 0) {
        const submitBtn = formEl.find('button[type="submit"], input[type="submit"], button, .btn').first();
        const submitLabel = submitBtn.text().trim() || submitBtn.attr("value") || "Submit";

        forms.push({
          sourceFormId,
          name,
          method,
          action,
          fields,
          submit: { label: submitLabel },
        });
      }
    });

    // 2. Detect Custom / Div Form Wrappers (containers holding 2+ input/textarea/select fields without a <form> tag)
    $('[class*="form"], [id*="form"], [role="form"], section, div').each((idx, el) => {
      const container = $(el);
      if (container.is("form") || container.parents("form").length > 0) return; // Skip inside native form
      if (container.parents('[class*="form"], [id*="form"]').length > 0) return; // Skip inside parent form wrapper

      const inputs = container.find("input, textarea, select").filter((_, fEl) => {
        const t = ($(fEl).attr("type") || "").toLowerCase();
        return t !== "submit" && t !== "button" && t !== "hidden";
      });

      if (inputs.length >= 2) {
        const sourceFormId = container.attr("id") || container.attr("class")?.split(/\s+/)[0] || `custom-form-${idx + 1}`;
        const fields = FormDetector.extractFieldsFromContainer($, container);

        if (fields.length > 0 && !forms.some((f) => f.sourceFormId === sourceFormId)) {
          const submitBtn = container.find('button, input[type="submit"], .btn, .button').first();
          const submitLabel = submitBtn.text().trim() || submitBtn.attr("value") || "Submit";

          forms.push({
            sourceFormId,
            name: sourceFormId,
            method: "POST",
            action: "",
            fields,
            submit: { label: submitLabel },
          });
        }
      }
    });

    return forms;
  }

  static extractFieldsFromContainer($, container) {
    const fields = [];
    container.find("input, textarea, select").each((fIdx, fEl) => {
      const fieldEl = $(fEl);
      const tag = fEl.tagName.toLowerCase();
      const type = (fieldEl.attr("type") || (tag === "textarea" ? "textarea" : tag === "select" ? "select" : "text")).toLowerCase();

      if (type === "submit" || type === "button" || type === "hidden" || type === "image") return;

      const fName = fieldEl.attr("name") || fieldEl.attr("id") || `field-${fIdx + 1}`;
      const sourceId = fieldEl.attr("id") || fName;
      const placeholder = fieldEl.attr("placeholder") || "";
      const required = fieldEl.prop("required") || fieldEl.attr("required") !== undefined;
      const defaultValue = fieldEl.val() || "";

      let label = "";
      if (sourceId) {
        label = $(`label[for="${sourceId}"]`).text().trim();
      }
      if (!label) {
        label = fieldEl.closest("label").text().trim() || fieldEl.parent().find("label").text().trim() || fName;
      }
      label = label.replace(/\s+/g, " ").replace(/\*$/, "").trim();

      const options = [];
      if (tag === "select") {
        fieldEl.find("option").each((oIdx, oEl) => {
          const optEl = $(oEl);
          const optVal = optEl.attr("value") !== undefined ? optEl.attr("value") : optEl.text();
          const optLabel = optEl.text().trim();
          if (optVal !== "") {
            options.push({ label: optLabel || optVal, value: optVal });
          }
        });
      }

      fields.push({
        sourceId,
        name: fName,
        type: FormDetector.mapHtmlTypeToNormalized(type, fName, label),
        label: label || fName,
        placeholder,
        required,
        defaultValue,
        options,
        validation: {
          required,
          email: type === "email" || fName.includes("email") || label.toLowerCase().includes("email"),
        },
      });
    });

    return fields;
  }

  static mapHtmlTypeToNormalized(type, name = "", label = "") {
    const lName = (name + " " + label).toLowerCase();

    if (lName.includes("email")) return "email";
    if (lName.includes("phone") || lName.includes("tel") || type === "tel") return "phone";
    if (lName.includes("first name") || lName.includes("last name") || lName.includes("full name")) return "text";
    if (type === "textarea") return "textarea";
    if (type === "select") return "select";
    if (type === "checkbox") return "checkbox";
    if (type === "radio") return "radio";
    if (type === "file") return "file";
    if (type === "number") return "number";
    if (type === "date") return "date";

    return type || "text";
  }
}
