"use client";

import React, { useState } from "react";
import Tag from "@/components/Tag";

export default function Page() {
  const [removableTags, setRemovableTags] = useState([
    "Frontend",
    "UI/UX",
    "React",
  ]);

  const handleRemove = (label) => {
    setRemovableTags((prev) => prev.filter((t) => t !== label));
  };

  return (
    <div className="rounded-2xl bg-layout-background p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ================= HEADER ================= */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Tag
          </h1>
          <p className="text-sm text-gray-default-600 max-w-2xl">
            Compact label component useful for filters, chips, tokens, and
            selected states. Supports different sizes, radii, colors and
            optional remove action.
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
                &lt;Tag /&gt;
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
                  <code>label</code> – text inside the tag
                </li>
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> –{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>"light" | "gray" | "dark"</code>
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
                  <code>onRemove</code> – optional callback for close button;
                  if provided, a close icon is rendered
                </li>
              </ul>
            </div>

            {/* Misc */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Misc
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>className</code> – extra classes for the outer wrapper
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= 1️⃣ COLORS & SIZES ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Colors & Sizes"
            subtitle="Combine the color, size and radius props for different visual densities."
            pill="props: color, size, radius"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Light */}
            <DemoBlock title='color="light"'>
              <Tag label="Light · sm" size="sm" radius="sm" color="light" />
              <Tag label="Light · md" size="md" radius="md" color="light" />
              <Tag label="Light · lg" size="lg" radius="full" color="light" />
            </DemoBlock>

            {/* Gray */}
            <DemoBlock title='color="gray"'>
              <Tag label="Gray · sm" size="sm" radius="sm" color="gray" />
              <Tag label="Gray · md" size="md" radius="md" color="gray" />
              <Tag label="Gray · lg" size="lg" radius="full" color="gray" />
            </DemoBlock>

            {/* Dark */}
            <DemoBlock title='color="dark"'>
              <Tag label="Dark · sm" size="sm" radius="sm" color="dark" />
              <Tag label="Dark · md" size="md" radius="md" color="dark" />
              <Tag label="Dark · lg" size="lg" radius="full" color="dark" />
            </DemoBlock>
          </div>
        </section>

        {/* ================= 2️⃣ RADIUS ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Radius"
            subtitle="Control how rounded the tag container appears."
            pill='props: radius="none | sm | md | lg | full"'
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <RadiusCard label='radius="none"'>
              <Tag label="None" radius="none" size="md" color="light" />
            </RadiusCard>
            <RadiusCard label='radius="sm"'>
              <Tag label="Small" radius="sm" size="md" color="light" />
            </RadiusCard>
            <RadiusCard label='radius="md"'>
              <Tag label="Medium" radius="md" size="md" color="light" />
            </RadiusCard>
            <RadiusCard label='radius="lg"'>
              <Tag label="Large" radius="lg" size="md" color="light" />
            </RadiusCard>
            <RadiusCard label='radius="full"'>
              <Tag label="Full" radius="full" size="md" color="light" />
            </RadiusCard>
          </div>
        </section>

        {/* ================= 3️⃣ REMOVABLE TAGS ================= */}
        <section className="space-y-4 mb-6">
          <SectionHeader
            title="Removable Tags"
            subtitle="Use onRemove to render a close icon and remove tags from a list."
            pill="props: label, onRemove"
          />

          <div className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm space-y-4">
            <p className="text-xs text-gray-default-600">
              Click the cross icon to remove a tag.
            </p>

            <div className="flex flex-wrap gap-2">
              {removableTags.length === 0 ? (
                <span className="text-xs text-gray-default-500">
                  All tags removed.
                </span>
              ) : (
                removableTags.map((tag) => (
                  <Tag
                    key={tag}
                    label={tag}
                    color="gray"
                    radius="full"
                    size="md"
                    onRemove={() => handleRemove(tag)}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============== Small helper components ============== */

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

function DemoBlock({ title, children }) {
  return (
    <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-4 shadow-sm space-y-3">
      <p className="text-xs font-medium text-gray-default-700">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function RadiusCard({ label, children }) {
  return (
    <div className="rounded-xl bg-content-content1 border border-gray-default-200 p-3 shadow-sm space-y-2">
      <p className="text-[11px] font-medium text-gray-default-600">{label}</p>
      {children}
    </div>
  );
}
