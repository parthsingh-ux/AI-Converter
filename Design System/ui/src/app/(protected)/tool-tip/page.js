"use client";

import React from "react";
import Tooltip from "@/components/Tooltip";
import Button from "@/components/Button";
import { Icon } from "@iconify/react";

export default function Page() {
  return (
    <div className="rounded-2xl bg-gray-default-50 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">Tooltip</h1>
          <p className="text-sm text-gray-default-600 max-w-xl">
            A contextual label that provides extra information on hover.
          </p>
        </header>

        {/* ================= PROPS SECTION ================= */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-default-700">

            {/* CORE */}
            <div className="space-y-1">
              <h3 className="font-semibold text-primary-950-dark mb-1">Core</h3>
              <p><code>label</code> – string | ReactNode</p>
              <p><code>color</code> – primary, secondary, success, warning, danger, neutral, default</p>
              <p><code>size</code> – sm, md, lg</p>
              <p><code>radius</code> – none, sm, md, lg, full</p>
            </div>

            {/* POSITIONING */}
            <div className="space-y-1">
              <h3 className="font-semibold text-primary-950-dark mb-1">Positioning</h3>
              <p><code>arrowDirection</code> – top, right, bottom, left</p>
              <p><code>arrowPosition</code> – start, center, end</p>
            </div>

            {/* EXTRAS */}
            <div className="space-y-1">
              <h3 className="font-semibold text-primary-950-dark mb-1">Other</h3>
              <p><code>textColor</code> – custom text override</p>
              <p><code>className</code> – additional class</p>
            </div>
          </div>
        </section>

        {/* ================= EXAMPLE ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Example"
            description="A tooltip attached to a button, appearing on hover."
          />

          <div className="rounded-2xl bg-white border border-gray-default-200 p-6">
            <div className="inline-flex relative group">
              <Button size="md" variant="solid" color="primary" radius="sm">
                <Icon icon="lucide:download" width={16} height={16} className="mr-2" />
                Download
              </Button>

              {/* Tooltip below */}
              <div className="
                pointer-events-none absolute top-full mt-2 
                opacity-0 -translate-y-1
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-200
              ">
                <Tooltip
                  label="Download latest report"
                  color="secondary"
                  arrowDirection="bottom"
                  arrowPosition="center"
                  size="sm"
                  radius="full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= COLORS ================= */}
        <section className="space-y-4">
          <SectionHeader title="Colors" description="Hardcoded color variants" />

          <div className="rounded-2xl bg-white border border-gray-default-200 p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
              <div>
                <Tooltip color="primary" label="Tooltip" />
                <p className="text-[11px] text-gray-default-500 mt-1">primary</p>
              </div>
              <div>
                <Tooltip color="secondary" label="Tooltip" />
                <p className="text-[11px] text-gray-default-500 mt-1">secondary</p>
              </div>
              <div>
                <Tooltip color="success" label="Tooltip" />
                <p className="text-[11px] text-gray-default-500 mt-1">success</p>
              </div>
              <div>
                <Tooltip color="warning" label="Tooltip" />
                <p className="text-[11px] text-gray-default-500 mt-1">warning</p>
              </div>
              <div>
                <Tooltip color="danger" label="Tooltip" />
                <p className="text-[11px] text-gray-default-500 mt-1">danger</p>
              </div>
              <div>
                <Tooltip color="neutral" label="Tooltip" />
                <p className="text-[11px] text-gray-default-500 mt-1">neutral</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARROW DIRECTIONS ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Arrow Direction"
            description="Control where the arrow is placed"
          />

          <div className="rounded-2xl bg-white border border-gray-default-200 p-6 space-y-6">

            {/* TOP */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-default-500 w-20">top</span>
              <Tooltip arrowDirection="top" arrowPosition="start" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="top" arrowPosition="center" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="top" arrowPosition="end" color="primary" label="Tooltip" />
            </div>

            {/* RIGHT */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-default-500 w-20">right</span>
              <Tooltip arrowDirection="right" arrowPosition="start" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="right" arrowPosition="center" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="right" arrowPosition="end" color="primary" label="Tooltip" />
            </div>

            {/* LEFT */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-default-500 w-20">left</span>
              <Tooltip arrowDirection="left" arrowPosition="start" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="left" arrowPosition="center" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="left" arrowPosition="end" color="primary" label="Tooltip" />
            </div>

            {/* BOTTOM */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-default-500 w-20">bottom</span>
              <Tooltip arrowDirection="bottom" arrowPosition="start" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="bottom" arrowPosition="center" color="primary" label="Tooltip" />
              <Tooltip arrowDirection="bottom" arrowPosition="end" color="primary" label="Tooltip" />
            </div>

          </div>
        </section>

        {/* ================= SIZE & RADIUS ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Size & Radius"
            description="Padding + corner styles"
          />

          <div className="rounded-2xl bg-white border border-gray-default-200 p-6 space-y-6">

            {/* SIZE sm */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-default-500 w-20">size: sm</span>
              <Tooltip size="sm" radius="none" color="primary" label="Tooltip" />
              <Tooltip size="sm" radius="sm" color="primary" label="Tooltip" />
              <Tooltip size="sm" radius="md" color="primary" label="Tooltip" />
              <Tooltip size="sm" radius="lg" color="primary" label="Tooltip" />
              <Tooltip size="sm" radius="full" color="primary" label="Tooltip" />
            </div>

            {/* SIZE md */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-default-500 w-20">size: md</span>
              <Tooltip size="md" radius="none" color="primary" label="Tooltip" />
              <Tooltip size="md" radius="sm" color="primary" label="Tooltip" />
              <Tooltip size="md" radius="md" color="primary" label="Tooltip" />
              <Tooltip size="md" radius="lg" color="primary" label="Tooltip" />
              <Tooltip size="md" radius="full" color="primary" label="Tooltip" />
            </div>

            {/* SIZE lg */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-default-500 w-20">size: lg</span>
              <Tooltip size="lg" radius="none" color="primary" label="Tooltip" />
              <Tooltip size="lg" radius="sm" color="primary" label="Tooltip" />
              <Tooltip size="lg" radius="md" color="primary" label="Tooltip" />
              <Tooltip size="lg" radius="lg" color="primary" label="Tooltip" />
              <Tooltip size="lg" radius="full" color="primary" label="Tooltip" />
            </div>

          </div>
        </section>

        {/* ================= TEXT COLOR OVERRIDE ================= */}
        <section className="space-y-4">
          <SectionHeader
            title="Custom Text Color"
            description="Use `textColor` to override text color."
          />

          <div className="rounded-2xl bg-white border border-gray-default-200 p-6">
            <Tooltip
              label="Custom pink text"
              color="default"
              textColor="#e11d48"
              size="md"
              radius="full"
            />
          </div>
        </section>

      </div>
    </div>
  );
}

function SectionHeader({ title, description }) {
  return (
    <div className="space-y-1">
      <h2 className="text-sm font-semibold text-primary-950-dark">{title}</h2>
      {description && (
        <p className="text-xs text-gray-default-600 max-w-xl">{description}</p>
      )}
    </div>
  );
}
