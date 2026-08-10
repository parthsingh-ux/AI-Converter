"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";

/* ----------------------------------------------------
   HELPERS
----------------------------------------------------- */

const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

function createPagination({ total, page, siblings, boundaries }) {
  const totalPages = Math.max(total || 1, 1);
  const current = Math.min(Math.max(page || 1, 1), totalPages);
  const totalNumbers = siblings * 2 + 3 + boundaries * 2;

  if (totalPages <= totalNumbers) return range(1, totalPages);

  const left = Math.max(current - siblings, boundaries + 1);
  const right = Math.min(current + siblings, totalPages - boundaries);

  const showLeftDots = left > boundaries + 2;
  const showRightDots = right < totalPages - boundaries - 1;

  const firstPages = range(1, boundaries);
  const lastPages = range(totalPages - boundaries + 1, totalPages);

  if (!showLeftDots && showRightDots) {
    return [...range(1, right), "dots", ...lastPages];
  }

  if (showLeftDots && !showRightDots) {
    return [...firstPages, "dots", ...range(left, totalPages)];
  }

  if (showLeftDots && showRightDots) {
    return [
      ...firstPages,
      "dots-left",
      ...range(left, right),
      "dots-right",
      ...lastPages,
    ];
  }

  return range(1, totalPages);
}

/* ----------------------------------------------------
   SIZE & RADIUS MAP
----------------------------------------------------- */

const sizeMap = {
  sm: { button: "min-w-[28px] h-7 text-[11px]", icon: 14, gap: "gap-1.5" },
  md: { button: "min-w-[32px] h-8 text-xs", icon: 16, gap: "gap-2" },
  lg: { button: "min-w-[36px] h-9 text-sm", icon: 18, gap: "gap-2.5" },
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

/* ----------------------------------------------------
   THEME COLOR SYSTEM (ACTIVE + INACTIVE)
   Uses design tokens: primary, secondary, success,
   warning, danger, default/neutral + variants.
----------------------------------------------------- */

const colorMap = {
  primary: {
    solid: {
      active:
        "bg-primary-500 text-white border border-primary-500",
      inactive:
        "bg-content-content1 text-gray-default-600 border border-gray-default-200",
    },
    outlined: {
      active:
        "border-2 border-primary-500 text-primary-700 bg-transparent",
      inactive:
        "border border-primary-200 text-primary-400 bg-transparent",
    },
    light: {
      active: "bg-primary-50 text-primary-700",
      inactive: "bg-primary-50/60 text-primary-400",
    },
    flat: {
      active: "bg-gray-default-100 text-primary-700",
      inactive: "bg-gray-default-50 text-primary-500",
    },
    faded: {
      active:
        "border border-gray-default-200 bg-gray-default-100 text-primary-700",
      inactive:
        "border border-gray-default-200/70 bg-gray-default-50 text-primary-500",
    },
    shadow: {
      active:
        "bg-primary-500 text-white shadow shadow-primary-400/60",
      inactive: "bg-primary-50 text-primary-600",
    },
    ghost: {
      active:
        "bg-transparent text-primary-600 border border-primary-400",
      inactive:
        "bg-transparent text-primary-400 border border-primary-200",
    },
  },
  secondary: {
    solid: {
      active:
        "bg-secondary-500 text-white border border-secondary-500",
      inactive:
        "bg-content-content1 text-gray-default-600 border border-gray-default-200",
    },
    outlined: {
      active:
        "border-2 border-secondary-500 text-secondary-700 bg-transparent",
      inactive:
        "border border-secondary-200 text-secondary-400 bg-transparent",
    },
    light: {
      active: "bg-secondary-50 text-secondary-700",
      inactive: "bg-secondary-50/60 text-secondary-400",
    },
    flat: {
      active: "bg-secondary-100 text-secondary-700",
      inactive: "bg-secondary-50 text-secondary-500",
    },
    faded: {
      active:
        "border border-secondary-200 bg-secondary-100 text-secondary-700",
      inactive:
        "border border-secondary-200/70 bg-secondary-50 text-secondary-500",
    },
    shadow: {
      active:
        "bg-secondary-500 text-white shadow shadow-secondary-400/60",
      inactive: "bg-secondary-50 text-secondary-600",
    },
    ghost: {
      active:
        "bg-transparent text-secondary-600 border border-secondary-400",
      inactive:
        "bg-transparent text-secondary-400 border border-secondary-200",
    },
  },
  success: {
    solid: {
      active:
        "bg-success-500 text-white border border-success-500",
      inactive:
        "bg-content-content1 text-gray-default-600 border border-gray-default-200",
    },
    outlined: {
      active:
        "border-2 border-success-500 text-success-700 bg-transparent",
      inactive:
        "border border-success-200 text-success-400 bg-transparent",
    },
    light: {
      active: "bg-success-50 text-success-700",
      inactive: "bg-success-50/60 text-success-400",
    },
    flat: {
      active: "bg-gray-default-100 text-success-700",
      inactive: "bg-gray-default-50 text-success-500",
    },
    faded: {
      active:
        "border border-gray-default-200 bg-gray-default-100 text-success-700",
      inactive:
        "border border-gray-default-200/70 bg-gray-default-50 text-success-500",
    },
    shadow: {
      active:
        "bg-success-500 text-white shadow shadow-success-400/60",
      inactive: "bg-success-50 text-success-600",
    },
    ghost: {
      active:
        "bg-transparent text-success-600 border border-success-400",
      inactive:
        "bg-transparent text-success-400 border border-success-200",
    },
  },
  warning: {
    solid: {
      active:
        "bg-warning-500 text-white border border-warning-500",
      inactive:
        "bg-content-content1 text-gray-default-600 border border-gray-default-200",
    },
    outlined: {
      active:
        "border-2 border-warning-500 text-warning-600 bg-transparent",
      inactive:
        "border border-warning-200 text-warning-400 bg-transparent",
    },
    light: {
      active: "bg-warning-50 text-warning-700",
      inactive: "bg-warning-50/60 text-warning-400",
    },
    flat: {
      active: "bg-warning-100 text-warning-700",
      inactive: "bg-warning-50 text-warning-500",
    },
    faded: {
      active:
        "border border-warning-200 bg-warning-200 text-warning-700",
      inactive:
        "border border-warning-100 bg-warning-50 text-warning-500",
    },
    shadow: {
      active:
        "bg-warning-500 text-white shadow shadow-warning-400/60",
      inactive: "bg-warning-50 text-warning-500",
    },
    ghost: {
      active:
        "bg-transparent text-warning-600 border border-warning-400",
      inactive:
        "bg-transparent text-warning-400 border border-warning-200",
    },
  },
  danger: {
    solid: {
      active:
        "bg-danger-500 text-white border border-danger-500",
      inactive:
        "bg-content-content1 text-gray-default-600 border border-gray-default-200",
    },
    outlined: {
      active:
        "border-2 border-danger-500 text-danger-600 bg-transparent",
      inactive:
        "border border-danger-200 text-danger-400 bg-transparent",
    },
    light: {
      active: "bg-danger-50 text-danger-700",
      inactive: "bg-danger-50/60 text-danger-400",
    },
    flat: {
      active: "bg-danger-100 text-danger-700",
      inactive: "bg-danger-50 text-danger-500",
    },
    faded: {
      active:
        "border border-danger-200 bg-danger-100 text-danger-700",
      inactive:
        "border border-danger-200/70 bg-danger-50 text-danger-500",
    },
    shadow: {
      active:
        "bg-danger-500 text-white shadow shadow-danger-400/60",
      inactive: "bg-danger-50 text-danger-600",
    },
    ghost: {
      active:
        "bg-transparent text-danger-600 border border-danger-400",
      inactive:
        "bg-transparent text-danger-400 border border-danger-200",
    },
  },
  default: {
    solid: {
      active:
        "bg-gray-default-800 text-gray-default-50 border border-gray-default-800",
      inactive:
        "bg-content-content1 text-gray-default-600 border border-gray-default-200",
    },
    outlined: {
      active:
        "border-2 border-gray-default-500 text-gray-default-800 bg-transparent",
      inactive:
        "border border-gray-default-300 text-gray-default-500 bg-transparent",
    },
    light: {
      active: "bg-gray-default-100 text-gray-default-800",
      inactive: "bg-gray-default-50 text-gray-default-600",
    },
    flat: {
      active: "bg-gray-default-100 text-gray-default-800",
      inactive: "bg-gray-default-50 text-gray-default-600",
    },
    faded: {
      active:
        "border border-gray-default-200 bg-gray-default-100 text-gray-default-800",
      inactive:
        "border border-gray-default-200/70 bg-gray-default-50 text-gray-default-600",
    },
    shadow: {
      active:
        "bg-gray-default-800 text-gray-default-50 shadow shadow-gray-default-500/60",
      inactive: "bg-gray-default-100 text-gray-default-800",
    },
    ghost: {
      active:
        "bg-transparent text-gray-default-800 border border-gray-default-400",
      inactive:
        "bg-transparent text-gray-default-500 border border-gray-default-300",
    },
  },
};

// alias neutral → default
colorMap.neutral = colorMap.default;

const getVariantStyles = (color, variant, isActive) => {
  const v = colorMap[color]?.[variant];
  if (!v) return "";
  return isActive ? v.active : v.inactive;
};

/* ----------------------------------------------------
   AUX CONTROLS
----------------------------------------------------- */

function ItemsDropdown({ value, options, size, onChange }) {
  const [open, setOpen] = useState(false);
  const height = size === "sm" ? "h-7" : size === "lg" ? "h-9" : "h-8";

  return (
    <div className="relative inline-block text-xs">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`inline-flex items-center gap-1 px-3 ${height} rounded-md border border-gray-default-200 bg-content-content1 text-gray-default-600`}
      >
        {value} Items
        <Icon
          icon="solar:alt-arrow-down-line-duotone"
          className="text-gray-default-500"
          width={12}
          height={12}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-[112px] rounded-md border border-gray-default-200 bg-content-content1 shadow-sm z-30">
          {options.map((o) => (
            <button
              key={o}
              className={`w-full text-left px-3 py-1.5 text-[11px] hover:bg-gray-default-50 ${
                o === value
                  ? "text-primary-600 font-semibold"
                  : "text-gray-default-600"
              }`}
              onClick={() => {
                onChange?.(o);
                setOpen(false);
              }}
            >
              {o} Items
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RangeInfo({ from, to, total, size }) {
  const height = size === "sm" ? "h-7" : size === "lg" ? "h-9" : "h-8";

  return (
    <div
      className={`inline-flex items-center px-3 ${height} text-xs rounded-md border border-gray-default-200 bg-content-content1 text-gray-default-600`}
    >
      {from} – {to} of {total}
    </div>
  );
}

function GotoPage({ size, page, setPage }) {
  const height = size === "sm" ? "h-7" : size === "lg" ? "h-9" : "h-8";

  return (
    <div
      className={`inline-flex items-center gap-1 px-3 ${height} text-xs rounded-md border border-gray-default-200 bg-content-content1 text-gray-default-600`}
    >
      <span>Go to</span>
      <input
        className="w-10 h-5 border border-gray-default-300 rounded text-center text-[11px] outline-none bg-content-content1 text-gray-default-700"
        value={page}
        min={1}
        type="number"
        onChange={(e) => {
          const v = Number(e.target.value);
          !Number.isNaN(v) && setPage(v);
        }}
      />
      <span>Page</span>
    </div>
  );
}

/* ----------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------- */

export default function Pagination({
  total,
  initialPage = 1,
  page: controlledPage,
  onChange,

  siblings = 1,
  boundaries = 1,

  variant = "solid",
  color = "primary",
  size = "md",
  radius = "md",

  disableCursorAnimation = false,

  showGoto = false,
  showItems = false,
  showRange = false,

  itemsPerPage,
  itemsPerPageOptions = [5, 10, 25],
  onItemsPerPageChange,

  rangeFrom,
  rangeTo,
  rangeTotal,

  className = "",
}) {
  const [internalPage, setInternalPage] = useState(initialPage);
  const isControlled = controlledPage != null;

  const currentPage = isControlled ? controlledPage : internalPage;
  const totalPages = Math.max(total || 1, 1);

  useEffect(() => {
    if (!isControlled) setInternalPage(initialPage);
  }, [initialPage, isControlled]);

  const handlePage = (p) => {
    const safe = Math.min(Math.max(p, 1), totalPages);
    if (!isControlled) setInternalPage(safe);
    onChange?.(safe);
  };

  const buttons = useMemo(
    () =>
      createPagination({
        total: totalPages,
        page: currentPage,
        siblings,
        boundaries,
      }),
    [totalPages, currentPage, siblings, boundaries]
  );

  const sizeConf = sizeMap[size] || sizeMap.md;
  const radiusClass = radiusMap[radius] || radiusMap.md;
  const iconSize = sizeConf.icon;

  const animationClass = disableCursorAnimation
    ? ""
    : "transition-transform hover:scale-[1.05]";

  const baseBtnClasses = `flex items-center justify-center ${sizeConf.button} ${radiusClass} ${animationClass} disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <div
      className={`flex justify-between items-center w-full flex-wrap gap-3 ${className}`}
    >
      {/* LEFT: PAGE BUTTONS */}
      <div className={`flex items-center ${sizeConf.gap}`}>
        {/* First */}
        <button
          className={`${baseBtnClasses} ${getVariantStyles(
            color,
            variant,
            false
          )}`}
          disabled={currentPage === 1}
          onClick={() => handlePage(1)}
        >
          <Icon
            icon="solar:double-alt-arrow-left-line-duotone"
            width={iconSize}
            height={iconSize}
          />
        </button>

        {/* Prev */}
        <button
          className={`${baseBtnClasses} ${getVariantStyles(
            color,
            variant,
            false
          )}`}
          disabled={currentPage === 1}
          onClick={() => handlePage(currentPage - 1)}
        >
          <Icon
            icon="solar:alt-arrow-left-line-duotone"
            width={iconSize}
            height={iconSize}
          />
        </button>

        {/* Numbered buttons & dots */}
        {buttons.map((item, i) =>
          typeof item === "number" ? (
            <button
              key={i}
              className={`${baseBtnClasses} ${getVariantStyles(
                color,
                variant,
                item === currentPage
              )}`}
              onClick={() => handlePage(item)}
            >
              {item}
            </button>
          ) : (
            <span
              key={i}
              className="text-gray-default-400 text-[11px] px-1 select-none"
            >
              ...
            </span>
          )
        )}

        {/* Next */}
        <button
          className={`${baseBtnClasses} ${getVariantStyles(
            color,
            variant,
            false
          )}`}
          disabled={currentPage === totalPages}
          onClick={() => handlePage(currentPage + 1)}
        >
          <Icon
            icon="solar:alt-arrow-right-line-duotone"
            width={iconSize}
            height={iconSize}
          />
        </button>

        {/* Last */}
        <button
          className={`${baseBtnClasses} ${getVariantStyles(
            color,
            variant,
            false
          )}`}
          disabled={currentPage === totalPages}
          onClick={() => handlePage(totalPages)}
        >
          <Icon
            icon="solar:double-alt-arrow-right-line-duotone"
            width={iconSize}
            height={iconSize}
          />
        </button>
      </div>

      {/* RIGHT: EXTRA CONTROLS */}
      <div className="flex items-center gap-3">
        {showGoto && (
          <GotoPage size={size} page={currentPage} setPage={handlePage} />
        )}

        {showItems && (
          <ItemsDropdown
            size={size}
            value={itemsPerPage}
            options={itemsPerPageOptions}
            onChange={onItemsPerPageChange}
          />
        )}

        {showRange && (
          <RangeInfo
            size={size}
            from={rangeFrom}
            to={rangeTo}
            total={rangeTotal}
          />
        )}
      </div>
    </div>
  );
}
