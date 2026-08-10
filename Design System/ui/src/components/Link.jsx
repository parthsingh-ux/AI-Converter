"use client";

import React from "react";
import { Icon } from "@iconify/react";

const colorClasses = {
  primary: "text-primary hover:text-primary-700",
  secondary: "text-secondary hover:text-secondary-700",
  success: "text-success hover:text-success-700",
  warning: "text-warning hover:text-warning-700",
  danger: "text-danger hover:text-danger-700",
  neutral: "text-gray-700 hover:text-gray-900",
};

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export default function LinkComponent({
  color = "primary",
  size = "md",
  hoverStyle = "underline", // underline | block
  isDisabled = false,
  showIcon = false,
  icon = "akar-icons:link-out", // default icon
  children,
  className = "",
  href = "#",
  ...props
}) {
  const colorCls = colorClasses[color] || colorClasses.primary;
  const sizeCls = sizeClasses[size] || sizeClasses.md;

  const hoverCls =
    hoverStyle === "underline"
      ? "hover:underline"
      : "hover:bg-gray-200 px-1 rounded-md";

  const disabledCls = isDisabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <a
      href={isDisabled ? undefined : href}
      className={`inline-flex items-center gap-1 transition-all duration-150 
        ${colorCls} ${sizeCls} ${hoverCls} ${disabledCls} ${className}`}
      {...props}
    >
      {children}

      {showIcon && !isDisabled && (
        <Icon icon={icon} className="text-current" width={13} height={13} />
      )}
    </a>
  );
}
