"use client";

import React, { useState } from "react";
import Pagination from "@/components/PaginationControls";

export default function PaginationShowcasePage() {
  const [pageSizeDemo, setPageSizeDemo] = useState(4);
  const [pageVariantDemo, setPageVariantDemo] = useState(3);
  const [pageControlsDemo, setPageControlsDemo] = useState(5);
  const [advancedPage, setAdvancedPage] = useState(7);

  // shared "items per page" state
  const [itemsPerPage, setItemsPerPage] = useState(5);

  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Pagination Component Showcase
          </h1>
          <p className="text-sm text-gray-default-600">
            Configurable pagination with sizes, variants, colors, and optional
            controls for items per page, range info, and go-to page input.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core API for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;Pagination /&gt;
              </code>{" "}
              including controlled/ uncontrolled usage and extra controls.
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
                  <code>total</code> — total pages
                </li>
                <li>
                  <code>page</code> — controlled active page
                </li>
                <li>
                  <code>initialPage</code> — default page (uncontrolled)
                </li>
                <li>
                  <code>onChange(page)</code> — page change callback
                </li>
                <li>
                  <code>className</code> — extra wrapper classes
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout & Style
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "default"
                  </code>
                </li>
                <li>
                  <code>variant</code> —{" "}
                  <code>
                    "solid" | "outlined" | "light" | "flat" | "faded" | "shadow"
                    | "ghost"
                  </code>
                </li>
                <li>
                  <code>disableCursorAnimation</code> — disable hover scale
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Advanced & Extras
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>siblings</code> — adjacent pages near current
                </li>
                <li>
                  <code>boundaries</code> — always visible edges
                </li>
                <li>
                  <code>showItems</code>, <code>showRange</code>,{" "}
                  <code>showGoto</code>
                </li>
                <li>
                  <code>itemsPerPage</code>,{" "}
                  <code>itemsPerPageOptions</code>,{" "}
                  <code>onItemsPerPageChange</code>
                </li>
                <li>
                  <code>rangeFrom</code>, <code>rangeTo</code>,{" "}
                  <code>rangeTotal</code> — display range info
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============== 1. SIZES ============== */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-primary-950-dark">
              Sizes
            </h2>
            <p className="text-xs text-gray-default-600">
              Use <code className="font-mono">size</code> to control the
              pagination density: <code>sm</code>, <code>md</code>, or{" "}
              <code>lg</code>.
            </p>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-4 shadow-sm">
            {/* small */}
            <div className="space-y-1">
              <RowLabel label='size="sm"' />
              <Pagination
                total={20}
                page={pageSizeDemo}
                onChange={setPageSizeDemo}
                size="sm"
                radius="md"
                variant="solid"
                color="primary"
              />
            </div>

            {/* medium */}
            <div className="space-y-1">
              <RowLabel label='size="md"' />
              <Pagination
                total={20}
                page={pageSizeDemo}
                onChange={setPageSizeDemo}
                size="md"
                radius="md"
                variant="solid"
                color="primary"
              />
            </div>

            {/* large */}
            <div className="space-y-1">
              <RowLabel label='size="lg"' />
              <Pagination
                total={20}
                page={pageSizeDemo}
                onChange={setPageSizeDemo}
                size="lg"
                radius="md"
                variant="solid"
                color="primary"
              />
            </div>
          </div>
        </section>

        {/* ============== 2. COLORS  ============== */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-primary-950-dark">
              Colors
            </h2>
            <p className="text-xs text-gray-default-600">
              Use{" "}
              <code className="font-mono">
                color="primary | secondary | success | warning | danger |
                default"
              </code>{" "}
              to match semantic palettes.
            </p>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-3 shadow-sm">
            <RowLabel label='color="primary"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="solid"
              color="primary"
              size="md"
              radius="md"
            />

            <RowLabel label='color="secondary"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="solid"
              color="secondary"
              size="md"
              radius="md"
            />

            <RowLabel label='color="success"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="solid"
              color="success"
              size="md"
              radius="md"
            />

            <RowLabel label='color="warning"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="solid"
              color="warning"
              size="md"
              radius="md"
            />

            <RowLabel label='color="danger"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="solid"
              color="danger"
              size="md"
              radius="md"
            />

            <RowLabel label='color="default"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="solid"
              color="default"
              size="md"
              radius="md"
            />
          </div>
        </section>

        {/* ============== 3. VARIANTS ============== */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-primary-950-dark">
              Variants
            </h2>
            <p className="text-xs text-gray-default-600">
              Use{" "}
              <code className="font-mono">
                variant="solid | outlined | light | flat | faded | shadow |
                ghost"
              </code>{" "}
              to tweak visual emphasis.
            </p>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-3 shadow-sm">
            <RowLabel label='variant="solid"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="solid"
              color="secondary"
              size="md"
              radius="md"
            />

            <RowLabel label='variant="outlined"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="outlined"
              color="secondary"
              size="md"
              radius="md"
            />

            <RowLabel label='variant="light"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="light"
              color="secondary"
              size="md"
              radius="md"
            />

            <RowLabel label='variant="flat"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="flat"
              color="secondary"
              size="md"
              radius="md"
            />

            <RowLabel label='variant="faded"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="faded"
              color="secondary"
              size="md"
              radius="md"
            />

            <RowLabel label='variant="shadow"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="shadow"
              color="secondary"
              size="md"
              radius="md"
            />

            <RowLabel label='variant="ghost"' />
            <Pagination
              total={20}
              page={pageVariantDemo}
              onChange={setPageVariantDemo}
              variant="ghost"
              color="secondary"
              size="md"
              radius="md"
            />
          </div>
        </section>

        {/* ============== 4. EXTRAS: items, range, goto ============== */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-primary-950-dark">
              Visible items & controls
            </h2>
            <p className="text-xs text-gray-default-600">
              Toggle extra UI controls using{" "}
              <code className="font-mono">showItems</code>,{" "}
              <code className="font-mono">showRange</code>, and{" "}
              <code className="font-mono">showGoto</code>. The{" "}
              <code className="font-mono">itemsPerPage</code> state would
              typically drive your table rows.
            </p>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-6 shadow-sm">
            {/* Only items dropdown */}
            <div className="space-y-2">
              <RowLabel label="showItems" />
              <Pagination
                total={50}
                page={pageControlsDemo}
                onChange={setPageControlsDemo}
                size="md"
                radius="md"
                variant="solid"
                color="primary"
                showItems
                showRange={false}
                showGoto={false}
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={[5, 10, 25]}
                onItemsPerPageChange={setItemsPerPage}
                rangeFrom={1}
                rangeTo={itemsPerPage}
                rangeTotal={50}
              />
            </div>

            {/* Items + range info */}
            <div className="space-y-2">
              <RowLabel label="showItems + showRange" />
              <Pagination
                total={50}
                page={pageControlsDemo}
                onChange={setPageControlsDemo}
                size="md"
                radius="md"
                variant="outlined"
                color="primary"
                showItems
                showRange
                showGoto={false}
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={[5, 10, 25]}
                onItemsPerPageChange={setItemsPerPage}
                rangeFrom={(pageControlsDemo - 1) * itemsPerPage + 1}
                rangeTo={Math.min(pageControlsDemo * itemsPerPage, 50)}
                rangeTotal={50}
              />
            </div>

            {/* Items + range + goto page */}
            <div className="space-y-2">
              <RowLabel label="showItems + showRange + showGoto" />
              <Pagination
                total={50}
                page={pageControlsDemo}
                onChange={setPageControlsDemo}
                size="md"
                radius="md"
                variant="flat"
                color="primary"
                showItems
                showRange
                showGoto
                itemsPerPage={itemsPerPage}
                itemsPerPageOptions={[5, 10, 25]}
                onItemsPerPageChange={setItemsPerPage}
                rangeFrom={(pageControlsDemo - 1) * itemsPerPage + 1}
                rangeTo={Math.min(pageControlsDemo * itemsPerPage, 50)}
                rangeTotal={50}
              />
            </div>
          </div>
        </section>

        {/* ============== 5. ADVANCED: siblings, boundaries, disable animation ============== */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-primary-950-dark">
              Advanced behaviour
            </h2>
            <p className="text-xs text-gray-default-600">
              Control how many sibling pages are visible and the always-visible
              boundaries. You can also disable hover animations and use{" "}
              <code>initialPage</code> for uncontrolled mode.
            </p>
          </div>

          <div className="rounded-2xl bg-content-content1 border border-gray-default-200 p-6 space-y-3 shadow-sm">
            <RowLabel label='siblings=2 · boundaries=2 · disableCursorAnimation' />
            <Pagination
              total={30}
              initialPage={7}
              page={advancedPage}
              onChange={setAdvancedPage}
              size="md"
              radius="lg"
              variant="shadow"
              color="success"
              siblings={2}
              boundaries={2}
              disableCursorAnimation
              className="bg-gray-default-50/60 rounded-xl px-3 py-2"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function RowLabel({ label }) {
  return (
    <div className="text-[11px] font-medium text-gray-default-600 uppercase tracking-wide mb-1">
      {label}
    </div>
  );
}
