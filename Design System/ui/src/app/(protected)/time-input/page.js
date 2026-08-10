"use client";

import React, { useState } from "react";
import TimeInput from "@/components/TimeInput";

export default function Page() {
  const [timeDefault, setTimeDefault] = useState("");
  const [timePrimary, setTimePrimary] = useState("");
  const [timeBordered, setTimeBordered] = useState("");
  const [timeRoundedFull, setTimeRoundedFull] = useState("");
  const [timeSmall, setTimeSmall] = useState("");

  return (
    <div className="rounded-2xl bg-layout-background p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* =============== HEADER =============== */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Time Input
          </h1>
          <p className="text-sm text-gray-default-600 max-w-2xl">
            12-hour time picker with scrollable hours/minutes and AM/PM
            selection. Supports different sizes, radii, colors, and variants.
          </p>
        </header>

        {/* =============== PROPS OVERVIEW =============== */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-50 px-1 text-xs">
                &lt;TimeInput /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">
            {/* Core */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Core
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>label</code> – field label text
                </li>
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> –{" "}
                  <code>"sm" | "md" | "lg" | "xl" | "full"</code>
                </li>
                <li>
                  <code>variant</code> – <code>"filled" | "bordered"</code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>"default" | "gray" | "primary"</code>
                </li>
              </ul>
            </div>

            {/* Behavior */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>onChange</code> – callback receiving{" "}
                  <code>{`{ hour, minute, period, formatted }`}</code>
                </li>
              </ul>
            </div>

            {/* Misc */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout & Misc
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>className</code> – extra classes on outer wrapper
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =============== 1️⃣ BASIC USAGE =============== */}
        <section className="space-y-4">
          <SectionHeader
            title="Basic usage"
            subtitle='Default configuration and a primary themed variant. Use "onChange" to read the formatted time.'
            pill='props: label, onChange, size="md", radius="md"'
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ExampleCard
              title="Default (filled · default color)"
              description='size="md", radius="md", variant="filled", color="default"'
              selected={timeDefault}
            >
              <TimeInput
                label="Default"
                onChange={(val) => setTimeDefault(val.formatted)}
              />
            </ExampleCard>

            <ExampleCard
              title="Primary, large"
              description='size="lg", radius="lg", color="primary"'
              selected={timePrimary}
            >
              <TimeInput
                label="Primary Large"
                color="primary"
                size="lg"
                radius="lg"
                onChange={(val) => setTimePrimary(val.formatted)}
              />
            </ExampleCard>
          </div>
        </section>

        {/* =============== 2️⃣ VARIANT & COLOR =============== */}
        <section className="space-y-4">
          <SectionHeader
            title="Variants & Colors"
            subtitle='Switch between "filled" and "bordered" styles and adapt background accents using the color prop.'
            pill='props: variant="filled | bordered", color="default | gray | primary"'
          />

          <div className="grid gap-6 md:grid-cols-3">
            <ExampleCard
              title='Filled · color="default"'
              selected={timeDefault}
              compact
            >
              <TimeInput
                label="Filled Default"
                variant="filled"
                color="default"
                onChange={(val) => setTimeDefault(val.formatted)}
              />
            </ExampleCard>

            <ExampleCard
              title='Filled · color="primary"'
              selected={timePrimary}
              compact
            >
              <TimeInput
                label="Filled Primary"
                variant="filled"
                color="primary"
                onChange={(val) => setTimePrimary(val.formatted)}
              />
            </ExampleCard>

            <ExampleCard
              title='Bordered · color="gray"'
              selected={timeBordered}
              compact
            >
              <TimeInput
                label="Bordered Gray"
                variant="bordered"
                color="gray"
                size="sm"
                radius="sm"
                onChange={(val) => setTimeBordered(val.formatted)}
              />
            </ExampleCard>
          </div>
        </section>

        {/* =============== 3️⃣ SIZE & RADIUS =============== */}
        <section className="space-y-4">
          <SectionHeader
            title="Size & Radius"
            subtitle="Control the overall density and shape of the control using size and radius."
            pill='props: size="sm | md | lg", radius="sm | md | lg | xl | full"'
          />

          <div className="grid gap-6 md:grid-cols-1">
            {/* Sizes */}
            <div className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm space-y-4">
              <p className="text-xs font-semibold text-gray-default-700 uppercase tracking-wide">
                Sizes
              </p>
              <div className="space-y-4 space-x-4">
                <TimeInput
                  label='Size "sm"'
                  size="sm"
                  radius="md"
                  onChange={() => {}}
                />
                <TimeInput
                  label='Size "md"'
                  size="md"
                  radius="md"
                  onChange={() => {}}
                />
                <TimeInput
                  label='Size "lg"'
                  size="lg"
                  radius="md"
                  onChange={() => {}}
                />
              </div>
            </div>

            {/* Radius */}
            <div className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm space-y-4">
              <p className="text-xs font-semibold text-gray-default-700 uppercase tracking-wide">
                Radius
              </p>
              <div className="space-y-3 space-x-4">
                <TimeInput
                  label='radius="sm"'
                  radius="sm"
                  size="md"
                  onChange={() => {}}
                />
                <TimeInput
                  label='radius="md"'
                  radius="md"
                  size="md"
                  onChange={() => {}}
                />
                <TimeInput
                  label='radius="xl"'
                  radius="xl"
                  size="md"
                  onChange={(val) => setTimeRoundedFull(val.formatted)}
                />
                <TimeInput
                  label='radius="full"'
                  radius="full"
                  size="md"
                  variant="bordered"
                  onChange={(val) => setTimeSmall(val.formatted)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =============== 4️⃣ LAYOUT / CLASSNAME =============== */}
        <section className="space-y-4 mb-6">
          <SectionHeader
            title="Layout & Custom width"
            subtitle="Use className to control layout. Here the pill-style input is constrained to a custom width."
            pill="props: className"
          />

          <div className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm space-y-3 max-w-lg">
            <TimeInput
              label="Pill Style · 16rem width"
              radius="full"
              size="md"
              variant="bordered"
              color="default"
              className="w-64"
              onChange={(val) => setTimeSmall(val.formatted)}
            />

            <p className="text-xs text-gray-default-600">
              Selected:{" "}
              <span className="font-mono text-primary-950-dark">
                {timeSmall || "—"}
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* --------- helpers --------- */

function SectionHeader({ title, subtitle, pill }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-sm font-semibold text-primary-950-dark">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs text-gray-default-600">{subtitle}</p>
        )}
      </div>
      {pill && (
        <span className="hidden md:inline-flex text-[11px] px-2 py-1 rounded-full bg-gray-default-50 text-gray-default-600">
          {pill}
        </span>
      )}
    </div>
  );
}

function ExampleCard({ title, description, selected, compact = false, children }) {
  return (
    <div className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm space-y-3">
      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-default-700">
          {title}
        </p>
        {description && (
          <p className="text-[11px] text-gray-default-500">{description}</p>
        )}
      </div>

      <div>{children}</div>

      {!compact && (
        <p className="text-xs text-gray-default-600">
          Selected:{" "}
          <span className="font-mono text-primary-950-dark">
            {selected || "—"}
          </span>
        </p>
      )}
    </div>
  );
}
