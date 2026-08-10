// components/Tooltip.jsx
"use client";

import React from "react";

const sizeMap = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
  lg: "px-5 py-2 text-sm",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const colorMap = {
  primary: {
    bg: "bg-primary shadow-sm",
    text: "text-white",
  },
  secondary: {
    bg: "bg-secondary",
    text: "text-white",
  },
  success: {
    bg: "bg-success",
    text: "text-white",
  },
  warning: {
    bg: "bg-warning",
    text: "text-primary-950-dark",
  },
  danger: {
    bg: "bg-danger",
    text: "text-white",
  },
  neutral: {
    bg: "bg-gray-100",
    text: "text-primary-950-dark",
  },
  default: {
    bg: "bg-white border border-gray-200",
    text: "text-primary-950-dark",
  },
};

function getArrowClasses(direction, position, color) {
  const base =
    "absolute rounded-xs w-2.5 h-2.5 rotate-45 pointer-events-none"; // square rotated 45°

  // Get arrow background color based on color variant
  const arrowBg = colorMap[color]?.bg || colorMap.primary.bg;

  // along side (start/center/end)
  let posAlong = "";
  if (direction === "top" || direction === "bottom") {
    if (position === "start") posAlong = "left-3";
    else if (position === "end") posAlong = "right-3";
    else posAlong = "left-1/2 -translate-x-1/2";
  } else {
    if (position === "start") posAlong = "top-2";
    else if (position === "end") posAlong = "bottom-2";
    else posAlong = "top-1/2 -translate-y-1/2";
  }

  // side offset
  let side = "";
  switch (direction) {
    case "top":
      side = "bottom-[2px] translate-y-1/2";
      break;
    case "bottom":
      side = "top-[2px] -translate-y-1/2";
      break;
    case "left":
      side = "right-[2px] translate-x-1/2";
      break;
    case "right":
      side = "left-[2px] -translate-x-1/2";
      break;
    default:
      side = "top-[2px] -translate-y-1/2";
  }

  // z-0 so it stays behind pill (which is z-10)
  return `${base} ${side} ${posAlong} ${arrowBg} z-0`;
}

/**
 * Tooltip
 *
 * Props:
 * - label: string | ReactNode
 * - color: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "default"
 * - textColor: string (optional override, CSS color value)
 * - arrowDirection: "top" | "right" | "bottom" | "left"
 * - arrowPosition: "start" | "center" | "end"
 * - size: "sm" | "md" | "lg"
 * - radius: "none" | "sm" | "md" | "lg" | "full"
 * - className: string
 */
export default function Tooltip({
  label = "I am a tooltip",
  color = "primary",
  textColor,
  arrowDirection = "bottom",
  arrowPosition = "center",
  size = "md",
  radius = "full",
  className = "",
}) {
  const variant = colorMap[color] || colorMap.primary;
  const sizeClasses = sizeMap[size] || sizeMap.md;
  const radiusClasses = radiusMap[radius] || radiusMap.full;

  const arrowClasses = getArrowClasses(arrowDirection, arrowPosition, color);

  return (
    <div className={`inline-flex relative max-w-full ${className}`}>
      {/* Main pill container */}
      <div
        className={[
          // layout + responsiveness
          "relative z-10 inline-flex items-center justify-center",
          "max-w-full whitespace-normal break-words text-center",
          "transition-all duration-150",
          // styling
          variant.bg,
          variant.text,
          sizeClasses,
          radiusClasses,
        ].join(" ")}
        style={textColor ? { color: textColor } : undefined}
      >
        {label}
      </div>

      {/* Arrow behind the pill (sibling, lower z-index) */}
      <span className={arrowClasses} />
    </div>
  );
}
