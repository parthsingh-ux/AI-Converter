// components/Toast.jsx
"use client";

import React from "react";
import { Icon } from "@iconify/react";

const radiusMap = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const colorMap = {
  neutral: {
    bg: "bg-gray-default-100",
    text: "text-gray-default-800",
    iconBg: "bg-gray-default-300 text-content-content1",
    actionBg: "bg-gray-default-200 text-primary-950-dark",
    close: "text-default",
    border: "border border-gray-default-300",
  },
  primary: {
    bg: "bg-primary-100",
    text: "text-primary",
    iconBg: "bg-primary text-content-content1",
    actionBg: "bg-primary text-content-content1",
    close: "text-primary",
    border: "border border-primary-200",
  },
  secondary: {
    bg: "bg-secondary-100",
    text: "text-secondary",
    iconBg: "bg-secondary text-content-content1",
    actionBg: "bg-secondary text-content-content1",
    close: "text-secondary",
    border: "border border-secondary-200",
  },
  success: {
    bg: "bg-success-100",
    text: "text-success",
    iconBg: "bg-success text-content-content1",
    actionBg: "bg-success text-content-content1",
    close: "text-success",
    border: "border border-success-200",
  },
  warning: {
    bg: "bg-warning-100",
    text: "text-warning",
    iconBg: "bg-warning text-content-content1",
    actionBg: "bg-warning text-content-content1",
    close: "text-warning",
    border: "border border-warning-200",
  },
  danger: {
    bg: "bg-danger-100",
    text: "text-danger",
    iconBg: "bg-danger text-content-content1",
    actionBg: "bg-danger text-content-content1",
    close: "text-danger",
    border: "border border-danger-200",
  },
};

export default function Toast({
  color = "neutral",
  radius = "lg",
  label = "Email sent",
  description,
  action,
  onAction,
  onClose,
  icon = "lucide:info",
  className = "",
    duration = 4000,
}) {
  const c = colorMap[color] || colorMap.neutral;
  const r = radiusMap[radius] || radiusMap.lg;

  return (
    <div
      className={`
        relative w-full flex items-start gap-4 p-4
        ${c.bg} ${c.text} ${c.border} ${r} ${className}
      `}
    >
      {/* Close Button at TOP-RIGHT */}
      <button
        onClick={onClose}
        type="button"
        className={`
          absolute
          ${radius === "full" ? "top-0 right-0" : "-top-2 -right-2"}
          p-0.5
          rounded-full
          border border-gray-default-200
          bg-content-content1
          shadow-sm
          hover:bg-gray-default-100
          transition
          ${c.close}
        `}
      >
        <Icon icon="lucide:x" width={14} height={14} />
      </button>

      {/* Left Icon */}
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full ${c.iconBg}`}
      >
        <Icon icon={icon} width={16} height={16} />
      </div>

      {/* Middle Text */}
      <div className="flex flex-col flex-1 pr-6">
        <span className="font-medium">{label}</span>
        {description && (
          <span className="text-sm opacity-80">{description}</span>
        )}
      </div>

      {/* Action Button */}
      {action && (
        <button
          type="button"
          onClick={onAction}
          className={`px-4 py-2 text-sm font-medium rounded-xl ${c.actionBg}`}
        >
          {action}
        </button>
      )}
    </div>
  );
}
