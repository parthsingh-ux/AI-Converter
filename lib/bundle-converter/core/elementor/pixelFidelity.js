/**
 * Pixel Fidelity Engine - Maps computed CSS styles to exact Elementor JSON settings
 */

export class PixelFidelityEngine {
  /**
   * Translates computed CSS into Elementor style settings
   * @param {Object} computed 
   * @returns {Object} elementorSettings
   */
  static extractElementorSettings(computed) {
    if (!computed) return {};

    const settings = {};

    // Typography
    if (computed.fontFamily) {
      settings.typography_font_family = computed.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
    }
    if (computed.fontSize) {
      const sizeVal = parseFloat(computed.fontSize);
      if (!isNaN(sizeVal)) {
        settings.typography_font_size = { unit: "px", size: sizeVal, sizes: [] };
      }
    }
    if (computed.fontWeight) {
      settings.typography_font_weight = computed.fontWeight;
    }
    if (computed.lineHeight && computed.lineHeight !== "normal") {
      const lhVal = parseFloat(computed.lineHeight);
      if (!isNaN(lhVal)) {
        settings.typography_line_height = { unit: "px", size: lhVal, sizes: [] };
      }
    }

    // Colors
    if (computed.color && computed.color !== "rgba(0, 0, 0, 0)") {
      settings.title_color = computed.color;
      settings.text_color = computed.color;
      settings.button_text_color = computed.color;
    }
    if (computed.backgroundColor && computed.backgroundColor !== "rgba(0, 0, 0, 0)" && computed.backgroundColor !== "transparent") {
      settings.background_background = "classic";
      settings.background_color = computed.backgroundColor;
    }

    // Padding & Margins
    const parsePx = (val) => (val ? parseFloat(val) || 0 : 0);

    const padTop = parsePx(computed.paddingTop);
    const padRight = parsePx(computed.paddingRight);
    const padBottom = parsePx(computed.paddingBottom);
    const padLeft = parsePx(computed.paddingLeft);

    if (padTop || padRight || padBottom || padLeft) {
      settings.padding = {
        unit: "px",
        top: String(padTop),
        right: String(padRight),
        bottom: String(padBottom),
        left: String(padLeft),
        isLinked: padTop === padRight && padRight === padBottom && padBottom === padLeft
      };
    }

    const marTop = parsePx(computed.marginTop);
    const marRight = parsePx(computed.marginRight);
    const marBottom = parsePx(computed.marginBottom);
    const marLeft = parsePx(computed.marginLeft);

    if (marTop || marRight || marBottom || marLeft) {
      settings.margin = {
        unit: "px",
        top: String(marTop),
        right: String(marRight),
        bottom: String(marBottom),
        left: String(marLeft),
        isLinked: marTop === marRight && marRight === marBottom && marBottom === marLeft
      };
    }

    // Flex container gap
    if (computed.gap && computed.gap !== "normal") {
      const gapVal = parseFloat(computed.gap);
      if (!isNaN(gapVal)) {
        settings.gap = { unit: "px", size: gapVal, sizes: [] };
      }
    }

    // Alignment
    if (computed.textAlign) {
      settings.align = computed.textAlign;
      settings.text_align = computed.textAlign;
    }

    return settings;
  }
}
