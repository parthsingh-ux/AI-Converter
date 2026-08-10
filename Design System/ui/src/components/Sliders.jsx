"use client";

import React, { useState, useRef, useCallback } from "react";

const Slider = ({
  type = "single", // 'single' | 'range' | 'dual'
  color = "primary", // now aligned with theme
  from = 0,
  to = 100,
  defaultValue = 50, // For 'single' & 'range' (max)
  defaultRange = [20, 80], // For 'dual' [min, max]
  thickness = "md", // 'sm', 'md', 'lg'
  shape = "circle", // 'circle', 'square', 'none'
  showTooltip = false,
  disabled = false,
  label = "Title",
  onChange, // Callback for value change
}) => {
  // single / range use this
  const [value, setValue] = useState(defaultValue);
  // dual uses this
  const [rangeValue, setRangeValue] = useState(defaultRange);

  const [showSingleTooltip, setShowSingleTooltip] = useState(false);
  const [showMinTooltip, setShowMinTooltip] = useState(false);
  const [showMaxTooltip, setShowMaxTooltip] = useState(false);

  const trackRef = useRef(null);
  const singleInputRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  // 🔹 THEME COLOR CLASSES (active track + tooltip bg)
  const colors = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    neutral: "bg-gray-default-200-dark"
  };

  // 🔹 THICKNESS CLASSES
  const thicknessMap = {
    sm: { track: "h-1", handle: "w-3 h-3", handleOffset: 6 },
    md: { track: "h-2", handle: "w-4 h-4", handleOffset: 8 },
    lg: { track: "h-3", handle: "w-5 h-5", handleOffset: 10 },
  };

  // 🔹 HANDLE SHAPES
  const shapeMap = {
    circle: "rounded-full",
    square: "rounded-none",
    none: "w-0 h-0 border-0 shadow-none", // visually hide handle
  };

  const currentThickness = thicknessMap[thickness] || thicknessMap.md;
  const currentColor = colors[color] || colors.primary;
  const currentShape = shapeMap[shape] || shapeMap.circle;

  // % utility
  const calculatePercentage = useCallback(
    (val) => ((val - from) / (to - from)) * 100,
    [from, to]
  );

  // ------------------ HANDLERS ------------------

  // single + range
  const handleSingleChange = useCallback(
    (e) => {
      const newValue = Number(e.target.value);
      setValue(newValue);

      if (type === "single") {
        onChange?.(newValue);
      } else if (type === "range") {
        onChange?.([from, newValue]);
      }
    },
    [onChange, type, from]
  );

  // dual – min
  const handleRangeMinChange = useCallback(
    (e) => {
      const newMin = Number(e.target.value);
      setRangeValue((prev) => {
        const updatedRange = [Math.min(newMin, prev[1]), prev[1]];
        onChange?.(updatedRange);
        return updatedRange;
      });
    },
    [onChange]
  );

  // dual – max
  const handleRangeMaxChange = useCallback(
    (e) => {
      const newMax = Number(e.target.value);
      setRangeValue((prev) => {
        const updatedRange = [prev[0], Math.max(newMax, prev[0])];
        onChange?.(updatedRange);
        return updatedRange;
      });
    },
    [onChange]
  );

  // ------------------ POSITIONS ------------------

  const getSingleHandleLeft = useCallback(
    () =>
      `calc(${calculatePercentage(value)}% - ${currentThickness.handleOffset}px)`,
    [value, calculatePercentage, currentThickness.handleOffset]
  );

  const getRangeHandleLeft = useCallback(
    (val) =>
      `calc(${calculatePercentage(val)}% - ${currentThickness.handleOffset}px)`,
    [calculatePercentage, currentThickness.handleOffset]
  );

  // ------------------ LABEL VALUE ------------------

  const renderTopValue = () => {
    if (type === "single") return value;
    if (type === "range") return `${from} – ${value}`;
    return `${rangeValue[0]} – ${rangeValue[1]}`;
  };

  return (
    <div
      className={`w-full p-2 relative ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {/* Top label + value */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-medium text-primary-950-dark">
          {label}
        </span>
        <span className="text-xs font-medium text-gray-default-600">
          {renderTopValue()}
        </span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className={`relative w-full ${currentThickness.track} bg-gray-default-200 rounded-full`}
      >
        {/* Active track */}
        {type === "single" || type === "range" ? (
          <div
            className={`${currentThickness.track} ${currentColor} rounded-full transition-all duration-100 ease-linear`}
            style={{ width: `${calculatePercentage(value)}%` }}
          />
        ) : (
          <div
            className={`absolute ${currentThickness.track} ${currentColor} rounded-full transition-all duration-100 ease-linear`}
            style={{
              left: `${calculatePercentage(rangeValue[0])}%`,
              width:
                `${calculatePercentage(rangeValue[1]) -
                  calculatePercentage(rangeValue[0])}%`,
            }}
          />
        )}

        {/* SINGLE / RANGE */}
        {(type === "single" || type === "range") && (
          <>
            <input
              ref={singleInputRef}
              type="range"
              min={from}
              max={to}
              value={value}
              onChange={handleSingleChange}
              disabled={disabled}
              onMouseEnter={() => showTooltip && setShowSingleTooltip(true)}
              onMouseLeave={() => showTooltip && setShowSingleTooltip(false)}
              className="absolute top-0 left-0 z-20 h-full w-full cursor-pointer opacity-0"
              style={{ padding: 0, margin: 0 }}
            />

            {/* Handle */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${currentThickness.handle} ${currentShape} ${
                disabled
                  ? "bg-gray-default-100 border-gray-default-200"
                  : "bg-content-content1 border-gray-default-300"
              } border-2 shadow-sm transition-all duration-100 ease-linear z-10`}
              style={{ left: getSingleHandleLeft(), pointerEvents: "none" }}
            />

            {/* Tooltip */}
            {showTooltip && showSingleTooltip && shape !== "none" && (
              <div
                className={`absolute ${currentColor.replace(
                  "bg-",
                  "bg-"
                )} text-content-content1 text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap z-30`}
                style={{
                  left: getSingleHandleLeft(),
                  bottom: `calc(100% + ${currentThickness.handleOffset / 2}px)`,
                  transform: "translateX(-50%)",
                }}
              >
                {type === "single" ? value : `${from} – ${value}`}
                <div
                  className={`absolute w-2 h-2 ${currentColor} transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1`}
                />
              </div>
            )}
          </>
        )}

        {/* DUAL */}
        {type === "dual" && (
          <>
            {/* Min input */}
            <input
              ref={minInputRef}
              type="range"
              min={from}
              max={to}
              value={rangeValue[0]}
              onChange={handleRangeMinChange}
              disabled={disabled}
              onMouseEnter={() => showTooltip && setShowMinTooltip(true)}
              onMouseLeave={() => showTooltip && setShowMinTooltip(false)}
              className="absolute top-0 z-20 h-full cursor-pointer opacity-0"
              style={{
                padding: 0,
                margin: 0,
                left: 0,
                width: `${calculatePercentage(rangeValue[1])}%`,
              }}
            />

            {/* Max input */}
            <input
              ref={maxInputRef}
              type="range"
              min={from}
              max={to}
              value={rangeValue[1]}
              onChange={handleRangeMaxChange}
              disabled={disabled}
              onMouseEnter={() => showTooltip && setShowMaxTooltip(true)}
              onMouseLeave={() => showTooltip && setShowMaxTooltip(false)}
              className="absolute top-0 z-20 h-full cursor-pointer opacity-0"
              style={{
                padding: 0,
                margin: 0,
                left: `${calculatePercentage(rangeValue[0])}%`,
                width: `${100 - calculatePercentage(rangeValue[0])}%`,
              }}
            />

            {/* Min handle */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${currentThickness.handle} ${currentShape} ${
                disabled
                  ? "bg-gray-default-100 border-gray-default-200"
                  : "bg-content-content1 border-gray-default-300"
              } border-2 shadow-sm transition-all duration-100 ease-linear z-10`}
              style={{
                left: getRangeHandleLeft(rangeValue[0]),
                pointerEvents: "none",
              }}
            />

            {/* Max handle */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 ${currentThickness.handle} ${currentShape} ${
                disabled
                  ? "bg-gray-default-100 border-gray-default-200"
                  : "bg-content-content1 border-gray-default-300"
              } border-2 shadow-sm transition-all duration-100 ease-linear z-10`}
              style={{
                left: getRangeHandleLeft(rangeValue[1]),
                pointerEvents: "none",
              }}
            />

            {/* Min tooltip */}
            {showTooltip && showMinTooltip && shape !== "none" && (
              <div
                className={`absolute ${currentColor} text-content-content1 text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap z-30`}
                style={{
                  left: getRangeHandleLeft(rangeValue[0]),
                  bottom: `calc(100% + ${currentThickness.handleOffset / 2}px)`,
                  transform: "translateX(-50%)",
                }}
              >
                {rangeValue[0]}
                <div
                  className={`absolute w-2 h-2 ${currentColor} transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1`}
                />
              </div>
            )}

            {/* Max tooltip */}
            {showTooltip && showMaxTooltip && shape !== "none" && (
              <div
                className={`absolute ${currentColor} text-content-content1 text-xs px-2 py-1 rounded shadow-sm whitespace-nowrap z-30`}
                style={{
                  left: getRangeHandleLeft(rangeValue[1]),
                  bottom: `calc(100% + ${currentThickness.handleOffset / 2}px)`,
                  transform: "translateX(-50%)",
                }}
              >
                {rangeValue[1]}
                <div
                  className={`absolute w-2 h-2 ${currentColor} transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1`}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom marks */}
      <div className="mt-2 flex justify-between text-xs">
        <span
          className={
            disabled
              ? "text-gray-default-400"
              : "text-gray-default-600"
          }
        >
          {from}
        </span>

        {type === "dual" ? (
          <>
            <span
              className={
                disabled
                  ? "text-gray-default-400"
                  : "text-gray-default-600"
              }
            >
              {(from + to) / 2}
            </span>
            <span
              className={
                disabled
                  ? "text-gray-default-400"
                  : "text-gray-default-600"
              }
            >
              {to}
            </span>
          </>
        ) : (
          <span
            className={
              disabled
                ? "text-gray-default-400"
                : "text-gray-default-600"
            }
          >
            {to}
          </span>
        )}
      </div>
    </div>
  );
};

export default Slider;
