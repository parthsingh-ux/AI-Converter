"use client";

import React, { useMemo, useState } from "react";
import { Icon, InlineIcon } from "@iconify/react";

/**
 * Accordion (group or card mode)
 *
 * - mode="group": classic single container with optional divider/border
 * - mode="card": outer container removed; each item is its own card
 *
 * Variants:
 * - "default"  → soft gray background, subtle border + shadow
 * - "shadow"   → white card, stronger elevation
 * - "bordered" → white background, clear border, no shadow
 * - "splitted" → slightly stronger gray background, good for split sections
 */
const Accordion = ({
  items = [],

  // group-mode props
  variant = "default", // "default" | "shadow" | "bordered" | "splitted"
  size = "md", // "sm" | "md" | "lg"
  rounded = "full", // "none" | "md" | "lg" | "xl" | "full"
  withDivider = true,
  multiple = false,
  defaultOpen = [],
  border = "all", // "all" | "item" | "none" (group mode)
  borderThickness = "normal", // "thin" | "normal" | "thick"
  className = "",

  // layout mode + card-mode appearance
  mode = "group", // "group" | "card"
  accordionGap = "mb-6", // spacing under the whole component
  itemGap = "my-4", // spacing between items (card mode)
  cardShadow = "sm", // "none" | "sm" | "md" | "lg"
  cardBorderThickness = "normal", // "none" | "thin" | "normal" | "thick"
  cardBorderColor = "gray-default-200", // kept as prop name, but mapped to gray-default
  cardRounded = "xl", // "none" | "md" | "lg" | "xl" | "full"
}) => {
  // --- keys / open state ---
  const keys = useMemo(() => items.map((it, i) => it.id ?? String(i)), [items]);

  const initialOpen = useMemo(() => {
    const asSet = new Set((defaultOpen || []).map(String));
    return keys.filter((k, i) => asSet.has(k) || asSet.has(String(i)));
  }, [defaultOpen, keys]);

  const [openSet, setOpenSet] = useState(() => new Set(initialOpen));

  const toggle = (key) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else {
        if (!multiple) next.clear();
        next.add(key);
      }
      return next;
    });
  };

  // --- size styles ---
  const sizeCls =
    {
      sm: { header: "py-3", panelPad: "pb-3", title: "text-sm" },
      md: { header: "py-4", panelPad: "pb-4", title: "text-base" },
      lg: { header: "py-5", panelPad: "pb-5", title: "text-lg" },
    }[size] || { header: "py-4", panelPad: "pb-4", title: "text-base" };

  // --- rounded for group ---
  const roundedCls =
    {
      none: "rounded-none",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-2xl",
    }[rounded] || "rounded-2xl";

  // --- variant styles (background + shadow only, border handled separately) ---
  const variantCls =
    {
      default:
        // soft gray background, subtle border look via containerBorder
        "bg-gray-default-50 shadow-sm backdrop-blur-sm",
      shadow:
        // white surface, stronger elevation
        "bg-content-content1 shadow-md",
      bordered:
        // white background, relies on border="all" for border
        "bg-content-content1",
      flat:
        // slightly darker gray, good for “split” sections
        "bg-gray-default-100",
    }[variant] || "bg-gray-default-50 shadow-sm backdrop-blur-sm";

  const dividerCls =
    withDivider && mode === "group" ? "divide-y divide-gray-default-200" : "";

  // --- border thickness for group / item ---
  const borderThicknessCls =
    {
      thin: "border border-[1px]",
      normal: "border-2",
      thick: "border-[3px]",
    }[borderThickness] || "border-2";

  // container border for group mode
  const containerBorder =
    mode === "group"
      ? border === "all"
        ? `${borderThicknessCls} border-gray-default-200`
        : border === "none"
        ? "border-0"
        : "border-0"
      : "border-0";

  // item-level border when border="item" in group mode
  const itemBorderGroupMode =
    mode === "group" && border === "item"
      ? `${borderThicknessCls} border-gray-default-200 rounded-2xl my-3`
      : "";

  // --- card-mode per-item look ---
  const cardRoundedCls =
    {
      none: "rounded-none",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-2xl",
    }[cardRounded] || "rounded-xl";

  const cardShadowCls =
    {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    }[cardShadow] || "";

  const cardBorderThicknessCls =
    {
      none: "",
      thin: "border border-[1px]",
      normal: "border-2",
      thick: "border-[3px]",
    }[cardBorderThickness] || "";

const cardBorderColorCls =
  {
    "gray-default-100": "border-gray-default-100",
    "gray-default-200": "border-gray-default-200",
    "gray-default-300": "border-gray-default-300",
  }[cardBorderColor] || "border-gray-default-200";


  const cardContainerCls =
    mode === "card"
      ? `bg-content-content1 ${cardRoundedCls} ${cardShadowCls} ${cardBorderThicknessCls} ${cardBorderColorCls} ${itemGap}`
      : "";

  // ---- render items ----
  const renderItems = () =>
    items.map((item, idx) => {
      const key = keys[idx];
      const isOpen = openSet.has(key);

      return (
        <section
          key={key}
          className={mode === "card" ? cardContainerCls : itemBorderGroupMode}
        >
          <button
            type="button"
            onClick={() => toggle(key)}
            className={`w-full flex items-center justify-between gap-3 px-4 focus:outline-none ${sizeCls.header}`}
            aria-expanded={isOpen}
            aria-controls={`acc-panel-${key}`}
          >
            <h3
              className={`${sizeCls.title} font-semibold text-primary-50-dark`}
            >
              {item.title}
            </h3>

            {/* Chevron */}
            <svg
              className={`h-5 w-5 text-content-content3 transition-transform duration-300 ease-out ${
                isOpen ? "-rotate-90" : "rotate-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <Icon
                icon="fluent:ios-arrow-left-24-filled"
                width="24"
                height="24"
              />
            </svg>
          </button>

          <div
            id={`acc-panel-${key}`}
            role="region"
            className={`overflow-hidden transition-all duration-300 ease-out ${
              isOpen
                ? `max-h-96 opacity-100 ${mode === "card" ? "px-4" : ""} ${
                    sizeCls.panelPad
                  }`
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="text-sm text-gray-default-600 px-4">
              {item.content}
            </div>
          </div>
        </section>
      );
    });

  // GROUP mode: classic outer container
  if (mode === "group") {
    return (
      <div
        className={`w-full ${accordionGap} ${roundedCls} ${variantCls} ${containerBorder} ${className}`}
      >
        <div className={dividerCls}>{renderItems()}</div>
      </div>
    );
  }

  // CARD mode: no outer box, just a lightweight wrapper for outer spacing
  return (
    <div className={`w-full ${accordionGap} ${className}`}>{renderItems()}</div>
  );
};

export default Accordion;
