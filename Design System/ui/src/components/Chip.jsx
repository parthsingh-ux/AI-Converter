"use client";

import React from "react";

/**
 * Fully map-driven Chip component
 * Colors + Variants come ONLY from the provided colorMap
 */
export default function Chip({
  variant = "solid",
  color = "primary",
  size = "md",
  radius = "full",
  isDisabled = false,
  children,
  onClick,
  leftIcon,
  rightIcon,
  className = "",
}) {
  // -----------------------------
  // SIZE MAP
  // -----------------------------
  const sizeMap = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };
  const sizeClass = sizeMap[size] || sizeMap.md;

  // -----------------------------
  // RADIUS MAP
  // -----------------------------
  const radiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  const radiusClass = radiusMap[radius] || radiusMap.full;

  // -----------------------------
  // PROVIDED COLOR MAP
  // -----------------------------
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
      outlined: "bg-transparent text-primary-950-dark border-2 border-default",
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

  // Validate color
  if (!colorMap[color]) {
    throw new Error(`Chip: Unknown color "${color}". Add it to colorMap.`);
  }

  // Validate variant under color
  if (!colorMap[color][variant]) {
    throw new Error(
      `Chip: Variant "${variant}" does not exist in color "${color}" map.`
    );
  }

  // final classes from the map
  const colorClasses = colorMap[color][variant];

  // -----------------------------
  // FINAL CLASSES
  // -----------------------------
  const disabledClass = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const classes = [
    "inline-flex items-center gap-2 select-none transition-all w-max",
    sizeClass,
    radiusClass,
    colorClasses,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (!isDisabled && onClick) onClick(e);
  };

  return (
    <button className={classes} onClick={handleClick}>
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      <span className="whitespace-nowrap">{children}</span>
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
