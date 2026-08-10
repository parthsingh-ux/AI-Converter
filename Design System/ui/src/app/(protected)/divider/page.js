"use client";

import React from "react";
import Divider from "@/components/Divider";

export default function DividerShowcasePage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* HEADER */}
        <header className="space-y-3">


          <h1 className="text-3xl font-semibold tracking-tight">
            Divider Component Showcase
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            A flexible separator line that can be horizontal or vertical with
            control over{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              orientation
            </code>
            ,{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              thickness
            </code>
            ,{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              length
            </code>
            ,{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              color
            </code>{" "}
            (theme tokens) and{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              margin
            </code>
            .
          </p>
        </header>

        {/* ===================== PROPS OVERVIEW ===================== */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="text-sm text-gray-default-600">
            Core props supported by the{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;Divider /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Orientation &amp; Size
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>orientation</code> —{" "}
                  <code>"horizontal" | "vertical"</code>
                </li>
                <li>
                  <code>thickness</code> — line thickness in pixels
                </li>
                <li>
                  <code>length</code> — width / height (px, %, etc.)
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Color &amp; Spacing
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>color</code> — theme key or CSS color, e.g.{" "}
                  <code>
                    "primary" | "success" | "warning" | "danger" | "neutral" |
                    "border-subtle"
                  </code>
                </li>
                <li>
                  <code>margin</code> — outer spacing, CSS shorthand
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Misc
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>className</code> — extra Tailwind classes
                </li>
                <li>
                  <code>style</code> — inline style overrides
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===================== HORIZONTAL SECTION ===================== */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Horizontal dividers
              </h2>
              <p className="text-xs text-gray-default-600">
                Control line thickness and width while staying on the x-axis.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: orientation, thickness, length, color
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Thickness */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-primary-950-dark">
                Thickness
              </h3>
              <p className="text-[11px] text-gray-default-600">
                Same length, different{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-[10px]">
                  thickness
                </code>
                .
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    thickness = 1
                  </p>
                  <Divider thickness={1} length="100%" color="border-subtle" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    thickness = 2
                  </p>
                  <Divider thickness={2} length="100%" color="neutral" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    thickness = 4
                  </p>
                  <Divider thickness={4} length="100%" color="primary" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    thickness = 8
                  </p>
                  <Divider thickness={8} length="100%" color="primary" />
                </div>
              </div>
            </div>

            {/* Length */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-primary-950-dark">
                Length
              </h3>
              <p className="text-[11px] text-gray-default-600">
                Different{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-[10px]">
                  length
                </code>{" "}
                values in percentages.
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    length = "25%"
                  </p>
                  <Divider thickness={3} length="25%" color="primary" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    length = "50%"
                  </p>
                  <Divider thickness={3} length="50%" color="primary" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    length = "75%"
                  </p>
                  <Divider thickness={3} length="75%" color="primary" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    length = "100%"
                  </p>
                  <Divider thickness={3} length="100%" color="primary" />
                </div>
              </div>
            </div>

            {/* Theme colors */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-primary-950-dark">
                Theme colors
              </h3>
              <p className="text-[11px] text-gray-default-600">
                Using semantic tokens via the{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-[10px]">
                  color
                </code>{" "}
                prop.
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    color = "primary"
                  </p>
                  <Divider thickness={3} length="100%" color="primary" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    color = "success"
                  </p>
                  <Divider thickness={3} length="100%" color="success" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    color = "warning"
                  </p>
                  <Divider thickness={3} length="100%" color="warning" />
                </div>
                <div>
                  <p className="mb-1 text-[11px] text-gray-default-500">
                    color = "danger"
                  </p>
                  <Divider thickness={3} length="100%" color="danger" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== MARGIN SECTION ===================== */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Spacing with margin
              </h2>
              <p className="text-xs text-gray-default-600">
                Control outer spacing using the{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  margin
                </code>{" "}
                prop.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: margin, color
            </span>
          </div>

          <div className="rounded-xl bg-primary-950-dark px-4 py-5 text-sm text-primary-50-dark">
            <div>Above</div>
            <Divider
              thickness={2}
              length="100%"
              color="success"
              margin="4px 0"
            />
            <div className="text-xs text-primary-100-dark">
              Below (margin="4px 0")
            </div>

            <Divider
              thickness={2}
              length="100%"
              color="success"
              margin="16px 0"
            />

            <div className="text-xs text-primary-100-dark">
              Below (margin="16px 0")
            </div>
          </div>
        </section>

        {/* ===================== VERTICAL SECTION ===================== */}
        <section className="mb-8 space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Vertical dividers
              </h2>
              <p className="text-xs text-gray-default-600">
                Use{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  orientation="vertical"
                </code>{" "}
                and treat{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  length
                </code>{" "}
                as height.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: orientation, thickness, length, margin
            </span>
          </div>

          {/* Layout example */}
          <div className="flex items-center rounded-xl bg-gray-default-50 p-4">
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-primary-950-dark">
                Profile
              </p>
              <p className="text-[11px] text-gray-default-600">
                Name, email & contact info.
              </p>
            </div>

            <Divider
              orientation="vertical"
              thickness={2}
              length="60px"
              color="border-subtle"
              margin="0 16px"
            />

            <div className="flex-1 pl-4">
              <p className="text-sm font-medium text-primary-950-dark">
                Settings
              </p>
              <p className="text-[11px] text-gray-default-600">
                Preferences & notifications.
              </p>
            </div>
          </div>

          {/* Pure vertical samples */}
          <div className="flex items-end gap-8 pt-2">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] text-gray-default-500">
                thin · 40px
              </span>
              <Divider
                orientation="vertical"
                thickness={2}
                length="40px"
                color="primary"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] text-gray-default-500">
                medium · 80px
              </span>
              <Divider
                orientation="vertical"
                thickness={4}
                length="80px"
                color="success"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] text-gray-default-500">
                thick · 120px
              </span>
              <Divider
                orientation="vertical"
                thickness={6}
                length="120px"
                color="danger"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
