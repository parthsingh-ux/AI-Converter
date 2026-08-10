"use client";

import React from "react";
import { DatePicker } from "@heroui/react";
import {Calendar} from "@heroui/react";
import {parseDate} from "@internationalized/date";


export default function DatePickerShowcase() {
  const variants = ["flat", "bordered", "underlined", "faded"];
  const placements = ["inside", "outside", "outside-left"];
    let [value, setValue] = React.useState(parseDate("2024-03-07"));


  return (
    <div className="w-full rounded-2xl bg-gray-50 p-6">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            DatePicker Showcase
          </h1>
          <p className="text-sm text-gray-600">
            Explore different visual variants and label placements for the date
            picker component.
          </p>
        </header>

        {/* Variants Section */}
        <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Variants</h2>
          <p className="text-xs text-gray-500 mb-4">
            Try out flat, bordered, underlined and faded styles.
          </p>

          <div className="w-full flex flex-col gap-4">
            {variants.map((variant) => (
              <div
                key={variant}
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
              >
                <DatePicker label={"Birth date"} variant={variant} />
              </div>
            ))}
          </div>
        </section>

        {/* Label Placement Section */}
        <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Label placement
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Control how the label is placed relative to the input field.
          </p>

          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                  {placements.map((placement) => (
                    <DatePicker
                      key={placement}
                      className="max-w-[284px]"
                      description={placement}
                      label={"Birth date"}
                      labelPlacement={placement}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Calander</h2>
          <p className="text-xs text-gray-500 mb-4"></p>

          <div className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Calendar aria-label="Date (Controlled)" value={value} onChange={setValue} />;
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
