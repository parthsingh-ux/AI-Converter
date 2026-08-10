"use client";
import React from "react";
import Badge from "@/components/Badge";

export default function BadgeShowcase() {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6 text-primary-950-dark">
        {/* TITLE */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold leading-tight">
            Badge Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Sizes, colors, variants, outlines and positions — compact visual
            reference for the{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;Badge /&gt;
            </code>{" "}
            component.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="mb-10 rounded-2xl bg-content-content1 border border-gray-default-200 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Quick overview of the main props you can use to customize badges.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Appearance
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>content</code> — text / number displayed inside
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "neutral"
                  </code>
                </li>
                <li>
                  <code>variant</code> —{" "}
                  <code>
                    "solid" | "outlined" | "light" | "flat" | "faded" |
                    "shadow" | "ghost" | "dot"
                  </code>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Shape & Size
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code> or number
                </li>
                <li>
                  <code>radius</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>showOutline</code> — extra outline around badge
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Placement & Visibility
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>placement</code> —{" "}
                  <code>
                    "top-left" | "top-right" | "bottom-left" | "bottom-right" |
                    "center"
                  </code>
                </li>
                <li>
                  <code>offset</code> — spacing in px from the edge
                </li>
                <li>
                  <code>isInvisible</code> — hide without unmounting
                </li>
                <li>
                  <code>className</code> — extra classes on wrapper
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* MAIN SECTIONS */}
        <div className="space-y-8">
          {/* SIZES */}
          <section className="bg-content-content1 p-5 rounded-2xl shadow-sm border border-gray-default-200">
            <h2 className="text-lg font-semibold mb-4 text-primary-950-dark">
              Sizes
            </h2>
            <p className="text-sm text-gray-default-600 mb-4">
              The <code>size</code> prop controls the badge height, minimum
              width and font size.
            </p>

            <div className="flex flex-wrap items-center gap-10">
              {/* SM */}
              <div className="relative inline-flex flex-col items-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200 transition-transform group-hover:-translate-y-1">
                  <span className="text-xs text-gray-default-500 tracking-wide font-medium">
                    SM
                  </span>
                </div>
                <Badge
                  content="5"
                  size="sm"
                  color="primary"
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">Small</div>
              </div>

              {/* MD */}
              <div className="relative inline-flex flex-col items-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200 transition-transform group-hover:-translate-y-1">
                  <span className="text-xs text-gray-default-500 tracking-wide font-medium">
                    MD
                  </span>
                </div>
                <Badge
                  content="5"
                  size="md"
                  color="primary"
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">Medium</div>
              </div>

              {/* LG */}
              <div className="relative inline-flex flex-col items-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200 transition-transform group-hover:-translate-y-1">
                  <span className="text-xs text-gray-default-500 tracking-wide font-medium">
                    LG
                  </span>
                </div>
                <Badge
                  content="5"
                  size="lg"
                  color="primary"
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">Large</div>
              </div>
            </div>
          </section>

          {/* COLORS */}
          <section className="bg-content-content1 p-5 rounded-2xl shadow-sm border border-gray-default-200">
            <h2 className="text-lg font-semibold mb-4 text-primary-950-dark">
              Colors
            </h2>
            <p className="text-sm text-gray-default-600 mb-4">
              Color tokens map directly to your design system’s base palette.
            </p>

            <div className="flex flex-wrap gap-8">
              {[
                ["primary", "Primary"],
                ["secondary", "Secondary"],
                ["success", "Success"],
                ["warning", "Warning"],
                ["danger", "Danger"],
                ["neutral", "Neutral"],
              ].map(([color, label]) => (
                <div
                  key={color}
                  className="relative inline-flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                  <Badge
                    content="5"
                    size="md"
                    color={color}
                    placement="top-right"
                  />
                  <div className="mt-3 text-sm text-gray-default-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* VARIANTS */}
          <section className="bg-content-content1 p-5 rounded-2xl shadow-sm border border-gray-default-200">
            <h2 className="text-lg font-semibold mb-4 text-primary-950-dark">
              Variants (solid · flat · faded · shadow)
            </h2>
            <p className="text-sm text-gray-default-600 mb-4">
              Use the <code>variant</code> prop to change visual weight and
              emphasis.
            </p>

            <div className="flex flex-wrap gap-10 items-center">
              <div className="relative inline-flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                <Badge
                  content="5"
                  size="md"
                  color="primary"
                  variant="solid"
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">Solid</div>
              </div>

              <div className="relative inline-flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                <Badge
                  content="5"
                  size="md"
                  color="primary"
                  variant="flat"
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">Flat</div>
              </div>

              <div className="relative inline-flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                <Badge
                  content="5"
                  size="md"
                  color="primary"
                  variant="faded"
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">Faded</div>
              </div>

              <div className="relative inline-flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                <Badge
                  content="5"
                  size="md"
                  color="primary"
                  variant="shadow"
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">Shadow</div>
              </div>
            </div>
          </section>

          {/* OUTLINED vs NON-OUTLINED */}
          <section className="bg-content-content1 p-5 rounded-2xl shadow-sm border border-gray-default-200">
            <h2 className="text-lg font-semibold mb-4 text-primary-950-dark">
              Outlined vs Non-outlined
            </h2>
            <p className="text-sm text-gray-default-600 mb-4">
              Toggle <code>showOutline</code> to add an extra border around the
              badge.
            </p>

            <div className="flex flex-wrap gap-14 items-center">
              <div className="relative inline-flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                <Badge
                  content="5"
                  size="md"
                  color="primary"
                  variant="solid"
                  showOutline={false}
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">
                  Default
                </div>
              </div>

              <div className="relative inline-flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                <Badge
                  content="5"
                  size="md"
                  color="primary"
                  variant="solid"
                  showOutline={true}
                  placement="top-right"
                />
                <div className="mt-3 text-sm text-gray-default-600">
                  Outlined
                </div>
              </div>
            </div>
          </section>

          {/* POSITION */}
          <section className="bg-content-content1 p-5 rounded-2xl shadow-sm border border-gray-default-200">
            <h2 className="text-lg font-semibold mb-4 text-primary-950-dark">
              Position
            </h2>
            <p className="text-sm text-gray-default-600 mb-4">
              Control where the badge sits relative to its parent using{" "}
              <code>placement</code> and <code>offset</code>.
            </p>

            <div className="flex flex-wrap gap-10 items-center">
              {/* TOP RIGHT */}
              <div className="flex flex-col items-center">
                <div className="relative inline-flex">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                  <Badge
                    content="5"
                    size="md"
                    color="primary"
                    variant="solid"
                    placement="top-right"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-default-600">
                  Top-Right
                </div>
              </div>

              {/* TOP LEFT */}
              <div className="flex flex-col items-center">
                <div className="relative inline-flex">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                  <Badge
                    content="5"
                    size="md"
                    color="primary"
                    variant="solid"
                    placement="top-left"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-default-600">
                  Top-Left
                </div>
              </div>

              {/* BOTTOM RIGHT */}
              <div className="flex flex-col items-center">
                <div className="relative inline-flex">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                  <Badge
                    content="5"
                    size="md"
                    color="primary"
                    variant="solid"
                    placement="bottom-right"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-default-600">
                  Bottom-Right
                </div>
              </div>

              {/* BOTTOM LEFT */}
              <div className="flex flex-col items-center">
                <div className="relative inline-flex">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                  <Badge
                    content="5"
                    size="md"
                    color="primary"
                    variant="solid"
                    placement="bottom-left"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-default-600">
                  Bottom-Left
                </div>
              </div>

              {/* CENTER */}
              <div className="flex flex-col items-center">
                <div className="relative inline-flex">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-default-100 to-gray-default-50 rounded-full flex items-center justify-center border border-gray-default-200" />
                  <Badge
                    content="5"
                    size="md"
                    color="primary"
                    variant="solid"
                    placement="center"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-default-600">
                  Center
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
