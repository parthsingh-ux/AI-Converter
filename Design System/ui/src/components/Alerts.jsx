"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

/**
 * Alert (Toast-capable, or inline)
 *
 * Props:
 * - variant: "neutral" | "primary" | "info" | "success" | "warning" | "danger"
 * - title, description
 * - dismissible, onClose, icon
 * - rounded: "none" | "sm" | "md" | "lg" | "xl" | "full"
 * - shadow: "none" | "sm" | "md" | "lg"
 * - tone: "light" | "solid"
 * - borderThickness: "none" | "1px" | "2px" | "3px" | "4px"
 *
 * Toast props:
 * - position, autoClose, hideProgressBar, newestOnTop, closeOnClick,
 *   rtl, pauseOnFocusLoss, draggable, pauseOnHover, transition
 *
 * - isInline: boolean -> true: render inline (inside layout). false: fixed toast.
 */
const Alert = ({
  variant = "neutral",
  title,
  description,
  dismissible = true,
  onClose,
  icon,
  rounded = "xl",
  shadow = "none",
  className = "",
  isOpen: isOpenProp,
  tone = "light",
  borderThickness = "1px",

  // toast-like props
  position = "bottom-center",
  autoClose = 0, // 0 = disabled
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = false,
  rtl = false,
  pauseOnFocusLoss = true,
  draggable = true,
  pauseOnHover = true,
  transition = "bounce",

  isInline = true, // default inline so demo shows everything
}) => {
  const [openInternal, setOpenInternal] = useState(true);
  const [paused, setPaused] = useState(false);
  const isControlled = typeof isOpenProp === "boolean";
  const isOpen = isControlled ? isOpenProp : openInternal;
  const progressRef = useRef(null);
  const timerRef = useRef(null);
  const startTsRef = useRef(null);
  const remainingRef = useRef(autoClose);

  const handleClose = (e) => {
    if (!isControlled) setOpenInternal(false);
    if (typeof onClose === "function") onClose(e);
  };

  useEffect(() => {
    if (!isControlled && isOpenProp === false) setOpenInternal(false);
  }, [isOpenProp, isControlled]);

  // autoClose timer logic
  useEffect(() => {
    clearTimeout(timerRef.current);

    if (!isOpen || !autoClose || autoClose <= 0) return;

    if (!paused) {
      startTsRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        handleClose();
      }, remainingRef.current);
    } else {
      const elapsed = Date.now() - (startTsRef.current || Date.now());
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    }

    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, paused, autoClose]);

  // reset remaining when autoClose or open toggles fresh
  useEffect(() => {
    remainingRef.current = autoClose;
  }, [autoClose, isOpen]);

  if (!isOpen) return null;

  const roundedMap =
    {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-2xl",
      full: "rounded-full",
    }[rounded] || "rounded-2xl";

  const borderThicknessCls =
    {
      none: "",
      "1px": "border border-[1px]",
      "2px": "border-2",
      "3px": "border-[3px]",
      "4px": "border-[4px]",
    }[borderThickness] ?? "border";

  const shadowMap =
    {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    }[shadow] || "";

  // THEME-BASED PALETTE
  const palette =
    {
      neutral: {
        bg: "bg-gray-default-50",
        ring: "ring-gray-default-100",
        text: "text-gray-default-900",
        subText: "text-gray-default-600",
        border: "border-gray-default-200",
        iconBorder: "border-gray-default-200",
        iconText: "text-gray-default-700",
        close: "text-gray-default-400",
      },
      primary: {
        bg: "bg-primary-50",
        ring: "ring-primary-100",
        text: "text-primary-700",
        subText: "text-primary-600",
        border: "border-primary-300",
        iconBorder: "border-primary-300",
        iconText: "text-primary-600",
        close: "text-primary-400",
      },
      success: {
        bg: "bg-success-50",
        ring: "ring-success-100",
        text: "text-success-700",
        subText: "text-success-600",
        border: "border-success-300",
        iconBorder: "border-success-300",
        iconText: "text-success-600",
        close: "text-success-400",
      },
      danger: {
        bg: "bg-danger-50",
        ring: "ring-danger-100",
        text: "text-danger-700",
        subText: "text-danger-600",
        border: "border-danger-300",
        iconBorder: "border-danger-300",
        iconText: "text-danger-600",
        close: "text-danger-400",
      },
      warning: {
        bg: "bg-warning-50",
        ring: "ring-warning-100",
        text: "text-warning-700",
        subText: "text-warning-600",
        border: "border-warning-300",
        iconBorder: "border-warning-300",
        iconText: "text-warning-600",
        close: "text-warning-400",
      },
      info: {
        // mapped to secondary palette
        bg: "bg-secondary-50",
        ring: "ring-secondary-100",
        text: "text-secondary-700",
        subText: "text-secondary-600",
        border: "border-secondary-300",
        iconBorder: "border-secondary-300",
        iconText: "text-secondary-600",
        close: "text-secondary-400",
      },
    }[variant] ||
    {
      bg: "bg-gray-default-50",
      ring: "ring-gray-default-100",
      text: "text-gray-default-900",
      subText: "text-gray-default-600",
      border: "border-gray-default-200",
      iconBorder: "border-gray-default-200",
      iconText: "text-gray-default-700",
      close: "text-gray-default-400",
    };

  const borderCls =
    tone === "solid" && borderThickness !== "none"
      ? `${borderThicknessCls} ${palette.border}`
      : borderThickness === "none"
      ? ""
      : `${borderThicknessCls} ${palette.border}`;

  // when inline, allow full width in grid; when floating, constrain width
  const baseClasses = `${
    isInline ? "w-full" : "w-full max-w-md"
  } ${roundedMap} ${palette.bg} ${borderCls} ${shadowMap} p-4 transition-all duration-300 ease-in-out ${className}`;

  const DefaultIcon = (
    <span
      className={`flex items-center justify-center w-8 h-8 rounded-full border ${palette.iconBorder} ${palette.iconText}`}
    >
      <Icon icon="hugeicons:information-circle" width="20" height="20" />
    </span>
  );

  const positionMap =
    {
      "top-right": "top-4 right-4",
      "top-left": "top-4 left-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-4 right-4",
      "bottom-left": "bottom-4 left-4",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    }[position] || "bottom-center";

  const wrapperClass = isInline ? "relative" : `fixed z-50 ${positionMap}`;

  const progressStyle =
    autoClose && !paused
      ? { animation: `progress ${autoClose}ms linear forwards` }
      : {
          width:
            remainingRef.current && autoClose
              ? `${(remainingRef.current / autoClose) * 100}%`
              : "100%",
        };

  return (
    <div
      className={wrapperClass}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      onClick={() => closeOnClick && handleClose()}
      role="presentation"
      style={{ direction: rtl ? "rtl" : "ltr" }}
    >
      <div role="status" aria-live="polite" className={baseClasses}>
        <div className="flex items-start gap-4">
          <div className="flex items-start flex-shrink-0 pt-0.5">
            {icon ?? DefaultIcon}
          </div>

          <div className="flex-1 min-w-0">
            {title && (
              <div className={`font-semibold ${palette.text} leading-tight`}>
                {title}
              </div>
            )}
            {description && (
              <div className={`text-sm ${palette.subText} mt-1`}>
                {description}
              </div>
            )}
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={handleClose}
              aria-label="Dismiss"
              className={`ml-3 p-1 rounded-full hover:bg-content-content2/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${palette.ring}`}
            >
              <Icon
                icon="carbon:close-filled"
                className={`w-5 h-5 ${palette.close}`}
                width="20"
                height="20"
              />
            </button>
          )}
        </div>

        {!hideProgressBar && autoClose > 0 && (
          <div className="h-1 mt-3 bg-gray-default-200 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-primary-400"
              style={progressStyle}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Alert;
