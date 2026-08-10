"use client";

import React, { useState } from "react";
import Tabs from "@/components/Tabs";

const items = ["World", "N.Y", "Business", "Arts", "Science"];

export default function Page() {
  const [selected, setSelected] = useState("World"); // controlled example

  return (
    <div className="rounded-2xl bg-layout-background p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ================= HEADER ================= */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Tabs
          </h1>
          <p className="text-sm text-gray-default-600 max-w-2xl">
            Flexible tab navigation supporting multiple variants, colors, sizes,
            and layouts. Works in both controlled and uncontrolled modes.
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
                &lt;Tabs /&gt;
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
                  <code>items</code> – array of tab labels
                </li>
                <li>
                  <code>value</code> – controlled active tab
                </li>
                <li>
                  <code>defaultValue</code> – initial tab (uncontrolled)
                </li>
                <li>
                  <code>onChange</code> – callback when tab changes
                </li>
              </ul>
            </div>

            {/* Style */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Style
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>variant</code> –{" "}
                  <code>"solid" | "underlined" | "bordered" | "light"</code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "default"
                  </code>
                </li>
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> –{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>fullWidth</code> – make tabs expand equally
                </li>
              </ul>
            </div>

            {/* Behavior */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior & Misc
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isDisabled</code> – disable all interaction
                </li>
                <li>
                  <code>animation</code> –{" "}
                  <code>"smooth" | "none"</code> for transitions
                </li>
                <li>
                  <code>className</code> – extra container classes
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= 1️⃣ VARIANTS ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Variants"
            subtitle='Tabs in different visual styles using the "variant" prop.'
            pill="props: variant, color, radius, size, onChange"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Solid */}
            <VariantCard label='variant="solid" (controlled)'>
              <Tabs
                items={items}
                variant="solid"
                color="primary"
                radius="sm"
                size="md"
                value={selected}
                onChange={setSelected}
              />
              <p className="mt-2 text-xs text-gray-default-600">
                Selected tab:{" "}
                <span className="font-semibold text-primary-700">
                  {selected}
                </span>
              </p>
            </VariantCard>

            {/* Underlined */}
            <VariantCard label='variant="underlined"'>
              <Tabs
                items={items}
                variant="underlined"
                color="primary"
                radius="sm"
                size="md"
                defaultValue="Business"
              />
            </VariantCard>

            {/* Bordered */}
            <VariantCard label='variant="bordered"'>
              <Tabs
                items={items}
                variant="bordered"
                color="primary"
                radius="md"
                size="md"
              />
            </VariantCard>

            {/* Light */}
            <VariantCard label='variant="light"'>
              <Tabs
                items={items}
                variant="light"
                color="primary"
                radius="full"
                size="md"
              />
            </VariantCard>
          </div>
        </section>

        {/* ================= 2️⃣ COLORS PER VARIANT ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Colors per Variant"
            subtitle='Each variant supports semantic colors via the "color" prop.'
            pill="props: color, variant"
          />

          {/* SOLID */}
          <SubTitle>variant="solid"</SubTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["primary", "secondary", "success", "warning", "danger", "default"].map(
              (c) => (
                <DemoCard key={`solid-${c}`} label={`color="${c}"`}>
                  <Tabs
                    variant="solid"
                    color={c}
                    radius="sm"
                    size="md"
                    items={items}
                  />
                </DemoCard>
              )
            )}
          </div>

          {/* UNDERLINED */}
          <SubTitle className="mt-6">variant="underlined"</SubTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["primary", "secondary", "success", "warning", "danger", "default"].map(
              (c) => (
                <DemoCard key={`underline-${c}`} label={c}>
                  <Tabs variant="underlined" color={c} items={items} />
                </DemoCard>
              )
            )}
          </div>

          {/* BORDERED */}
          <SubTitle className="mt-6">variant="bordered"</SubTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["primary", "secondary", "success", "warning", "danger", "default"].map(
              (c) => (
                <DemoCard key={`bordered-${c}`} label={c}>
                  <Tabs variant="bordered" color={c} items={items} />
                </DemoCard>
              )
            )}
          </div>

          {/* LIGHT */}
          <SubTitle className="mt-6">variant="light"</SubTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["primary", "secondary", "success", "warning", "danger", "default"].map(
              (c) => (
                <DemoCard key={`light-${c}`} label={c}>
                  <Tabs variant="light" color={c} items={items} />
                </DemoCard>
              )
            )}
          </div>
        </section>

        {/* ================= 3️⃣ RADIUS ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Radius"
            subtitle='Use the "radius" prop to control how rounded the tabs are.'
            pill='props: radius, variant="solid"'
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {["none", "sm", "md", "lg", "full"].map((r) => (
              <DemoCard key={r} label={`radius="${r}"`}>
                <Tabs
                  variant="solid"
                  color="primary"
                  radius={r}
                  items={items}
                />
              </DemoCard>
            ))}
          </div>
        </section>

        {/* ================= 4️⃣ SIZES ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Sizes"
            subtitle='Adjust padding and font size using the "size" prop.'
            pill='props: size, variant="solid"'
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DemoCard label='size="sm"'>
              <Tabs variant="solid" color="primary" size="sm" items={items} />
            </DemoCard>
            <DemoCard label='size="md"'>
              <Tabs variant="solid" color="primary" size="md" items={items} />
            </DemoCard>
            <DemoCard label='size="lg"'>
              <Tabs variant="solid" color="primary" size="lg" items={items} />
            </DemoCard>
          </div>
        </section>

        {/* ================= 5️⃣ BEHAVIOR & LAYOUT ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Behavior & Layout"
            subtitle="Examples for fullWidth, disabled and animation."
            pill="props: fullWidth, isDisabled, animation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* fullWidth + animation smooth */}
            <DemoCard label='fullWidth={true} · animation="smooth"'>
              <Tabs
                items={items}
                variant="solid"
                color="primary"
                fullWidth
                animation="smooth"
              />
            </DemoCard>

            {/* fullWidth + animation none */}
            <DemoCard label='fullWidth={true} · animation="none"'>
              <Tabs
                items={items}
                variant="underlined"
                color="primary"
                fullWidth
                animation="none"
              />
            </DemoCard>

            {/* Disabled */}
            <DemoCard label="Disabled (all variants)">
              <div className="space-y-3">
                <Tabs
                  variant="solid"
                  color="primary"
                  isDisabled
                  items={items}
                />
                <Tabs
                  variant="underlined"
                  color="primary"
                  isDisabled
                  items={items}
                />
                <Tabs
                  variant="bordered"
                  color="primary"
                  isDisabled
                  items={items}
                />
                <Tabs
                  variant="light"
                  color="primary"
                  isDisabled
                  items={items}
                />
              </div>
            </DemoCard>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- small helpers ---------- */

function SectionHeader({ title, subtitle, pill }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-sm font-semibold text-primary-950-dark">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-default-600 mt-1">{subtitle}</p>
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

function VariantCard({ label, children }) {
  return (
    <div className="bg-content-content1 p-5 rounded-2xl shadow-sm border border-gray-default-200 space-y-2">
      <p className="text-xs font-medium text-gray-default-700">{label}</p>
      {children}
    </div>
  );
}

function DemoCard({ label, children }) {
  return (
    <div className="bg-content-content1 p-5 rounded-2xl shadow-sm border border-gray-default-200 space-y-3">
      <p className="text-xs font-medium text-gray-default-700">{label}</p>
      {children}
    </div>
  );
}

function SubTitle({ children, className = "" }) {
  return (
    <h3
      className={`text-xs font-semibold text-gray-default-700 uppercase tracking-wide ${className}`}
    >
      {children}
    </h3>
  );
}
