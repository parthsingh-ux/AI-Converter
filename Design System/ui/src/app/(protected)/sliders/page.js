"use client";

import React from "react";
import Slider from "@/components/Sliders";

export default function SliderShowcasePage() {
  return (
    <main className="rounded-2xl bg-content-content2 p-6">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-950-dark">Slider Showcase</h1>
          <p className="mt-1 text-sm text-gray-default-600">
            A customizable slider supporting single, range, dual values, thickness, shapes,
            tooltip, disabled, and themed colors.
          </p>
        </header>

        {/* ---------------------------------------------------------------------- */}
        {/* PROPS OVERVIEW */}
        {/* ---------------------------------------------------------------------- */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">Props Overview</h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;Slider /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">Core</h3>
              <ul className="space-y-1">
                <li><code>type</code> — "single" | "range" | "dual"</li>
                <li><code>color</code> — theme tokens: primary, success, danger…</li>
                <li><code>from</code> — min value</li>
                <li><code>to</code> — max value</li>
                <li><code>defaultValue</code> — initial value (single/range)</li>
                <li><code>defaultRange</code> — initial [min,max] (dual)</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">Appearance</h3>
              <ul className="space-y-1">
                <li><code>thickness</code> — "sm" | "md" | "lg"</li>
                <li><code>shape</code> — "circle" | "square" | "none"</li>
                <li><code>showTooltip</code> — show current value bubble</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">State & Misc</h3>
              <ul className="space-y-1">
                <li><code>disabled</code> — disable interaction</li>
                <li><code>label</code> — top label</li>
                <li><code>onChange</code> — callback on value change</li>
                <li><code>className</code> — custom classes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* COLORS / SINGLE / RANGE / DUAL */}
        {/* ---------------------------------------------------------------------- */}

        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-8 space-y-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-primary-950-dark">Basic Slider Types</h2>
              <p className="text-sm text-gray-default-600">
                Showcase of single, range, and dual sliders in all theme colors.
              </p>
            </div>
            <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-gray-default-100 text-gray-default-600">
              props: type, color, defaultValue, defaultRange
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* SINGLE */}
            <div className="space-y-4 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Single Sliders</h3>
              <Slider label="Primary" color="primary" defaultValue={30} />
              <Slider label="Secondary" color="secondary" defaultValue={45} />
              <Slider label="Success" color="success" defaultValue={70} />
              <Slider label="Warning" color="warning" defaultValue={60} />
              <Slider label="Danger" color="danger" defaultValue={50} />
              <Slider label="Neutral" color="neutral" defaultValue={40} />
            </div>

            {/* RANGE */}
            <div className="space-y-4 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Range Sliders</h3>
              <Slider type="range" label="Primary" color="primary" defaultValue={70} />
              <Slider type="range" label="Secondary" color="secondary" defaultValue={50} />
              <Slider type="range" label="Success" color="success" defaultValue={90} />
              <Slider type="range" label="Warning" color="warning" defaultValue={40} />
              <Slider type="range" label="Danger" color="danger" defaultValue={56} />
              <Slider type="range" label="Neutral" color="neutral" defaultValue={35} />
            </div>

            {/* DUAL */}
            <div className="space-y-4 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Dual Sliders</h3>
              <Slider type="dual" label="Primary" color="primary" defaultRange={[20, 70]} />
              <Slider type="dual" label="Secondary" color="secondary" defaultRange={[15, 65]} />
              <Slider type="dual" label="Success" color="success" defaultRange={[10, 90]} />
              <Slider type="dual" label="Warning" color="warning" defaultRange={[30, 75]} />
              <Slider type="dual" label="Danger" color="danger" defaultRange={[25, 80]} />
              <Slider type="dual" label="Neutral" color="neutral" defaultRange={[10, 45]} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* DISABLED */}
        {/* ---------------------------------------------------------------------- */}

        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-8 space-y-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-primary-950-dark">Disabled</h2>
              <p className="text-sm text-gray-default-600">
                Disabled sliders across types.
              </p>
            </div>
            <span className="hidden md:flex text-xs px-2 py-1 rounded-full bg-gray-default-100">
              props: disabled
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* SINGLE */}
            <div className="space-y-4 p-4 rounded-xl bg-content-content2 border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Single</h3>
              <Slider label="Primary Disabled" color="primary" defaultValue={50} disabled />
              <Slider label="Danger Disabled" color="danger" defaultValue={75} disabled />
            </div>

            {/* RANGE */}
            <div className="space-y-4 p-4 rounded-xl bg-content-content2 border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Range</h3>
              <Slider type="range" label="Success" color="success" defaultValue={60} disabled />
              <Slider type="range" label="Warning" color="warning" defaultValue={80} disabled />
            </div>

            {/* DUAL */}
            <div className="space-y-4 p-4 rounded-xl bg-content-content2 border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Dual</h3>
              <Slider type="dual" label="Primary" color="primary" defaultRange={[20, 65]} disabled />
              <Slider type="dual" label="Neutral" color="neutral" defaultRange={[30, 80]} disabled />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* THICKNESS + TOOLTIP */}
        {/* ---------------------------------------------------------------------- */}

        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-8 space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary-950-dark">
                Thickness & Tooltips
              </h2>
              <p className="text-sm text-gray-default-600">
                Use{" "}
                <code className="px-1 rounded bg-gray-default-100 text-xs">
                  thickness
                </code>{" "}
                and{" "}
                <code className="px-1 rounded bg-gray-default-100 text-xs">
                  showTooltip
                </code>
                .
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* SM */}
            <div className="space-y-4 p-4 bg-content-content2 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Small</h3>
              <Slider label="Single" thickness="sm" color="primary" showTooltip defaultValue={50} />
              <Slider type="range" label="Range" thickness="sm" color="success" showTooltip defaultValue={75} />
              <Slider type="dual" label="Dual" thickness="sm" color="danger" showTooltip defaultRange={[20, 70]} />
            </div>

            {/* MD */}
            <div className="space-y-4 p-4 bg-content-content2 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Medium</h3>
              <Slider label="Single" thickness="md" color="warning" showTooltip defaultValue={35} />
              <Slider type="range" label="Range" thickness="md" color="secondary" showTooltip defaultValue={60} />
              <Slider type="dual" label="Dual" thickness="md" color="success" showTooltip defaultRange={[40, 90]} />
            </div>

            {/* LG */}
            <div className="space-y-4 p-4 bg-content-content2 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Large</h3>
              <Slider label="Single" thickness="lg" color="danger" showTooltip defaultValue={80} />
              <Slider type="range" label="Range" thickness="lg" color="neutral" showTooltip defaultValue={50} />
              <Slider type="dual" label="Dual" thickness="lg" color="primary" showTooltip defaultRange={[10, 50]} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* SHAPES */}
        {/* ---------------------------------------------------------------------- */}

        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-8 space-y-10">
          <h2 className="text-xl font-semibold text-primary-950-dark">Controller Shapes</h2>

          <div className="grid md:grid-cols-3 gap-6">

            {/* CIRCLE */}
            <div className="space-y-4 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Circle</h3>
              <Slider label="Single" shape="circle" color="primary" defaultValue={60} showTooltip />
              <Slider type="range" label="Range" shape="circle" color="success" defaultValue={70} />
              <Slider type="dual" label="Dual" shape="circle" color="danger" defaultRange={[20, 70]} />
            </div>

            {/* SQUARE */}
            <div className="space-y-4 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">Square</h3>
              <Slider label="Single" shape="square" color="secondary" defaultValue={45} showTooltip />
              <Slider type="range" label="Range" shape="square" color="primary" defaultValue={55} />
              <Slider type="dual" label="Dual" shape="square" color="danger" defaultRange={[15, 65]} />
            </div>

            {/* NONE */}
            <div className="space-y-4 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold text-primary-950-dark">None (Invisible)</h3>
              <Slider label="Single" shape="none" color="success" defaultValue={80} />
              <Slider type="range" label="Range" shape="none" color="neutral" defaultValue={65} />
              <Slider type="dual" label="Dual" shape="none" color="warning" defaultRange={[30, 80]} />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------------- */}
        {/* CUSTOM RANGES */}
        {/* ---------------------------------------------------------------------- */}

        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-8 space-y-8">
          <h2 className="text-xl font-semibold text-primary-950-dark">Custom Ranges</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* RANGE 0–1000 */}
            <div className="space-y-6 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold">0 – 1000</h3>
              <Slider label="Single" from={0} to={1000} color="primary" defaultValue={350} showTooltip />
              <Slider type="range" label="Range" from={0} to={1000} color="warning" defaultValue={700} showTooltip />
              <Slider type="dual" label="Dual" from={0} to={1000} color="success" defaultRange={[200, 800]} showTooltip />
            </div>

            {/* RANGE 5–50 */}
            <div className="space-y-6 bg-content-content2 p-4 rounded-xl border border-gray-default-200">
              <h3 className="text-sm font-semibold">5 – 50</h3>
              <Slider label="Single" from={5} to={50} color="secondary" defaultValue={25} showTooltip />
              <Slider type="range" label="Range" from={5} to={50} color="danger" defaultValue={40} showTooltip />
              <Slider type="dual" label="Dual" from={5} to={50} color="neutral" defaultRange={[10, 45]} showTooltip />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
