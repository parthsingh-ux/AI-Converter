"use client";
import React from "react";

/**
 * Progress Component (circular + linear)
 *
 * Props:
 * - type: "circular" | "linear"
 * - size: number|string
 * - circularThickness: number
 * - linearHeight: number
 * - borderRadius: number
 * - color: string
 * - value: number
 * - isStriped: boolean
 * - stripedType: string
 * - isDisabled: boolean
 * - showLabel: boolean
 * - className: string
 */

export default function Progress({
  type = "circular",
  size = type === "circular" ? 120 : "100%",

  circularThickness = 12,
  linearHeight = 12,
  borderRadius = 6,

  color = "primary",
  value = 0,

  isStriped = false,
  stripedType = "diagonal",
  isDisabled = false,
  showLabel = true,

  className = "",
}) {
  const colorMap = {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
    neutral: "var(--color-neutral)",
    default: "var(--color-default)",
  };

  const resolvedColor =
    typeof color === "string" && color.startsWith("#")
      ? color
      : colorMap[color] || colorMap.default;

  const pct = Math.max(0, Math.min(100, Number(value || 0)));
  const disabledStyle = isDisabled
    ? { opacity: 0.45, pointerEvents: "none" }
    : {};

  function getStripedBackground(typeName, colorVal) {
    switch (typeName) {
      case "vertical":
        return {
          background: `repeating-linear-gradient(90deg, ${colorVal} 0, ${colorVal} 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)`,
          backgroundSize: "20px 100%",
          distance: 20,
        };

      case "horizontal":
        return {
          background: `repeating-linear-gradient(0deg, ${colorVal} 0, ${colorVal} 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)`,
          backgroundSize: "100% 20px",
          distance: 20,
        };

      case "thin":
        return {
          background: `repeating-linear-gradient(45deg, ${colorVal} 0, ${colorVal} 5px, rgba(255,255,255,0.15) 5px, rgba(255,255,255,0.15) 10px)`,
          backgroundSize: "14.14px 14.14px",
          distance: 14.14,
        };

      case "thick":
        return {
          background: `repeating-linear-gradient(45deg, ${colorVal} 0, ${colorVal} 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 40px)`,
          backgroundSize: "56.57px 56.57px",
          distance: 56.57,
        };

      case "gradient":
        return {
          background: `linear-gradient(90deg, ${colorVal} 0%, rgba(255,255,255,0.1) 50%, ${colorVal} 100%)`,
          backgroundSize: "40px 100%",
          distance: 40,
        };

      case "dotted":
        return {
          background: `radial-gradient(circle, ${colorVal} 25%, transparent 25%)`,
          backgroundSize: "10px 10px",
          distance: 10,
        };

      case "zebra":
        return {
          background: `repeating-linear-gradient(135deg, ${colorVal} 0, ${colorVal} 12px, rgba(255,255,255,0.15) 12px, rgba(255,255,255,0.15) 24px)`,
          backgroundSize: "33.94px 33.94px",
          distance: 33.94,
        };

      case "diagonal":
      default:
        return {
          background: `repeating-linear-gradient(45deg, ${colorVal} 0, ${colorVal} 10px, rgba(255,255,255,0.15) 10px, rgba(255,255,255,0.15) 20px)`,
          backgroundSize: "28.28px 28.28px",
          distance: 28.28,
        };
    }
  }

  if (type === "circular") {
    const diameter =
      typeof size === "number" ? size : parseInt(String(size), 10) || 120;

    const stroke = circularThickness;
    const r = (diameter - stroke) / 2;
    const cx = diameter / 2;
    const cy = diameter / 2;
    const circumference = 2 * Math.PI * r;
    const dashoffset = circumference * (1 - pct / 100);

    const svgStyle = { transform: "rotate(-90deg)" };
    const trackStyle = { stroke: "#e6eef6" };
    const progressStyle = {
      stroke: resolvedColor,
      strokeLinecap: "round",
      transition: "stroke-dashoffset 400ms cubic-bezier(0.22,1,0.36,1), stroke 200ms ease",
    };

    const circularStripeDash =
      stripedType === "thin"
        ? `${Math.max(2, Math.floor(stroke / 2))} ${Math.max(4, stroke * 2)}`
        : stripedType === "thick"
        ? `${Math.max(6, stroke * 2)} ${Math.max(6, stroke * 3)}`
        : `${stroke} ${stroke * 2}`;

    // spin duration proportional to thickness (thicker -> slightly slower)
    const spinDuration = `${Math.max(0.9, (stroke / 12) * 1.8)}s`;

    return (
      <div
        className={`progress-circular ${className}`}
        style={{
          width: diameter,
          height: diameter,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          ...disabledStyle,
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          style={svgStyle}
        >
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            strokeWidth={stroke}
            style={trackStyle}
          />

          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            style={progressStyle}
          />

          {isStriped && pct > 0 && (
            <g
              style={{
                transformOrigin: "center",
                // use CSS var for duration if someone wants to override downstream
                animation: `spin ${spinDuration} linear infinite`,
              }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={resolvedColor}
                strokeWidth={Math.max(2, Math.floor(stroke / 3))}
                strokeDasharray={circularStripeDash}
                strokeDashoffset={dashoffset}
                strokeLinecap="butt"
                opacity={0.6}
              />
            </g>
          )}
        </svg>

        {showLabel && (
          <div
            style={{
              position: "absolute",
              fontWeight: 600,
              color: isDisabled ? "#9AA4B2" : "#0f172a",
            }}
          >
            {Math.round(pct)}%
          </div>
        )}

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          /* Respect user preference for reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .progress-circular g { animation: none !important; }
          }
        `}</style>
      </div>
    );
  }

  // ==========================
  // LINEAR (improved striped animation)
  // ==========================
  const widthStyle = typeof size === "number" ? `${size}px` : size;
  const trackColor = "#e6eef6";
  const fillColor = resolvedColor;
  const stripedBg = isStriped ? getStripedBackground(stripedType, fillColor) : null;

  // Mapping for default bgSize and relative speed multiplier (base speed 1s for distance ~28px)
  const baseDistance = 28.28;
  const defaultBgSizeMap = {
    diagonal: "28.28px 28.28px",
    thin: "14.14px 14.14px",
    thick: "56.57px 56.57px",
    horizontal: "20px 20px",
    vertical: "20px 20px",
    gradient: "100% 100%",
    dotted: "10px 10px",
    zebra: "33.94px 33.94px",
  };
  const bgSize = stripedBg?.backgroundSize || defaultBgSizeMap[stripedType] || defaultBgSizeMap.diagonal;
  const distance = stripedBg?.distance || baseDistance;
  // speed inversely proportional to distance: smaller distance -> faster
  const speedSeconds = Math.max(0.6, (distance / baseDistance) * 1.0);

  // Inline CSS custom props (React needs them cast)
  const cssVars = {
    // React types: use string keys casted to CSSProperties
    "--stripe-distance": `${distance}px`,
    "--stripe-duration": `${speedSeconds}s`,
  };

  return (
    <div
      className={`progress-linear ${className}`}
      style={{ width: widthStyle, ...disabledStyle }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >

            {showLabel && (
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            fontWeight: 500,
            textAlign: "end",
            color: isDisabled ? "#9AA4B2" : "#0f172a",
          }}
        >
          {Math.round(pct)}%
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: linearHeight,
          background: trackColor,
          borderRadius: borderRadius,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          className="progress-fill"
          style={{
            width: `${pct}%`,
            height: "100%",
            background: !isStriped ? fillColor : "transparent",
            transition: "width 10ms cubic-bezier(0.22, 1, 0.36, 1)",
            position: "relative",
            willChange: "width, transform",
            display: "block",
            transform: "translateZ(0)",
          }}
        >
          {/* Stripe overlay: absolutely fills the "fill" and animates background-position */}
          {isStriped && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: stripedBg?.background,
                backgroundSize: bgSize,
                backgroundRepeat: "repeat",
                opacity: stripedType === "gradient" ? 0.95 : 0.9,
                // use CSS variable-driven single keyframe animation for consistent motion
                animation: `stripeMove var(--stripe-duration) linear infinite`,
                pointerEvents: "none",
                mixBlendMode: "overlay",
                willChange: "background-position, opacity",
                ...cssVars,
              }}
            />
          )}
        </div>
      </div>



      <style>{`
        /* single stripe animation keyframes that use CSS vars */
        @keyframes stripeMove {
          from { background-position: 0 0; }
          to { background-position: var(--stripe-distance, 28px) 0; }
        }

        /* fallback for older browsers: still works because we set a static bg size & animation */
        @media (prefers-reduced-motion: reduce) {
          .progress-linear .progress-fill > div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
