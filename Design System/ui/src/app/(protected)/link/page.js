"use client";

import React from "react";
import LinkComponent from "@/components/Link";
import { Icon } from "@iconify/react";

export default function LinkShowcasePage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-12">
        {/* PAGE HEADER */}
        <header className="space-y-3">

          <h1 className="text-3xl font-semibold tracking-tight">
            Link Component Showcase
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            A versatile link component supporting colors, sizes, hover behaviors,
            icons, and disabled states.
          </p>
        </header>

        {/* ================= PROPS OVERVIEW ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="text-sm text-gray-default-600">
            Core props supported by the{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;LinkComponent /&gt;
            </code>
            .
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Visual
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "neutral"
                  </code>
                </li>
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>hoverStyle</code> —{" "}
                  <code>"underline" | "block"</code>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behaviour
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isDisabled</code> — disables interactions
                </li>
                <li>
                  <code>href</code> — link target URL
                </li>
                <li>
                  <code>className</code> — override styles
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Icons
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>showIcon</code> — display right icon
                </li>
                <li>
                  <code>icon</code> — Iconify icon name
                </li>
                <li>Icon uses <code>text-current</code> auto-coloring</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= COLORS ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Colors
              </h2>
              <p className="text-sm text-gray-default-600">
                Semantic color variants for different UI states.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-block">
              props: color
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <LinkComponent color="primary">Primary Link</LinkComponent>
            <LinkComponent color="secondary">Secondary Link</LinkComponent>
            <LinkComponent color="success">Success Link</LinkComponent>
            <LinkComponent color="warning">Warning Link</LinkComponent>
            <LinkComponent color="danger">Danger Link</LinkComponent>
            <LinkComponent color="neutral">Neutral Link</LinkComponent>
          </div>
        </section>

        {/* ================= SIZES ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Sizes
              </h2>
              <p className="text-sm text-gray-default-600">
                Three typographic sizes controlled via{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  size
                </code>
                .
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-block">
              props: size
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <LinkComponent size="sm">Small Link</LinkComponent>
            <LinkComponent size="md">Medium Link</LinkComponent>
            <LinkComponent size="lg">Large Link</LinkComponent>
          </div>
        </section>

        {/* ================= HOVER STYLES ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Hover Styles
              </h2>
              <p className="text-sm text-gray-default-600">
                Two hover patterns: underline or subtle block effect.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-block">
              props: hoverStyle
            </span>
          </div>

          <div className="flex flex-col gap-3 w-1/2">
            <LinkComponent hoverStyle="underline">Underline on Hover</LinkComponent>
            <LinkComponent hoverStyle="block">Block Hover</LinkComponent>
          </div>
        </section>

        {/* ================= ICON SUPPORT ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Icon Support
              </h2>
              <p className="text-sm text-gray-default-600">
                Easily append right icons using Iconify.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-block">
              props: showIcon, icon
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <LinkComponent showIcon>Link with Icon</LinkComponent>

            <LinkComponent showIcon icon="fontisto:link">
              Custom Icon
            </LinkComponent>
          </div>
        </section>

        {/* ================= DISABLED ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Disabled
              </h2>
              <p className="text-sm text-gray-default-600">
                Prevents interactions and dims appearance.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-block">
              props: isDisabled
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <LinkComponent isDisabled>Disabled Link</LinkComponent>
            <LinkComponent isDisabled showIcon>
              Disabled with Icon
            </LinkComponent>
          </div>
        </section>

        {/* ================= COMBINED ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm mb-20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Combined Example
              </h2>
              <p className="text-sm text-gray-default-600">
                All main props combined in a single link.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-block">
              props: all
            </span>
          </div>

          <LinkComponent
            color="success"
            size="lg"
            hoverStyle="block"
            showIcon
          >
            Full Featured Link
          </LinkComponent>
        </section>
      </div>
    </main>
  );
}
