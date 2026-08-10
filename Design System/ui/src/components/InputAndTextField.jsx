"use client";

import React, { useState } from "react";

const sizeMap = {
  sm: "text-xs py-1.5",
  md: "text-sm py-2",
  lg: "text-base py-2.5",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const colorVariantMap = {
  primary: {
    flat: "bg-primary-100 hover:bg-primary-200 text-primary-950-dark focus-within:ring-primary-950-dark",
    faded:
      "bg-primary-100 text-primary-950-dark border border-primary-200 focus-within:ring-primary-950-dark",
    bordered:
      "bg-white text-primary-950-dark border border-primary-200 focus-within:ring-gray-400",
    underlined:
      " border-b border-primary-200 focus-within:outline-none focus-within:border-gray-700 focus-within:border-b-2",
  },
    secondary: {
    flat: "bg-secondary-100 hover:bg-secondary-200 text-secondary-950-dark focus-within:ring-secondary-950-dark",
    faded:
      "bg-secondary-100 text-secondary-950-dark border border-secondary-200 focus-within:ring-secondary-950-dark",
    bordered:
      "bg-white text-secondary-950-dark border border-secondary-200 focus-within:ring-gray-400",
    underlined:
      " border-b border-secondary-200 focus-within:outline-none focus-within:border-gray-700 focus-within:border-b-2",
  },
    success: {
    flat: "bg-success-100 hover:bg-success-200 text-success-950-dark focus-within:ring-success-950-dark",
    faded:
      "bg-success-100 text-success-950-dark border border-success-200 focus-within:ring-success-950-dark",
    bordered:
      "bg-white text-success-950-dark border border-success-200 focus-within:ring-gray-400",
    underlined:
      " border-b border-success-200 focus-within:outline-none focus-within:border-gray-700 focus-within:border-b-2",
  },
    warning: {
    flat: "bg-warning-100 hover:bg-warning-200 text-warning-950-dark focus-within:ring-warning-950-dark",
    faded:
      "bg-warning-100 text-warning-950-dark border border-warning-200 focus-within:ring-warning-950-dark",
    bordered:
      "bg-white text-warning-950-dark border border-warning-200 focus-within:ring-gray-400",
    underlined:
      " border-b border-warning-200 focus-within:outline-none focus-within:border-gray-700 focus-within:border-b-2",
  },
    danger: {
    flat: "bg-danger-100 hover:bg-danger-200 text-danger-950-dark focus-within:ring-danger-950-dark",
    faded:
      "bg-danger-100 text-danger-950-dark border border-danger-200 focus-within:ring-danger-950-dark",
    bordered:
      "bg-white text-danger-950-dark border border-danger-200 focus-within:ring-gray-400",
    underlined:
      " border-b border-danger-200 focus-within:outline-none focus-within:border-gray-700 focus-within:border-b-2",
  },
  neutral: {
    flat: "bg-gray-default-100 hover:bg-gray-default-200 text-primary-950-dark focus-within:ring-primary-950-dark",
    faded:
      "bg-gray-default-100 text-primary-950-dark border border-gray-default-200 focus-within:ring-primary-950-dark",
    bordered:
      "bg-white text-primary-950-dark border border-gray-default-200 focus-within:ring-gray-400",
    underlined:
      " border-b border-gray-default-200 focus-within:outline-none focus-within:border-gray-700 focus-within:border-b-2",
  },
};

export default function TextField({
  color = "neutral",
  variant = "flat",
  size = "md",
  fullWidth = false,
  isDisabled = false,
  isMultiline = false,
  label,
  radius = "md",
  labelPlacement = "outside", // "outside" | "inside" | "outside-left"
  validationBehavior = "none", // "none" | "valid" | "invalid"
  isPassword = false,
  value,
  defaultValue = "",
  placeholder = "",
  onChange,
  className = "",
  ...props
}) {
  const [internal, setInternal] = useState(defaultValue);

  const isControlled = typeof value === "string";
  const currentValue = isControlled ? value : internal;

  const sizeCls = sizeMap[size] || sizeMap.md;
  const radiusCls = radiusMap[radius] || radiusMap.md;
  const colorCls =
    colorVariantMap[color]?.[variant] || colorVariantMap.neutral.flat;

  const isUnderlined = variant === "underlined";
  const isInside = labelPlacement === "inside";

  const containerLayout =
    labelPlacement === "outside-left"
      ? "flex items-center gap-3"
      : "flex flex-col gap-2";

  const validationBorder =
    validationBehavior === "invalid"
      ? "ring-2 ring-danger/60 border-danger"
      : validationBehavior === "valid"
      ? "ring-2 ring-success/60 border-success"
      : "";

  const wrapperCls = [
    "transition-all duration-150",
    isInside ? "flex flex-col gap-0.5" : "flex items-center gap-2",
    colorCls,
    isInside
      ? `px-3 py-2 ${radiusCls}`
      : isUnderlined
      ? "px-1"
      : `px-3 ${radiusCls}`,
    fullWidth ? "w-full" : "w-auto",
    isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-text",
    !isUnderlined && "focus-within:ring-2",
    validationBorder,
  ]
    .filter(Boolean)
    .join(" ");

  const inputCls = [
    "w-full bg-transparent outline-none",
    "placeholder:text-gray-default-400",
    sizeCls,
    isDisabled ? "cursor-not-allowed" : "cursor-text",
  ]
    .filter(Boolean)
    .join(" ");

  const LabelEl =
    label && (
      <span className="text-xs font-medium text-gray-default-600">
        {label}
      </span>
    );

  const hasValue = Boolean(currentValue);

  const handleChange = (e) => {
    const next = e.target.value;
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className={`inline-flex ${containerLayout} ${className}`}>
      {labelPlacement === "outside-left" && LabelEl}

      <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
        {labelPlacement === "outside" && LabelEl}

        <div className={wrapperCls}>
          {labelPlacement === "inside" && (
            <span className="text-[11px] leading-none text-gray-default-400">
              {label}
            </span>
          )}

          {isMultiline ? (
            <textarea
              disabled={isDisabled}
              className={inputCls + " resize-none"}
              value={currentValue}
              placeholder={placeholder}
              onChange={handleChange}
              {...props}
            />
          ) : (
            <input
              disabled={isDisabled}
              type={isPassword ? "password" : "text"}
              className={inputCls}
              value={currentValue}
              placeholder={placeholder}
              onChange={handleChange}
              {...props}
            />
          )}
        </div>

        {validationBehavior === "invalid" && hasValue && (
          <p className="mt-1 text-xs text-danger">Invalid value.</p>
        )}

        {validationBehavior === "valid" && hasValue && (
          <p className="mt-1 text-xs text-success">Looks good.</p>
        )}
      </div>
    </div>
  );
}
