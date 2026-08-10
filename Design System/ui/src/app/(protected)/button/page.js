"use client";

import React from "react";
import Button from "@/components/Button";
import { Icon } from "@iconify/react";

export default function ButtonShowcase() {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Button Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Solid / outlined / light / flat / faded / shadow / ghost — across
            sizes, colors and icon-only variants.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="mb-10 rounded-2xl bg-content-content1 border border-gray-default-200 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Quick overview of the main props supported by the{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;Button /&gt;
            </code>{" "}
            and{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;ButtonGroup /&gt;
            </code>{" "}
            components.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Button (appearance)
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>variant</code> —{" "}
                  <code>
                    "solid" | "outlined" | "light" | "flat" | "faded" | "shadow"
                    | "ghost"
                  </code>
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "neutral"
                  </code>
                </li>
                <li>
                  <code>radius</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>borderThickness</code> —{" "}
                  <code>"1px" | "2px" | "3px" | "4px"</code>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Button (behavior)
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isDisabled</code> — disables interaction
                </li>
                <li>
                  <code>isLoading</code> — shows loader + disables
                </li>
                <li>
                  <code>spinnerPlacement</code> —{" "}
                  <code>"left" | "center" | "right"</code>
                </li>
                <li>
                  <code>isIconOnly</code> — square icon-only button
                </li>
                <li>
                  <code>fullWidth</code> — stretches to container width
                </li>
                <li>
                  <code>width</code> — custom width (class or raw CSS value)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                ButtonGroup
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>orientation</code> —{" "}
                  <code>"horizontal" | "vertical"</code>
                </li>
                <li>
                  <code>size</code>, <code>variant</code>, <code>color</code>{" "}
                  — override children styling
                </li>
                <li>
                  <code>radius</code> — unified radius for the group
                </li>
                <li>
                  Automatically sets{" "}
                  <code>groupPosition="start|middle|end|single"</code> on
                  children.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          {/* Sizes x Variants matrix */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
              Size × Variant Matrix
            </h2>
            <p className="mb-4 text-sm text-gray-default-600">
              All neutral buttons across <code>size</code> and{" "}
              <code>variant</code>. Useful as a visual baseline.
            </p>

            <div className="overflow-x-auto">
              <div className="min-w-[920px]">
                <div className="grid grid-cols-[120px_repeat(7,1fr)] items-center gap-3">
                  {/* header row */}
                  <div />
                  {["Solid", "Bordered", "Light", "Flat", "Faded", "Shadow", "Ghost"].map(
                    (label) => (
                      <div
                        key={label}
                        className="rounded bg-primary-500 px-2 py-2 text-center text-xs font-semibold text-content-content1"
                      >
                        {label}
                      </div>
                    )
                  )}

                  {/* Small label */}
                  <div className="text-sm font-medium text-gray-default-700">
                    Small
                  </div>

                  <Button size="sm" variant="solid" color="neutral" radius="none">
                    Button-1
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-2
                  </Button>
                  <Button size="sm" variant="light" color="neutral" radius="none">
                    Button-3
                  </Button>
                  <Button size="sm" variant="flat" color="neutral" radius="none">
                    Button-4
                  </Button>
                  <Button
                    size="sm"
                    variant="faded"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-5
                  </Button>
                  <Button
                    size="sm"
                    variant="shadow"
                    color="neutral"
                    radius="none"
                    className="shadow-lg"
                  >
                    Button-6
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-7
                  </Button>

                  {/* Medium label */}
                  <div className="text-sm font-medium text-gray-default-700">
                    Medium
                  </div>

                  <Button size="md" variant="solid" color="neutral" radius="none">
                    Button-1
                  </Button>
                  <Button
                    size="md"
                    variant="outlined"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-2
                  </Button>
                  <Button size="md" variant="light" color="neutral" radius="none">
                    Button-3
                  </Button>
                  <Button size="md" variant="flat" color="neutral" radius="none">
                    Button-4
                  </Button>
                  <Button
                    size="md"
                    variant="faded"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-5
                  </Button>
                  <Button
                    size="md"
                    variant="shadow"
                    color="neutral"
                    radius="none"
                    className="shadow-lg"
                  >
                    Button-6
                  </Button>
                  <Button
                    size="md"
                    variant="ghost"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-7
                  </Button>

                  {/* Large label */}
                  <div className="text-sm font-medium text-gray-default-700">
                    Large
                  </div>

                  <Button size="lg" variant="solid" color="neutral" radius="none">
                    Button-1
                  </Button>
                  <Button
                    size="lg"
                    variant="outlined"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-2
                  </Button>
                  <Button size="lg" variant="light" color="neutral" radius="none">
                    Button-3
                  </Button>
                  <Button size="lg" variant="flat" color="neutral" radius="none">
                    Button-4
                  </Button>
                  <Button
                    size="lg"
                    variant="faded"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-5
                  </Button>
                  <Button
                    size="lg"
                    variant="shadow"
                    color="neutral"
                    radius="none"
                    className="shadow-lg"
                  >
                    Button-6
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    color="neutral"
                    radius="none"
                    borderThickness="2px"
                  >
                    Button-7
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Icon-only matrix */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
              Icon-only Buttons
            </h2>
            <p className="mb-4 text-sm text-gray-default-600">
              Using <code>isIconOnly</code> for compact circular buttons.
            </p>

            <div className="overflow-x-auto">
              <div className="min-w-[920px]">
                <div className="grid grid-cols-[120px_repeat(7,1fr)] items-center gap-3">
                  <div />
                  {["Solid", "Bordered", "Light", "Flat", "Faded", "Shadow", "Ghost"].map(
                    (label) => (
                      <div
                        key={label}
                        className="rounded bg-primary-500 px-2 py-2 text-center text-xs font-semibold text-content-content1"
                      >
                        {label}
                      </div>
                    )
                  )}

                  <div className="text-sm font-medium text-gray-default-700">
                    Small
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="solid"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={20} height={20} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="outlined"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={20} height={20} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="light"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={20} height={20} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="flat"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={20} height={20} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="faded"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={20} height={20} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="shadow"
                      color="neutral"
                      radius="none"
                      className="shadow-lg"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={20} height={20} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={20} height={20} />
                    </Button>
                  </div>

                  <div className="text-sm font-medium text-gray-default-700">
                    Medium
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="md"
                      variant="solid"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={24} height={24} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="md"
                      variant="outlined"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={24} height={24} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="md"
                      variant="light"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={24} height={24} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="md"
                      variant="flat"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={24} height={24} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="md"
                      variant="faded"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={24} height={24} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="md"
                      variant="shadow"
                      color="neutral"
                      radius="none"
                      className="shadow-lg"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={24} height={24} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="md"
                      variant="ghost"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={24} height={24} />
                    </Button>
                  </div>

                  <div className="text-sm font-medium text-gray-default-700">
                    Large
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="solid"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="outlined"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="light"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="flat"
                      color="neutral"
                      radius="none"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="faded"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="shadow"
                      color="neutral"
                      radius="none"
                      className="shadow-lg"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={28} height={28} />
                    </Button>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      variant="ghost"
                      color="neutral"
                      radius="none"
                      borderThickness="2px"
                      isIconOnly
                    >
                      <Icon icon="lucide:circle" width={28} height={28} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Colors matrix */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
              Color Variants (Solid)
            </h2>
            <p className="mb-4 text-sm text-gray-default-600">
              Same <code>variant="solid"</code>, different semantic{" "}
              <code>color</code>.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {/* Primary */}
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Primary
                </h3>
                <Button size="sm" variant="solid" color="primary" radius="none">
                  Solid
                </Button>
                <Button size="md" variant="solid" color="primary" radius="sm">
                  Medium
                </Button>
                <Button size="lg" variant="solid" color="primary" radius="md">
                  Large
                </Button>
              </div>

              {/* Secondary */}
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Secondary
                </h3>
                <Button
                  size="sm"
                  variant="solid"
                  color="secondary"
                  radius="none"
                >
                  Solid
                </Button>
                <Button size="md" variant="solid" color="secondary" radius="sm">
                  Medium
                </Button>
                <Button size="lg" variant="solid" color="secondary" radius="md">
                  Large
                </Button>
              </div>

              {/* Success */}
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Success
                </h3>
                <Button size="sm" variant="solid" color="success" radius="none">
                  Solid
                </Button>
                <Button size="md" variant="solid" color="success" radius="sm">
                  Medium
                </Button>
                <Button size="lg" variant="solid" color="success" radius="md">
                  Large
                </Button>
              </div>

              {/* Warning */}
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Warning
                </h3>
                <Button size="sm" variant="solid" color="warning" radius="none">
                  Solid
                </Button>
                <Button size="md" variant="solid" color="warning" radius="sm">
                  Medium
                </Button>
                <Button size="lg" variant="solid" color="warning" radius="md">
                  Large
                </Button>
              </div>

              {/* Danger */}
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Danger
                </h3>
                <Button size="sm" variant="solid" color="danger" radius="none">
                  Solid
                </Button>
                <Button size="md" variant="solid" color="danger" radius="sm">
                  Medium
                </Button>
                <Button size="lg" variant="solid" color="danger" radius="md">
                  Large
                </Button>
              </div>

              {/* Neutral */}
              <div className="flex flex-col items-start gap-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Neutral
                </h3>
                <Button size="sm" variant="solid" color="neutral" radius="none">
                  Solid
                </Button>
                <Button size="md" variant="solid" color="neutral" radius="sm">
                  Medium
                </Button>
                <Button size="lg" variant="solid" color="neutral" radius="md">
                  Large
                </Button>
              </div>
            </div>
          </section>

          {/* Size / Radius examples */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
              Size, Radius & Icon + Label
            </h2>
            <p className="mb-4 text-sm text-gray-default-600">
              Quick reference for <code>size</code>, <code>radius</code> and
              icon+label combinations.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Size */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Size
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="solid" color="primary">
                    Small
                  </Button>
                  <Button size="md" variant="solid" color="primary">
                    Medium
                  </Button>
                  <Button size="lg" variant="solid" color="primary">
                    Large
                  </Button>
                </div>
              </div>

              {/* Radius */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Radius
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    size="md"
                    variant="solid"
                    color="primary"
                    radius="none"
                  >
                    None
                  </Button>
                  <Button
                    size="md"
                    variant="solid"
                    color="primary"
                    radius="sm"
                  >
                    Sm
                  </Button>
                  <Button
                    size="md"
                    variant="solid"
                    color="primary"
                    radius="md"
                  >
                    Md
                  </Button>
                  <Button
                    size="md"
                    variant="solid"
                    color="primary"
                    radius="lg"
                  >
                    Lg
                  </Button>
                  <Button
                    size="md"
                    variant="solid"
                    color="primary"
                    radius="full"
                  >
                    Full
                  </Button>
                </div>
              </div>

              {/* Icon + Label */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-default-700">
                  Icon + Label
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    size="md"
                    variant="solid"
                    color="primary"
                    radius="sm"
                  >
                    <Icon
                      icon="lucide:download"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Download
                  </Button>
                  <Button
                    size="md"
                    variant="outlined"
                    color="primary"
                    radius="sm"
                  >
                    <Icon
                      icon="lucide:edit-3"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
