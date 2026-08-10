"use client";

import React from "react";

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
};

const colorMap = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  neutral: "text-primary-950-dark",
};

const skinColorMap = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  neutral: "#E4C560",
  default: "#E4C560",
};

// gradient background per theme color (for variant="gradient")
const gradientMap = {
  primary:
    "conic-gradient(from 90deg, var(--color-primary-500), var(--color-primary-300))",
  secondary:
    "conic-gradient(from 90deg, var(--color-secondary-500), var(--color-secondary-300))",
  success:
    "conic-gradient(from 90deg, var(--color-success-500), var(--color-success-300))",
  warning:
    "conic-gradient(from 90deg, var(--color-warning-500), var(--color-warning-300))",
  danger:
    "conic-gradient(from 90deg, var(--color-danger-500), var(--color-danger-300))",
  neutral:
    "conic-gradient(from 90deg, var(--color-gray-default-700), var(--color-gray-default-500))",
};

/**
 * Spinner
 *
 * Props:
 * - variant: "default" | "simple" | "gradient" | "spinner" | "wave" | "dots" | "hand" | "tap"
 * - color: design token key e.g. "primary" | "secondary" | ...
 * - size: "sm" | "md" | "lg"
 * - className?: string
 */
export default function Spinner({
  variant = "default",
  color = "primary",
  size = "md",
  className = "",
}) {
  const dim = sizeMap[size] || sizeMap.md;
  const colorClass = colorMap[color] || colorMap.primary;
  const commonWrapper = `inline-flex items-center justify-center ${colorClass} ${className}`;

  // ========== WAVE ==========
  if (variant === "wave") {
    return (
      <div className={commonWrapper} style={{ height: dim }}>
        <div className="flex items-end gap-0.5">
          <span
            className="bg-current inline-block rounded-full"
            style={{
              width: dim / 6,
              height: dim / 2,
              animation: "spinner-wave 0.8s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <span
            className="bg-current inline-block rounded-full"
            style={{
              width: dim / 6,
              height: dim / 1.6,
              animation: "spinner-wave 0.8s ease-in-out infinite",
              animationDelay: "0.15s",
            }}
          />
          <span
            className="bg-current inline-block rounded-full"
            style={{
              width: dim / 6,
              height: dim / 2,
              animation: "spinner-wave 0.8s ease-in-out infinite",
              animationDelay: "0.3s",
            }}
          />
        </div>
        <style jsx>{`
          @keyframes spinner-wave {
            0%,
            100% {
              transform: scaleY(0.6);
              opacity: 0.5;
            }
            50% {
              transform: scaleY(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  // ========== HAND / TAP VARIANT ==========
  if (variant === "hand" || variant === "tap") {
    const skin = skinColorMap[color] || skinColorMap.default;

    return (
      <div className={commonWrapper}>
        <div className="hand" style={{ "--skin-color": skin }}>
          <div className="finger" />
          <div className="finger" />
          <div className="finger" />
          <div className="finger" />
          <div className="palm" />
          <div className="thumb" />
        </div>

        <style jsx>{`
          .hand {
            --tap-speed: 0.6s;
            --tap-stagger: 0.1s;
            position: relative;
            width: 80px;
            height: 60px;
          }

          .hand::before {
            content: "";
            display: block;
            width: 180%;
            height: 75%;
            position: absolute;
            top: 70%;
            right: 20%;
            background-color: var(--color-gray-default-900);
            border-radius: 40px 10px;
            filter: blur(10px);
            opacity: 0.25;
          }

          .palm {
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: var(--skin-color);
            border-radius: 10px 40px;
          }

          .thumb {
            position: absolute;
            width: 120%;
            height: 38px;
            background-color: var(--skin-color);
            bottom: -18%;
            right: 1%;
            transform-origin: calc(100% - 20px) 20px;
            transform: rotate(-20deg);
            border-radius: 30px 20px 20px 10px;
            border-bottom: 2px solid rgba(0, 0, 0, 0.1);
            border-left: 2px solid rgba(0, 0, 0, 0.1);
          }

          .thumb::after {
            width: 20%;
            height: 60%;
            content: "";
            background-color: rgba(255, 255, 255, 0.3);
            position: absolute;
            bottom: -8%;
            left: 5px;
            border-radius: 60% 10% 10% 30%;
            border-right: 2px solid rgba(0, 0, 0, 0.05);
          }

          .finger {
            position: absolute;
            width: 80%;
            height: 35px;
            background-color: var(--skin-color);
            bottom: 32%;
            right: 64%;
            transform-origin: 100% 20px;
            transform: rotate(10deg);
          }

          .finger::before {
            content: "";
            position: absolute;
            width: 140%;
            height: 30px;
            background-color: var(--skin-color);
            bottom: 8%;
            right: 65%;
            transform-origin: calc(100% - 20px) 20px;
            transform: rotate(-60deg);
            border-radius: 20px;
          }

          .hand .finger:nth-child(1) {
            animation-delay: 0;
            filter: brightness(70%);
            animation-name: tap-upper-1;
            animation-duration: calc(var(--tap-speed) * 2);
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .hand .finger:nth-child(2) {
            animation-delay: var(--tap-stagger);
            filter: brightness(80%);
            animation-name: tap-upper-2;
            animation-duration: calc(var(--tap-speed) * 2);
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .hand .finger:nth-child(3) {
            animation-delay: calc(var(--tap-stagger) * 2);
            filter: brightness(90%);
            animation-name: tap-upper-3;
            animation-duration: calc(var(--tap-speed) * 2);
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          .hand .finger:nth-child(4) {
            animation-delay: calc(var(--tap-stagger) * 3);
            filter: brightness(100%);
            animation-name: tap-upper-4;
            animation-duration: calc(var(--tap-speed) * 2);
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }

          @keyframes tap-upper-1 {
            0%,
            50%,
            100% {
              transform: rotate(10deg) scale(0.4);
            }
            40% {
              transform: rotate(50deg) scale(0.4);
            }
          }

          @keyframes tap-upper-2 {
            0%,
            50%,
            100% {
              transform: rotate(10deg) scale(0.6);
            }
            40% {
              transform: rotate(50deg) scale(0.6);
            }
          }

          @keyframes tap-upper-3 {
            0%,
            50%,
            100% {
              transform: rotate(10deg) scale(0.8);
            }
            40% {
              transform: rotate(50deg) scale(0.8);
            }
          }

          @keyframes tap-upper-4 {
            0%,
            50%,
            100% {
              transform: rotate(10deg) scale(1);
            }
            40% {
              transform: rotate(50deg) scale(1);
            }
          }
        `}</style>
      </div>
    );
  }

  // ========== DOTS ==========
  if (variant === "dots") {
    return (
      <div className={commonWrapper} style={{ height: dim }}>
        <div className="flex items-center gap-1">
          <span
            className="bg-current inline-block rounded-full"
            style={{
              width: dim / 5,
              height: dim / 5,
              animation: "spinner-dots 0.9s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <span
            className="bg-current inline-block rounded-full"
            style={{
              width: dim / 5,
              height: dim / 5,
              animation: "spinner-dots 0.9s ease-in-out infinite",
              animationDelay: "0.18s",
            }}
          />
          <span
            className="bg-current inline-block rounded-full"
            style={{
              width: dim / 5,
              height: dim / 5,
              animation: "spinner-dots 0.9s ease-in-out infinite",
              animationDelay: "0.36s",
            }}
          />
        </div>
        <style jsx>{`
          @keyframes spinner-dots {
            0%,
            100% {
              transform: translateY(0);
              opacity: 0.4;
            }
            50% {
              transform: translateY(-20%);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  // ========== GRADIENT ==========
  if (variant === "gradient") {
    const gradient = gradientMap[color] || gradientMap.primary;

    return (
      <div className={commonWrapper} style={{ width: dim, height: dim }}>
        <div
          className="
            animate-spin
            inline-flex
            rounded-full
          "
          style={{
            width: dim,
            height: dim,
            backgroundImage: gradient,
          }}
        >
          <div className="m-[3px] w-full h-full bg-content-content1 rounded-full" />
        </div>
      </div>
    );
  }

  // ========== SVG SPINNER ==========
  if (variant === "spinner") {
    const strokeWidth = size === "lg" ? 3 : 2;
    const radius = (dim - strokeWidth) / 2;
    const center = dim / 2;

    return (
      <div className={commonWrapper} style={{ width: dim, height: dim }}>
        <svg
          width={dim}
          height={dim}
          viewBox={`0 0 ${dim} ${dim}`}
          className="animate-spin"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity="0.2"
            fill="none"
          />
          <path
            d={describeArc(center, center, radius, 0, 270)}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // ========== DEFAULT & SIMPLE (border spinners) ==========
  const borderWidthClass =
    variant === "simple" ? "border-2" : "border-[3px]";
  const trackOpacityClass =
    variant === "simple" ? "border-opacity-30" : "border-opacity-20";

  return (
    <div className={commonWrapper} style={{ width: dim, height: dim }}>
      <span
        className={`
          inline-block rounded-full
          ${borderWidthClass}
          border-current ${trackOpacityClass}
          border-t-transparent
          animate-spin
        `}
        style={{ width: dim, height: dim }}
      />
    </div>
  );
}

/* ----------------- SVG ARC HELPERS ----------------- */

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}
