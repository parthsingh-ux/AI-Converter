"use client";

import React from "react";
import Form from "@/components/Form"; // default export = LoginForm

export default function LoginShowcasePage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <header className="space-y-3">


          <h1 className="text-3xl font-semibold tracking-tight">
            Login Form Showcase
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            A single{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;LoginForm /&gt;
            </code>{" "}
            component that supports light and dark modes, custom titles and
            submit labels while keeping the layout identical.
          </p>
        </header>

        {/* ======================= PROPS OVERVIEW ======================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="text-sm text-gray-default-600">
            Core props supported by the{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              &lt;LoginForm /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Mode */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Mode
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>mode</code> —{" "}
                  <code>"light" | "dark"</code>
                </li>
                <li>
                  Controls surface, borders, text &amp; input styling for the
                  whole form.
                </li>
              </ul>
            </div>

            {/* Text props */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Text &amp; labels
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>title</code> — main heading (default:{" "}
                  <code>"Login"</code>)
                </li>
                <li>
                  <code>submitLabel</code> — button text (default:{" "}
                  <code>"Login"</code>)
                </li>
              </ul>
            </div>

            {/* Misc */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>className</code> — append extra classes to the root
                  container
                </li>
                <li>
                  Internally, the component handles password toggle &amp; logo
                  placeholders.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================= MODES ======================= */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Light &amp; Dark modes
              </h2>
              <p className="text-sm text-gray-default-600">
                Use the{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  mode
                </code>{" "}
                prop to switch between light and dark surfaces while preserving
                layout and spacing.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: mode, className
            </span>
          </div>

          <div className="grid gap-6 pt-1 md:grid-cols-2">
            {/* Light mode */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-default-100 bg-content-content1 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                mode="light"
              </p>
              <div className="mx-auto w-full max-w-md">
                <Form mode="light" />
              </div>
            </div>

            {/* Dark mode */}
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-default-900/40 bg-primary-950-dark p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-100">
                mode="dark"
              </p>
              <div className="mx-auto w-full max-w-md">
                <Form mode="dark" />
              </div>
            </div>
          </div>
        </section>

        {/* ======================= CUSTOM TITLES / LABELS ======================= */}
        <section className="mb-8 space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Custom titles &amp; submit labels
              </h2>
              <p className="text-sm text-gray-default-600">
                Override the headline and button copy using{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  title
                </code>{" "}
                and{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  submitLabel
                </code>
                .
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: title, submitLabel
            </span>
          </div>

          <div className="grid gap-6 pt-1 md:grid-cols-2">
            {/* Sign in */}
            <div className="space-y-2 rounded-2xl border border-gray-default-100 bg-content-content1 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                title="Sign in" · submitLabel="Continue"
              </p>
              <div className="mx-auto w-full max-w-md">
                <Form
                  mode="light"
                  title="Sign in to your account"
                  submitLabel="Continue"
                />
              </div>
            </div>

            {/* Create account */}
            <div className="space-y-2 rounded-2xl border border-gray-default-100 bg-content-content1 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                title="Create account" · submitLabel="Sign up"
              </p>
              <div className="mx-auto w-full max-w-md">
                <Form
                  mode="light"
                  title="Create your account"
                  submitLabel="Sign up"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
