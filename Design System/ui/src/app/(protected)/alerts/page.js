"use client";

import React from "react";
import Alert from "@/components/Alerts";

export default function AlertShowcase() {
  const sampleTitle = "Email sent";
  const sampleDesc = "You will get a reply soon";

  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Alerts Component Showcase
          </h1>
          <p className="text-sm text-gray-default-600 mt-2">
            Explore different alert variants, tones, borders, shadows, radius
            options, and toast behaviors.
          </p>
        </header>

        {/* Props Overview */}
        <section className="mb-10 rounded-2xl bg-content-content1 border border-gray-default-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark mb-3">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            This page demonstrates the main props of the{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;Alert /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-gray-default-700">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Appearance
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>variant</code> —{" "}
                  <code>
                    "neutral" | "primary" | "info" | "success" | "warning" |
                    "danger"
                  </code>
                </li>
                <li>
                  <code>tone</code> — <code>"light" | "solid"</code>
                </li>
                <li>
                  <code>shadow</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>borderThickness</code> —{" "}
                  <code>"none" | "1px" | "2px" | "3px" | "4px"</code>
                </li>
                <li>
                  <code>rounded</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg" | "xl" | "full"</code>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Content & Behavior
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>title</code> — main title text
                </li>
                <li>
                  <code>description</code> — supporting text
                </li>
                <li>
                  <code>dismissible</code> — show close icon
                </li>
                <li>
                  <code>onClose</code> — callback when closed
                </li>
                <li>
                  <code>icon</code> — custom icon node
                </li>
                <li>
                  <code>isInline</code> — inline vs floating toast
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Toast-Specific
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>position</code> —{" "}
                  <code>
                    "top-left" | "top-right" | "top-center" | "bottom-left" |
                    "bottom-right" | "bottom-center"
                  </code>
                </li>
                <li>
                  <code>autoClose</code> — ms before auto-dismiss (0 = off)
                </li>
                <li>
                  <code>hideProgressBar</code> — hide progress bar
                </li>
                <li>
                  <code>pauseOnHover</code>, <code>pauseOnFocusLoss</code>
                </li>
                <li>
                  <code>draggable</code>, <code>closeOnClick</code>
                </li>
                <li>
                  <code>transition</code> — transition type label (for future)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main sections */}
        <div className="grid grid-cols-1  gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Variants */}
            <section className="bg-content-content1 rounded-2xl shadow-sm p-6 border border-gray-default-200">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Variants
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                Different <code>variant</code> values mapped to your theme
                palettes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Alert
                  variant="neutral"
                  title={sampleTitle}
                  description={sampleDesc}
                  dismissible
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="primary"
                  title={sampleTitle}
                  description={sampleDesc}
                  dismissible
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="info"
                  title={sampleTitle}
                  description={sampleDesc}
                  dismissible
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="success"
                  title={sampleTitle}
                  description={sampleDesc}
                  dismissible
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="warning"
                  title={sampleTitle}
                  description={sampleDesc}
                  dismissible
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="danger"
                  title={sampleTitle}
                  description={sampleDesc}
                  dismissible
                  shadow="none"
                  rounded="xl"
                  isInline
                />
              </div>
            </section>

            {/* Shadow & Border */}
            <section className="bg-content-content1 rounded-2xl shadow-sm p-6 border border-gray-default-200">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Shadows & Borders
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                Combine <code>shadow</code>, <code>borderThickness</code> and{" "}
                <code>tone</code> to control card emphasis.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Alert
                  variant="neutral"
                  title="Shadow only"
                  description="Card with soft shadow, no border"
                  dismissible
                  shadow="md"
                  rounded="xl"
                  borderThickness="none"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="No shadow, no border"
                  description="Flat card"
                  dismissible
                  shadow="none"
                  rounded="xl"
                  borderThickness="none"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="Border only"
                  description="Card with border, no shadow"
                  tone="solid"
                  borderThickness="2px"
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="Shadow + Border"
                  description="Border + shadow for higher emphasis"
                  tone="solid"
                  borderThickness="2px"
                  shadow="md"
                  rounded="xl"
                  isInline
                />
              </div>
            </section>

            {/* Radius */}
            <section className="bg-content-content1 rounded-2xl shadow-sm p-6 border border-gray-default-200">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Border Radius Variants
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                The <code>rounded</code> prop controls the corner radius.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Alert
                  variant="neutral"
                  title="rounded: none"
                  description="rounded-none"
                  tone="solid"
                  borderThickness="2px"
                  shadow="none"
                  rounded="none"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="rounded: sm"
                  description="rounded-sm"
                  tone="solid"
                  borderThickness="2px"
                  shadow="none"
                  rounded="sm"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="rounded: md"
                  description="rounded-md"
                  tone="solid"
                  borderThickness="2px"
                  shadow="none"
                  rounded="md"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="rounded: lg"
                  description="rounded-lg"
                  tone="solid"
                  borderThickness="2px"
                  shadow="none"
                  rounded="lg"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="rounded: xl"
                  description="rounded-2xl"
                  tone="solid"
                  borderThickness="2px"
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="neutral"
                  title="rounded: full"
                  description="rounded-full"
                  tone="solid"
                  borderThickness="2px"
                  shadow="none"
                  rounded="full"
                  isInline
                />
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Behavior (dismiss, inline vs toast, autoClose) */}
            <section className="bg-content-content1 rounded-2xl shadow-sm p-6 border border-gray-default-200">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Behavior & Dismiss
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                Control closing behavior, inline vs floating, and auto-close
                timers.
              </p>

              <div className="space-y-4">
                <Alert
                  variant="primary"
                  title="Inline, dismissible"
                  description="This alert can be closed via the close icon."
                  dismissible
                  shadow="none"
                  rounded="xl"
                  isInline
                />
                <Alert
                  variant="primary"
                  title="Inline, not dismissible"
                  description="No close icon, controlled by parent."
                  dismissible={false}
                  shadow="none"
                  rounded="xl"
                  isInline
                />
              </div>
            </section>

            {/* Toast example(s) */}
            {/* <section className="bg-content-content1 rounded-2xl shadow-sm p-6 border border-gray-default-200">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Toast / Floating Alerts
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                Use <code>isInline=false</code> to render floating toasts and{" "}
                <code>autoClose</code> for timed dismissal.
              </p>

              <div className="space-y-3 text-xs text-gray-default-600">
                <p>
                  Below is a live toast example positioned at{" "}
                  <code>top-right</code> that auto-closes after 5 seconds.
                </p>
                <p>
                  Props used: <code>position</code>, <code>autoClose</code>,{" "}
                  <code>hideProgressBar</code>, <code>pauseOnHover</code>,{" "}
                  <code>draggable</code>, and <code>closeOnClick</code>.
                </p>
              </div>
            </section> */}
          </div>
        </div>

        {/* Floating Toast Example (always rendered) */}
        <Alert
          variant="success"
          title="Toast Example"
          description="This floating toast auto-closes after 5 seconds."
          dismissible
          onClose={() => console.log("Closed floating toast")}
          rounded="xl"
          shadow="md"
          tone="solid"
          borderThickness="3px"
          className="transition-all duration-500 ease-in-out"
          isInline={false}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
          transition="bounce"
        />
      </div>
    </div>
  );
}
