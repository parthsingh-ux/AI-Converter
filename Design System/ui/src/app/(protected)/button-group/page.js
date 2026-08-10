"use client";

import React from "react";
import Button, { ButtonGroup } from "@/components/Button";

export default function ButtonShowcase() {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Button Group Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Connected buttons sharing size, color and variant — powered by{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;ButtonGroup /&gt;
            </code>{" "}
            and the internal{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              groupPosition
            </code>{" "}
            logic.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="mb-10 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            How <code className="bg-gray-default-100 px-1 py-0.5 rounded text-xs">
              ButtonGroup
            </code>{" "}
            and grouped buttons work together.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                ButtonGroup props
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>orientation</code> —{" "}
                  <code>"horizontal" | "vertical"</code>
                </li>
                <li>
                  <code>size</code> — optional override for all children
                </li>
                <li>
                  <code>variant</code> — optional override for all children
                </li>
                <li>
                  <code>color</code> — optional override for all children
                </li>
                <li>
                  <code>radius</code> — shared corner style for the group
                </li>
                <li>
                  <code>className</code> — extra classes on the wrapper
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                groupPosition (internal)
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>groupPosition</code> is injected into children:
                </li>
                <li>
                  <code>"single"</code> — only button in the group
                </li>
                <li>
                  <code>"start"</code> — first button, left/top rounded
                </li>
                <li>
                  <code>"middle"</code> — middle buttons, no radius
                </li>
                <li>
                  <code>"end"</code> — last button, right/bottom rounded
                </li>
                <li>
                  Children keep their own props unless overridden by group.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Recommended usage
              </h3>
              <ul className="space-y-1">
                <li>Segmented controls (e.g. views / filters)</li>
                <li>Pagination-like controls (Prev / Now / Next)</li>
                <li>Toolbar groups (align left / center / right)</li>
                <li>
                  Use consistent <code>size</code> and <code>radius</code> for
                  clean seams.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* MAIN GROUP GRID */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Button Groups by Color & Variant
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Each card shows all variants for a given{" "}
            <code>color</code>, using{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              orientation="horizontal"
            </code>{" "}
            and shared <code>size</code>, <code>variant</code> and{" "}
            <code>radius</code>.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {/* Primary variants */}
            <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-primary-700">
                Primary variants
              </h3>

              <div className="space-y-3">
                {/* Solid */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Solid
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="solid"
                    color="primary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Outlined */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Outlined
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="outlined"
                    color="primary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Light */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Light
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="light"
                    color="primary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Flat */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Flat
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="flat"
                    color="primary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Faded */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Faded
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="faded"
                    color="primary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Shadow */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Shadow
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="shadow"
                    color="primary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Ghost */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Ghost
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="ghost"
                    color="primary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>

            {/* Secondary variants */}
            <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-secondary-700">
                Secondary variants
              </h3>

              <div className="space-y-3">
                {/* Solid */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Solid
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="solid"
                    color="secondary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Outlined */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Outlined
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="outlined"
                    color="secondary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Light */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Light
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="light"
                    color="secondary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Flat */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Flat
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="flat"
                    color="secondary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Faded */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Faded
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="faded"
                    color="secondary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Shadow */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Shadow
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="shadow"
                    color="secondary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Ghost */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Ghost
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="ghost"
                    color="secondary"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>

            {/* Success variants */}
            <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-success-700">
                Success variants
              </h3>

              <div className="space-y-3">
                {/* Solid */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Solid
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="solid"
                    color="success"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Outlined */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Outlined
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="outlined"
                    color="success"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Light */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Light
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="light"
                    color="success"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Flat */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Flat
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="flat"
                    color="success"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Faded */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Faded
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="faded"
                    color="success"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Shadow */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Shadow
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="shadow"
                    color="success"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Ghost */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Ghost
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="ghost"
                    color="success"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>

            {/* Warning variants */}
            <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-warning-700">
                Warning variants
              </h3>

              <div className="space-y-3">
                {/* Solid */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Solid
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="solid"
                    color="warning"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Outlined */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Outlined
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="outlined"
                    color="warning"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Light */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Light
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="light"
                    color="warning"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Flat */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Flat
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="flat"
                    color="warning"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Faded */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Faded
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="faded"
                    color="warning"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Shadow */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Shadow
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="shadow"
                    color="warning"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Ghost */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Ghost
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="ghost"
                    color="warning"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>

            {/* Neutral variants */}
            <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-default-800">
                Neutral variants
              </h3>

              <div className="space-y-3">
                {/* Solid */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Solid
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="solid"
                    color="neutral"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Outlined */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Outlined
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="outlined"
                    color="neutral"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Light */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Light
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="light"
                    color="neutral"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Flat */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Flat
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="flat"
                    color="neutral"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Faded */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Faded
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="faded"
                    color="neutral"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Shadow */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Shadow
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="shadow"
                    color="neutral"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Ghost */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Ghost
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="ghost"
                    color="neutral"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>

            {/* Danger variants */}
            <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-4">
              <h3 className="mb-3 text-sm font-semibold text-danger-700">
                Danger variants
              </h3>

              <div className="space-y-3">
                {/* Solid */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Solid
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="solid"
                    color="danger"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Outlined */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Outlined
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="outlined"
                    color="danger"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Light */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Light
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="light"
                    color="danger"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Flat */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Flat
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="flat"
                    color="danger"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Faded */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Faded
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="faded"
                    color="danger"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Shadow */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Shadow
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="shadow"
                    color="danger"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>

                {/* Ghost */}
                <div className="flex items-center gap-3">
                  <span className="w-16 text-xs text-gray-default-500">
                    Ghost
                  </span>
                  <ButtonGroup
                    orientation="horizontal"
                    size="md"
                    variant="ghost"
                    color="danger"
                    radius="md"
                  >
                    <Button>Left</Button>
                    <Button>Center</Button>
                    <Button>Right</Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
