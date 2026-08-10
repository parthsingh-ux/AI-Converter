// components/Tag.jsx
"use client";

import React from "react";
import { Icon } from "@iconify/react";

const sizeMap = {
  sm: "text-[11px] px-2 py-1 gap-1",
  md: "text-xs px-3 py-1.5 gap-1.5",
  lg: "text-sm px-4 py-2 gap-2",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

/**
 * color:
 * - "light"   → neutral light chip
 * - "gray"    → soft gray chip
 * - "dark"    → high-contrast dark chip
 */
const colorMap = {
  light:
    "bg-content-content1 text-gray-default-700 border border-gray-default-200 hover:bg-gray-default-50",
  gray:
    "bg-gray-default-50 text-gray-default-800 border border-gray-default-100 hover:bg-gray-default-100",
  dark:
    "bg-primary-900 text-content-content1 border border-primary-700 hover:bg-primary-800",
};

export default function Tag({
  label = "Tag",
  size = "md",
  radius = "md",
  color = "light",
  onRemove, // optional
  className = "",
}) {
  const sizeClasses = sizeMap[size] || sizeMap.md;
  const radiusClasses = radiusMap[radius] || radiusMap.md;
  const colorClasses = colorMap[color] || colorMap.light;

  return (
    <span
      className={[
        "inline-flex items-center font-medium",
        "transition-colors duration-150",
        "text-xs",
        sizeClasses,
        radiusClasses,
        colorClasses,
        "group", // for hover on close button
        className,
      ].join(" ")}
    >
      <span className="truncate">{label}</span>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="
            ml-1 flex items-center justify-center 
            rounded-full p-0.5 
            hover:bg-gray-default-100/70 
            active:scale-95 
            transition
          "
        >
          <Icon
            icon="bitcoin-icons:cross-outline"
            width="14"
            height="14"
            className="text-gray-default-500 group-hover:text-gray-default-700"
          />
        </button>
      )}
    </span>
  );
}
