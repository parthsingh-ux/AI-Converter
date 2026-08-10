"use client";

import React from "react";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { Icon } from "@iconify/react";

const variantStyles = {
  primary: {
    iconBg: "bg-primary-50",
    iconText: "text-primary-600",
    primaryBtn:
      "bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white",
  },
  secondary: {
    iconBg: "bg-secondary-50",
    iconText: "text-secondary-600",
    primaryBtn:
      "bg-secondary hover:bg-secondary-700 active:bg-secondary-800 text-white",
  },
  success: {
    iconBg: "bg-success-50",
    iconText: "text-success-600",
    primaryBtn:
      "bg-success hover:bg-success-700 active:bg-success-800 text-primary-50-dark",
  },
  danger: {
    iconBg: "bg-danger-50",
    iconText: "text-danger-600",
    primaryBtn:
      "bg-danger hover:bg-danger-700 active:bg-danger-800 text-white",
  },
  warning: {
    iconBg: "bg-warning-50",
    iconText: "text-warning-600",
    primaryBtn:
      "bg-warning hover:bg-warning-600 active:bg-warning-700 text-primary-950-dark",
  },
  info: {
    // mapped to secondary-ish / neutral info tone
    iconBg: "bg-gray-default-50",
    iconText: "text-gray-default-600",
    primaryBtn:
      "bg-default hover:bg-gray-default-900 active:bg-gray-default-950 text-white",
  },
};

export default function Popup({
  isOpen,
  onClose,
  title = "Title",
  description = "Description here...",
  variant = "primary",
  primaryLabel = "Action",
  secondaryLabel = "Close",
  onPrimary,
  onSecondary,
  icon,
}) {
  if (!isOpen) return null;

  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <div className="">
      <div className="max-w-sm w-full rounded-2xl border border-gray-default-200 bg-content-content1 px-6 py-5 shadow-[0_12px_40px_rgba(15,23,42,0.15)]">
        {/* Icon + Close */}
        <div className="mb-3 flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${styles.iconBg}`}
          >
            <span className={`text-xl ${styles.iconText}`}>
              {icon || <IoCheckmark />}
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-default-400 transition hover:bg-gray-default-100 hover:text-gray-default-700"
          >
            <IoClose className="text-lg" />
          </button>
        </div>

        {/* Title & Description */}
        <h2 className="mb-1 text-lg font-semibold text-primary-950-dark">
          {title}
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-gray-default-600">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onSecondary || onClose}
            className="rounded-xl border border-gray-default-300 bg-content-content1 px-5 py-2 text-sm font-medium text-gray-default-700 transition hover:bg-gray-default-50"
          >
            {secondaryLabel}
          </button>

          <button
            type="button"
            onClick={onPrimary}
            className={`rounded-xl px-5 py-2 text-sm font-medium transition ${styles.primaryBtn}`}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
