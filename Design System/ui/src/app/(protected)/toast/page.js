"use client";

import React from "react";
import Toast from "@/components/Toast";

export default function Page() {
  return (
    <div className="bg-layout-background p-6 rounded-2xl">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ================= HEADER ================ */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">Toast</h1>
          <p className="text-sm text-gray-default-600 max-w-2xl">
            Inline notification banners used to show contextual messages, warnings, 
            confirmations, and feedback. Supports icons, actions, theme-colors, 
            and customizable radius.
          </p>
        </header>

        {/* ================= PROPS OVERVIEW ================ */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;Toast /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">

            {/* Core */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">Core</h3>
              <ul className="space-y-1">
                <li><code>label</code> – primary message</li>
                <li><code>description</code> – (optional) secondary text</li>
                <li><code>color</code> – <code>"neutral" | "primary" | "secondary" | "success" | "warning" | "danger"</code></li>
                <li><code>radius</code> – <code>"none" | "sm" | "md" | "lg" | "full"</code></li>
              </ul>
            </div>

            {/* Actions */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">Actions</h3>
              <ul className="space-y-1">
                <li><code>action</code> – action button text</li>
                <li><code>onAction</code> – callback for action button</li>
                <li><code>onClose</code> – close handler</li>
              </ul>
            </div>

            {/* Misc */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">Misc</h3>
              <ul className="space-y-1">
                <li><code>icon</code> – iconify icon (default: <code>"lucide:info"</code>)</li>
                <li><code>className</code> – extra wrapper styling</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= VARIANTS / COLORS ================ */}
        <section className="space-y-4">
          <SectionHeader
            title="Color Variants"
            subtitle="Different feedback contexts using theme-colors."
          />

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 ">

            
            <Toast color="neutral" label="Neutral Toast" action="Action" onClose={() => {}} />
            <Toast color="primary" label="Primary Toast" action="Action" onClose={() => {}} />
            <Toast color="secondary" label="Secondary Toast" action="Action" onClose={() => {}} />
            <Toast color="success" label="Success Toast" action="Action" onClose={() => {}} />
            <Toast color="warning" label="Warning Toast" action="Action" onClose={() => {}} />
            <Toast color="danger" label="Error Toast" action="Action" onClose={() => {}} />
          </div>
          </div>
        </section>

        {/* ================= RADIUS ================ */}
        <section className="space-y-4">
          <SectionHeader
            title="Radius"
            subtitle="Adjust corner rounding to match surfaces."
          />

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-4">
            {[
              { label: "none", value: "none" },
              { label: "sm", value: "sm" },
              { label: "md", value: "md" },
              { label: "lg", value: "lg" },
              { label: "full", value: "full" },
            ].map((r) => (
              <div className="flex items-center gap-4" key={r.value}>
                <span className="w-14 text-[11px] uppercase text-gray-default-600">{r.label}</span>
                <div className="flex-1">
                  <Toast
                    color="primary"
                    radius={r.value}
                    label={`Radius: ${r.label}`}
                    action="Action"
                    onClose={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WITH DESCRIPTION ================ */}
        <section className="space-y-4">
          <SectionHeader
            title="Description Support"
            subtitle="Multi-line toast with secondary description."
          />

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6">
            <Toast
              color="neutral"
              label="Email sent successfully"
              description="You will receive a confirmation shortly."
              action="Undo"
              onClose={() => {}}
            />
          </div>
        </section>

        {/* ================= ICON VARIANTS ================ */}
        <section className="space-y-4">
          <SectionHeader
            title="Icon Variants"
            subtitle="Use different icons for various toast contexts."
          />

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-4">
            <Toast color="success" icon="lucide:check" label="Success!" />
            <Toast color="danger" icon="lucide:alert-triangle" label="Error occurred" />
            <Toast color="neutral" icon="lucide:bell" label="Notification received" />
          </div>
        </section>

        {/* ================= ACTION BUTTON ================ */}
        <section className="space-y-4 mb-12">
          <SectionHeader
            title="Action Button"
            subtitle="Toasts can include single call-to-action."
          />

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-4">
            <Toast
              color="primary"
              label="File Uploaded"
              action="View"
              onAction={() => alert("Viewing file")}
              onClose={() => {}}
            />

            <Toast
              color="danger"
              label="Failed to Upload"
              action="Retry"
              onAction={() => alert("Retrying...")}
              onClose={() => {}}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= HELPERS ================ */

function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h2 className="text-sm font-semibold text-primary-950-dark">{title}</h2>
        <p className="text-xs text-gray-default-600 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
