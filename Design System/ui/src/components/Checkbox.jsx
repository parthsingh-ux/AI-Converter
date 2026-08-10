"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

export default function Checkbox({
  color = "default",
  size = "md",
  isDisabled = false,
  lineThrough = false,
  children,
  radius = "rounded-md",
  defaultChecked = false,
  onChange,

  hoverBorderColor = "",
  hoverBgColor = "",
  hoverTextColor = "",
}) {
  const [checked, setChecked] = useState(defaultChecked);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  const selectedSize = sizeClasses[size] || sizeClasses.md;

  const colorVariants = {
    default: {
      normal: "bg-white border-2 border-gray-default-500",
      hover: "hover:bg-gray-default-500/10",
      active: "bg-gray-default-500 border-gray-default-500 border-2",
      icon: "text-primary-950-dark",
      textNormal: "text-primary-950-dark",
      textActive: "text-primary-950-dark",
    },
    primary: {
      normal: "bg-white border-2 border-gray-default-500",
      hover: "hover:bg-primary-50",
      active: "bg-primary border-primary border-2",
      icon: "text-white",
      textNormal: "text-primary-950-dark",
      textActive: "text-primary-950-dark",
    },
    secondary: {
      normal: "bg-white border-2 border-gray-default-500",
      hover: "hover:bg-primary-50",
      active: "bg-secondary border-secondary border-2",
      icon: "text-white",
      textNormal: "text-primary-950-dark",
      textActive: "text-primary-950-dark",
    },
    success: {
      normal: "bg-white border-2 border-gray-default-500",
      hover: "hover:bg-primary-50",
      active: "bg-success border-success border-2",
      icon: "text-white",
      textNormal: "text-primary-950-dark",
      textActive: "text-primary-950-dark",
    },
    warning: {
      normal: "bg-white border-2 border-gray-default-500",
      hover: "hover:bg-primary-50",
      active: "bg-warning border-warning border-2",
      icon: "text-white",
      textNormal: "text-primary-950-dark",
      textActive: "text-primary-950-dark",
    },
    danger: {
      normal: "bg-white border-2 border-gray-default-500",
      hover: "hover:bg-primary-50",
      active: "bg-danger border-danger border-2",
      icon: "text-white",
      textNormal: "text-primary-950-dark",
      textActive: "text-primary-950-dark",
    },
  };

  const variant = colorVariants[color] ?? colorVariants.default;

  const uncheckedHoverClasses =
    !isDisabled && (hoverBorderColor || hoverBgColor)
      ? `${hoverBorderColor ? `hover:${hoverBorderColor}` : ""} ${
          hoverBgColor ? `hover:${hoverBgColor}` : ""
        }`
      : variant.hover;

  const labelHoverTextClass =
    !isDisabled && hoverTextColor ? `hover:${hoverTextColor}` : "";

  const activeHoverClasses = !isDisabled ? variant.activeHover ?? "" : "";

  const handleToggle = () => {
    if (isDisabled) return;
    const newState = !checked;
    setChecked(newState);
    if (onChange) onChange(newState);
  };

  const baseBoxClasses = [
    "flex",
    "justify-center",
    "items-center",
    "transition-all",
    "duration-200",
    radius,
    selectedSize,
  ].join(" ");

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${
        isDisabled ? "opacity-50 cursor-not-allowed" : labelHoverTextClass
      }`}
      onClick={handleToggle}
    >
      <div
        className={`${baseBoxClasses} ${
          checked
            ? `${variant.active} ${activeHoverClasses}`
            : `${variant.normal} ${uncheckedHoverClasses}`
        }`}
      >
        {checked && (
          <Icon
            icon="mdi:check"
            className={variant.icon ?? "text-white"}
            width={size === "lg" ? 18 : size === "sm" ? 12 : 14}
          />
        )}
      </div>

      <span
        className={`
          ${checked ? variant.textActive : variant.textNormal}
          ${lineThrough && checked ? "line-through " : ""}
        `}
      >
        {children}
      </span>
    </label>
  );
}

/**
 * CheckboxGroup
 * Props:
 * - orientation: "vertical" | "horizontal"
 * - className?: string
 * - children: Checkbox components
 *
 * It only controls layout; all Checkbox props stay the same.
 */
export function CheckboxGroup({
  orientation = "vertical",
  className = "",
  children,
}) {
  const layoutClass =
    orientation === "horizontal"
      ? "flex flex-row flex-nowrap items-center gap-4 overflow-x-auto"
      : "flex flex-col gap-4";

  return <div className={`${layoutClass} ${className}`}>{children}</div>;
}

