"use client";

import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function BreadcrumbShowcase() {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Breadcrumb Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            A collection of breadcrumb examples — sizes, colors, separators,
            collapsing and disabled states.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="mb-10 rounded-2xl bg-content-content1 border border-gray-default-200 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Quick overview of the main props you can use to configure the{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;Breadcrumb /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Structure
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>items</code> —{" "}
                  <code>{`Array<{ label, href?, disabled? }>`}</code>
                </li>
                <li>
                  <code>page</code> — active item by index or label/href
                </li>
                <li>
                  <code>className</code> — extra classes on root
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Style & Size
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "slate" | "blue" | "emerald" | "amber" | "rose"
                  </code>
                </li>
                <li>
                  <code>underline</code> — underline on hover
                </li>
                <li>
                  <code>isDisabled</code> — disable all links
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Collapsing & Separators
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>maxItems</code> — max visible before collapsing
                </li>
                <li>
                  <code>itemsBeforeCollapse</code> /{" "}
                  <code>itemsAfterCollapse</code>
                </li>
                <li>
                  <code>separator</code> —{" "}
                  <code>"arrow" | "slash"</code> or custom ReactNode
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* GRID WRAPPER */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 1️⃣ Basic Breadcrumb (4 variants) */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Basic Breadcrumb
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              Common basic usages with underline, disabled and page control.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Components", href: "/components" },
                  { label: "Breadcrumb" },
                ]}
                size="md"
                color="slate"
              />
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Docs", href: "/docs" },
                  { label: "Breadcrumb" },
                ]}
                size="md"
                color="slate"
                underline
              />
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Components", href: "/components" },
                  { label: "Breadcrumb" },
                ]}
                size="md"
                color="slate"
                isDisabled
              />
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Components", href: "/components" },
                  { label: "Breadcrumb" },
                ]}
                size="md"
                color="slate"
                page={2}
              />
            </div>
          </section>

          {/* 2️⃣ Color Variations */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Color Variations
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              Show different theme colors and underline option.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Home" },
                  { label: "Blue" },
                  { label: "Active" },
                ]}
                color="blue"
                underline
              />
              <Breadcrumb
                items={[
                  { label: "Home" },
                  { label: "Success" },
                  { label: "Active" },
                ]}
                color="emerald"
                underline
              />
              <Breadcrumb
                items={[
                  { label: "Home" },
                  { label: "Warning" },
                  { label: "Active" },
                ]}
                color="amber"
              />
              <Breadcrumb
                items={[
                  { label: "Home" },
                  { label: "Danger" },
                  { label: "Active" },
                ]}
                color="rose"
              />
            </div>
          </section>

          {/* 3️⃣ Sizes */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Size Variants
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              <code>size</code> controls typography and spacing.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Small" },
                  { label: "Example" },
                  { label: "Active" },
                ]}
                size="sm"
                color="slate"
              />
              <Breadcrumb
                items={[
                  { label: "Medium" },
                  { label: "Example" },
                  { label: "Active" },
                ]}
                size="md"
                color="blue"
              />
              <Breadcrumb
                items={[
                  { label: "Large" },
                  { label: "Example" },
                  { label: "Active" },
                ]}
                size="lg"
                color="amber"
              />
              <Breadcrumb
                items={[
                  { label: "Medium" },
                  { label: "No Underline" },
                  { label: "Active" },
                ]}
                size="md"
                color="slate"
                underline={false}
              />
            </div>
          </section>

          {/* 4️⃣ Collapsed Breadcrumb */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Collapsed Examples
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              Control how long breadcrumb chains collapse for deeply nested
              routes.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Category", href: "/cat" },
                  { label: "Subcategory", href: "/cat/sub" },
                  { label: "Section", href: "/cat/sub/section" },
                  { label: "Topic", href: "/cat/sub/section/topic" },
                  { label: "Item", href: "/cat/sub/section/topic/item" },
                  { label: "Deep" },
                ]}
                maxItems={4}
                itemsBeforeCollapse={1}
                itemsAfterCollapse={2}
                color="blue"
                underline
              />

              <Breadcrumb
                items={Array.from({ length: 7 }).map((_, i) => ({
                  label: `Step ${i + 1}`,
                }))}
                maxItems={5}
                itemsBeforeCollapse={2}
                itemsAfterCollapse={1}
                color="slate"
              />

              <Breadcrumb
                items={[
                  { label: "Root" },
                  { label: "A" },
                  { label: "B" },
                  { label: "C" },
                  { label: "D" },
                  { label: "E" },
                  { label: "Final" },
                ]}
                maxItems={3}
                itemsBeforeCollapse={1}
                itemsAfterCollapse={1}
                color="amber"
              />

              <Breadcrumb
                items={[
                  { label: "Top" },
                  { label: "Level 1" },
                  { label: "Level 2" },
                  { label: "Level 3" },
                  { label: "End" },
                ]}
                maxItems={4}
                itemsBeforeCollapse={2}
                itemsAfterCollapse={1}
                color="emerald"
                underline
              />
            </div>
          </section>

          {/* 5️⃣ Active Page Examples */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Active Page Control
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              Pick the active crumb by index or by matching label / href.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Library", href: "/lib" },
                  { label: "Page", href: "/lib/page" },
                ]}
                page={2}
                color="emerald"
              />
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Docs", href: "/docs" },
                  { label: "API" },
                ]}
                page="Docs"
                color="amber"
                underline
              />
              <Breadcrumb
                items={[
                  { label: "Root" },
                  { label: "Section" },
                  { label: "Subsection" },
                  { label: "Here" },
                ]}
                page={1}
                color="blue"
              />
              <Breadcrumb
                items={[
                  { label: "Home" },
                  { label: "x" },
                  { label: "y" },
                  { label: "z" },
                ]}
                page="z"
                color="rose"
                underline
              />
            </div>
          </section>

          {/* 6️⃣ Disabled Breadcrumb */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Disabled / Readonly
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              Readonly examples — useful for docs, static previews or disabled
              navigation.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Section", href: "/section" },
                  { label: "Disabled Page" },
                ]}
                isDisabled
                color="slate"
              />
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Section", href: "/section" },
                  { label: "Disabled Page" },
                ]}
                isDisabled
                color="blue"
                underline
              />
              <Breadcrumb
                items={[
                  { label: "Library" },
                  { label: "ReadOnly" },
                  { label: "Page" },
                ]}
                isDisabled
                color="amber"
              />
              <Breadcrumb
                items={[
                  { label: "A" },
                  { label: "B" },
                  { label: "C" },
                ]}
                isDisabled
                color="emerald"
              />
            </div>
          </section>

          {/* 7️⃣ Mixed Styles */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Mixed Styles
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              Combine sizes, colors, underline and collapse for real-world
              layouts.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Dashboard", href: "/" },
                  { label: "Users", href: "/users" },
                  { label: "Settings", href: "/users/settings" },
                  { label: "Profile" },
                ]}
                size="lg"
                color="blue"
                underline
                maxItems={5}
                itemsBeforeCollapse={2}
                itemsAfterCollapse={2}
              />
              <Breadcrumb
                items={[
                  { label: "Dashboard", href: "/" },
                  { label: "Reports", href: "/reports" },
                  { label: "2025" },
                ]}
                size="md"
                color="emerald"
                underline
              />
              <Breadcrumb
                items={[
                  { label: "Home" },
                  { label: "Store" },
                  { label: "Products" },
                  { label: "Shoes" },
                  { label: "Nike" },
                ]}
                size="sm"
                color="amber"
                maxItems={4}
                itemsBeforeCollapse={1}
                itemsAfterCollapse={1}
              />
              <Breadcrumb
                items={[
                  { label: "Admin" },
                  { label: "System" },
                  { label: "Logs" },
                  { label: "Last" },
                ]}
                size="md"
                color="rose"
                underline
              />
            </div>
          </section>

          {/* 8️⃣ Separator examples (arrow / slash / custom) */}
          <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-primary-950-dark">
              Separator Variants
            </h3>
            <p className="mb-4 text-sm text-gray-default-600">
              Use <code>separator</code> for arrow, slash, or custom React
              nodes.
            </p>
            <div className="space-y-3">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                  { label: "Shoes" },
                ]}
                separator="arrow"
                color="slate"
                size="md"
              />
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Products", href: "/products" },
                  { label: "Shoes" },
                ]}
                separator="slash"
                color="slate"
                size="md"
              />
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: "Post" },
                ]}
                separator={<span className="text-gray-default-400">•</span>}
                color="blue"
                size="md"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
