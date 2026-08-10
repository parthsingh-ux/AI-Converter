"use client";

import React from "react";
import InputOtp from "@/components/InputOtp";

export default function InputOtpShowcasePage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* PAGE HEADER */}
        <header className="space-y-3">


          <h1 className="text-3xl font-semibold tracking-tight">
            Input OTP showcase
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            One{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;InputOtp /&gt;
            </code>{" "}
            component that supports variants, semantic colors, sizes, label
            placements, validation states, password masking and more.
          </p>
        </header>

        {/* =============== PROPS OVERVIEW =============== */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props overview
          </h2>
          <p className="text-sm text-gray-default-600">
            Core props supported by the{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;InputOtp /&gt;
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
                  <code>length</code> — number of OTP boxes
                </li>
                <li>
                  <code>fullWidth</code> — stretch row to parent width
                </li>
                <li>
                  <code>isMultiline</code> — allow wrapping onto multiple rows
                </li>
                <li>
                  <code>label</code> — small label text
                </li>
                <li>
                  <code>labelPlacement</code> —{" "}
                  <code>"outside" | "inside" | "outside-left"</code>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behaviour &amp; value
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>value</code> — controlled OTP string (e.g. "1234")
                </li>
                <li>
                  <code>onChange(value: string)</code> — fired on change
                </li>
                <li>
                  <code>isPassword</code> — mask each digit as a dot
                </li>
                <li>
                  <code>validationBehavior</code> —{" "}
                  <code>"none" | "valid" | "invalid"</code>
                </li>
                <li>
                  <code>isDisabled</code> — disable interaction
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* =============== VARIANTS =============== */}
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
              <span className="w-24 text-xs text-gray-default-500">flat</span>
              <InputOtp variant="flat" label="Input OTP" />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-gray-default-500">faded</span>
              <InputOtp variant="faded" label="Input OTP" />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-gray-default-500">
                bordered
              </span>
              <InputOtp variant="bordered" label="Input OTP" />
            </div>

            <div className="flex items-center gap-4">
              <span className="w-24 text-xs text-gray-default-500">
                underlined
              </span>
              <InputOtp variant="underlined" label="Input OTP" />
            </div>
          </div>
        </section>

        {/* =============== SIZES =============== */}
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
              <InputOtp size="sm" label="Small" />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">size="md"</p>
              <InputOtp size="md" label="Medium" />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">size="lg"</p>
              <InputOtp size="lg" label="Large" />
            </div>
          </div>
        </section>

        {/* =============== COLORS =============== */}
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
                  <InputOtp color={color} variant="bordered" label="Bordered" />
                  <InputOtp color={color} variant="flat" label="" />
                  <InputOtp color={color} variant="faded" label="" />
                  <InputOtp color={color} variant="underlined" label="" />
                </div>
              )
            )}
          </div>
        </section>

        {/* =============== RADIUS =============== */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Radius
              </h2>
              <p className="text-sm text-gray-default-600">
                Border rounding via{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  radius
                </code>
                . Not applied for{" "}
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
            <InputOtp radius="none" variant="bordered" label="none" />
            <InputOtp radius="sm" variant="bordered" label="sm" />
            <InputOtp radius="md" variant="bordered" label="md" />
            <InputOtp radius="lg" variant="bordered" label="lg" />
            <InputOtp radius="full" variant="bordered" label="full" />
          </div>
        </section>

        {/* =============== LABEL PLACEMENT =============== */}
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
            <div className="grid items-center gap-3 md:grid-cols-[140px,1fr]">
              <span className="text-xs text-gray-default-500">
                labelPlacement="outside"
              </span>
              <InputOtp label="Input OTP" labelPlacement="outside" />
            </div>

            <div className="grid items-center gap-3 md:grid-cols-[140px,1fr]">
              <span className="text-xs text-gray-default-500">
                labelPlacement="inside"
              </span>
              <InputOtp label="Input OTP" labelPlacement="inside" />
            </div>

            <div className="grid items-center gap-3 md:grid-cols-[140px,1fr]">
              <span className="text-xs text-gray-default-500">
                labelPlacement="outside-left"
              </span>
              <InputOtp label="Input OTP" labelPlacement="outside-left" />
            </div>
          </div>
        </section>

        {/* =============== LAYOUT / DISABLED =============== */}
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
              <InputOtp fullWidth label="Full width" variant="bordered" />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                isMultiline (wrap)
              </p>
              <InputOtp
                length={6}
                isMultiline
                label="Wrap when needed"
                variant="bordered"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">isDisabled</p>
              <InputOtp
                isDisabled
                label="Disabled OTP"
                variant="bordered"
                color="neutral"
              />
            </div>
          </div>
        </section>

        {/* =============== VALIDATION =============== */}
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
              <InputOtp label="Default" validationBehavior="none" />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                validationBehavior="valid"
              </p>
              <InputOtp
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
              <InputOtp
                label="Error state"
                color="danger"
                validationBehavior="invalid"
                variant="bordered"
              />
            </div>
          </div>
        </section>

        {/* =============== PASSWORD MODE =============== */}
        <section className="mb-10 space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Password / hidden digits
              </h2>
              <p className="text-sm text-gray-default-600">
                Use{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  isPassword
                </code>{" "}
                to mask each OTP digit.
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
              <InputOtp
                variant="bordered"
                color="primary"
                label="Secure OTP"
                isPassword
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-default-500">
                underlined · isPassword
              </p>
              <InputOtp
                variant="underlined"
                color="neutral"
                label="Hidden OTP"
                isPassword
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
