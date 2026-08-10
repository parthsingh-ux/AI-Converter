"use client";

import React from "react";
import NumberInput from "@/components/NumberInput";

export default function NumberInputPlaygroundPage() {
  return (
    <main className="rounded-2xl bg-content-content1 text-primary-950-dark p-6">
      <div className="space-y-10 max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="space-y-3">
          
          <h1 className="text-3xl font-semibold tracking-tight">
            Number Input playground
          </h1>
          <p className="text-sm text-gray-default-600 max-w-xl">
            A numeric input component with size, radius, color variants and
            horizontal / vertical arrow controls.
          </p>
        </header>

        {/* ==================== PROPS OVERVIEW ==================== */}
        <section className="rounded-2xl border border-gray-default-200 bg-white/80 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;NumberInput /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Core
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>title</code> – label text above input
                </li>
                <li>
                  <code>description</code> – small helper text under label
                </li>
                <li>
                  <code>helperText</code> – helper or status text below field
                </li>
                <li>
                  <code>required</code> – show required asterisk
                </li>
                <li>
                  <code>range</code> – <code>[min, max]</code> numeric range
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Appearance
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> –{" "}
                  <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> –{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>color</code> –{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "default"
                  </code>
                </li>
                <li>
                  <code>variant</code> –{" "}
                  <code>
                    "flat" | "faded" | "outlined" | "underlined" | "shadow"
                  </code>
                </li>
                <li>
                  <code>className</code> – extra wrapper classes
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>orientation</code> –{" "}
                  <code>"vertical" | "horizontal"</code>
                </li>
                <li>
                  <code>value</code> – controlled numeric value
                </li>
                <li>
                  <code>defaultValue</code> – initial uncontrolled value
                </li>
                <li>
                  <code>onChange</code> – callback when value changes
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SIZES */}
        <section className="bg-white border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Sizes</h2>
              <p className="text-sm text-gray-default-600">
                Use the{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  size
                </code>{" "}
                prop to switch between <b>sm</b>, <b>md</b>, and <b>lg</b>.
              </p>
            </div>
            <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-gray-default-100 text-gray-default-700">
              props: size
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3 pt-2">
            <NumberInput
              title="Small"
              description="Size: sm"
              size="sm"
              radius="none"
              range={[1, 10]}
              helperText="Helper text"
            />
            <NumberInput
              title="Medium"
              description="Size: md"
              size="md"
              radius="none"
              range={[1, 10]}
              helperText="Helper text"
            />
            <NumberInput
              title="Large"
              description="Size: lg"
              size="lg"
              radius="none"
              range={[1, 10]}
              helperText="Helper text"
            />
          </div>
        </section>

        {/* RADIUS */}
        <section className="bg-white border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Radius</h2>
              <p className="text-sm text-gray-default-600">
                Use the{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  radius
                </code>{" "}
                prop to control the rounding of the input container.
              </p>
            </div>
            <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-gray-default-100 text-gray-default-700">
              props: radius
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-5 pt-2">
            <NumberInput
              title="Radius none"
              description="rounded-none"
              radius="none"
              range={[1, 10]}
            />
            <NumberInput
              title="Radius sm"
              description="rounded-md"
              radius="sm"
              range={[1, 10]}
            />
            <NumberInput
              title="Radius md"
              description="rounded-lg"
              radius="md"
              range={[1, 10]}
            />
            <NumberInput
              title="Radius lg"
              description="rounded-2xl"
              radius="lg"
              range={[1, 10]}
            />
            <NumberInput
              title="Radius full"
              description="rounded-full"
              radius="full"
              range={[1, 10]}
            />
          </div>
        </section>

        {/* VARIANTS */}
        <section className="bg-white border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Variants</h2>
              <p className="text-sm text-gray-default-600">
                Combine{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  color
                </code>{" "}
                and{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  variant
                </code>{" "}
                to achieve different visual styles.
              </p>
            </div>
            <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-gray-default-100 text-gray-default-700">
              props: color, variant
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-2">
            <NumberInput
              title="Flat"
              description="color='default' variant='flat'"
              color="default"
              radius="none"
              variant="flat"
              range={[1, 5]}
            />
            <NumberInput
              title="Faded"
              description="color='default' variant='faded'"
              color="default"
              radius="none"
              variant="faded"
              range={[1, 5]}
            />
            <NumberInput
              title="Outlined"
              description="color='default' variant='outlined'"
              color="default"
              radius="none"
              variant="outlined"
              range={[1, 5]}
            />
            <NumberInput
              title="Underlined"
              description="color='default' variant='underlined'"
              color="default"
              radius="none"
              variant="underlined"
              range={[1, 5]}
            />
            <NumberInput
              title="Shadow"
              description="color='default' variant='shadow'"
              color="default"
              radius="none"
              variant="shadow"
              range={[1, 5]}
            />
          </div>
        </section>

        {/* COLORS – FADED + RADIUS NONE */}
        <section className="bg-white border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">
                Colors (faded · radius none)
              </h2>
              <p className="text-sm text-gray-default-600">
                Each example uses{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  variant="faded"
                </code>{" "}
                and{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  radius="none"
                </code>
                .
              </p>
            </div>
            <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-gray-default-100 text-gray-default-700">
              props: color="*", variant="faded"
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-2">
            <NumberInput
              title="Primary"
              description="color='primary'"
              color="primary"
              radius="none"
              variant="faded"
              range={[1, 10]}
            />
            <NumberInput
              title="Success"
              description="color='success'"
              color="success"
              radius="none"
              variant="faded"
              range={[1, 10]}
            />
            <NumberInput
              title="Secondary"
              description="color='secondary'"
              color="secondary"
              radius="none"
              variant="faded"
              range={[1, 10]}
            />
            <NumberInput
              title="Warning"
              description="color='warning'"
              color="warning"
              radius="none"
              variant="faded"
              range={[1, 10]}
            />
            <NumberInput
              title="Default"
              description="color='default'"
              color="default"
              radius="none"
              variant="faded"
              range={[1, 10]}
            />
            <NumberInput
              title="Danger"
              description="color='danger'"
              color="danger"
              radius="none"
              variant="faded"
              range={[1, 10]}
            />
          </div>
        </section>

        {/* HORIZONTAL / VERTICAL */}
        <section className="bg-white border border-gray-default-200 rounded-2xl shadow-sm p-6 space-y-4 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Horizontal / Vertical</h2>
              <p className="text-sm text-gray-default-600">
                Switch the arrow layout using the{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  orientation
                </code>{" "}
                prop.
              </p>
            </div>
            <span className="hidden md:inline-flex text-xs px-2 py-1 rounded-full bg-gray-default-100 text-gray-default-700">
              props: orientation
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <NumberInput
              title="Vertical"
              description="Up / down controls (like classic number input)"
              orientation="vertical"
              range={[1, 10]}
            />
            <NumberInput
              title="Horizontal"
              description="Left / right controls (like in the first mockup)"
              orientation="horizontal"
              range={[1, 10]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
