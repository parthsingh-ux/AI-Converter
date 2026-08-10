"use client";

import React from "react";
import Checkbox from "@/components/Checkbox";

const CheckboxPage = () => {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Checkbox Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            A complete visual overview of key props and behavior for the{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;Checkbox /&gt;
            </code>{" "}
            and{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;CheckboxGroup /&gt;
            </code>{" "}
            components.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="mb-10 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Below is a summary of the main props demonstrated on this page.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-2 lg:grid-cols-3">
            {/* BASIC PROPS */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Checkbox – Basic
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>color</code> —{" "}
                  <code>"default" | "primary" | "secondary" | "success" | "warning" | "danger"</code>
                </li>
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> — Tailwind radius class (e.g.{" "}
                  <code>"rounded-none"</code>, <code>"rounded-md"</code>,{" "}
                  <code>"rounded-full"</code>)
                </li>
                <li>
                  <code>defaultChecked</code> — initial checked state
                </li>
                <li>
                  <code>isDisabled</code> — disable interactions & visuals
                </li>
              </ul>
            </div>

            {/* APPEARANCE / TEXT */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Appearance & Label
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>lineThrough</code> — apply <code>line-through</code> to
                  label when checked
                </li>
                <li>
                  <code>children</code> — label/content node
                </li>
                <li>
                  <code>hoverBorderColor</code> — override border color on hover
                </li>
                <li>
                  <code>hoverBgColor</code> — override background on hover
                </li>
                <li>
                  <code>hoverTextColor</code> — override label text on hover
                </li>
              </ul>
            </div>

            {/* BEHAVIOR & GROUP */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior & Group Layout
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>onChange</code> — callback with{" "}
                  <code>(checked: boolean)</code>
                </li>
                <li>
                  <code>&lt;CheckboxGroup /&gt;</code> — layout wrapper
                </li>
                <li>
                  <code>CheckboxGroup.orientation</code> —{" "}
                  <code>"vertical" | "horizontal"</code>
                </li>
                <li>
                  <code>CheckboxGroup.className</code> — extra wrapper classes
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* MAIN GRID – two columns on large screens */}
        <div className="grid grid-cols-1 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* DEFAULT */}
            <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
              <h2 className="col-span-5 mb-2 text-lg font-semibold text-primary-950-dark">
                Default
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                Neutral styling using{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  color="default"
                </code>{" "}
                and different corner radii.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-gray-default-500">
                    rounded-none
                  </h3>
                  <Checkbox color="default" radius="rounded-none">
                    Checkbox
                  </Checkbox>
                  <Checkbox
                    color="default"
                    radius="rounded-none"
                    lineThrough
                  >
                    Line-through
                  </Checkbox>
                  <Checkbox
                    color="default"
                    radius="rounded-none"
                    isDisabled
                  >
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-gray-default-500">
                    rounded-sm
                  </h3>
                  <Checkbox color="default" radius="rounded-sm">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-sm" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-sm" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-gray-default-500">
                    rounded-md
                  </h3>
                  <Checkbox color="default" radius="rounded-md">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-md" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-md" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-gray-default-500">
                    rounded-lg
                  </h3>
                  <Checkbox color="default" radius="rounded-lg">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-lg" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-lg" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-gray-default-500">
                    rounded-full
                  </h3>
                  <Checkbox color="default" radius="rounded-full">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-full" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="default" radius="rounded-full" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>
              </div>
            </section>

            {/* PRIMARY */}
            <section className="rounded-2xl border border-primary-200 bg-primary-50 p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-primary-950-dark">
                Primary
              </h2>
              <p className="mb-4 text-sm text-gray-default-700">
                Uses{" "}
                <code className="bg-primary-100 px-1 rounded text-xs">
                  color="primary"
                </code>{" "}
                for highlighted actions.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-primary-600">
                    rounded-none
                  </h3>
                  <Checkbox color="primary" radius="rounded-none">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-none" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-none" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-primary-600">
                    rounded-sm
                  </h3>
                  <Checkbox color="primary" radius="rounded-sm">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-sm" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-sm" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-primary-600">
                    rounded-md
                  </h3>
                  <Checkbox color="primary" radius="rounded-md">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-md" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-md" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-primary-600">
                    rounded-lg
                  </h3>
                  <Checkbox color="primary" radius="rounded-lg">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-lg" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-lg" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-primary-600">
                    rounded-full
                  </h3>
                  <Checkbox color="primary" radius="rounded-full">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-full" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="primary" radius="rounded-full" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>
              </div>
            </section>

            {/* SECONDARY */}
            <section className="rounded-2xl border border-secondary-200 bg-secondary-50 p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-primary-950-dark">
                Secondary
              </h2>
              <p className="mb-4 text-sm text-gray-default-700">
                Uses{" "}
                <code className="bg-secondary-100 px-1 rounded text-xs">
                  color="secondary"
                </code>{" "}
                for alternative actions.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-secondary-600">
                    rounded-none
                  </h3>
                  <Checkbox color="secondary" radius="rounded-none">
                    Checkbox
                  </Checkbox>
                  <Checkbox
                    color="secondary"
                    radius="rounded-none"
                    lineThrough
                  >
                    Line-through
                  </Checkbox>
                  <Checkbox
                    color="secondary"
                    radius="rounded-none"
                    isDisabled
                  >
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-secondary-600">
                    rounded-sm
                  </h3>
                  <Checkbox color="secondary" radius="rounded-sm">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-sm" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-sm" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-secondary-600">
                    rounded-md
                  </h3>
                  <Checkbox color="secondary" radius="rounded-md">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-md" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-md" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-secondary-600">
                    rounded-lg
                  </h3>
                  <Checkbox color="secondary" radius="rounded-lg">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-lg" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-lg" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-secondary-600">
                    rounded-full
                  </h3>
                  <Checkbox color="secondary" radius="rounded-full">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-full" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="secondary" radius="rounded-full" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* SUCCESS */}
            <section className="rounded-2xl border border-success-200 bg-success-50 p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-primary-950-dark">
                Success
              </h2>
              <p className="mb-4 text-sm text-gray-default-700">
                Uses{" "}
                <code className="bg-success-100 px-1 rounded text-xs">
                  color="success"
                </code>{" "}
                for positive or completed states.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-success-600">
                    rounded-none
                  </h3>
                  <Checkbox color="success" radius="rounded-none">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-none" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-none" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-success-600">
                    rounded-sm
                  </h3>
                  <Checkbox color="success" radius="rounded-sm">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-sm" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-sm" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-success-600">
                    rounded-md
                  </h3>
                  <Checkbox color="success" radius="rounded-md">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-md" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-md" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-success-600">
                    rounded-lg
                  </h3>
                  <Checkbox color="success" radius="rounded-lg">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-lg" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-lg" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-success-600">
                    rounded-full
                  </h3>
                  <Checkbox color="success" radius="rounded-full">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-full" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="success" radius="rounded-full" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>
              </div>
            </section>

            {/* WARNING */}
            <section className="rounded-2xl border border-warning-200 bg-warning-50 p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-primary-950-dark">
                Warning
              </h2>
              <p className="mb-4 text-sm text-gray-default-700">
                Uses{" "}
                <code className="bg-warning-100 px-1 rounded text-xs">
                  color="warning"
                </code>{" "}
                for cautionary states.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-warning-600">
                    rounded-none
                  </h3>
                  <Checkbox color="warning" radius="rounded-none">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-none" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-none" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-warning-600">
                    rounded-sm
                  </h3>
                  <Checkbox color="warning" radius="rounded-sm">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-sm" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-sm" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-warning-600">
                    rounded-md
                  </h3>
                  <Checkbox color="warning" radius="rounded-md">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-md" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-md" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-warning-600">
                    rounded-lg
                  </h3>
                  <Checkbox color="warning" radius="rounded-lg">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-lg" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-lg" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-warning-600">
                    rounded-full
                  </h3>
                  <Checkbox color="warning" radius="rounded-full">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-full" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="warning" radius="rounded-full" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>
              </div>
            </section>

            {/* DANGER */}
            <section className="rounded-2xl border border-danger-200 bg-danger-50 p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-primary-950-dark">
                Danger
              </h2>
              <p className="mb-4 text-sm text-gray-default-700">
                Uses{" "}
                <code className="bg-danger-100 px-1 rounded text-xs">
                  color="danger"
                </code>{" "}
                for destructive or error states.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-danger-600">
                    rounded-none
                  </h3>
                  <Checkbox color="danger" radius="rounded-none">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-none" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-none" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-danger-600">
                    rounded-sm
                  </h3>
                  <Checkbox color="danger" radius="rounded-sm">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-sm" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-sm" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-danger-600">
                    rounded-md
                  </h3>
                  <Checkbox color="danger" radius="rounded-md">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-md" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-md" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-danger-600">
                    rounded-lg
                  </h3>
                  <Checkbox color="danger" radius="rounded-lg">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-lg" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-lg" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold text-danger-600">
                    rounded-full
                  </h3>
                  <Checkbox color="danger" radius="rounded-full">
                    Checkbox
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-full" lineThrough>
                    Line-through
                  </Checkbox>
                  <Checkbox color="danger" radius="rounded-full" isDisabled>
                    Disabled Checkbox
                  </Checkbox>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxPage;
