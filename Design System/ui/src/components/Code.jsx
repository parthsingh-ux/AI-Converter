"use client";
import React from "react";

/**
 * CodeSnippet Component
 * Props:
 * - text
 * - size: "sm" | "md" | "lg"
 * - radius: "sm" | "md" | "lg" | "full"
 * - color: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral"
 */

const sizeClasses = {
  sm: "text-[11px] px-1 py-2",
  md: "text-[13px] px-3 py-3",
  lg: "text-[15px] px-5 py-4",
};

const radiusClasses = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};

const colorClasses = {
  primary: "bg-primary-50 text-primary",
  secondary: "bg-secondary-50 text-secondary",
  success: "bg-success-50 text-success",
  warning: "bg-warning-50 text-warning",
  danger: "bg-danger-50 text-danger",
  neutral: "bg-gray-default-50 text-primary-950-dark",
};

export default function CodeSnippet({
  text = "npm install @heroui-org/react",
  size = "md",
  radius = "md",
  color = "neutral",
  className = "",
}) {
  return (
    <code
      className={[
        "self-start inline-flex items-center font-mono leading-none whitespace-nowrap select-text",
        sizeClasses[size] || sizeClasses.md,
        radiusClasses[radius] || radiusClasses.md,
        colorClasses[color] || colorClasses.neutral,
        className,
      ].join(" ")}
    >
      {text}
    </code>
  );
}
