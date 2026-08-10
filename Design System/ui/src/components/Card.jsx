"use client";

import React from "react";

// ------------------------------
// CONFIG MAPS
// ------------------------------
const SIZE_MAP = {
  sm: {
    padding: "p-4",
    title: "text-sm",
    body: "text-xs",
  },
  md: {
    padding: "p-5",
    title: "text-base",
    body: "text-sm",
  },
  lg: {
    padding: "p-6",
    title: "text-lg",
    body: "text-sm",
  },
};

const RADIUS_MAP = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

const VARIANT_MAP = {
  neutral: {
    bg: "bg-content-content1",
    text: "text-primary-950-dark",
    muted: "text-gray-default-600",
  },
  subtle: {
    bg: "bg-gray-default-50",
    text: "text-primary-950-dark",
    muted: "text-gray-default-600",
  },
  dark: {
    bg: "bg-primary-900",
    text: "text-primary-50-dark",
    muted: "text-gray-default-300-dark",
  },
  primary: {
    bg: "bg-gradient-to-br from-primary-500 to-primary-700",
    text: "text-primary-50-dark",
    muted: "text-primary-200-dark",
  },
};

const ELEVATION_MAP = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md shadow-gray-default-300/40",
  lg: "shadow-lg shadow-gray-default-400/60",
};

const BORDER_MAP = {
  none: "border border-transparent",
  subtle: "border border-gray-default-200",
  strong: "border-2 border-gray-default-300",
};

const IMAGE_ASPECT_MAP = {
  square: "aspect-square",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-[16/9]",
  tall: "aspect-[3/4]",
};

const ALIGN_MAP = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

const FOOTER_ALIGN_MAP = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
  between: "justify-between text-left",
};

// ------------------------------
// CARD
// ------------------------------
export default function Card({
  // visual style
  variant = "neutral",
  size = "md",
  radius = "lg",
  elevation = "sm",
  borderStyle = "subtle",

  // image / layout
  imageSrc,
  imageAlt = "",
  imagePosition = "top", // "top" | "left" | "background"
  imageAspect = "4:3",
  overlay = false,

  // content layout
  align = "left",
  footerAlign = "left",

  // interaction
  isClickable = false,
  href,
  hoverEffect = "none", // "none" | "lift" | "highlight"

  // text content
  eyebrow,
  badge,
  title,
  subtitle,
  description,
  footer,
  footerTextColor = "default", // "default" | "light"
  textColor= "red-500", // Tailwind text class override, e.g. "text-primary-50-dark"

  // extra content
  actions,
  children,

  className = "",
  ...props
}) {
  const sizeCfg = SIZE_MAP[size] || SIZE_MAP.md;
  const variantCfg = VARIANT_MAP[variant] || VARIANT_MAP.neutral;

  const radiusClass = RADIUS_MAP[radius] || RADIUS_MAP.lg;
  const elevationClass = ELEVATION_MAP[elevation] || ELEVATION_MAP.sm;
  const borderClass = BORDER_MAP[borderStyle] || BORDER_MAP.subtle;

  const alignClass = ALIGN_MAP[align] || ALIGN_MAP.left;
  const footerAlignClass =
    FOOTER_ALIGN_MAP[footerAlign] || FOOTER_ALIGN_MAP.left;

  const aspectClass =
    IMAGE_ASPECT_MAP[imageAspect] || IMAGE_ASPECT_MAP["4:3"];

  const clickableBase =
    isClickable || href
      ? "cursor-pointer transition-all duration-200"
      : "transition-all duration-200";

  const hoverClass =
    hoverEffect === "lift"
      ? "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-default-400/70"
      : hoverEffect === "highlight"
      ? "hover:bg-primary-50/40 hover:border-primary-300"
      : "";

  const RootTag = href ? "a" : isClickable ? "button" : "div";

  const footerColorClass =
    footerTextColor === "light"
      ? "text-gray-default-200"
      : "text-gray-default-600";

  const rootBase = [
    "group relative flex h-full overflow-hidden",
    radiusClass,
    elevationClass,
    borderClass,
    variantCfg.bg,
    variantCfg.text,
    clickableBase,
    hoverClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // defaults for non-background cards
  const defaultTitleColor =
    variant === "dark" || variant === "primary"
      ? "text-primary-50-dark"
      : "text-primary-950-dark";

  const defaultSubtitleColor =
    variant === "dark" || variant === "primary"
      ? "text-primary-200-dark"
      : "text-gray-default-600";

  const defaultBodyColor =
    variant === "dark" || variant === "primary"
      ? "text-primary-100-dark"
      : "text-gray-default-600";

  const titleColorClass = textColor || defaultTitleColor;
  const subtitleColorClass = textColor || defaultSubtitleColor;
  const bodyColorClass = textColor || defaultBodyColor;

  // ---------------- BACKGROUND IMAGE CARD (hero) ----------------
  if (imagePosition === "background" && imageSrc) {
    const heroTitleColor = textColor || "text-primary-50-dark";
    const heroSubtitleColor = textColor || "text-primary-200-dark";
    const heroBodyColor = textColor || "text-primary-100-dark";

    return (
      <RootTag className={rootBase} href={href} {...props}>
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          )}
        </div>

        <div
          className={[
            "relative z-10 flex w-full flex-col justify-end",
            sizeCfg.padding,
            alignClass,
          ].join(" ")}
        >
          {eyebrow && (
            <p className={`mb-1 text-[11px] font-medium uppercase tracking-wide ${heroSubtitleColor}`}>
              {eyebrow}
            </p>
          )}

          {title && (
            <h3 className={`text-xl font-semibold ${heroTitleColor}`}>
              {title}
            </h3>
          )}

          {subtitle && (
            <p className={`mt-1 text-xs ${heroSubtitleColor}`}>{subtitle}</p>
          )}

          {description && (
            <p className={`mt-2 text-sm ${heroBodyColor}`}>{description}</p>
          )}

          {children && <div className="mt-3 text-sm">{children}</div>}

          {footer && (
            <div
              className={[
                "mt-4 flex gap-2 text-xs",
                footerAlignClass,
                heroBodyColor,
              ].join(" ")}
            >
              {footer}
            </div>
          )}
        </div>
      </RootTag>
    );
  }

  // ---------------- TOP / LEFT IMAGE CARD ----------------
  const hasLeftImage = imageSrc && imagePosition === "left";

  return (
    <RootTag
      className={[rootBase, hasLeftImage ? "flex-row" : "flex-col"].join(" ")}
      href={href}
      {...props}
    >
      {/* IMAGE: top / left */}
      {imageSrc && imagePosition !== "background" && (
        <div
          className={[
            "overflow-hidden bg-gray-default-200",
            imagePosition === "top"
              ? `w-full ${aspectClass}`
              : "hidden md:block md:w-2/5",
          ].join(" ")}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* CONTENT */}
      <div
        className={[
          "flex flex-1 flex-col",
          sizeCfg.padding,
          alignClass,
          hasLeftImage ? "md:w-3/5" : "w-full",
        ].join(" ")}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-gray-default-500">
            {eyebrow}
          </p>
        )}

        {/* Header row: title / badge / actions */}
        <div className="flex w-full items-start justify-between gap-3">
          <div className="space-y-1">
            {badge && (
              <span className="inline-flex rounded-full bg-gray-default-100 px-2 py-0.5 text-[11px] font-medium text-gray-default-700">
                {badge}
              </span>
            )}

            {title && (
              <h3
                className={[
                  "font-semibold",
                  sizeCfg.title,
                  titleColorClass,
                ].join(" ")}
              >
                {title}
              </h3>
            )}

            {subtitle && (
              <p className={["text-xs", subtitleColorClass].join(" ")}>
                {subtitle}
              </p>
            )}
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
        </div>

        {/* Description */}
        {description && (
          <p className={["mt-2", sizeCfg.body, bodyColorClass].join(" ")}>
            {description}
          </p>
        )}

        {/* Children content */}
        {children && <div className="mt-3 text-sm">{children}</div>}

        {/* Footer */}
        {footer && (
          <div
            className={[
              "mt-4 flex gap-2 text-xs",
              footerAlignClass,
              footerColorClass,
            ].join(" ")}
          >
            {footer}
          </div>
        )}
      </div>
    </RootTag>
  );
}
