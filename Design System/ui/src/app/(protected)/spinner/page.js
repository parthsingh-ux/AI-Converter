"use client";

import React from "react";
import Spinner from "@/components/Spinner";

export default function Page() {
  return (
    <div className="rounded-2xl bg-layout-background p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">Spinner</h1>
          <p className="text-sm text-gray-default-600 max-w-2xl">
            Loading indicators used to represent ongoing background tasks or async
            operations. Supports multiple visual variants, theme colors, and sizes.
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
                &lt;Spinner /&gt;
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
                  <code>variant</code> –{" "}
                  <code>
                    "default" | "simple" | "gradient" | "spinner" | "wave" |
                    "dots" | "hand" | "tap"
                  </code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "neutral"
                  </code>
                </li>
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior & Style
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>variant="default"</code> – bordered circular spinner
                </li>
                <li>
                  <code>variant="simple"</code> – thinner bordered spinner
                </li>
                <li>
                  <code>variant="gradient"</code> – conic gradient ring
                </li>
                <li>
                  <code>variant="spinner"</code> – SVG arc spinner
                </li>
                <li>
                  <code>variant="wave" | "dots"</code> – bar / dot loaders
                </li>
                <li>
                  <code>variant="hand" | "tap"</code> – animated tap gesture
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
                  <code>className</code> – extra wrapper classes (e.g. margins)
                </li>
                <li>
                  Inherits color via{" "}
                  <code>text-*</code> classes + theme tokens
                </li>
                <li>
                  All variants are inline-flex, so align easily inside buttons,
                  cards, etc.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= VARIANTS ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Variants
              </h2>
              <p className="text-xs text-gray-default-600">
                Use{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  variant
                </code>{" "}
                to change the visual style of the spinner.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: variant, color, size
            </span>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SpinnerCard label='variant="default" color="primary" size="md"'>
                <Spinner variant="default" color="primary" />
              </SpinnerCard>

              <SpinnerCard label='variant="simple" color="neutral"'>
                <Spinner variant="simple" color="neutral" />
              </SpinnerCard>

              <SpinnerCard label='variant="gradient" color="primary" size="lg"'>
                <Spinner variant="gradient" color="primary" size="lg" />
              </SpinnerCard>

              <SpinnerCard label='variant="spinner" color="success"'>
                <Spinner variant="spinner" color="success" />
              </SpinnerCard>

              <SpinnerCard label='variant="wave" color="warning" size="sm"'>
                <Spinner variant="wave" color="warning" size="sm" />
              </SpinnerCard>

              <SpinnerCard label='variant="dots" color="danger" size="md"'>
                <Spinner variant="dots" color="danger" size="md" />
              </SpinnerCard>
            </div>
          </div>
        </section>

        {/* ================= SIZES ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Sizes
              </h2>
              <p className="text-xs text-gray-default-600">
                Control the visual size using{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  size="sm" | "md" | "lg"
                </code>
                .
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: size
            </span>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6">
            <div className="flex flex-wrap gap-8">
              <SpinnerSizeBlock label='size="sm"'>
                <Spinner variant="default" color="primary" size="sm" />
              </SpinnerSizeBlock>

              <SpinnerSizeBlock label='size="md"'>
                <Spinner variant="default" color="primary" size="md" />
              </SpinnerSizeBlock>

              <SpinnerSizeBlock label='size="lg"'>
                <Spinner variant="default" color="primary" size="lg" />
              </SpinnerSizeBlock>
            </div>
          </div>
        </section>

        {/* ================= COLORS ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Colors
              </h2>
              <p className="text-xs text-gray-default-600">
                All variants respect theme colors via{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  color
                </code>{" "}
                prop.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: color, variant
            </span>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <SpinnerColorCard label="primary">
                <Spinner variant="default" color="primary" />
              </SpinnerColorCard>
              <SpinnerColorCard label="secondary">
                <Spinner variant="default" color="secondary" />
              </SpinnerColorCard>
              <SpinnerColorCard label="success">
                <Spinner variant="default" color="success" />
              </SpinnerColorCard>
              <SpinnerColorCard label="warning">
                <Spinner variant="default" color="warning" />
              </SpinnerColorCard>
              <SpinnerColorCard label="danger">
                <Spinner variant="default" color="danger" />
              </SpinnerColorCard>
              <SpinnerColorCard label="neutral">
                <Spinner variant="default" color="neutral" />
              </SpinnerColorCard>
            </div>
          </div>
        </section>

        {/* ================= SPECIAL VARIANTS (HAND / TAP) ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Special Variants: Hand & Tap
              </h2>
              <p className="text-xs text-gray-default-600">
                Use <code className="bg-gray-default-50 px-1 rounded text-xs">variant="hand"</code>{" "}
                or{" "}
                <code className="bg-gray-default-50 px-1 rounded text-xs">
                  variant="tap"
                </code>{" "}
                to show an animated tap gesture loader.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: variant="hand" | "tap", color
            </span>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SpinnerCard label='variant="hand" color="warning"'>
                <Spinner variant="hand" color="warning" />
              </SpinnerCard>
              <SpinnerCard label='variant="tap" color="success"'>
                <Spinner variant="tap" color="success" />
              </SpinnerCard>
            </div>
          </div>
        </section>

        {/* ================= USAGE INSIDE BUTTON / INLINE ================= */}
        <section className="space-y-4 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-primary-950-dark">
                Inline Usage Examples
              </h2>
              <p className="text-xs text-gray-default-600">
                Spinners are inline-flex by default, so you can easily compose them
                inside buttons or next to text.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
              props: className (spacing / layout)
            </span>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-4">
            {/* Button example */}
            <div className="flex flex-wrap gap-4 items-center">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 transition">
                <Spinner variant="simple" color="neutral" size="sm" />
                Saving changes...
              </button>

              <button className="inline-flex items-center gap-2 rounded-full border border-gray-default-200 px-4 py-2 text-sm font-medium text-primary-950-dark bg-content-content1">
                <Spinner variant="dots" color="secondary" size="sm" />
                Loading list
              </button>
            </div>

            {/* Inline text example */}
            <div className="flex items-center gap-3 text-sm text-gray-default-700">
              <Spinner variant="wave" color="primary" size="sm" />
              <span>Syncing your data. This may take a few seconds…</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= SMALL PRESENTATIONAL HELPERS ================= */

function SpinnerCard({ label, children }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-default-200 rounded-xl px-4 py-5 bg-gray-default-50/60">
      <div className="h-10 flex items-center justify-center">{children}</div>
      <p className="text-[11px] text-gray-default-600 text-center">{label}</p>
    </div>
  );
}

function SpinnerSizeBlock({ label, children }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-10 flex items-center justify-center">{children}</div>
      <p className="text-[11px] text-gray-default-600">{label}</p>
    </div>
  );
}

function SpinnerColorCard({ label, children }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-default-100 bg-gray-default-50/60 px-3 py-3">
      <div className="h-8 flex items-center justify-center">{children}</div>
      <span className="text-[11px] text-gray-default-700">{label}</span>
    </div>
  );
}
