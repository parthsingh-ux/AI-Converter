"use client";

import React, { useRef, useState } from "react";

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
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
    flat: "bg-primary-50 text-primary-950-dark  focus:ring-primary/40",
    faded:
      "bg-primary-50 text-primary-950-dark border border-primary-200 focus:ring-primary/50",
    bordered:
      "bg-white text-primary border border-primary-200 focus:ring-primary/50",
    underlined:
      "bg-transparent text-primary border-b border-primary-200 focus:outline-none focus:border-primary focus:border-b-2",
  },
  secondary: {
    flat: "bg-secondary-50 text-secondary-950-dark  focus:ring-secondary/40",
    faded:
      "bg-secondary-50 text-secondary-950-dark border border-secondary-200 focus:ring-secondary/50",
    bordered:
      "bg-white text-secondary border border-secondary-200 focus:ring-secondary/50",
    underlined:
      "bg-transparent text-secondary border-b border-secondary-200 focus:outline-none focus:border-secondary focus:border-b-2",
  },
  success: {
    flat: "bg-success-50 text-success-950-dark  focus:ring-success/40",
    faded:
      "bg-success-50 text-success-950-dark border border-success-200 focus:ring-success/50",
    bordered:
      "bg-white text-success border border-success-200 focus:ring-success/50",
    underlined:
      "bg-transparent text-success border-b border-success-200 focus:outline-none focus:border-success focus:border-b-2",
  },
  warning: {
    flat: "bg-warning-50 text-warning-950-dark  focus:ring-warning/40",
    faded:
      "bg-warning-50 text-warning-950-dark border border-warning-200 focus:ring-warning/50",
    bordered:
      "bg-white text-warning border border-warning-200 focus:ring-warning/50",
    underlined:
      "bg-transparent text-warning border-b border-warning-200 focus:outline-none focus:border-warning focus:border-b-2",
  },
  danger: {
    flat: "bg-danger-50 text-danger-950-dark  focus:ring-danger/40",
    faded:
      "bg-danger-50 text-danger-950-dark border border-danger-200 focus:ring-danger/50",
    bordered:
      "bg-white text-danger border border-danger-200 focus:ring-danger/50",
    underlined:
      "bg-transparent text-danger border-b border-danger-200 focus:outline-none focus:border-danger focus:border-b-2",
  },
  neutral: {
    flat: "bg-gray-default-100 text-primary-950-dark focus:ring-gray-300",
    faded:
      "bg-gray-default-100 text-primary-950-dark border border-gray-default-200 focus:ring-gray-default-300",
    bordered:
      "bg-white text-primary-950-dark border border-gray-default-200 focus:ring-gray-400",
    underlined:
      "bg-transparent text-primary-950-dark border-b border-gray-default-200 focus:outline-none focus:border-gray-700 focus:border-b-2",
  },
};

export default function InputOtp({
  length = 4,
  color = "neutral",
  variant = "flat",
  size = "md",
  fullWidth = false,
  isDisabled = false,
  isMultiline = false, // just controls wrapping
  label,
  radius = "md",
  labelPlacement = "outside", // "outside" | "inside" | "outside-left"
  validationBehavior = "none", // "none" | "valid" | "invalid"
  isPassword = false,
  value,
  onChange,
  className = "",
}) {
  const [internal, setInternal] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const isControlled = typeof value === "string";

  const currentValueArray = isControlled
    ? value
        .split("")
        .slice(0, length)
        .concat(Array(length).fill(""))
        .slice(0, length)
    : internal;

  const sizeCls = sizeMap[size] || sizeMap.md;
  const radiusCls = radiusMap[radius] || radiusMap.md;
  const colorCls =
    colorVariantMap[color]?.[variant] || colorVariantMap.neutral.flat;

  const isUnderlined = variant === "underlined";

  const focusCls = isUnderlined
    ? "focus:outline-none"
    : "focus:outline-none focus:ring-2";

  const baseBoxCls = [
    "flex items-center justify-center",
    "transition-all duration-150",
    sizeCls,
    !isUnderlined && radiusCls, // no outer radius for underlined
    colorCls,
    focusCls,
    isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-text",
    "text-center",
  ]
    .filter(Boolean)
    .join(" ");

  const validationBorder =
    validationBehavior === "invalid"
      ? "ring-2 ring-danger/60 border-danger p-1"
      : validationBehavior === "valid"
      ? "ring-2 ring-success/60 border-success p-1"
      : "";

  const containerLayout =
    labelPlacement === "outside-left"
      ? "flex items-center gap-3"
      : "flex flex-col gap-2";

  const otpRowLayout = [
    "flex",
    isMultiline ? "flex-wrap" : "flex-nowrap",
    "gap-2",
    fullWidth ? "w-full" : "w-auto",
  ].join(" ");

  const handleChange = (index, char) => {
    if (!/^[0-9a-zA-Z]?$/.test(char)) return;

    const next = [...currentValueArray];
    next[index] = char;

    if (!isControlled) setInternal(next);
    onChange?.(next.join(""));

    if (char && index < length - 1) {
      const allPrevFilled = next.slice(0, index + 1).every(Boolean);
      if (allPrevFilled) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !currentValueArray[index] && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const LabelEl =
    label && (
      <span className="text-xs font-medium text-gray-default-600">
        {label}
      </span>
    );

  const hasAnyValue = currentValueArray.some(Boolean);

  return (
    <div className={`inline-flex ${containerLayout} ${className}`}>
      {labelPlacement === "outside-left" && LabelEl}

      <div className="flex flex-col gap-1">
        {labelPlacement === "outside" && LabelEl}

        {labelPlacement === "inside" && (
          <div className="mb-1 text-[11px] text-gray-default-400">
            {label}
          </div>
        )}

        <div className={`${otpRowLayout} ${validationBorder}`}>
          {Array.from({ length }).map((_, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type={isPassword ? "password" : "text"}
              inputMode="numeric"
              maxLength={1}
              disabled={isDisabled}
              className={baseBoxCls}
              value={currentValueArray[idx]}
              onChange={(e) => handleChange(idx, e.target.value.slice(-1))}
              onKeyDown={(e) => handleKeyDown(idx, e)}
            />
          ))}
        </div>

        {validationBehavior === "invalid" && hasAnyValue && (
          <p className="mt-1 text-xs text-danger">Invalid OTP.</p>
        )}
        {validationBehavior === "valid" && hasAnyValue && (
          <p className="mt-1 text-xs text-success">OTP looks good.</p>
        )}
      </div>
    </div>
  );
}
