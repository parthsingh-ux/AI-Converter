"use client";

import React, { useState } from "react";

const sizeMap = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};

/* ACTIVE background for solid / bordered / light */
const activeBgMap = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger: "bg-danger-500",
  default: "bg-gray-default-100",
};

/* ACTIVE text color for solid / bordered / light */
const activeTextSolidMap = {
  primary: "text-content-content1",
  secondary: "text-content-content1",
  success: "text-content-content1",
  warning: "text-primary-950-dark",
  danger: "text-content-content1",
  default: "text-primary-950-dark",
};

/* ACTIVE text color for underlined variant */
const activeTextUnderlineMap = {
  primary: "text-primary-500",
  secondary: "text-secondary-500",
  success: "text-success-500",
  warning: "text-warning-500",
  danger: "text-danger-500",
  default: "text-gray-default-800",
};

/* ACTIVE border color for underlined variant */
const activeBorderUnderlineMap = {
  primary: "border-primary-500",
  secondary: "border-secondary-500",
  success: "border-success-500",
  warning: "border-warning-500",
  danger: "border-danger-500",
  default: "border-gray-default-300",
};

const inactiveText = "text-gray-default-500";

export default function Tabs({
  items = ["World", "N.Y", "Business", "Arts", "Science"],
  value,
  defaultValue,
  onChange,
  color = "default", // primary | secondary | success | warning | danger | default
  variant = "solid", // "solid" | "underlined" | "bordered" | "light"
  size = "md", // "sm" | "md" | "lg"
  fullWidth = false,
  isDisabled = false,
  radius = "sm", // "none" | "sm" | "md" | "lg" | "full"
  animation = "smooth", // "smooth" | "none"
  className = "",
}) {
  const [internalValue, setInternalValue] = useState(
    defaultValue || items[0]
  );

  const current = value !== undefined ? value : internalValue;

  const handleChange = (val) => {
    if (isDisabled) return;
    if (value === undefined) setInternalValue(val);
    onChange && onChange(val);
  };

  const transitionClass =
    animation === "smooth"
      ? "transition-all duration-200 ease-out"
      : "";

  /* -------- CONTAINER CLASSES PER VARIANT -------- */
  const getContainerClasses = () => {
    switch (variant) {
      case "solid":
        return [
          "inline-flex items-center bg-gray-default-50 p-1",
          "border border-gray-default-100",
          radiusMap[radius],
          className,
        ].join(" ");

      case "underlined":
        return ["flex items-center gap-6", className].join(" ");

      case "bordered":
        return [
          "inline-flex items-center bg-content-content1 p-1",
          "border border-gray-default-200",
          radiusMap[radius],
          className,
        ].join(" ");

      case "light":
        return ["inline-flex items-center bg-transparent", className].join(" ");

      default:
        return className;
    }
  };

  /* -------- TAB CLASSES PER VARIANT -------- */
  const getTabClasses = (item) => {
    const isActive = current === item;

    const base = [
      "cursor-pointer",
      sizeMap[size],
      fullWidth
        ? "flex-1 text-center"
        : "inline-flex items-center justify-center",
      transitionClass,
    ];

    if (isDisabled) base.push("cursor-not-allowed opacity-50");

    const activeBg = activeBgMap[color] || activeBgMap.default;
    const activeTextSolid = activeTextSolidMap[color] || activeTextSolidMap.default;
    const activeTextUnderline =
      activeTextUnderlineMap[color] || activeTextUnderlineMap.default;
    const activeBorderUnderline =
      activeBorderUnderlineMap[color] || activeBorderUnderlineMap.default;

    switch (variant) {
      case "solid":
        base.push(
          isActive
            ? `${activeBg} ${activeTextSolid}`
            : `bg-transparent ${inactiveText}`
        );
        break;

      case "underlined":
        base.push(
          "pb-1",
          isActive
            ? `border-b-2 ${activeBorderUnderline} ${activeTextUnderline}`
            : `border-b-2 border-transparent ${inactiveText}`
        );
        break;

      case "bordered":
        base.push(
          isActive
            ? `${activeBg} ${activeTextSolid}`
            : `bg-transparent ${inactiveText}`
        );
        break;

      case "light":
        base.push(
          isActive
            ? `${activeBg} ${activeTextSolid}`
            : `bg-transparent ${inactiveText}`
        );
        break;

      default:
        break;
    }

    // radius styling for non-underlined variants
    if (variant !== "underlined") {
      base.push(radiusMap[radius]);
    }

    return base.join(" ");
  };

  return (
    <div className={getContainerClasses()}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          disabled={isDisabled}
          onClick={() => handleChange(item)}
          className={getTabClasses(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
