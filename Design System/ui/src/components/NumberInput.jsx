"use client";
import React, { useState, useMemo } from "react";

// ✅ SIZE & RADIUS MAPS
const sizeMap = {
  sm: "text-sm py-1.5 px-3 h-9",
  md: "text-sm py-2 px-4 h-11",
  lg: "text-base py-2.5 px-5 h-12",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  full: "rounded-full",
};

// ✅ VARIANT / COLOR MAP (KEEPING EXACTLY AS GIVEN)
const colorMap = {
  primary: {
    shadow:
      "bg-primary text-white shadow-lg shadow-primary/40 backdrop-blur-sm",
    outlined:
      "bg-transparent text-primary-950-dark border-2 border-gray-default-100",
    flat: "text-primary bg-primary-100",
    faded:
      "text-primary-950-dark  bg-gray-default-100 hover:bg-content-content4/40 border-2 border-primary",
    underlined:
      "bg-transparent text-primary-950-dark border-b-3 border-primary-500",
  },
  secondary: {
    shadow:
      "bg-secondary text-white shadow-lg shadow-secondary/40 backdrop-blur-sm",
    outlined:
      "bg-transparent text-secondary-950-dark border-2 border-gray-default-100",
    flat: "text-secondary bg-secondary-100",
    faded:
      "text-secondary-950-dark  bg-gray-default-100 hover:bg-content-content4/40 border-2 border-secondary",
    underlined:
      "bg-transparent text-secondary-950-dark border-b-3 border-secondary-500",
  },
  success: {
    shadow:
      "bg-success text-white shadow-lg shadow-success/40 backdrop-blur-sm",
    outlined:
      "bg-transparent text-success-950-dark border-2 border-gray-default-100",
    flat: "text-success bg-success-100",
    faded:
      "text-success-950-dark  bg-gray-default-100 hover:bg-content-content4/40 border-2 border-success",
    underlined:
      "bg-transparent text-success-950-dark border-b-3 border-success-500",
  },
  warning: {
    shadow:
      "bg-warning text-white shadow-lg shadow-warning/40 backdrop-blur-sm",
    outlined:
      "bg-transparent text-warning-950-dark border-2 border-gray-default-100",
    flat: "text-warning bg-warning-100",
    faded:
      "text-warning-950-dark  bg-gray-default-100 hover:bg-content-content4/40 border-2 border-warning",
    underlined:
      "bg-transparent text-warning-950-dark border-b-3 border-warning-500",
  },
  danger: {
    shadow:
      "bg-danger text-white shadow-lg shadow-danger/40 backdrop-blur-sm",
    outlined:
      "bg-transparent text-danger-950-dark border-2 border-gray-default-100",
    flat: "text-danger bg-danger-100",
    faded:
      "text-danger-950-dark  bg-gray-default-100 hover:bg-content-content4/40 border-2 border-danger",
    underlined:
      "bg-transparent text-danger-950-dark border-b-3 border-danger-500",
  },
  default: {
    shadow:
      "bg-default text-default-950-dark shadow-lg shadow-default/40 backdrop-blur-sm",
    outlined:
      "bg-transparent text-default-950-dark border-2 border-gray-default-100",
    flat: "text-default-950-dark bg-gray-default-100",
    faded:
      "text-default-950-dark  bg-gray-default-100 hover:bg-content-content4/40 border-2 border-default",
    underlined:
      "bg-transparent text-default-950-dark border-b-3 border-gray-default-200",
  },
};

export default function NumberInput({
  title = "Label",
  description,
  helperText,
  required = false,
  range = [0, 100],
  size = "md",
  radius = "full",
  orientation = "vertical", // 'vertical' | 'horizontal'
  color = "default",
  variant = "faded",
  value,
  defaultValue,
  onChange,
  className = "",
}) {
  const [internalValue, setInternalValue] = useState(
    value ?? defaultValue ?? range[0]
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const [min, max] = range;

  const wrapperSize = sizeMap[size] || sizeMap.md;
  const wrapperRadius = radiusMap[radius] || radiusMap.full;
  const variantClass =
    colorMap?.[color]?.[variant] || colorMap.default.faded; // ✅ fallback uses theme default

  const errorMessage = useMemo(() => {
    if (currentValue === "" || currentValue === null || isNaN(currentValue))
      return `Must be between ${min} and ${max}`;
    if (currentValue < min) return `Must be equal or greater than ${min}`;
    if (currentValue > max) return `Must be equal or less than ${max}`;
    return "";
  }, [currentValue, min, max]);

  const handleChange = (next) => {
    if (next === "" || isNaN(next)) {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      return;
    }
    const num = Number(next);
    if (!isControlled) setInternalValue(num);
    onChange?.(num);
  };

  const increment = () => {
    const next = Math.min((Number(currentValue) || 0) + 1, max);
    handleChange(next);
  };

  const decrement = () => {
    const next = Math.max((Number(currentValue) || 0) - 1, min);
    handleChange(next);
  };

  const hasError = !!errorMessage;
  const helperToShow = helperText || errorMessage;

  // ARROW ICONS
  const ChevronUp = (
    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 12L10 7L15 12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronDown = (
    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path
        d="M5 8L10 13L15 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronLeft = (
    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path
        d="M12 5L7 10L12 15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronRight = (
    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="none">
      <path
        d="M8 5L13 10L8 15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const inputCommon =
    "bg-transparent outline-none border-none w-full [appearance:textfield] text-center " +
    "text-primary-950-dark " +
    "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div
      className={`flex flex-col gap-2 ${className}`}
    >
      {/* LABEL + DESCRIPTION */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-primary-950-dark">
          {title}
          {required && <span className="text-danger ml-0.5">*</span>}
        </span>
        {description && (
          <span className="text-xs text-gray-default-600">{description}</span>
        )}
      </label>

      {/* INPUT WRAPPER */}
      <div
        className={`
          inline-flex items-center justify-between
          ${wrapperSize} ${wrapperRadius} ${variantClass}
          w-full max-w-xs
          transition-colors
        `}
      >
        {orientation === "vertical" ? (
          <>
            <input
              type="number"
              min={min}
              max={max}
              value={currentValue}
              onChange={(e) => handleChange(e.target.value)}
              className={`${inputCommon} text-left`}
            />
            <div className="flex flex-col ml-2 text-primary-950-dark">
              <button
                type="button"
                onClick={increment}
                className="leading-none p-0.5 hover:opacity-80 transition"
              >
                {ChevronUp}
              </button>
              <button
                type="button"
                onClick={decrement}
                className="leading-none p-0.5 hover:opacity-80 transition"
              >
                {ChevronDown}
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={decrement}
              className="p-1 hover:opacity-80 transition text-primary-950-dark"
            >
              {ChevronLeft}
            </button>
            <input
              type="number"
              min={min}
              max={max}
              value={currentValue}
              onChange={(e) => handleChange(e.target.value)}
              className={inputCommon}
            />
            <button
              type="button"
              onClick={increment}
              className="p-1 hover:opacity-80 transition text-primary-950-dark"
            >
              {ChevronRight}
            </button>
          </>
        )}
      </div>

      {/* HELPER / ERROR TEXT */}
      {helperToShow && (
        <p
          className={`text-xs mt-1 ${
            hasError ? "text-danger" : "text-gray-default-500"
          }`}
        >
          {helperToShow}
        </p>
      )}
    </div>
  );
}
