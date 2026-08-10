"use client";

import React from "react";
import Progress from "@/components/CircularProgress";

const ProgressShowcasePage = () => {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Progress Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Circular and linear progress variations across types, sizes, colors,
            striping, and disabled states.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="mb-8 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Core props supported by the{" "}
            <code className="rounded bg-gray-default-100 px-1 text-xs">
              &lt;Progress /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Type & Value
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>type</code> — <code>"circular" | "linear"</code>
                </li>
                <li>
                  <code>value</code> — <code>number</code> (0–100, clamped)
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "neutral" | "default"
                  </code>{" "}
                  or custom hex
                </li>
                <li>
                  <code>showLabel</code> — show percentage text
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Sizing & Shape
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> — number | string
                  <br />
                  <span className="text-[11px] text-gray-default-500">
                    • circular: diameter, e.g. <code>120</code>
                    <br />
                    • linear: width, e.g. <code>"100%"</code> or{" "}
                    <code>240</code>
                  </span>
                </li>
                <li>
                  <code>circularThickness</code> — stroke width (circular)
                </li>
                <li>
                  <code>linearHeight</code> — bar height (linear)
                </li>
                <li>
                  <code>borderRadius</code> — rounding for linear track
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Stripes & State
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isStriped</code> — enable animated stripe overlay
                </li>
                <li>
                  <code>stripedType</code> —{" "}
                  <code>
                    "diagonal" | "vertical" | "horizontal" | "thin" | "thick" |
                    "gradient" | "dotted" | "zebra"
                  </code>
                </li>
                <li>
                  <code>isDisabled</code> — dims and disables interactions
                </li>
                <li>
                  <code>className</code> — extra classes for outer wrapper
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* DEMOS */}
        <div className="space-y-8">
          {/* SECTION 1 – CIRCULAR: basic values */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Circular Progress · Basic Values
              </h2>
              <p className="text-sm text-gray-default-600">
                Circular progress using <code>color="primary"</code> and
                varying <code>value</code>.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
              {[20, 40, 60, 80, 100].map((v) => (
                <div key={v} className="flex flex-col items-center gap-2">
                  <Progress
                    type="circular"
                    size={100}
                    circularThickness={10}
                    color="primary"
                    value={v}
                    showLabel
                  />
                  <span className="text-xs text-gray-default-600">
                    value={v}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2 – CIRCULAR: colors + striped */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Circular · Colors & Striped
              </h2>
              <p className="text-sm text-gray-default-600">
                Different <code>color</code> options, with and without stripes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 place-items-center">
              <div className="flex flex-col items-center gap-2">
                <Progress
                  type="circular"
                  size={96}
                  circularThickness={10}
                  color="primary"
                  value={70}
                  showLabel
                />
                <span className="text-xs text-gray-default-600">primary</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Progress
                  type="circular"
                  size={96}
                  circularThickness={10}
                  color="secondary"
                  value={60}
                  showLabel
                />
                <span className="text-xs text-gray-default-600">
                  secondary
                </span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Progress
                  type="circular"
                  size={96}
                  circularThickness={10}
                  color="success"
                  value={80}
                  showLabel
                />
                <span className="text-xs text-gray-default-600">success</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Progress
                  type="circular"
                  size={96}
                  circularThickness={10}
                  color="warning"
                  value={45}
                  showLabel
                />
                <span className="text-xs text-gray-default-600">warning</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Progress
                  type="circular"
                  size={96}
                  circularThickness={10}
                  color="danger"
                  value={90}
                  
                  stripedType="thin"
                  showLabel
                />
                <span className="text-xs text-gray-default-600">
                  danger · striped
                </span>
              </div>
            </div>
          </section>




          {/* SECTION 5 – Disabled & Label control */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Disabled & Label Variations
              </h2>
              <p className="text-sm text-gray-default-600">
                Combine <code>isDisabled</code> and <code>showLabel</code> for
                different states.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Disabled circular */}
              <div className="flex flex-col items-center gap-3 border border-gray-default-100 rounded-2xl p-4">
                <h3 className="text-xs font-semibold text-gray-default-500 uppercase tracking-wide">
                  Circular · Disabled
                </h3>
                <Progress
                  type="circular"
                  size={96}
                  circularThickness={10}
                  color="secondary"
                  value={65}
                  showLabel
                  isDisabled
                />
              </div>


            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProgressShowcasePage;
