// components/Switch.jsx
"use client";

import React from "react";
import { Icon } from "@iconify/react";

const sizeMap = {
  sm: { track: "w-9 h-5", thumb: "w-4 h-4", translate: "translate-x-4", icon: 12 },
  md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5", icon: 15 },
  lg: { track: "w-14 h-8", thumb: "w-7 h-7", translate: "translate-x-6", icon: 18 },
};

const colorMap = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  danger: "bg-danger-500",
  default: "bg-gray-default-200",
  gray: "bg-gray-default-200", // alias for convenience
};

export default function Switch({
  isOn,
  setIsOn,
  size = "md",
  color = "primary",
  isDisabled = false,
  iconOn, // icon when ON
  iconOff, // icon when OFF
  label = "",
}) {
  const s = sizeMap[size] || sizeMap.md;
  const activeColor = colorMap[color] || colorMap.primary;

  const currentIcon = isOn ? iconOn || iconOff : iconOff || iconOn;

  const handleClick = () => {
    if (isDisabled || !setIsOn) return;
    setIsOn(!isOn);
  };

  return (
    <div
      className={`flex items-center gap-2 select-none ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {/* Track */}
      <div
        className={`relative ${s.track} rounded-full transition-colors duration-200 ${
          isOn ? activeColor : "bg-gray-default-200"
        }`}
      >
        {/* Thumb with Icon */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 bg-content-content1 rounded-full shadow-sm
            flex items-center justify-center transform transition-transform duration-300
            ${s.thumb} ${isOn ? s.translate : "translate-x-1"}
          `}
        >
          {currentIcon && (
            <Icon
              icon={currentIcon}
              width={s.icon}
              height={s.icon}
              className="text-gray-default-700"
            />
          )}
        </div>
      </div>

      {/* Label on Right */}
      {label && (
        <span className="text-sm font-medium text-gray-default-700">{label}</span>
      )}
    </div>
  );
}
