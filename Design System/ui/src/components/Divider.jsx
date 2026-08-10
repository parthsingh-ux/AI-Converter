"use client";

import React from "react";

const COLOR_MAP = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  neutral: "var(--color-neutral)",
  "border-subtle": "var(--color-border-subtle)",
  "border-strong": "var(--color-border-strong)",
  default: "var(--color-border-subtle)",
};

export default function Divider({
  orientation = "horizontal", 
  thickness = 1,              
  length = "100%",            
  color = "border-subtle",    
  margin = "8px 0",           
  style = {},
  className = "",
}) {
  const isHorizontal = orientation === "horizontal";

  const resolvedColor =
    COLOR_MAP[color] !== undefined ? COLOR_MAP[color] : color || COLOR_MAP.default;

  const dividerStyle = {
    width: isHorizontal ? length : thickness,
    height: isHorizontal ? thickness : length,
    backgroundColor: resolvedColor,
    margin,
    flexShrink: 0,
    ...style,
  };

  return <div className={className} style={dividerStyle} />;
}
