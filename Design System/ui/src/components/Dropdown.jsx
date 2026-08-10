"use client";

import React, { useState } from "react";

// ---------- CONFIG MAPS ----------
const sizeMap = {
  sm: {
    container: "text-xs",
    action: "text-[11px] mb-2",
    itemPad: "px-3 py-2",
    label: "text-[13px]",
    desc: "text-[11px]",
    circle: "w-4 h-4",
  },
  md: {
    container: "text-sm",
    action: "text-xs mb-2",
    itemPad: "px-4 py-2.5",
    label: "text-sm",
    desc: "text-xs",
    circle: "w-[18px] h-[18px]",
  },
  lg: {
    container: "text-base",
    action: "text-sm mb-2",
    itemPad: "px-4 py-3",
    label: "text-[15px]",
    desc: "text-sm",
    circle: "w-5 h-5",
  },
};

// keep this map as-is (uses your theme colors)
const colorMap = {
  primary: {
    accent: "text-primary border-primary",
    soft: "bg-primary/5",
    text: "text-primary-900",
  },
  secondary: {
    accent: "text-secondary border-secondary",
    soft: "bg-secondary/5",
    text: "text-secondary-900",
  },
  success: {
    accent: "text-success border-success",
    soft: "bg-success/5",
    text: "text-success-900",
  },
  warning: {
    accent: "text-warning border-warning",
    soft: "bg-warning/5",
    text: "text-warning-900",
  },
  danger: {
    accent: "text-danger border-danger",
    soft: "bg-danger/5",
    text: "text-danger-900",
  },
  neutral: {
    accent: "text-primary-950-dark border-primary-950-dark",
    soft: "bg-gray-default-100",
    text: "text-primary-950-dark",
  },
};

const shadowMap = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md shadow-gray-default-300/40",
  lg: "shadow-lg shadow-gray-default-400/60",
};

// ---------- COMPONENT ----------
export default function Dropdown({
  sections = [],
  size = "md",
  color = "neutral",
  shadow = "md",
  defaultSelectedId = null,
  onChange,
  className = "",
}) {
  const [selectedId, setSelectedId] = useState(defaultSelectedId);

  const s = sizeMap[size] || sizeMap.md;
  const c = colorMap[color] || colorMap.neutral;
  const shadowCls = shadowMap[shadow] || shadowMap.md;

  const handleSelect = (id) => {
    setSelectedId(id);
    onChange && onChange(id);
  };

  return (
    <div
      className={[
        "inline-flex flex-col overflow-hidden rounded-2xl border bg-content-content1",
        "border-gray-default-200 text-primary-950-dark",
        shadowCls,
        s.container,
        className,
      ].join(" ")}
    >
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="px-3 py-3 first:pt-3 last:pb-3"
        >
          {/* Section Header */}
          {section.action && (
            <div
              className={`${s.action} font-medium text-gray-default-500`}
            >
              {section.action}
            </div>
          )}

          {/* Items */}
          <div className="flex flex-col">
            {section.items.map((item) => {
              const isSelected = selectedId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                    s.itemPad,
                    isSelected
                      ? c.soft
                      : "hover:bg-gray-default-100 focus:bg-gray-default-100",
                  ].join(" ")}
                >
                  {/* Circle / Radio */}
                  <span
                    className={[
                      "flex items-center justify-center rounded-full border",
                      "border-gray-default-400",
                      s.circle,
                      isSelected ? c.accent : "",
                    ].join(" ")}
                  >
                    {isSelected && (
                      <span className="block h-2.5 w-2.5 rounded-full bg-current" />
                    )}
                  </span>

                  {/* Text */}
                  <span className="flex flex-1 flex-col text-left">
                    <span
                      className={[
                        "font-medium",
                        s.label,
                        isSelected ? c.text : "text-primary-950-dark",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>

                    {item.description && (
                      <span
                        className={[
                          "truncate text-gray-default-600",
                          s.desc,
                        ].join(" ")}
                      >
                        {item.description}
                      </span>
                    )}
                  </span>

                  {/* Checkmark */}
                  {isSelected && (
                    <span className={["text-xs font-semibold", c.accent].join(" ")}>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          {sectionIndex < sections.length - 1 && (
            <div className="mt-3 h-px bg-gray-default-200" />
          )}
        </div>
      ))}
    </div>
  );
}
