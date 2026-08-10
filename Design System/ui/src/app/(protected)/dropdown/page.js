"use client";

import React from "react";
import Dropdown from "@/components/Dropdown";

export default function DropdownDemoPage() {
  const sections = [
    {
      action: "Actions",
      items: [
        { id: "1", label: "Label", description: "Description..." },
        { id: "2", label: "Label", description: "Description..." },
        { id: "3", label: "Label", description: "Description..." },
      ],
    },
    {
      action: "More Actions",
      items: [
        { id: "4", label: "Label", description: "Description..." },
        { id: "5", label: "Label", description: "Description..." },
      ],
    },
  ];

  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <header className="space-y-3">


          <h1 className="text-3xl font-semibold tracking-tight">
            Dropdown Showcase
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            A grouped selection dropdown that supports{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              sections
            </code>
            , size, color and shadow variants – with radio-style selection.
          </p>
        </header>

        {/* ======================= PROPS OVERVIEW ======================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="text-sm text-gray-default-600">
            Core props supported by the{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;Dropdown /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Data &amp; Selection
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>sections</code> — array of{" "}
                  <code>{`{ action?: string; items: { id, label, description? }[] }`}</code>
                </li>
                <li>
                  <code>defaultSelectedId</code> — initial selected item id
                </li>
                <li>
                  <code>onChange</code> — callback fired with{" "}
                  <code>id</code> when selection changes
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Visual
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> —{" "}
                  <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" |
                    "danger" | "neutral"
                  </code>
                </li>
                <li>
                  <code>shadow</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg"</code>
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
                  <code>className</code> — extra Tailwind classes for the
                  root container
                </li>
                <li>Fully controlled via config maps for size and color.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================= SIZES ======================= */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Sizes
              </h2>
              <p className="text-sm text-gray-default-600">
                Font size, paddings and circle size are controlled by the{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  size
                </code>{" "}
                prop.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: size, sections
            </span>
          </div>

          <div className="grid gap-6 pt-1 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                size="sm"
              </p>
              <div className="flex justify-center">
                <Dropdown size="sm" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                size="md"
              </p>
              <div className="flex justify-center">
                <Dropdown size="md" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                size="lg"
              </p>
              <div className="flex justify-center">
                <Dropdown size="lg" sections={sections} className="w-64" />
              </div>
            </div>
          </div>
        </section>

        {/* ======================= COLORS ======================= */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Colors
              </h2>
              <p className="text-sm text-gray-default-600">
                Accent ring, soft background, label color and checkmark inherit
                from the{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  color
                </code>{" "}
                prop.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: color, sections
            </span>
          </div>

          <div className="grid gap-6 pt-1 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                color="primary"
              </p>
              <div className="flex justify-center">
                <Dropdown color="primary" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                color="secondary"
              </p>
              <div className="flex justify-center">
                <Dropdown color="secondary" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                color="success"
              </p>
              <div className="flex justify-center">
                <Dropdown color="success" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                color="warning"
              </p>
              <div className="flex justify-center">
                <Dropdown color="warning" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                color="danger"
              </p>
              <div className="flex justify-center">
                <Dropdown color="danger" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                color="neutral"
              </p>
              <div className="flex justify-center">
                <Dropdown color="neutral" sections={sections} className="w-64" />
              </div>
            </div>
          </div>
        </section>

        {/* ======================= SHADOWS ======================= */}
        <section className="mb-8 space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Shadows
              </h2>
              <p className="text-sm text-gray-default-600">
                Control elevation using the{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  shadow
                </code>{" "}
                prop.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: shadow, sections
            </span>
          </div>

          <div className="grid gap-6 pt-1 md:grid-cols-4">
            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                shadow="none"
              </p>
              <div className="flex justify-center">
                <Dropdown shadow="none" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                shadow="sm"
              </p>
              <div className="flex justify-center">
                <Dropdown shadow="sm" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                shadow="md"
              </p>
              <div className="flex justify-center">
                <Dropdown shadow="md" sections={sections} className="w-64" />
              </div>
            </div>

            <div className="space-y-2 rounded-2xl border border-gray-default-100 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                shadow="lg"
              </p>
              <div className="flex justify-center">
                <Dropdown shadow="lg" sections={sections} className="w-64" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
