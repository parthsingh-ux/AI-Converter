"use client";

import React, { useMemo, useState } from "react";

/**
 * Breadcrumb component
 *
 * Props:
 * - items: Array<{ label: string, href?: string, disabled?: boolean }>
 * - size: "sm" | "md" | "lg"   (default "md")
 * - color: "slate" | "blue" | "emerald" | "amber" | "rose" (default "slate")
 * - underline: boolean
 * - isDisabled: boolean
 * - page: number | string
 * - maxItems: number
 * - itemsBeforeCollapse: number
 * - itemsAfterCollapse: number
 * - separator: ReactNode | "arrow" | "slash"  <-- updated: accept strings or nodes
 * - className: extra classes
 */

const sizeMap = {
  sm: { text: "text-sm", gap: "gap-2", sep: "h-4 w-4" },
  md: { text: "text-base", gap: "gap-3", sep: "h-5 w-5" },
  lg: { text: "text-lg", gap: "gap-4", sep: "h-6 w-6" },
};

const colorMap = {
  slate: { text: "text-slate-700", active: "text-slate-900", muted: "text-slate-400", accent: "text-slate-600" },
  blue: { text: "text-blue-600", active: "text-blue-800", muted: "text-blue-300", accent: "text-blue-700" },
  emerald: { text: "text-emerald-600", active: "text-emerald-800", muted: "text-emerald-300", accent: "text-emerald-700" },
  amber: { text: "text-amber-600", active: "text-amber-800", muted: "text-amber-300", accent: "text-amber-700" },
  rose: { text: "text-rose-600", active: "text-rose-800", muted: "text-rose-300", accent: "text-rose-700" },
};

export default function Breadcrumb({
  items = [],
  size = "md",
  color = "slate",
  underline = false,
  isDisabled = false,
  page,
  maxItems = 5,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  separator = "arrow", // now accepts "arrow" | "slash" | ReactNode
  className = "",
}) {
  const [expanded, setExpanded] = useState(false);

  const s = sizeMap[size] || sizeMap.md;
  const c = colorMap[color] || colorMap.slate;

  // determine activeIndex
  const activeIndex = useMemo(() => {
    if (typeof page === "number") {
      if (page >= 0 && page < items.length) return page;
      return items.length - 1;
    }
    if (typeof page === "string") {
      const idx = items.findIndex((it) => it.label === page || it.href === page);
      return idx >= 0 ? idx : items.length - 1;
    }
    return items.length - 1;
  }, [page, items]);

  const needsCollapse = items.length > maxItems && !expanded;

  const visibleSlice = useMemo(() => {
    if (!needsCollapse) return items.map((it, i) => ({ item: it, idx: i }));

    const startCount = Math.max(0, Math.min(itemsBeforeCollapse, items.length - 1));
    const endCount = Math.max(0, Math.min(itemsAfterCollapse, items.length - startCount - 1));

    const start = items.slice(0, startCount);
    const end = items.slice(items.length - endCount);
    const middle = { isEllipsis: true };
    return [
      ...start.map((it, i) => ({ item: it, idx: i })),
      middle,
      ...end.map((it, i) => ({ item: it, idx: items.length - endCount + i })),
    ];
  }, [items, needsCollapse, itemsBeforeCollapse, itemsAfterCollapse, maxItems, expanded]);

  // Separator factory: handle string shortcuts and custom node
  const renderSeparator = (key = "") => {
    // if user passed a React node, use it directly
    if (React.isValidElement(separator) && typeof separator !== "string") return separator;

    // handle string shortcuts
    const sepType = typeof separator === "string" ? separator : "arrow";

    if (sepType === "slash") {
      // slash separator styled to match text size
      return <span key={key} className={`text-slate-300 ${s.text}`} aria-hidden>/</span>;
    }

    // default arrow (chevron) — adjust stroke color to slate-300 by default
    return (
      <svg key={key} className={`${s.sep} inline-block text-slate-300`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <nav aria-label="Breadcrumb" className={`inline-block ${className}`}>
      <ol className={`flex items-center ${s.gap} flex-wrap`}>
        {visibleSlice.map((entry, idx) => {
          if (entry && entry.isEllipsis) {
            return (
              <li key={`ellipsis-${idx}`} className="flex items-center">
                <span className="px-2 text-sm text-slate-400 select-none">…</span>
                {idx !== visibleSlice.length - 1 && <span className="mx-1 text-slate-300">{renderSeparator(`${idx}-sep`)}</span>}
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="ml-1 text-xs text-slate-500 hover:underline focus:outline-none"
                  aria-label="Show collapsed breadcrumbs"
                >
                  show
                </button>
              </li>
            );
          }

          const { item, idx: itemIdx } = entry;
          const disabled = isDisabled || item.disabled;
          const isCurrent = itemIdx === activeIndex;

          const linkBase = `inline-flex items-center ${s.text} ${disabled ? c.muted : c.text}`;
          const currentCls = isCurrent ? `font-semibold ${c.active}` : "";

          return (
            <li key={`crumb-${itemIdx}`} className="flex items-center">
              {item.href && !disabled ? (
                <a href={item.href} aria-current={isCurrent ? "page" : undefined} className={`${linkBase} ${currentCls} ${underline ? "hover:underline" : ""}`}>
                  {item.label}
                </a>
              ) : (
                <span className={`${linkBase} ${currentCls}`} aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              )}

              {idx !== visibleSlice.length - 1 && <span className="mx-2 text-slate-300" aria-hidden>{renderSeparator(`${itemIdx}-sep`)}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
