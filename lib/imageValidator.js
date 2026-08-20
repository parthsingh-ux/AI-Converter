/**
 * IMAGE VALIDATION & AUTOMATIC CORRECTION ENGINE
 * Compares generated Elementor image widget settings against original browser-rendered dimensions.
 * Automatically patches width, height, aspect-ratio, object-fit, and container settings if tolerance is exceeded.
 */

const DEFAULT_TOLERANCES = {
  width: 2, // px
  height: 2, // px
  position: 2, // px
  aspectRatio: 0.01,
};

export function validateAndRepairImageDimensions(elementorTemplate, imageAnalysisMap, tolerances = DEFAULT_TOLERANCES) {
  const warnings = [];
  let correctionsApplied = 0;

  function traverseNode(node, parentContainer = null) {
    if (!node || typeof node !== "object") return;

    if (node.elType === "widget" && (node.widgetType === "image" || node.widgetType === "image-box")) {
      const settings = node.settings || {};
      const imgVal = settings.image;
      const rawUrl = typeof imgVal === "string" ? imgVal : imgVal?.url || settings.url || settings.src || "";

      // Match against browser-rendered image analysis map
      const analysisData = imageAnalysisMap[rawUrl] || Object.values(imageAnalysisMap).find((v) => v.source === rawUrl || v.assetId === node.id);

      if (analysisData && analysisData.viewports?.desktop) {
        const desktopMeasured = analysisData.viewports.desktop.rendered;
        const desktopComputed = analysisData.viewports.desktop.computed;
        const containerMeasured = analysisData.viewports.desktop.container;

        // Current assigned values in Elementor JSON
        const assignedWidth = settings.width?.size || (typeof settings.width === "number" ? settings.width : null);
        const assignedHeight = settings.height?.size || (typeof settings.height === "number" ? settings.height : null);

        let widthDiff = assignedWidth ? Math.abs(assignedWidth - desktopMeasured.width) : 0;
        let heightDiff = assignedHeight ? Math.abs(assignedHeight - desktopMeasured.height) : 0;

        // Check if difference exceeds tolerance
        if (widthDiff > tolerances.width || heightDiff > tolerances.height || !settings.object_fit) {
          correctionsApplied++;
          warnings.push(
            `Image [${node.id}] auto-repaired: measured ${desktopMeasured.width}x${desktopMeasured.height}px vs assigned ${assignedWidth || "auto"}x${assignedHeight || "auto"}px.`
          );

          // 1. Enforce exact computed dimensions & aspect ratio
          settings.image_size = "custom";
          settings.image_custom_dimension = {
            width: desktopMeasured.width,
            height: desktopMeasured.height,
          };

          settings.width = { unit: "px", size: desktopMeasured.width };
          settings.height = { unit: "px", size: desktopMeasured.height };

          if (analysisData.viewports.tablet?.rendered) {
            settings.width_tablet = { unit: "px", size: analysisData.viewports.tablet.rendered.width };
            settings.height_tablet = { unit: "px", size: analysisData.viewports.tablet.rendered.height };
          }

          if (analysisData.viewports.mobile?.rendered) {
            settings.width_mobile = { unit: "%", size: 100 };
            settings.height_mobile = { unit: "px", size: analysisData.viewports.mobile.rendered.height };
          }

          // 2. Preserve object-fit & object-position
          settings.object_fit = desktopComputed.objectFit || "cover";
          settings.object_position = desktopComputed.objectPosition || "center center";

          // 3. Patch parent container width & height to match measured container
          if (parentContainer && containerMeasured && parentContainer.settings) {
            if (!parentContainer.settings.width || parentContainer.settings.width.size < desktopMeasured.width) {
              parentContainer.settings.width = { unit: "px", size: containerMeasured.width };
            }
          }
        }
      }
    }

    if (Array.isArray(node.elements)) {
      node.elements.forEach((child) => traverseNode(child, node.elType === "container" ? node : parentContainer));
    }
  }

  const parts = ["header_template", "footer_template", "content_template"];
  if (typeof elementorTemplate === "object") {
    parts.forEach((p) => {
      if (Array.isArray(elementorTemplate[p])) {
        elementorTemplate[p].forEach((n) => traverseNode(n, null));
      }
    });
  } else if (Array.isArray(elementorTemplate)) {
    elementorTemplate.forEach((n) => traverseNode(n, null));
  }

  return {
    template: elementorTemplate,
    correctionsApplied,
    warnings,
  };
}
