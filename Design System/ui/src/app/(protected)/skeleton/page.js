"use client";

import React, { useState } from "react";
import Skeleton from "@/components/Skeleton";

export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="rounded-2xl bg-gray-default-50 p-8 space-y-12">

      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold text-primary-950-dark">Skeleton</h1>
        <p className="text-sm text-gray-default-600 mt-1">
          Lightweight placeholder component for loading states. Supports wrapper mode,
          multiple shapes, animations, and fully customizable sizing.
        </p>
      </header>

      {/* ===================================================== */}
      {/* PROPS OVERVIEW */}
      {/* ===================================================== */}

      <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mt-1 text-sm text-gray-default-600">
            Core props for{" "}
            <code className="rounded bg-gray-default-100 px-1 text-xs">
              &lt;Skeleton /&gt;
            </code>{" "}
            component.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-gray-default-700">

          {/* Core */}
          <div>
            <h3 className="mb-1 font-semibold text-primary-950-dark">
              Core
            </h3>
            <ul className="space-y-1">
              <li><code>variant</code> — “basic | pulse | shine | glow | soft”</li>
              <li><code>className</code> — width, height, borderRadius</li>
              <li><code>as</code> — HTML element (“div”, “span”, etc.)</li>
              <li><code>children</code> — real content (wrapper mode)</li>
            </ul>
          </div>

          {/* State */}
          <div>
            <h3 className="mb-1 font-semibold text-primary-950-dark">
              State
            </h3>
            <ul className="space-y-1">
              <li><code>loading</code> — toggles between skeleton & real UI</li>
            </ul>
          </div>

          {/* Misc */}
          <div>
            <h3 className="mb-1 font-semibold text-primary-950-dark">
              Misc
            </h3>
            <ul className="space-y-1">
              <li><code>style</code> — inline styles</li>
              <li><code>...rest</code> — forwarded attributes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* VARIANTS */}
      {/* ===================================================== */}

      <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Variants
            </h2>
            <p className="text-sm text-gray-default-600">
              Five preset visual variants for skeleton animations.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-8">

          {/* Basic */}
          <VariantBlock title="Basic">
            <Skeleton variant="basic" className="h-20 w-full rounded-xl" />
            <Skeleton variant="basic" className="h-4 w-32 rounded-md" />
          </VariantBlock>

          {/* Pulse */}
          <VariantBlock title="Pulse">
            <Skeleton variant="pulse" className="h-20 w-full rounded-xl" />
            <Skeleton variant="pulse" className="h-4 w-32 rounded-md" />
          </VariantBlock>

          {/* Shine */}
          <VariantBlock title="Shine">
            <Skeleton variant="shine" className="h-20 w-full rounded-xl" />
            <Skeleton variant="shine" className="h-4 w-32 rounded-md" />
          </VariantBlock>

          {/* Glow */}
          <VariantBlock title="Glow">
            <Skeleton variant="glow" className="h-20 w-full rounded-xl" />
            <Skeleton variant="glow" className="h-4 w-32 rounded-md" />
          </VariantBlock>

          {/* Soft */}
          <VariantBlock title="Soft">
            <Skeleton variant="soft" className="h-20 w-full rounded-xl" />
            <Skeleton variant="soft" className="h-4 w-32 rounded-md" />
          </VariantBlock>

        </div>
      </section>

      {/* ===================================================== */}
      {/* BASIC USAGE */}
      {/* ===================================================== */}

      <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-primary-950-dark">
          Basic Usage
        </h2>

        <div className="flex flex-col space-y-3">
          <Skeleton variant="pulse" className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton variant="pulse" className="h-4 w-[250px]" />
            <Skeleton variant="pulse" className="h-4 w-[200px]" />
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* WRAPPER MODE DEMO */}
      {/* ===================================================== */}

      <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Wrapper Mode
          </h2>

          <button
            onClick={() => setLoading(!loading)}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            {loading ? "Show Content" : "Show Skeleton"}
          </button>
        </div>

        <Skeleton loading={loading} variant="shine" className="rounded-2xl">
          <div className="p-6 bg-white rounded-2xl shadow space-y-4 w-80">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/80"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">Jane Doe</h2>
                <p className="text-gray-default-600 text-sm">
                  UI/UX Designer
                </p>
              </div>
            </div>

            <p className="text-gray-default-700">
              The dynamic skeleton copies this layout automatically.
            </p>

            <button className="px-4 py-2 bg-primary text-white rounded-xl">
              Follow
            </button>
          </div>
        </Skeleton>
      </section>

      {/* ===================================================== */}
      {/* TEXT BLOCKS */}
      {/* ===================================================== */}

      <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-primary-950-dark">
          Text Blocks
        </h2>

        <div className="space-y-3 w-[600px]">
          <Skeleton variant="basic" className="h-7 w-56 rounded-md" />
          <Skeleton variant="basic" className="h-4 w-full rounded-md" />
          <Skeleton variant="basic" className="h-4 w-[80%] rounded-md" />
          <Skeleton variant="basic" className="h-4 w-[70%] rounded-md" />
        </div>
      </section>
    </main>
  );
}

/* --- Reusable block for variants --- */
function VariantBlock({ title, children }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-default-700">{title}</h4>
      {children}
    </div>
  );
}
