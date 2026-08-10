"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";

// 🔹 Radius + size maps
const radiusMap = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  full: "rounded-full",
};

const sizeMap = {
  sm: "text-sm py-1.5 px-3 h-9",
  md: "text-sm py-2 px-4 h-11",
  lg: "text-base py-2.5 px-5 h-12",
};

const colorMap = {
  primary: {
    flat:
      "bg-primary-100 hover:bg-primary-50 text-primary-950-dark focus-visible:ring-primary",
    faded:
      "bg-gray-default-50 text-primary-950-dark border-2 border-gray-default-50 hover:border-primary-500 focus-visible:ring-primary",
    bordered:
      "bg-transparent text-primary-950-dark border-2 border-gray-default-50 focus-visible:ring-primary",
    underlined:
      "bg-transparent text-primary-950-dark border-b-2 border-gray-default-50 focus-visible:ring-primary",
  },
  success: {
    flat:
      "bg-success-100 hover:bg-success-50 text-primary-950-dark focus-visible:ring-success",
    faded:
      "bg-gray-default-50 text-primary-950-dark border-2 border-gray-default-50 hover:border-success-500 focus-visible:ring-success",
    bordered:
      "bg-transparent text-primary-950-dark border-2 border-gray-default-50 focus-visible:ring-success",
    underlined:
      "bg-transparent text-primary-950-dark border-b-2 border-gray-default-50 focus-visible:ring-success",
  },
  warning: {
    flat:
      "bg-warning-100 hover:bg-warning-50 text-primary-950-dark focus-visible:ring-warning",
    faded:
      "bg-gray-default-50 text-primary-950-dark border-2 border-gray-default-50 hover:border-warning-500 focus-visible:ring-warning",
    bordered:
      "bg-transparent text-primary-950-dark border-2 border-gray-default-50 focus-visible:ring-warning",
    underlined:
      "bg-transparent text-primary-950-dark border-b-2 border-gray-default-50 focus-visible:ring-warning",
  },
  danger: {
    flat:
      "bg-danger-100 hover:bg-danger-50 text-primary-950-dark focus-visible:ring-danger",
    faded:
      "bg-gray-default-50 text-primary-950-dark border-2 border-gray-default-50 hover:border-danger-500 focus-visible:ring-danger",
    bordered:
      "bg-transparent text-primary-950-dark border-2 border-gray-default-50 focus-visible:ring-danger",
    underlined:
      "bg-transparent text-primary-950-dark border-b-2 border-gray-default-50 focus-visible:ring-danger",
  },
  default: {
    flat:
      "bg-gray-default-50 hover:bg-gray-default-100 text-primary-950-dark focus-visible:ring-default",
    faded:
      "bg-gray-default-50 text-primary-950-dark border-2 border-gray-default-50 hover:border-gray-default-300 focus-visible:ring-default",
    bordered:
      "bg-transparent text-primary-950-dark border-2 border-gray-default-100 focus-visible:ring-default",
    underlined:
      "bg-transparent text-primary-950-dark border-b-2 border-gray-default-100 focus-visible:ring-default",
  },
};

const getVariantClasses = (color, variant) => {
  const key = colorMap[color] ? color : "default";
  const byColor = colorMap[key];
  if (!byColor) return "";
  if (variant && byColor[variant]) return byColor[variant];
  return byColor.faded ?? "";
};

function ChevronDownIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7L10 12L15 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClearIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 6L14 14M14 6L6 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Select({
  label,
  placeholder,
  options = [],
  size = "md",
  color = "default",
  variant = "faded",
  radius = "full",
  fullWidth = false,
  isDisabled = false,
  isMultiline = false,
  labelPlacement = "outside", // "outside" | "inside"
  isClearable = false,
  value,
  defaultValue,
  onChange,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const ref = useRef(null);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  // normalize options
  const normalizedOptions = useMemo(
    () =>
      options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
      ),
    [options]
  );

  const selectedOption = normalizedOptions.find(
    (opt) => opt.value === selectedValue
  );

  const handleSelect = (val) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
    setOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue("");
    onChange?.("");
  };

  // click-outside to close
  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const wrapperSize = sizeMap[size] || sizeMap.md;
  const wrapperRadius = radiusMap[radius] || radiusMap.full;
  const variantClasses = getVariantClasses(color, variant);

  const baseTrigger =
    "relative inline-flex items-center justify-between gap-2 " +
    "focus:outline-none focus-visible:ring-2 cursor-pointer transition";

  const disabledClasses = isDisabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:bg-gray-default-50/60";

  const widthClasses = fullWidth ? "w-full" : "w-64";

  const labelOutside =
    labelPlacement === "outside" && label ? (
      <span className="text-xs font-medium text-gray-default-700">
        {label}
      </span>
    ) : null;

  const showPlaceholderInside =
    labelPlacement === "inside" && !selectedOption && label;

  const textWrapper = isMultiline ? "whitespace-normal" : "truncate";

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : "w-fit"}`}>
      {labelOutside}

      <div ref={ref} className={`relative ${fullWidth ? "w-full" : "w-fit"}`}>
        {/* Trigger */}
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => !isDisabled && setOpen((o) => !o)}
          className={`
            ${baseTrigger}
            ${wrapperSize}
            ${wrapperRadius}
            ${variantClasses}
            ${disabledClasses}
            ${widthClasses}
            ${className}
          `}
        >
          <span
            className={`
              flex-1 text-left text-sm
              ${textWrapper}
              ${
                !selectedOption && (placeholder || showPlaceholderInside)
                  ? "text-gray-default-400"
                  : "text-primary-950-dark"
              }
            `}
          >
            {selectedOption?.label ||
              placeholder ||
              (showPlaceholderInside ? label : "Select…")}
          </span>

          <div className="flex items-center gap-1">
            {isClearable && !!selectedOption && !isDisabled && (
              <span
                onClick={handleClear}
                className="p-1 rounded-full hover:bg-gray-default-100 transition"
              >
                <ClearIcon className="w-3.5 h-3.5 text-gray-default-500" />
              </span>
            )}
            <span
              className={`transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDownIcon className="w-4 h-4 text-gray-default-500" />
            </span>
          </div>
        </button>

        {/* Options */}
        {open && !isDisabled && (
          <div
            className={`
              absolute left-0 mt-2 z-20
              rounded-2xl bg-content-content1
              shadow-[0_12px_32px_rgba(15,23,42,0.12)]
              border border-gray-default-100
              py-2
              max-h-64 overflow-auto
              ${widthClasses}
            `}
          >
            {normalizedOptions.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-default-400">
                No options
              </div>
            )}
            {normalizedOptions.map((opt) => {
              const isActive = opt.value === selectedValue;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`
                    w-full text-left px-4 py-2 text-sm
                    ${
                      isActive
                        ? "bg-gray-default-50 font-medium text-primary-950-dark"
                        : "bg-content-content1 text-primary-950-dark"
                    }
                    hover:bg-gray-default-50 transition-colors
                  `}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
