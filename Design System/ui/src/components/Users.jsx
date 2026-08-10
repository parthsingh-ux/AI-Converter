// components/Users.jsx
"use client";

import React from "react";
import clsx from "clsx";

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  full: "rounded-full",
};

const avatarColorMap = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  success: "bg-success text-white",
  warning: "bg-warning text-primary-950-dark",
  danger: "bg-danger text-white",
  neutral: "bg-gray-default-200 text-primary-950-dark",
};

const linkColorMap = {
  primary: "text-primary hover:text-primary-600",
  secondary: "text-secondary hover:text-secondary-600",
  success: "text-success hover:text-success-600",
  warning: "text-warning hover:text-warning-600",
  danger: "text-danger hover:text-danger-600",
  neutral: "text-gray-default-600 hover:text-gray-default-800",
};

const nameColorMap = {
  default: "text-primary-950-dark",
  muted: "text-gray-default-700",
};

export default function Users({
  display = "image",          // "image" | "icon" | "default"
  imageSrc,
  imageAlt = "",
  icon,
  size = "md",               // "sm" | "md" | "lg"
  radius = "full",           // "none" | "sm" | "md" | "lg" | "full"
  text,
  label,
  linkLabel,
  linkHref = "#",
  avatarColor = "primary",   // theme color for avatar in icon/default mode
  textColor = "default",     // "default" | "muted"
  linkColor = "primary",     // theme color for link
  className = "",
}) {
  const avatarBase = clsx(
    "flex items-center justify-center overflow-hidden",
    sizeMap[size] || sizeMap.md,
    radiusMap[radius] || radiusMap.full
  );

  const avatarTheme = avatarColorMap[avatarColor] || avatarColorMap.primary;
  const nameColorClass = nameColorMap[textColor] || nameColorMap.default;
  const linkColorClass = linkColorMap[linkColor] || linkColorMap.primary;

  const renderAvatar = () => {
    if (display === "image" && imageSrc) {
      return (
        <div className={clsx(avatarBase, "bg-gray-default-100")}>
          <img
            src={imageSrc}
            alt={imageAlt || text}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (display === "icon" && icon) {
      return (
        <div className={clsx(avatarBase, avatarTheme)}>
          {icon}
        </div>
      );
    }

    // default circular avatar with theme color
    return <div className={clsx(avatarBase, avatarTheme)} />;
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-3 px-3 py-2 rounded-xl",
        "hover:bg-gray-default-50 cursor-pointer transition-colors",
        className
      )}
    >
      {renderAvatar()}

      <div className="flex flex-col">
        <span
          className={clsx(
            "text-[15px] font-medium leading-tight",
            nameColorClass
          )}
        >
          {text}
        </span>

        {label && (
          <span className="text-[13px] text-gray-default-600 leading-tight">
            {label}
          </span>
        )}

        {linkLabel && (
          <a
            href={linkHref}
            className={clsx(
              "text-[13px] leading-tight underline-offset-2",
              linkColorClass
            )}
          >
            {linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}
