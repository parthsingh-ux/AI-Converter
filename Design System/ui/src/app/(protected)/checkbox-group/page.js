"use client";

import React from "react";
import Checkbox, { CheckboxGroup } from "@/components/Checkbox";

const CheckboxPage = () => {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Checkbox Group Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Examples of different checkbox layouts using{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;CheckboxGroup /&gt;
            </code>{" "}
            with vertical and horizontal orientations.
          </p>
        </header>

        {/* PROPS OVERVIEW (small, focused on group props) */}
        <section className="mb-8 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            CheckboxGroup Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            The examples below mainly demonstrate layout props on{" "}
            <code className="rounded bg-gray-default-100 px-1 text-xs">
              CheckboxGroup
            </code>.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-2">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>orientation</code> —{" "}
                  <code>"vertical" | "horizontal"</code>
                </li>
                <li>
                  <code>className</code> — extra Tailwind classes for layout
                </li>
                <li>
                  Children are standard{" "}
                  <code className="bg-gray-default-100 px-1 rounded">
                    &lt;Checkbox /&gt;
                  </code>{" "}
                  components.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Checkbox (used inside)
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>color</code> — semantic variant (default, primary, etc.)
                </li>
                <li>
                  <code>radius</code> — border radius (e.g. rounded-none)
                </li>
                <li>
                  <code>lineThrough</code> — label line-through when checked
                </li>
                <li>
                  <code>isDisabled</code> — disable that checkbox
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* MAIN SECTION: VERTICAL vs HORIZONTAL */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Group Orientation
              </h2>
              <p className="text-xs text-gray-default-600">
                Compare{" "}
                <code className="bg-gray-default-100 px-1 rounded text-[10px]">
                  orientation="vertical"
                </code>{" "}
                and{" "}
                <code className="bg-gray-default-100 px-1 rounded text-[10px]">
                  orientation="horizontal"
                </code>{" "}
                layouts for checkbox groups.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
            {/* VERTICAL */}
            <div className="border border-gray-default-200 rounded-xl p-4 bg-gray-default-50/60">
              <h3 className="text-[11px] font-semibold text-gray-default-600 mb-3 uppercase tracking-wide">
                Vertical
              </h3>
              <CheckboxGroup orientation="vertical">
                <Checkbox color="default" radius="rounded-none">
                  Checkbox
                </Checkbox>
                <Checkbox color="default" radius="rounded-none" lineThrough>
                  Line-through
                </Checkbox>
                <Checkbox color="default" radius="rounded-none" isDisabled>
                  Disabled
                </Checkbox>
              </CheckboxGroup>
            </div>

            {/* HORIZONTAL */}
            <div className="border border-gray-default-200 rounded-xl p-4 bg-gray-default-50/60">
              <h3 className="text-[11px] font-semibold text-gray-default-600 mb-3 uppercase tracking-wide">
                Horizontal
              </h3>
              <CheckboxGroup orientation="horizontal">
                <Checkbox color="default" radius="rounded-none">
                  Checkbox
                </Checkbox>
                <Checkbox color="default" radius="rounded-none" lineThrough>
                  Line-through
                </Checkbox>
                <Checkbox color="default" radius="rounded-none" isDisabled>
                  Disabled
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckboxPage;
