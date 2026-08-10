"use client";
import React from "react";
import Avatar from "@/components/Avatar";

const SIZE_MAP = { sm: 32, md: 48, lg: 72 };
const RADIUS_MAP = {
  none: "0px",
  sm: "8px",
  md: "12px",
  lg: "20px",
  full: "50%",
};
const BORDER_MAP = { none: "0px", sm: "1px", md: "2px", lg: "3px" };

const COLOR_MAP = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  default: "var(--color-default)",
};

function resolveSize(sizeOrToken) {
  if (typeof sizeOrToken === "number") return sizeOrToken;
  return SIZE_MAP[sizeOrToken] || SIZE_MAP.md;
}

/**
 * Resolve a value that can be:
 * - number -> returns number (px)
 * - token ('sm'|'md'|'lg') -> returns px number via SIZE_MAP
 * - string with '%' or px (e.g. "80%" or "40px") -> returns as-is string
 */
function resolveFlexibleSize(val, fallbackPx) {
  if (val == null) return fallbackPx;
  if (typeof val === "number") return val; // we'll treat as px (number)
  if (typeof val === "string") {
    if (val.endsWith("%") || val.endsWith("px")) return val;
    // maybe it's a token
    const tokenVal = SIZE_MAP[val];
    if (tokenVal) return tokenVal;
    // fallback: try parse as number string
    const n = Number(val);
    return Number.isFinite(n) ? n : fallbackPx;
  }
  return fallbackPx;
}

export default function AvatarGroup({
  items = [],
  size = "md",

  show = 5,
  spacing = 0.35,
  className = "",

  border = "sm",
  borderColor = "default",
  radius = "full",

  grid = false,

  color = "default",
  counterBg,
  counterColor = "#fff",
  counterTextColor = "#fff",
  counterSize = null, // number (px) or size token e.g. 'md'

  innerSize = "100%", // fallback inner size (string like "100%" or px)

  /* New: per-variant sizes */
  imageSize = null, // number|token|'80%'|'40px'
  textSize = null, // number|token
  iconSize = null, // number|token

  /* New props to filter which variants to include */
  showImage = true,
  showText = true,
  showIcon = true,

  /* New props for avatar internals */
  avatarTextColor = "#ffffff",
  avatarIconColor = "#ffffff",
}) {
  const px = resolveSize(size);
  const overlap = Math.round(px * spacing);

  const total = items.length;
  const showCounter = total > show;
  const visibleItems = showCounter ? items.slice(0, show - 1) : items;

  // Filter visible items by allowed variants
  const filteredVisible = visibleItems.filter((it) => {
    if (!it || !it.variant) return true;
    if (it.variant === "image" && !showImage) return false;
    if (it.variant === "text" && !showText) return false;
    if (it.variant === "icon" && !showIcon) return false;
    return true;
  });

  const resolvedBorderColor = COLOR_MAP[borderColor] || borderColor;
  const resolvedGroupColor = COLOR_MAP[color] || color;
  const finalCounterBg = counterBg || resolvedGroupColor;

  const resolvedCounterSize = counterSize ? resolveSize(counterSize) : px;

  const counterStyle = {
    width: resolvedCounterSize,
    height: resolvedCounterSize,
    borderRadius: RADIUS_MAP[radius],
    background: finalCounterBg,
    color: counterTextColor,
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: Math.round(resolvedCounterSize * 0.36),
    border: `${BORDER_MAP[border]} solid ${resolvedBorderColor}`,
    boxSizing: "border-box",
  };

  return (
    <div
      className={`${grid ? "flex flex-wrap gap-3" : "flex items-center"} ${className}`}
      style={{ padding: grid ? "6px" : undefined }}
    >
      {/* AVATARS */}
      {filteredVisible.map((avatar, i) => {
        // determine per-avatar inner style
        // default inner style: use innerSize as-is (string like '100%') or px if number token
        let avatarWidth = innerSize;
        let avatarHeight = innerSize;

        // If the avatar is image and imageSize prop provided, use it
        if (avatar.variant === "image" && imageSize != null) {
          const resolved = resolveFlexibleSize(imageSize, resolveSize(size));
          // resolved can be number (px) or string like '80%'
          avatarWidth = typeof resolved === "number" ? `${resolved}px` : resolved;
          avatarHeight = avatarWidth;
        } else {
          // If innerSize is a numeric token like 'md', resolve to px string
          if (typeof innerSize === "number") {
            avatarWidth = `${innerSize}px`;
            avatarHeight = `${innerSize}px`;
          } else if (typeof innerSize === "string" && !innerSize.endsWith("%") && !innerSize.endsWith("px")) {
            // allow tokens like 'md' as innerSize
            const token = SIZE_MAP[innerSize];
            if (token) {
              avatarWidth = `${token}px`;
              avatarHeight = `${token}px`;
            }
          }
        }

        // Resolve text/icon sizes (pass as numbers in px to Avatar)
        const resolvedTextSize = textSize ? resolveFlexibleSize(textSize, Math.round(px * 0.45)) : undefined;
        const resolvedIconSize = iconSize ? resolveFlexibleSize(iconSize, Math.round(px * 0.5)) : undefined;

        const wrapperStyle = {
          marginLeft: grid ? 0 : i === 0 ? 0 : `-${overlap}px`,
          zIndex: grid ? "auto" : 100 - i,
          border: `${BORDER_MAP[border]} solid ${resolvedBorderColor}`,
          borderRadius: RADIUS_MAP[radius],
          padding: "2px",
          background: "#fff",
          transition: "transform .25s ease",
          boxSizing: "content-box",
        };

        const avatarStyle = { width: avatarWidth, height: avatarHeight };

        return (
          <div
            key={i}
            className="transition-transform duration-200 hover:-translate-x-2 hover:scale-105"
            style={wrapperStyle}
          >
            <Avatar
              {...avatar}
              size={size}
              radius={radius}
              border={border}
              borderColor={resolvedBorderColor}
              style={avatarStyle}
              textColor={avatar.textColor ?? avatarTextColor}
              iconColor={avatar.iconColor ?? avatarIconColor}
              textSize={resolvedTextSize}   // new prop: Avatar should use this as fontSize (px)
              iconSize={resolvedIconSize}   // new prop: Avatar should use this to size the icon
            />
          </div>
        );
      })}

      {/* COUNTER */}
      {showCounter && (
        <div
          className="transition-transform duration-200 hover:-translate-x-2 hover:scale-105"
          style={{
            marginLeft: grid ? 0 : `-${overlap}px`,
            zIndex: grid ? "auto" : 0,
            border: `${BORDER_MAP[border]} solid ${resolvedBorderColor}`,
            borderRadius: RADIUS_MAP[radius],
            padding: "2px",
            background: "#fff",
            boxSizing: "content-box",
          }}
        >
          <div style={counterStyle}>+{total - (show - 1)}</div>
        </div>
      )}
    </div>
  );
}
