"use client";

import React, { useState } from "react";
import Switch from "@/components/Switch";

export default function Page() {
  const [onSize, setOnSize] = useState(false);
  const [onColors, setOnColors] = useState(true);
  const [onIcon1, setOnIcon1] = useState(true);
  const [onIcon2, setOnIcon2] = useState(false);
  const [onControlled, setOnControlled] = useState(false);

  return (
    <div className="rounded-2xl bg-layout-background p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Switch
          </h1>
          <p className="text-sm text-gray-default-600 max-w-2xl">
            A theme-aware toggle control with support for sizes, colors, labels,
            icons, disabled state, and fully controlled behavior.
          </p>
        </header>

        {/* ================= PROPS OVERVIEW ================= */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-50 px-1 text-xs">
                &lt;Switch /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">Core</h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "default"
                  </code>
                </li>
                <li>
                  <code>label</code> – optional text on the right side
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                State / Icons
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isOn</code> – controlled toggle state
                </li>
                <li>
                  <code>setIsOn</code> – state setter callback
                </li>
                <li>
                  <code>isDisabled</code> – disable interaction + dim visuals
                </li>
                <li>
                  <code>iconOn</code> – Iconify icon name when ON
                </li>
                <li>
                  <code>iconOff</code> – Iconify icon name when OFF
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior Notes
              </h3>
              <ul className="space-y-1">
                <li>
                  When <code>isDisabled</code> is true, clicks are ignored.
                </li>
                <li>
                  If only <code>iconOn</code> is provided, it is used for both
                  states.
                </li>
                <li>
                  Use React state with <code>isOn</code> +{" "}
                  <code>setIsOn</code> for controlled usage.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= 1. SIZES ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Sizes
              </h2>
              <p className="text-xs text-gray-default-600">
                Use{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  size="sm" | "md" | "lg"
                </code>{" "}
                to control the switch dimensions.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: size, color, isOn, setIsOn
            </span>
          </div>

          <div className="bg-content-content1 p-6 rounded-2xl shadow-sm border border-gray-default-200 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm text-gray-default-700 min-w-[160px]">
                Primary (shared state across sizes)
              </span>

              <div className="flex gap-6">
                <Switch
                  size="sm"
                  color="primary"
                  isOn={onSize}
                  setIsOn={setOnSize}
                />
                <Switch
                  size="md"
                  color="primary"
                  isOn={onSize}
                  setIsOn={setOnSize}
                />
                <Switch
                  size="lg"
                  color="primary"
                  isOn={onSize}
                  setIsOn={setOnSize}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. COLORS + LABEL ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Color Variants with Label
              </h2>
              <p className="text-xs text-gray-default-600">
                Use{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  color
                </code>{" "}
                to match your semantic theme tokens.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: color, label, isOn, setIsOn
            </span>
          </div>

          <div className="bg-content-content1 p-6 rounded-2xl shadow-sm border border-gray-default-200 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-6">
                <span className="text-sm text-gray-default-700 min-w-[160px]">
                  Default palette
                </span>

                <div className="flex flex-wrap gap-4">
                  <Switch
                    size="md"
                    color="default"
                    label="Online"
                    isOn={onColors}
                    setIsOn={setOnColors}
                  />
                  <Switch
                    size="md"
                    color="primary"
                    label="Online"
                    isOn={onColors}
                    setIsOn={setOnColors}
                  />
                  <Switch
                    size="md"
                    color="secondary"
                    label="Online"
                    isOn={onColors}
                    setIsOn={setOnColors}
                  />
                  <Switch
                    size="md"
                    color="success"
                    label="Online"
                    isOn={onColors}
                    setIsOn={setOnColors}
                  />
                  <Switch
                    size="md"
                    color="warning"
                    label="Online"
                    isOn={onColors}
                    setIsOn={setOnColors}
                  />
                  <Switch
                    size="md"
                    color="danger"
                    label="Online"
                    isOn={onColors}
                    setIsOn={setOnColors}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. ICON VARIANTS ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Icon Variants
              </h2>
              <p className="text-xs text-gray-default-600">
                Use{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  iconOn
                </code>{" "}
                and{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  iconOff
                </code>{" "}
                with Iconify icon names for richer feedback.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: iconOn, iconOff, isDisabled
            </span>
          </div>

          <div className="bg-content-content1 p-6 rounded-2xl shadow-sm border border-gray-default-200 space-y-5">
            {/* Icon Only row */}
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-sm text-gray-default-700 min-w-[160px]">
                Icon only
              </span>

              <div className="flex gap-6">
                <Switch
                  size="md"
                  color="primary"
                  iconOn="mdi:weather-night"
                  iconOff="mdi:weather-sunny"
                  isOn={onIcon1}
                  setIsOn={setOnIcon1}
                />
                <Switch
                  size="md"
                  color="secondary"
                  iconOn="mdi:check"
                  iconOff="mdi:close"
                  isOn={onIcon2}
                  setIsOn={setOnIcon2}
                />
              </div>
            </div>

            {/* Disabled Icon Mode */}
            <div className="flex flex-wrap items-center gap-6">
              <span className="text-sm text-gray-default-700 min-w-[160px]">
                Disabled with icon + label
              </span>

              <Switch
                size="lg"
                color="default"
                label="Dark mode"
                iconOn="mdi:weather-night"
                iconOff="mdi:weather-sunny"
                isOn={true}
                isDisabled={true}
              />
            </div>
          </div>
        </section>

        {/* ================= 4. CONTROLLED USAGE ================= */}
        <section className="space-y-4 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Controlled Example
              </h2>
              <p className="text-xs text-gray-default-600">
                A simple example showing how{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  isOn
                </code>{" "}
                and{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  setIsOn
                </code>{" "}
                map to React state in a parent component.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: isOn, setIsOn, label
            </span>
          </div>

          <div className="bg-content-content1 p-6 rounded-2xl shadow-sm border border-gray-default-200 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  size="md"
                  color="success"
                  label="Enable notifications"
                  isOn={onControlled}
                  setIsOn={setOnControlled}
                />
              </div>

              <div className="text-xs text-gray-default-700">
                Current state:{" "}
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    onControlled
                      ? "bg-success-50 text-success-600"
                      : "bg-gray-default-50 text-gray-default-700"
                  }`}
                >
                  {onControlled ? "ON" : "OFF"}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-default-500">
              Example usage:{" "}
              <code className="bg-gray-default-50 px-1 py-0.5 rounded">
                const [enabled, setEnabled] = useState(false);
              </code>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}


