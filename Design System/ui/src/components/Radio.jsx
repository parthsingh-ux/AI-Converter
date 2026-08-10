"use client";

import React from "react";

const sizeMap = {
  sm: { outer: "w-4 h-4", dot: "w-3 h-3" },
  md: { outer: "w-5 h-5", dot: "w-4 h-4" },
  lg: { outer: "w-6 h-6", dot: "w-5 h-5" },
};

const colorMap = {
  primary: {
    // border colors
    borderDefault: "var(--color-gray-default-200)", // not selected
    borderChecked: "var(--color-primary)",          // selected

    // dot colors
    dotDefault: "transparent",                      // not selected
    dotChecked: "var(--color-primary)",             // selected

    // hover background
    hoverBg: "var(--color-gray-default-100)",

    // focus ring
    ringColor: "var(--color-primary)",
  },
  secondary: {
    // border colors
    borderDefault: "var(--color-gray-default-200)", // not selected
    borderChecked: "var(--color-secondary)",          // selected

    // dot colors
    dotDefault: "transparent",                      // not selected
    dotChecked: "var(--color-secondary)",             // selected

    // hover background
    hoverBg: "var(--color-gray-default-100)",

    // focus ring
    ringColor: "var(--color-primary)",
  },
  success: {
    // border colors
    borderDefault: "var(--color-gray-default-200)", // not selected
    borderChecked: "var(--color-success)",          // selected

    // dot colors
    dotDefault: "transparent",                      // not selected
    dotChecked: "var(--color-primary)",             // selected

    // hover background
    hoverBg: "var(--color-gray-default-100)",

    // focus ring
    ringColor: "var(--color-primary)",
  },
  warning: {
    // border colors
    borderDefault: "var(--color-gray-default-200)", // not selected
    borderChecked: "var(--color-warning)",          // selected

    // dot colors
    dotDefault: "transparent",                      // not selected
    dotChecked: "var(--color-warning)",             // selected

    // hover background
    hoverBg: "var(--color-gray-default-100)",

    // focus ring
    ringColor: "var(--color-primary)",
  },
  danger: {
    // border colors
    borderDefault: "var(--color-gray-default-200)", // not selected
    borderChecked: "var(--color-danger)",          // selected

    // dot colors
    dotDefault: "transparent",                      // not selected
    dotChecked: "var(--color-danger)",             // selected

    // hover background
    hoverBg: "var(--color-gray-default-100)",

    // focus ring
    ringColor: "var(--color-primary)",
  },
  neutral: {
    // border colors
    borderDefault: "var(--color-gray-default-200)", // not selected
    borderChecked: "var(--color-default)",          // selected

    // dot colors
    dotDefault: "transparent",                      // not selected
    dotChecked: "var(--color-default)",             // selected

    // hover background
    hoverBg: "var(--color-gray-default-100)",

    // focus ring
    ringColor: "var(--color-primary)",
  },
};

export default function Radio({
  size = "md",
  color = "primary",
  disabled = false,
  invalid = false,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  className = "",
  ...rest
}) {
  const s = sizeMap[size] || sizeMap.md;
  const c = colorMap[color] || colorMap.primary;

  const inputProps = {
    type: "radio",
    name,
    value,
    disabled,
    onChange,
    className: "radio-input sr-only",
    ...rest,
  };

  if (checked !== undefined) inputProps.checked = checked;
  if (defaultChecked !== undefined) inputProps.defaultChecked = defaultChecked;

  return (
    <label
      className={`inline-flex items-center justify-center group relative ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <input {...inputProps} />

      {/* Outer circle */}
      <span
        className={[
          "radio-outer relative flex items-center justify-center rounded-full bg-white",
          "transition-all duration-150",
          "group-disabled:opacity-50 group-disabled:bg-gray-100 group-disabled:border-gray-200",
          "group-focus-within:ring-2 group-focus-within:ring-offset-2 group-focus-within:ring-offset-gray-50",
          s.outer,
        ].join(" ")}
        style={{
          // pass both selected & unselected colors via CSS vars
          "--radio-border-default": invalid ? "var(--color-red-500)" : c.borderDefault,
          "--radio-border-checked": invalid ? "var(--color-red-500)" : c.borderChecked,
          "--radio-dot-default": invalid ? "transparent" : c.dotDefault,
          "--radio-dot-checked": invalid ? "var(--color-red-500)" : c.dotChecked,
          "--radio-hover-bg": c.hoverBg,
          "--radio-ring-color": invalid ? "var(--color-primary)" : c.ringColor,
        }}
      >
        {/* Visible border wrapper */}
        <span className="radio-border block w-full h-full rounded-full" />

        {/* Inner dot (size from sizeMap.dot) */}
        <span
          className={[
            "radio-dot absolute rounded-full",
            "opacity-0 scale-50",
            "transition-transform transition-opacity duration-150",
            s.dot,
          ].join(" ")}
        />
      </span>

      <style jsx>{`
        /* Base border & hover state */
        .radio-outer .radio-border {
          border-width: 2px;
          border-style: solid;
          border-color: var(--radio-border-default);
          background-color: white;
          transition: border-color 150ms ease, background-color 150ms ease;
        }

        .group:hover .radio-outer .radio-border {
          background-color: var(--radio-hover-bg);
        }

        /* Focus ring color from colorMap */
        .group:focus-within .radio-outer {
          --tw-ring-color: var(--radio-ring-color);
        }

        /* Unselected dot */
        .radio-dot {
          background-color: var(--radio-dot-default);
        }

        /* Selected state: border + dot changed from colorMap */
        .radio-input:checked + .radio-outer .radio-border {
          border-color: var(--radio-border-checked);
        }

        .radio-input:checked + .radio-outer .radio-dot {
          background-color: var(--radio-dot-checked);
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </label>
  );
}
