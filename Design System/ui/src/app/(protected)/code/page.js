"use client";

import React from "react";
import CodeSnippet from "@/components/Code";

export default function CodeSnippetShowcase() {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            CodeSnippet Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Inline code label component with size, radius and color variants.
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
              &lt;CodeSnippet /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Content
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>text</code> — string to render as inline code
                </li>
                <li>
                  <code>className</code> — extra Tailwind classes to merge
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Size & Radius
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> —{" "}
                  <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> —{" "}
                  <code>"sm" | "md" | "lg" | "full"</code>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Color
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "neutral" | "primary" | "secondary" | "success" | "warning"
                    | "danger"
                  </code>
                </li>
                <li>
                  Each color maps to themed background + text tokens.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* DEMOS */}
        <div className="space-y-8">
          {/* SIZES */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Sizes
              </h2>
              <p className="text-sm text-gray-default-600">
                Font size and padding change with the{" "}
                <code>size</code> prop.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  size="sm"
                </p>
                <CodeSnippet
                  size="sm"
                  color="neutral"
                  text="npm i @scope/pkg --save-dev"
                />
              </div>

              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  size="md"
                </p>
                <CodeSnippet
                  size="md"
                  color="neutral"
                  text="pnpm add @heroui-org/react"
                />
              </div>

              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  size="lg"
                </p>
                <CodeSnippet
                  size="lg"
                  color="neutral"
                  text="yarn add @heroui-org/react"
                />
              </div>
            </div>
          </section>

          {/* RADIUS */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Radius
              </h2>
              <p className="text-sm text-gray-default-600">
                The <code>radius</code> prop controls how pill-like the snippet
                looks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  radius="sm"
                </p>
                <CodeSnippet
                  radius="sm"
                  color="primary"
                  text="const mode = 'sm'"
                />
              </div>
              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  radius="md"
                </p>
                <CodeSnippet
                  radius="md"
                  color="primary"
                  text="const mode = 'md'"
                />
              </div>
              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  radius="lg"
                </p>
                <CodeSnippet
                  radius="lg"
                  color="primary"
                  text="const mode = 'lg'"
                />
              </div>
              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  radius="full"
                </p>
                <CodeSnippet
                  radius="full"
                  color="primary"
                  text="const mode = 'pill'"
                />
              </div>
            </div>
          </section>

          {/* COLORS */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Colors
              </h2>
              <p className="text-sm text-gray-default-600">
                Each <code>color</code> uses your design-token based palette.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 items-start">
              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  color="neutral"
                </p>
                <CodeSnippet color="neutral" text="env NODE_ENV=production" />
              </div>

              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  color="primary"
                </p>
                <CodeSnippet color="primary" text="npx heroui init" />
              </div>

              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  color="secondary"
                </p>
                <CodeSnippet color="secondary" text="git checkout -b feature/ui" />
              </div>

              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  color="success"
                </p>
                <CodeSnippet color="success" text="tests: 24 passed" />
              </div>

              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  color="warning"
                </p>
                <CodeSnippet color="warning" text="⚠ deprecated API" />
              </div>

              <div className="space-y-2 border border-gray-default-100 rounded-2xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                  color="danger"
                </p>
                <CodeSnippet color="danger" text="Error: 500 INTERNAL" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
