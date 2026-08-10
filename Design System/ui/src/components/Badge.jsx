"use client";
import React from "react";

const colorMap = {
  primary: {
    solid: "bg-primary text-white",
    outlined: "bg-transparent text-primary border-2 border-primary",
    light: "bg-transparent text-primary",
    flat: "text-primary bg-default/20",
    faded:
      "text-primary border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
    shadow:
      "bg-primary text-white shadow-lg shadow-primary/40 backdrop-blur-sm",
    ghost: "bg-transparent text-primary border-2 border-primary",
  },
  success: {
    solid: "bg-success text-white",
    outlined: "bg-transparent text-success border-2 border-success",
    light: "bg-transparent text-success",
    flat: "text-success bg-default/20",
    faded:
      "text-success border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
    shadow:
      "bg-success text-white shadow-lg shadow-success/40 backdrop-blur-sm",
    ghost: "bg-transparent text-success border-2 border-success",
  },
  secondary: {
    solid: "bg-secondary text-white",
    outlined: "bg-transparent text-secondary border-2 border-secondary",
    light: "bg-transparent text-secondary",
    flat: "text-secondary bg-default/20",
    faded:
      "text-secondary border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
    shadow:
      "bg-secondary text-white shadow-lg shadow-secondary/40 backdrop-blur-sm",
    ghost: "bg-transparent text-secondary border-2 border-secondary",
  },
  warning: {
    solid: "bg-warning text-white",
    outlined: "bg-transparent text-warning border-2 border-warning",
    light: "bg-transparent text-warning",
    flat: "text-warning bg-default/20",
    faded:
      "text-warning border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
    shadow:
      "bg-warning text-white shadow-lg shadow-warning/40 backdrop-blur-sm",
    ghost: "bg-transparent text-warning border-2 border-warning",
  },
  neutral: {
    solid: "bg-default text-primary-950-dark",
    outlined:
      "bg-transparent text-primary-950-dark border-2 border-default",
    light: "bg-transparent text-primary-950-dark",
    flat: "text-primary-950-dark bg-default/40",
    faded:
      "text-primary-950-dark border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
    shadow:
      "bg-gray-default-100 text-primary-950-dark shadow-lg shadow-default/40 backdrop-blur-sm",
    ghost: "bg-transparent text-primary-950-dark border-2 border-default",
  },
  danger: {
    solid: "bg-danger text-white",
    outlined: "bg-transparent text-danger border-2 border-danger",
    light: "bg-transparent text-danger",
    flat: "text-danger bg-default/20",
    faded:
      "text-danger border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
    shadow:
      "bg-danger text-white shadow-lg shadow-danger/40 backdrop-blur-sm",
    ghost: "bg-transparent text-danger border-2 border-danger",
  },
};

// Make sizes a bit more distinct
const SIZE_MAP = { sm: 16, md: 22, lg: 30 };

const RADIUS_MAP = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
};

export default function Badge({
  content,
  color = "primary",
  variant = "solid",
  size = "md",
  radius = "full",
  placement = "top-right",
  isInvisible = false,
  showOutline = false,
  offset = 4,
  className = "",
}) {
  // Resolve numeric size
  const px =
    typeof size === "number" ? size : SIZE_MAP[size] || SIZE_MAP.md;
  const radiusValue = RADIUS_MAP[radius] || radius;

  // pick classes from map
  const colorClasses =
    colorMap[color]?.[variant] || colorMap.neutral.solid;

  const outlineClass = showOutline ? "border-2 border-default" : "";
  const invisibleClass = isInvisible ? "opacity-0 pointer-events-none" : "";

  // placement
  const placementStyle = {
    position: "absolute",
  };

  switch (placement) {
    case "top-left":
      placementStyle.top = offset;
      placementStyle.left = offset;
      break;
    case "top-right":
      placementStyle.top = offset;
      placementStyle.right = offset;
      break;
    case "bottom-left":
      placementStyle.bottom = offset;
      placementStyle.left = offset;
      break;
    case "bottom-right":
      placementStyle.bottom = offset;
      placementStyle.right = offset;
      break;
    case "center":
      placementStyle.top = "50%";
      placementStyle.left = "50%";
      placementStyle.transform = "translate(-50%, -50%)";
      break;
    default:
      placementStyle.top = offset;
      placementStyle.right = offset;
  }

  const isDot = variant === "dot";

  return (
    <span className={className} style={placementStyle}>
      <span
        className={`flex items-center justify-center ${colorClasses} ${outlineClass} ${invisibleClass}`}
        style={{
          width: px,
          minWidth: px,
          height: px,
          padding: isDot ? 0 : "0 6px",
          borderRadius: radiusValue,
          fontSize: Math.round(px * 0.55),
          fontWeight: 600,
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {isDot ? "" : content}
      </span>
    </span>
  );
}
