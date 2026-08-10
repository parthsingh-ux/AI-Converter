"use client";

import React, { useState } from "react";
import Radio from "@/components/Radio";

const columns = ["Initial", "Hovered", "Selected", "Focused", "Invalid", "Disabled"];
const sizes = ["sm", "md", "lg"];

const colorOptions = [
  { id: "primary", label: "Primary" },
  { id: "secondary", label: "Secondary" },
  { id: "success", label: "Success" },
  { id: "warning", label: "Warning" },
  { id: "danger", label: "Danger" },
  { id: "neutral", label: "Neutral" },
];

export default function RadioShowcasePage() {
  const [selectedSize, setSelectedSize] = useState("md");
  const [selectedColor, setSelectedColor] = useState("primary");

  return (
    <div className="bg-gray-default-50 py-10 rounded-2xl min-h-screen">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Radio Component Showcase
          </h1>
          <p className="text-sm text-gray-default-600">
            Semantic radio inputs with theme-aware colors, sizes, and visual states.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;Radio /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Core
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" | "neutral"
                  </code>
                </li>
                <li>
                  <code>name</code> – native radio group name
                </li>
                <li>
                  <code>value</code> – native radio value
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                State
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>checked</code> – controlled checked state
                </li>
                <li>
                  <code>defaultChecked</code> – uncontrolled initial value
                </li>
                <li>
                  <code>disabled</code> – disable interaction
                </li>
                <li>
                  <code>invalid</code> – show error styling
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Events & Misc
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>onChange</code> – callback when selection changes
                </li>
                <li>
                  <code>className</code> – extra wrapper classes
                </li>
                <li>
                  <code>...rest</code> – forwarded to native{" "}
                  <code>&lt;input type="radio" /&gt;</code>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* VISUAL STATE SHOWCASE */}
        <section className="bg-content-content1 rounded-2xl shadow-sm border border-gray-default-200 p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-primary-950-dark">
              Visual States by Size
            </h2>
            <p className="text-xs text-gray-default-600">
              Shows how the radio renders across different interaction states for each size.
            </p>
          </div>

          <div className="rounded-2xl bg-content-content1 p-6 border border-gray-default-100">
            <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-x-6 gap-y-6 items-center">
              {/* top-left cell */}
              <div className="text-xs font-medium text-gray-default-600 text-left">
                Size / State
              </div>

              {/* Column headers */}
              {columns.map((col) => (
                <div
                  key={col}
                  className="text-xs font-semibold text-primary-950-dark text-center"
                >
                  {col}
                </div>
              ))}

              {/* Rows per size */}
              {sizes.map((size) => (
                <React.Fragment key={size}>
                  {/* Size label */}
                  <div className="text-sm text-gray-default-700 capitalize">
                    {size}
                  </div>

                  {/* Initial */}
                  <Cell>
                    <Radio size={size} color="primary" name={`initial-${size}`} />
                  </Cell>

                  {/* Hovered – user hovers to see bg change */}
                  <Cell>
                    <Radio size={size} color="primary" name={`hover-${size}`} />
                  </Cell>

                  {/* Selected */}
                  <Cell>
                    <Radio
                      size={size}
                      color="primary"
                      name={`selected-${size}`}
                      defaultChecked
                    />
                  </Cell>

                  {/* Focused – autoFocus on md so ring is visible once */}
                  <Cell>
                    <Radio
                      size={size}
                      color="primary"
                      name={`focused-${size}`}
                      defaultChecked
                      autoFocus={size === "md"}
                    />
                  </Cell>

                  {/* Invalid */}
                  <Cell>
                    <Radio
                      size={size}
                      color="primary"
                      name={`invalid-${size}`}
                      defaultChecked
                      invalid
                    />
                  </Cell>

                  {/* Disabled */}
                  <Cell>
                    <Radio
                      size={size}
                      color="primary"
                      name={`disabled-${size}`}
                      disabled
                      defaultChecked
                    />
                  </Cell>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ACTIONABLE EXAMPLE */}
        <section className="bg-content-content1 rounded-2xl shadow-sm border border-gray-default-200 p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-primary-950-dark">
              Interactive Radio Group
            </h2>
            <p className="text-xs text-gray-default-600">
              Use{" "}
              <code className="font-mono">size</code> and{" "}
              <code className="font-mono">color</code> props together in a real radio group.
            </p>
          </div>

          {/* Size selector */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-default-600">
              Size
            </span>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2">
                <Radio
                  size="sm"
                  color={selectedColor}
                  name="size-group"
                  checked={selectedSize === "sm"}
                  onChange={() => setSelectedSize("sm")}
                />
                <span className="text-sm text-gray-default-800">Small</span>
              </label>

              <label className="flex items-center gap-2">
                <Radio
                  size="md"
                  color={selectedColor}
                  name="size-group"
                  checked={selectedSize === "md"}
                  onChange={() => setSelectedSize("md")}
                />
                <span className="text-sm text-gray-default-800">Medium</span>
              </label>

              <label className="flex items-center gap-2">
                <Radio
                  size="lg"
                  color={selectedColor}
                  name="size-group"
                  checked={selectedSize === "lg"}
                  onChange={() => setSelectedSize("lg")}
                />
                <span className="text-sm text-gray-default-800">Large</span>
              </label>
            </div>
          </div>

          {/* Color selector */}
          <div className="space-y-2">
            <span className="text-xs font-medium text-gray-default-600">
              Color
            </span>
            <div className="flex flex-wrap items-center gap-4">
              {colorOptions.map((c) => (
                <label key={c.id} className="flex items-center gap-2">
                  <Radio
                    size="md"
                    color={c.id}
                    name="color-group"
                    checked={selectedColor === c.id}
                    onChange={() => setSelectedColor(c.id)}
                  />
                  <span className="text-sm text-gray-default-800">
                    {c.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="text-xs text-gray-default-600 bg-gray-default-50 rounded-xl px-3 py-2 inline-flex items-center gap-1">
            Selected:{" "}
            <span className="font-semibold text-primary-950-dark uppercase">
              {selectedSize}
            </span>{" "}
            size,{" "}
            <span className="font-semibold text-primary-950-dark capitalize">
              {selectedColor}
            </span>{" "}
            color
          </div>
        </section>
      </div>
    </div>
  );
}

function Cell({ children }) {
  return (
    <div className="flex justify-center items-center min-h-[40px]">
      {children}
    </div>
  );
}
