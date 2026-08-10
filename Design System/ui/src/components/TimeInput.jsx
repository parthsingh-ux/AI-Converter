"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function TimeInput({
  label = "Label",
  onChange,
  className = "",
  radius = "md", // "sm" | "md" | "lg" | "xl" | "full"
  variant = "filled", // "filled" | "bordered"
  color = "default", // "default" | "gray" | "primary"
  size = "md", // "sm" | "md" | "lg"
}) {
  /* ------------- BASE DATA ------------- */
  const baseHours = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      ),
    []
  );

  const baseMinutes = useMemo(
    () => ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"],
    []
  );

  const basePeriods = useMemo(() => ["AM", "PM"], []);

  const REPEAT = 50;
  const repeatArray = (arr) =>
    Array.from({ length: REPEAT * arr.length }, (_, i) => arr[i % arr.length]);

  const hours = useMemo(() => repeatArray(baseHours), [baseHours]);
  const minutes = useMemo(() => repeatArray(baseMinutes), [baseMinutes]);
  const periods = useMemo(() => repeatArray(basePeriods), [basePeriods]);

  /* ------------- STATE ------------- */
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const [tempHour, setTempHour] = useState(baseHours[0]);
  const [tempMinute, setTempMinute] = useState(baseMinutes[0]);
  const [tempPeriod, setTempPeriod] = useState(basePeriods[0]);

  const [open, setOpen] = useState(false);

  const displayText =
    selectedHour && selectedMinute && selectedPeriod
      ? `${selectedHour} : ${selectedMinute} ${selectedPeriod}`
      : "00 : 00 AM";

  /* ------------- SIZE / RADIUS / COLOR MAPS ------------- */

  const sizeMap = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-sm",
  };

  const popupSizeMap = {
    sm: "p-3 text-xs",
    md: "p-4 text-sm",
    lg: "p-5 text-sm",
  };

  const radiusMap = {
    sm: "rounded-md",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    full: "rounded-full",
  };

  // background surface based on color
  const colorMap = {
    default: "bg-content-content1",
    gray: "bg-gray-default-50",
    primary: "bg-primary-50",
  };

  const variantMap = {
    filled: "border border-gray-default-200",
    bordered: "border border-gray-default-300 bg-content-content1",
  };

  /* ------------- REFS FOR SCROLLING + OUTSIDE CLICK ------------- */
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const periodRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const centerList = (ref) => {
      if (ref.current) {
        const el = ref.current;
        el.scrollTop = el.scrollHeight / 2 - el.clientHeight / 2;
      }
    };

    centerList(hourRef);
    centerList(minuteRef);
    centerList(periodRef);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  /* ------------- EVENTS ------------- */
  const handleOpen = () => {
    setTempHour(selectedHour || baseHours[0]);
    setTempMinute(selectedMinute || baseMinutes[0]);
    setTempPeriod(selectedPeriod || basePeriods[0]);
    setOpen(true);
  };

  const handleCancel = () => setOpen(false);

  const handleOk = () => {
    setSelectedHour(tempHour);
    setSelectedMinute(tempMinute);
    setSelectedPeriod(tempPeriod);

    const formatted = `${tempHour} : ${tempMinute} ${tempPeriod}`;
    onChange?.({
      hour: tempHour,
      minute: tempMinute,
      period: tempPeriod,
      formatted,
    });

    setOpen(false);
  };

  const wrapperRadius = radiusMap[radius] || radiusMap.md;
  const wrapperSize = sizeMap[size] || sizeMap.md;
  const wrapperColor = colorMap[color] || colorMap.default;
  const wrapperVariant = variantMap[variant] || variantMap.filled;
  const popupSize = popupSizeMap[size] || popupSizeMap.md;

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* LABEL + FIELD WRAPPER */}
      <div
        className={[
          "w-full min-w-[220px]",
          "flex flex-col gap-1.5",
          wrapperColor,
          wrapperVariant,
          wrapperRadius,
          wrapperSize,
        ].join(" ")}
      >
        <label className="block text-xs font-medium text-gray-default-600">
          {label}
        </label>

        <button
          type="button"
          onClick={handleOpen}
          className="w-full flex items-center justify-between text-left"
        >
          <span className="font-medium text-primary-950-dark tracking-[0.18em]">
            {displayText}
          </span>

          <Icon
            icon="mdi-light:clock"
            width="20"
            height="20"
            className="text-primary-500"
          />
        </button>
      </div>

      {/* POPUP PANEL */}
      {open && (
        <div
          className={[
            "absolute left-0 mt-2 w-64",
            "rounded-2xl shadow-xl border border-gray-default-200",
            "z-20",
            wrapperColor,
            popupSize,
          ].join(" ")}
        >
          {/* Scroll Columns */}
          <div className="flex items-stretch justify-between gap-3 mb-4">
            {/* HOURS */}
            <div className="flex-1 flex flex-col items-center">
              <ul
                ref={hourRef}
                className="max-h-40 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
              >
                {hours.map((h, idx) => (
                  <li
                    key={`${h}-${idx}`}
                    onClick={() => setTempHour(h)}
                    className={`py-1.5 text-center cursor-pointer ${
                      tempHour === h
                        ? "text-primary-950-dark font-semibold"
                        : "text-gray-default-400"
                    }`}
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-px bg-gray-default-200" />

            {/* MINUTES */}
            <div className="flex-1 flex flex-col items-center">
              <ul
                ref={minuteRef}
                className="max-h-40 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]"
              >
                {minutes.map((m, idx) => (
                  <li
                    key={`${m}-${idx}`}
                    onClick={() => setTempMinute(m)}
                    className={`py-1.5 text-center cursor-pointer ${
                      tempMinute === m
                        ? "text-primary-950-dark font-semibold"
                        : "text-gray-default-400"
                    }`}
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-px bg-gray-default-200" />

            {/* PERIOD (AM/PM – base array) */}
            <div className="flex-1 flex flex-col items-center">
              <ul className="space-y-1">
                {basePeriods.map((p) => (
                  <li
                    key={p}
                    onClick={() => setTempPeriod(p)}
                    className={`py-1.5 text-center cursor-pointer ${
                      tempPeriod === p
                        ? "text-primary-950-dark font-semibold"
                        : "text-gray-default-400"
                    }`}
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs font-medium text-gray-default-600 hover:text-primary-500"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleOk}
              className="
                px-5 py-2
                rounded-full
                bg-primary
                text-content-content1
                text-xs
                font-semibold
                shadow-sm
                hover:bg-primary-600
                transition
              "
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
