"use client";

import React from "react";
import Progress from "@/components/CircularProgress";

export default function ProgressShowcasePage() {
  return (
    <div className="bg-gray-default-50 py-10 min-h-screen rounded-2xl">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Progress Component Showcase
          </h1>
          <p className="text-sm text-gray-default-600">
            Linear progress bars with configurable size, thickness, radius,
            color, disabled state and striped styles.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core API for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;Progress /&gt;
              </code>{" "}
              (linear mode).
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
                  <code>type</code> – <code>"linear"</code>
                </li>
                <li>
                  <code>value</code> – number (0–100)
                </li>
                <li>
                  <code>size</code> – width for linear (
                  <code>number | "100%"</code>)
                </li>
                <li>
                  <code>color</code> – semantic color
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Styling
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>linearHeight</code> – track thickness (px)
                </li>
                <li>
                  <code>borderRadius</code> – corner radius (px)
                </li>
                <li>
                  <code>isDisabled</code> – dimmed / inactive visual
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Striped Variants
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isStriped</code> – enable striped fill
                </li>
                <li>
                  <code>stripedType</code> – pattern type (
                  <code>
                    "diagonal" | "vertical" | "thin" | "thick" | "gradient" |
                    "zebra"
                  </code>
                  )
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========== SIZES ========== */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-950-dark">
            Sizes (Linear width)
          </h2>
          <p className="text-xs text-gray-default-600">
            Control the width using the <code className="font-mono">size</code>{" "}
            prop as a number (pixels) or percentage string.
          </p>

          <div className="bg-content-content1 border border-gray-default-200 p-6 rounded-2xl shadow-sm space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-default-800">
                Linear Sizes
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-xs text-gray-default-600">
                    150px
                  </span>
                  <Progress
                    type="linear"
                    size={150}
                    value={45}
                    color="primary"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-xs text-gray-default-600">
                    260px
                  </span>
                  <Progress
                    type="linear"
                    size={260}
                    value={70}
                    color="secondary"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <span className="w-24 text-xs text-gray-default-600">
                    100%
                  </span>
                  <Progress
                    type="linear"
                    size="100%"
                    value={90}
                    color="success"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== THICKNESS ========== */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-950-dark">
            Thickness (linearHeight)
          </h2>
          <p className="text-xs text-gray-default-600">
            Use{" "}
            <code className="font-mono">
              linearHeight
            </code>{" "}
            to adjust bar thickness.
          </p>

          <div className="bg-content-content1 border border-gray-default-200 p-6 rounded-2xl shadow-sm space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Thickness: 2px
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={0}
                  value={60}
                  color="primary"
                  linearHeight={2}
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Thickness: 4px
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={0}
                  value={60}
                  color="primary"
                  linearHeight={4}
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Thickness: 8px
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={0}
                  value={60}
                  color="primary"
                  linearHeight={8}
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Thickness: 12px
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={0}
                  value={60}
                  color="primary"
                  linearHeight={12}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== BORDER RADIUS ========== */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-950-dark">
            Border Radius (Linear)
          </h2>
          <p className="text-xs text-gray-default-600">
            Use{" "}
            <code className="font-mono">
              borderRadius
            </code>{" "}
            to control corner rounding.
          </p>

          <div className="bg-content-content1 border border-gray-default-200 p-6 rounded-2xl shadow-sm space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Sharp (0px)
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={0}
                  value={60}
                  color="primary"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Slight (4px)
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={4}
                  value={60}
                  color="secondary"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Rounded (8px)
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={8}
                  value={60}
                  color="success"
                />
              </div>

              <div className="flex items-center gap-4">
                <span className="w-32 text-xs text-gray-default-600">
                  Pill (999px)
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  borderRadius={999}
                  value={60}
                  color="warning"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== DISABLED ========== */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-950-dark">
            Disabled State
          </h2>
          <p className="text-xs text-gray-default-600">
            Use{" "}
            <code className="font-mono">
              isDisabled
            </code>{" "}
            to render a muted, non-interactive appearance.
          </p>

          <div className="bg-content-content1 border border-gray-default-200 p-6 rounded-2xl shadow-sm space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="w-36 text-xs text-gray-default-600">
                  Linear – Enabled
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  value={50}
                  color="primary"
                  isDisabled={false}
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-36 text-xs text-gray-default-600">
                  Linear – Disabled
                </span>
                <Progress
                  type="linear"
                  size="100%"
                  value={50}
                  color="primary"
                  isDisabled={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== STRIPED VARIANTS ========== */}
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-primary-950-dark">
            Striped Variants
          </h2>
          <p className="text-xs text-gray-default-600">
            Set{" "}
            <code className="font-mono">
              isStriped
            </code>{" "}
            to <code>true</code> and choose a{" "}
            <code className="font-mono">stripedType</code> pattern.
          </p>

          <div className="bg-content-content1 border border-gray-default-200 p-6 rounded-2xl shadow-sm space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-default-800">
                Linear Striped Types
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StripedRow label="Diagonal" type="diagonal" color="primary" />
                <StripedRow label="Vertical" type="vertical" color="secondary" />
                <StripedRow label="Thin" type="thin" color="warning" />
                <StripedRow label="Thick" type="thick" color="danger" />
                <StripedRow label="Gradient" type="gradient" color="primary" />
                <StripedRow label="Zebra" type="zebra" color="success" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function StripedRow({ label, type, color }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-xs text-gray-default-600">{label}</span>
      <Progress
        type="linear"
        size="100%"
        value={70}
        color={color}
        isStriped={true}
        stripedType={type}
      />
    </div>
  );
}
