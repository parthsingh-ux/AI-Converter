"use client";

import React from "react";
import { Icon } from "@iconify/react";

const SIZE_MAP = {
  sm: 32,
  md: 48,
  lg: 72,
};

const RADIUS_MAP = {
  none: "0",
  sm: "8px",
  md: "12px",
  lg: "20px",
  full: "50%",
};

const BORDER_MAP = {
  none: "0px",
  sm: "1px",
  md: "2px",
  lg: "3px",
};

// Mapped to your design tokens
const COLOR_MAP = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  neutral: "var(--color-gray-default-400)",
  default: "var(--color-default)",
};

export default function Avatar({
  size = "md",
  color = "secondary",
  iconColor = "var(--color-content-content1)",
  textColor = "var(--color-content-content1)",
  radius = "full",
  variant = "icon", // "icon" | "image" | "text"
  border = "none", // "none" | "sm" | "md" | "lg"
  borderColor = "neutral",
  src,
  text = "",
  alt = "avatar",
  style = {},
  imageScale = 1,
  className = "",
}) {
  const px = SIZE_MAP[size] || SIZE_MAP.md;
  const borderRadius = RADIUS_MAP[radius] || RADIUS_MAP.full;
  const borderWidth = BORDER_MAP[border] || BORDER_MAP.none;

  const resolvedColor =
    COLOR_MAP[color] || color || "var(--color-gray-default-200)";
  const resolvedBorderColor =
    COLOR_MAP[borderColor] || borderColor || "transparent";

  const computedStyle = {
    width: px,
    height: px,
    borderRadius,
    backgroundColor: resolvedColor,
    border: `${borderWidth} solid ${resolvedBorderColor}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: px * 0.4,
    color: textColor,
    overflow: "hidden",
    ...style,
  };

  const renderIcon = () => (
    <Icon
      icon="tabler:user-filled"
      width={px * 0.6}
      height={px * 0.6}
      color={iconColor}
    />
  );

  const renderText = () => {
    const initials = text
      .trim()
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return <span style={{ color: textColor }}>{initials}</span>;
  };

  const renderImage = () => (
    <img
      src={src}
      alt={alt}
      style={{
        width: `${imageScale * 100}%`,
        height: `${imageScale * 100}%`,
        objectFit: "cover",
        display: "block",
      }}
    />
  );

  return (
    <div className={className} style={computedStyle}>
      {variant === "image" && src
        ? renderImage()
        : variant === "text"
        ? renderText()
        : renderIcon()}
    </div>
  );
}

export function AvatarGroup({
  children,
  layout = "row", // "row" | "stack"
  grid = false,
  columns = 4,
  max = null,
  overlap = 0,
  spacing = 8,
  className = "",
}) {
  const items = React.Children.toArray(children);

  const visible = max ? items.slice(0, max) : items;
  const extraCount = max && items.length - max;

  // GRID MODE
  if (grid) {
    return (
      <div
        className={`grid gap-3 ${className}`}
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {items}
      </div>
    );
  }

  // STACK MODE
  if (layout === "stack") {
    return (
      <div
        className={`flex items-center ${className}`}
        style={{ gap: `${spacing}px` }}
      >
        {visible.map((child, i) => (
          <div
            key={i}
            style={{
              marginLeft: i === 0 ? 0 : `-${overlap}px`,
              zIndex: items.length - i,
            }}
          >
            {child}
          </div>
        ))}

        {extraCount > 0 && (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "var(--color-gray-default-200)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: `-${overlap}px`,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--color-gray-default-800)",
            }}
          >
            +{extraCount}
          </div>
        )}
      </div>
    );
  }

  // ROW MODE
  return (
    <div
      className={`flex items-center ${className}`}
      style={{ gap: `${spacing}px` }}
    >
      {items}
    </div>
  );
}
