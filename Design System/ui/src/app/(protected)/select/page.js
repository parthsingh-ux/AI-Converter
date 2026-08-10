"use client";

import React from "react";
import Select from "@/components/Select";

const animals = [
  "Cat",
  "Dog",
  "Elephant",
  "Lion",
  "Tiger",
  "Giraffe",
  "Dolphin",
];

export default function SelectPlaygroundPage() {
  return (
    <main className="rounded-2xl bg-layout-background text-primary-950-dark p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Select Showcase
          </h1>
          <p className="text-sm text-gray-default-600 max-w-2xl">
            A customizable select component with size, color, variant, radius,
            fullWidth, disabled state, label placement and a clear button.
          </p>
        </header>

        {/* PROPS OVERVIEW (like Radio example) */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;Select /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">
            {/* Column 1 – Core */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Core
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> –{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>variant</code> –{" "}
                  <code>"flat" | "faded" | "bordered" | "underlined"</code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>
                    "primary" | "success" | "warning" | "danger" | "default"
                  </code>
                </li>
                <li>
                  <code>fullWidth</code> – stretch to container width
                </li>
              </ul>
            </div>

            {/* Column 2 – Data & Labeling */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Data & Labeling
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>options</code> –{" "}
                  <code>
                    string[] | &#123; label: string; value: string &#125;[]
                  </code>
                </li>
                <li>
                  <code>value</code> – controlled selected value
                </li>
                <li>
                  <code>defaultValue</code> – uncontrolled initial value
                </li>
                <li>
                  <code>placeholder</code> – text when nothing is selected
                </li>
                <li>
                  <code>label</code> – field label
                </li>
                <li>
                  <code>labelPlacement</code> –{" "}
                  <code>"outside" | "inside"</code>
                </li>
              </ul>
            </div>

            {/* Column 3 – Behavior & Events */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior & Events
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isDisabled</code> – disable interaction
                </li>
                <li>
                  <code>isClearable</code> – show clear (×) button
                </li>
                <li>
                  <code>isMultiline</code> – allow option text wrapping
                </li>
                <li>
                  <code>onChange</code> –{" "}
                  <code>(value: string) =&gt; void</code>
                </li>
                <li>
                  <code>className</code> – extra trigger classes
                </li>
                <li>
                  <code>...rest</code> – forwarded to root button
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SIZES */}
        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Sizes
              </h2>
              <p className="text-xs text-gray-default-600">
                Use{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  size
                </code>{" "}
                to control trigger height and padding.
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-700">
              props: <span className="font-mono ml-1">size</span>
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3 pt-1">
            <Select
              label="Small"
              placeholder="Choose animal"
              options={animals}
              size="sm"
              radius="none"
              color="default"
              variant="faded"
            />
            <Select
              label="Medium"
              placeholder="Choose animal"
              options={animals}
              size="md"
              radius="none"
              color="default"
              variant="faded"
            />
            <Select
              label="Large"
              placeholder="Choose animal"
              options={animals}
              size="lg"
              radius="none"
              color="default"
              variant="faded"
            />
          </div>
        </section>

        {/* RADIUS */}
        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Radius
              </h2>
              <p className="text-xs text-gray-default-600">
                Control corner rounding with{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  radius
                </code>
                .
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-700">
              props: <span className="font-mono ml-1">radius</span>
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3 pt-1">
            <Select
              label="None"
              placeholder="Favorite animal"
              options={animals}
              radius="none"
              size="md"
              color="default"
              variant="faded"
            />
            <Select
              label="Small"
              placeholder="Favorite animal"
              options={animals}
              radius="sm"
              size="md"
              color="default"
              variant="faded"
            />
            <Select
              label="Medium"
              placeholder="Favorite animal"
              options={animals}
              radius="md"
              size="md"
              color="default"
              variant="faded"
            />
            <Select
              label="Large"
              placeholder="Favorite animal"
              options={animals}
              radius="lg"
              size="md"
              color="default"
              variant="faded"
            />
            <Select
              label="Full"
              placeholder="Favorite animal"
              options={animals}
              radius="full"
              size="md"
              color="default"
              variant="faded"
            />
          </div>
        </section>

        {/* VARIANTS */}
        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Variants
              </h2>
              <p className="text-xs text-gray-default-600">
                Change visual emphasis with{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  variant
                </code>
                .
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-700">
              props:{" "}
              <span className="font-mono ml-1">variant, color, radius</span>
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-1">
            <Select
              label="Flat"
              placeholder="Select animal"
              options={animals}
              radius="none"
              variant="flat"
              color="default"
            />
            <Select
              label="Faded"
              placeholder="Select animal"
              options={animals}
              color="default"
              radius="none"
              variant="faded"
            />
            <Select
              label="Bordered"
              placeholder="Select animal"
              options={animals}
              color="default"
              radius="none"
              variant="bordered"
            />
            <Select
              label="Underlined"
              placeholder="Select animal"
              options={animals}
              color="default"
              radius="none"
              variant="underlined"
            />
          </div>
        </section>

        {/* COLORS (faded + radius none) */}
        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Colors (faded · radius none)
              </h2>
              <p className="text-xs text-gray-default-600">
                Each example uses{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  variant="faded"
                </code>{" "}
                and{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  radius="none"
                </code>
                .
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-700">
              props: <span className="font-mono ml-1">color, variant</span>
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-1">
            <Select
              label="Primary"
              placeholder="Favorite animal"
              options={animals}
              color="primary"
              variant="faded"
              radius="none"
            />
            <Select
              label="Success"
              placeholder="Favorite animal"
              options={animals}
              color="success"
              variant="faded"
              radius="none"
            />
            <Select
              label="Warning"
              placeholder="Favorite animal"
              options={animals}
              color="warning"
              variant="faded"
              radius="none"
            />
            <Select
              label="Default"
              placeholder="Favorite animal"
              options={animals}
              color="default"
              variant="faded"
              radius="none"
            />
            <Select
              label="Danger"
              placeholder="Favorite animal"
              options={animals}
              color="danger"
              variant="faded"
              radius="none"
            />
          </div>
        </section>

        {/* BEHAVIOR */}
        <section className="bg-content-content1 border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-6 mb-2">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Behavior
              </h2>
              <p className="text-xs text-gray-default-600">
                Examples for{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  fullWidth
                </code>
                ,{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  isDisabled
                </code>
                ,{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  labelPlacement
                </code>
                ,{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  isClearable
                </code>{" "}
                and{" "}
                <code className="bg-gray-default-50 px-1 rounded text-[11px]">
                  isMultiline
                </code>
                .
              </p>
            </div>
            <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-700 text-right">
              props:{" "}
              <span className="font-mono ml-1">
                fullWidth, isDisabled, labelPlacement, isClearable, isMultiline
              </span>
            </span>
          </div>

          {/* fullWidth */}
          <div className="pt-1">
            <Select
              label="Full width"
              placeholder="This select stretches to its container"
              options={animals}
              fullWidth
              color="default"
              variant="faded"
            />
          </div>

          {/* disabled + clearable */}
          <div className="grid md:grid-cols-2 gap-6 pt-1">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-default-500">
                Disabled
              </p>
              <Select
                label="Disabled"
                placeholder="You cannot change this"
                options={animals}
                isDisabled
                color="default"
                radius="full"
                variant="flat"
                fullWidth
              />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-default-500">
                Clearable
              </p>
              <Select
                label="Clearable"
                placeholder="Choose and then clear"
                options={animals}
                isClearable
                color="default"
                radius="full"
                variant="faded"
                fullWidth
              />
            </div>
          </div>

          {/* labelPlacement + multiline */}
          <div className="grid gap-6 md:grid-cols-2 pt-1">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-default-500">
                Label placement
              </p>
              <div className="space-y-4">
                <Select
                  label="Label inside"
                  labelPlacement="inside"
                  placeholder=" "
                  options={animals}
                  radius="full"
                  color="default"
                  variant="faded"
                />
                <Select
                  label="Label outside"
                  labelPlacement="outside"
                  placeholder="Choose animal"
                  options={animals}
                  radius="full"
                  color="default"
                  variant="faded"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-default-500">
                Multiline options
              </p>
              <Select
                label="Multiline text"
                placeholder="Long option text will wrap onto multiple lines"
                options={[
                  "A very very long option that should wrap across multiple lines when multiline is enabled",
                  "Short one",
                  "Another option",
                ]}
                isMultiline
                radius="md"
                color="default"
                variant="bordered"
                fullWidth
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
