"use client";

import React from "react";

export default function Button({
  children,
  onClick,
  spinnerPlacement = "left",
  size = "md",
  variant = "solid",
  color = "primary",
  fullWidth = false,
  width,
  borderThickness,
  isDisabled = false,
  radius = "md",
  isLoading = false,
  isIconOnly = false,
  className = "",
  type = "button",

  // 👉 NEW: when used inside ButtonGroup
  groupPosition = "single", // "single" | "start" | "middle" | "end"

  ...rest
}) {
  const disabled = isDisabled || isLoading;

  // Size config
  const sizeConfigMap = {
    sm: { px: "px-3", py: "py-1.5", text: "text-sm", icon: "w-9 h-9", iconPadding: "p-2" },
    md: { px: "px-4", py: "py-2", text: "text-base", icon: "w-11 h-11", iconPadding: "p-2.5" },
    lg: { px: "px-6", py: "py-3", text: "text-lg", icon: "w-13 h-13", iconPadding: "p-3" },
  };
  const sizeMap = sizeConfigMap[size] || sizeConfigMap.md;

  // Border thickness mapping
  const borderMap = {
    "1px": "border border-[1px]",
    "2px": "border-2",
    "3px": "border-[3px]",
    "4px": "border-[4px]",
  };
  const borderCls =
    borderThickness && borderThickness.startsWith("border")
      ? borderThickness
      : borderMap[borderThickness] || "";

  // Radius (normal)
  const baseRadiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  const defaultRadiusClass = baseRadiusMap[radius] || baseRadiusMap.md;

  // 👉 Group-aware radius
  let groupRadiusClass = defaultRadiusClass;
  if (groupPosition === "start") {
    groupRadiusClass = "rounded-l-md";
  } else if (groupPosition === "middle") {
    groupRadiusClass = "rounded-none";
  } else if (groupPosition === "end") {
    groupRadiusClass = "rounded-r-md";
  } else if (groupPosition === "single") {
    groupRadiusClass = defaultRadiusClass;
  }

  // Colors & Variants
  const colorMap = {
    primary: {
      solid: "bg-primary text-white",
      outlined: "bg-transparent text-primary border-2 border-primary",
      light: "bg-transparent text-primary",
      flat: "text-primary bg-default/20",
      faded:
        "text-primary border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
      shadow:
        "bg-primary text-white shadow-lg shadow-primary/40 backdrop-blur-sm ",
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
        "bg-success text-white shadow-lg shadow-success/40 backdrop-blur-sm ",
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
        "bg-secondary text-white shadow-lg shadow-secondary/40 backdrop-blur-sm ",
      ghost: "bg-transparent text-secondary border-2 border-secondary",
    },
    warning: {
      solid: "bg-warning text-primary-950-dark",
      outlined: "bg-transparent text-warning border-2 border-warning",
      light: "bg-transparent text-warning",
      flat: "text-warning bg-default/20",
      faded:
        "text-warning border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
      shadow:
        "bg-warning text-white shadow-lg shadow-warning/40 backdrop-blur-sm ",
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
        "bg-gray-default-100 text-primary-950-dark  shadow-lg shadow-default/40 backdrop-blur-sm ",
      ghost: "bg-transparent text-primary-950-dark border-2 border-default",
    },
    danger: {
      solid: "bg-danger text-primary-950-dark",
      outlined: "bg-transparent text-danger border-2 border-danger",
      light: "bg-transparent text-danger",
      flat: "text-danger bg-default/20",
      faded:
        "text-danger border-2 border-default bg-gray-default-100 hover:bg-content-content4/40",
      shadow:
        "bg-danger text-white shadow-lg shadow-danger/40 backdrop-blur-sm ",
      ghost: "bg-transparent text-danger border-2 border-danger",
    },
  };

  const variantClasses = colorMap[color]?.[variant] || colorMap.primary.solid;

  // Spinner
  const Spinner = ({ sizePx = 16 }) => (
    <svg
      className="animate-spin"
      width={sizePx}
      height={sizePx}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // Width handling
  const widthStyle =
    width && !width.startsWith("w-") ? { width } : undefined;

  const widthClass =
    width && width.startsWith("w-")
      ? width
      : fullWidth
      ? "w-full"
      : "";

  // Base class
  const base = `
    inline-flex items-center justify-center
    ${
      isIconOnly
        ? `${sizeMap.icon} ${sizeMap.iconPadding}`
        : `${sizeMap.px} ${sizeMap.py}`
    }
    ${isIconOnly ? "" : sizeMap.text}
    ${groupRadiusClass} ${variantClasses}
    ${borderCls}
    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300
    ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
    ${widthClass} ${className}
  `;

  const SpinnerEl = (
    <Spinner sizePx={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
  );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={widthStyle}
      className={base}
      aria-disabled={disabled}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && spinnerPlacement === "left" && (
        <span className="mr-2 flex items-center">{SpinnerEl}</span>
      )}

      {spinnerPlacement === "center" && isLoading ? (
        <span className="flex items-center justify-center">
          {SpinnerEl}
        </span>
      ) : (
        children
      )}

      {isLoading && spinnerPlacement === "right" && (
        <span className="ml-2 flex items-center">{SpinnerEl}</span>
      )}
    </button>
  );
}
``
/*
 * 👉 ButtonGroup
 * - orientation: "horizontal" | "vertical"
 * - size, variant, color, radius (optional overrides for all children)
 */
export function ButtonGroup({
  children,
  orientation = "horizontal",
  size,
  variant,
  color,
  radius = "md",
  className = "",
}) {
  const isHorizontal = orientation === "horizontal";

  const containerClass = isHorizontal
    ? "inline-flex"
    : "inline-flex flex-col";

  const items = React.Children.toArray(children).filter(Boolean);
  const total = items.length;

  return (
    <div className={`${containerClass} ${className}`}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        let groupPosition = "middle";
        if (total === 1) groupPosition = "single";
        else if (index === 0) groupPosition = "start";
        else if (index === total - 1) groupPosition = "end";

        return React.cloneElement(child, {
          size: size ?? child.props.size,
          variant: variant ?? child.props.variant,
          color: color ?? child.props.color,
          radius,
          groupPosition,
        });
      })}
    </div>
  );
}
