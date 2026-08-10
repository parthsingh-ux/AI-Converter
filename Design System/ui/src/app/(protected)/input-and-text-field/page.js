"use client";

import React from "react";
import TextField from "@/components/InputAndTextField";

export default function TextFieldShowcasePage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* PAGE HEADER */}
        <header className="space-y-3">


          <h1 className="text-3xl font-semibold tracking-tight">
            Input &amp; Text Field showcase
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            A single{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;TextField /&gt;
            </code>{" "}
            component that supports variants, semantic colors, sizes, label
            placements, validation states, multiline and password mode.
          </p>
        </header>

        {/* ================= PROPS OVERVIEW ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props overview
          </h2>
          <p className="text-sm text-gray-default-600">
            Core props supported by the{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;TextField /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Visual
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>variant</code> —{" "}
                  <code>"flat" | "faded" | "bordered" | "underlined"</code>
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "neutral" | "primary" | "secondary" | "success" | "warning"
                    | "danger"
                  </code>
                </li>
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                  <span className="text-gray-default-500">
                    {" "}
                    (ignored for underlined)
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout &amp; labels
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>fullWidth</code> — stretch to parent width
                </li>
                <li>
                  <code>label</code> — small label text
                </li>
                <li>
                  <code>labelPlacement</code> —{" "}
                  <code>"outside" | "inside" | "outside-left"</code>
                </li>
                <li>
                  <code>isMultiline</code> — render{" "}
                  <code>{`<textarea>`}</code> instead of{" "}
                  <code>{`<input>`}</code>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior &amp; value
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>validationBehavior</code> —{" "}
                  <code>"none" | "valid" | "invalid"</code>
                </li>
                <li>
                  <code>isPassword</code> — masks value with dots
                </li>
                <li>
                  <code>value</code> / <code>defaultValue</code> — controlled or
                  uncontrolled
                </li>
                <li>
                  <code>isDisabled</code> — disables editing
                </li>
                <li>
                  <code>onChange(nextValue)</code> — fired on input change
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= VARIANTS ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Variants
              </h2>
              <p className="text-sm text-gray-default-600">
                Controlled by{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  variant
                </code>{" "}
                — <b>flat</b>, <b>faded</b>, <b>bordered</b> and{" "}
                <b>underlined</b>.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: variant, label
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-gray-default-500">
                flat
              </span>
              <TextField variant="flat" label="Input text" />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-gray-default-500">
                faded
              </span>
              <TextField variant="faded" label="Input text" />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-gray-default-500">
                bordered
              </span>
              <TextField variant="bordered" label="Input text" />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-gray-default-500">
                underlined
              </span>
              <TextField variant="underlined" label="Input text" />
            </div>
          </div>
        </section>

        {/* ================= SIZES ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Sizes
              </h2>
              <p className="text-sm text-gray-default-600">
                Controlled by{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  size
                </code>{" "}
                — <b>sm</b>, <b>md</b> and <b>lg</b>.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: size
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">size="sm"</p>
              <TextField size="sm" label="Small" variant="bordered" />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">size="md"</p>
              <TextField size="md" label="Medium" variant="bordered" />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">size="lg"</p>
              <TextField size="lg" label="Large" variant="bordered" />
            </div>
          </div>
        </section>

        {/* ================= COLORS ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Colors &amp; variants
              </h2>
              <p className="text-sm text-gray-default-600">
                Combine{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  color
                </code>{" "}
                with any{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  variant
                </code>
                .
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: color, variant
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {["primary", "secondary", "success", "warning", "danger", "neutral"].map(
              (color) => (
                <div
                  key={color}
                  className="space-y-2 rounded-2xl border border-gray-default-100 p-3"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    color="{color}"
                  </p>
                  <TextField color={color} variant="bordered" label="Bordered" />
                  <TextField color={color} variant="flat" label="Flat" />
                  <TextField color={color} variant="faded" label="Faded" />
                  <TextField
                    color={color}
                    variant="underlined"
                    label="Underlined"
                  />
                </div>
              )
            )}
          </div>
        </section>

        {/* ================= RADIUS ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Radius
              </h2>
              <p className="text-sm text-gray-default-600">
                Control rounding with{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  radius
                </code>
                . Not applied for the{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  underlined
                </code>{" "}
                variant.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: radius
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            <TextField radius="none" variant="bordered" label="none" />
            <TextField radius="sm" variant="bordered" label="sm" />
            <TextField radius="md" variant="bordered" label="md" />
            <TextField radius="lg" variant="bordered" label="lg" />
            <TextField radius="full" variant="bordered" label="full" />
          </div>
        </section>

        {/* ================= LABEL PLACEMENT ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Label placement
              </h2>
              <p className="text-sm text-gray-default-600">
                Position labels using{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  labelPlacement
                </code>{" "}
                — <b>outside</b>, <b>inside</b> or <b>outside-left</b>.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: label, labelPlacement
            </span>
          </div>

          <div className="space-y-3">
            <div className="grid items-center gap-3 md:grid-cols-[120px,1fr]">
              <span className="text-xs text-gray-default-500">
                labelPlacement="outside"
              </span>
              <TextField label="Input text" labelPlacement="outside" />
            </div>

            <div className="grid items-center gap-3 md:grid-cols-[120px,1fr]">
              <span className="text-xs text-gray-default-500">
                labelPlacement="inside"
              </span>
              <TextField label="Input text" labelPlacement="inside" />
            </div>

            <div className="grid items-center gap-3 md:grid-cols-[120px,1fr]">
              <span className="text-xs text-gray-default-500">
                labelPlacement="outside-left"
              </span>
              <TextField label="Input text" labelPlacement="outside-left" />
            </div>
          </div>
        </section>

        {/* ================= LAYOUT / DISABLED / MULTILINE ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Layout &amp; disabled
              </h2>
              <p className="text-sm text-gray-default-600">
                Use{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  fullWidth
                </code>
                ,{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  isMultiline
                </code>{" "}
                and{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  isDisabled
                </code>{" "}
                for layout &amp; availability.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: fullWidth, isMultiline, isDisabled
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">fullWidth</p>
              <TextField fullWidth label="Full width" variant="bordered" />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">isMultiline</p>
              <TextField
                isMultiline
                rows={3}
                label="Multiline"
                variant="bordered"
                placeholder="Type a longer message..."
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">isDisabled</p>
              <TextField
                isDisabled
                label="Disabled"
                variant="bordered"
                color="neutral"
                placeholder="Can't edit this"
              />
            </div>
          </div>
        </section>

        {/* ================= VALIDATION ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Validation behaviour
              </h2>
              <p className="text-sm text-gray-default-600">
                Visual feedback via{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  validationBehavior
                </code>{" "}
                — <b>none</b>, <b>valid</b> or <b>invalid</b>.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: validationBehavior, color
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                validationBehavior="none"
              </p>
              <TextField label="Default" validationBehavior="none" />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                validationBehavior="valid"
              </p>
              <TextField
                label="Looks good"
                color="success"
                validationBehavior="valid"
                variant="bordered"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                validationBehavior="invalid"
              </p>
              <TextField
                label="Error state"
                color="danger"
                validationBehavior="invalid"
                variant="bordered"
              />
            </div>
          </div>
        </section>

        {/* ================= PASSWORD ================= */}
        <section className="mb-10 space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Password mode
              </h2>
              <p className="text-sm text-gray-default-600">
                Use{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  isPassword
                </code>{" "}
                to render{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  type="password"
                </code>
                .
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: isPassword
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                bordered · isPassword
              </p>
              <TextField
                variant="bordered"
                color="primary"
                label="Password"
                isPassword
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                underlined · isPassword
              </p>
              <TextField
                variant="underlined"
                color="neutral"
                label="Secret"
                isPassword
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
