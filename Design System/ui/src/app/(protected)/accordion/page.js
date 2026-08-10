"use client";

import React from "react";
import Accordion from "@/components/Accordion";

const demoItems = [
  {
    title: "What is this component?",
    content:
      "This is a flexible accordion component that supports group and card modes, multiple layout variants, sizes, borders, and card-style items.",
  },
  {
    title: "How is it controlled?",
    content:
      "Use props like variant, size, rounded, withDivider, multiple, defaultOpen, border, borderThickness, mode, and card appearance props to adjust behavior and style.",
  },
  {
    title: "What can I render inside?",
    content:
      "The content can be any React node. Here we’re using simple text, but you can render lists, links, forms, or custom components.",
  },
];

const AccordionShowcasePage = () => {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Accordion Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            A complete visual overview of key props and behavior for the{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;Accordion /&gt;
            </code>{" "}
            component.
          </p>
        </header>

        {/* Quick props overview */}
        <section className="mb-10 rounded-2xl border border-gray-default-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Below is a summary of the main props this page demonstrates.
          </p>
          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout & Mode
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>mode</code> — <code>"group" | "card"</code>
                </li>
                <li>
                  <code>items</code> — array of{" "}
                  <code>{`{ title, content, id? }`}</code>
                </li>
                <li>
                  <code>accordionGap</code> — external bottom spacing
                </li>
                <li>
                  <code>itemGap</code> — vertical gap between card items
                </li>
                <li>
                  <code>className</code> — extra classes for root wrapper
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Style (Group Mode)
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>variant</code> —{" "}
                  <code>"default" | "shadow" | "bordered" | "flat"</code>
                </li>
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>rounded</code> —{" "}
                  <code>"none" | "md" | "lg" | "xl" | "full"</code>
                </li>
                <li>
                  <code>withDivider</code> — visual separators between items
                </li>
                <li>
                  <code>border</code> — <code>"all" | "item" | "none"</code>
                </li>
                <li>
                  <code>borderThickness</code> —{" "}
                  <code>"thin" | "normal" | "thick"</code>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior & Card Mode
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>multiple</code> — allow multiple open at once
                </li>
                <li>
                  <code>defaultOpen</code> — array of ids/indexes to start open
                </li>
                <li>
                  <code>cardShadow</code> — <code>"none" | "sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>cardBorderThickness</code> —{" "}
                  <code>"none" | "thin" | "normal" | "thick"</code>
                </li>
                <li>
                  <code>cardBorderColor</code> —{" "}
                  <code>"gray-default-100" | "gray-default-200" | "gray-default-300"</code>
                </li>
                <li>
                  <code>cardRounded</code> —{" "}
                  <code>"none" | "md" | "lg" | "xl" | "full"</code>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main grid of examples: 1 col on small, 2 cols on lg+ */}
        <div className="grid grid-cols-1  gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Variants */}
            <section className="rounded-2xl border border-gray-default-200 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium text-primary-950-dark">
                Variants (group mode)
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                The <code>variant</code> prop controls background and shadow
                style for the grouped container. Border is controlled separately
                using <code>border</code> and <code>borderThickness</code>.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* default */}
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                      variant="default"
                    </h3>
                    <Accordion
                      items={demoItems}
                      variant="default"
                      size="sm"
                      border="none"
                      withDivider
                    />
                  </div>

                  {/* shadow */}
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                      variant="shadow"
                    </h3>
                    <Accordion
                      items={demoItems}
                      variant="shadow"
                      size="sm"
                      border="none"
                      withDivider
                    />
                  </div>

                  {/* bordered */}
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                      variant="bordered"
                    </h3>
                    <Accordion
                      items={demoItems}
                      variant="bordered"
                      size="sm"
                      border="all"
                      borderThickness="normal"
                      withDivider={false}
                    />
                  </div>

                  {/* flat */}
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                      variant="flat"
                    </h3>
                    <Accordion
                      items={demoItems}
                      variant="flat"
                      size="sm"
                      border="all"
                      borderThickness="thin"
                      withDivider
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Sizes */}
            <section className="rounded-2xl border border-gray-default-200 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium text-primary-950-dark">
                Sizes
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                The <code>size</code> prop adjusts header padding, content
                padding, and title typography.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

               
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    size="sm"
                  </h3>
                  <Accordion
                    items={demoItems}
                    size="sm"
                    variant="default"
                    border="none"
                    withDivider
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    size="md"
                  </h3>
                  <Accordion
                    items={demoItems}
                    size="md"
                    variant="default"
                    border="none"
                    withDivider
                  />
                </div>
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    size="lg"
                  </h3>
                  <Accordion
                    items={demoItems}
                    size="lg"
                    variant="default"
                    border="none"
                    withDivider
                  />
                </div>
                 </div>
              </div>
            </section>

            {/* Rounded */}
            <section className="rounded-2xl border border-gray-default-200 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium text-primary-950-dark">
                Rounded Corners
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                The <code>rounded</code> prop controls the border radius of the
                group container.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Accordion
                  items={demoItems}
                  variant="default"
                  size="sm"
                  rounded="none"
                  border="all"
                  borderThickness="thin"
                  withDivider
                />
                <Accordion
                  items={demoItems}
                  variant="default"
                  size="sm"
                  rounded="md"
                  border="all"
                  borderThickness="thin"
                  withDivider
                />
                <Accordion
                  items={demoItems}
                  variant="default"
                  size="sm"
                  rounded="lg"
                  border="all"
                  borderThickness="thin"
                  withDivider
                />
                <Accordion
                  items={demoItems}
                  variant="default"
                  size="sm"
                  rounded="xl"
                  border="all"
                  borderThickness="thin"
                  withDivider
                />
                <Accordion
                  items={demoItems}
                  variant="default"
                  size="sm"
                  rounded="full"
                  border="all"
                  borderThickness="thin"
                  withDivider
                />

              </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Borders & Dividers */}
            <section className="rounded-2xl border border-gray-default-200 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium text-primary-950-dark">
                Borders & Dividers
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                Combine <code>border</code>, <code>borderThickness</code> and{" "}
                <code>withDivider</code> to control visual separation.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    border="all" • borderThickness="thin" • withDivider
                  </h3>
                  <Accordion
                    items={demoItems}
                    variant="bordered"
                    size="sm"
                    border="all"
                    borderThickness="thin"
                    withDivider
                  />
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    border="all" • borderThickness="thick" • no divider
                  </h3>
                  <Accordion
                    items={demoItems}
                    variant="bordered"
                    size="sm"
                    border="all"
                    borderThickness="thick"
                    withDivider={false}
                  />
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    border="item" • borderThickness="normal"
                  </h3>
                  <Accordion
                    items={demoItems}
                    variant="bordered"
                    size="sm"
                    border="item"
                    borderThickness="normal"
                    withDivider={false}
                  />
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    border="none" • withDivider (only lines)
                  </h3>
                  <Accordion
                    items={demoItems}
                    variant="default"
                    size="sm"
                    border="none"
                    withDivider
                  />
                </div>
                </div>
              </div>
            </section>

            {/* Behavior: multiple & defaultOpen */}
            <section className="rounded-2xl border border-gray-default-200 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium text-primary-950-dark">
                Behavior: Multiple & Default Open
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                Control how many items can be open and which ones start open
                using <code>multiple</code> and <code>defaultOpen</code>.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    Single open (multiple=false)
                  </h3>
                  <Accordion
                    items={demoItems}
                    multiple={false}
                    defaultOpen={[0]}
                    variant="shadow"
                    size="sm"
                    border="none"
                    withDivider
                  />
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    Multiple open (multiple=true) • defaultOpen by index
                  </h3>
                  <Accordion
                    items={demoItems}
                    multiple
                    defaultOpen={[0, 2]}
                    variant="default"
                    size="sm"
                    border="all"
                    borderThickness="thin"
                    withDivider
                  />
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    defaultOpen by id
                  </h3>
                  <Accordion
                    items={[
                      { id: "a", title: "Item A", content: "Opened via id 'a'." },
                      { id: "b", title: "Item B", content: "Closed by default." },
                      { id: "c", title: "Item C", content: "Opened via id 'c'." },
                    ]}
                    multiple
                    defaultOpen={["a", "c"]}
                    variant="default"
                    size="sm"
                    border="none"
                    withDivider
                  />
                </div>
                </div>
              </div>
            </section>

            {/* (Optional) Card Mode – if you want to keep showcasing it */}
            <section className="rounded-2xl border border-gray-default-200 bg-white p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium text-primary-950-dark">
                Card Mode (mode="card")
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                In <code>mode="card"</code>, each item is its own card with{" "}
                <code>cardShadow</code>, <code>cardBorderThickness</code>,{" "}
                <code>cardBorderColor</code>, and <code>cardRounded</code>.
              </p>

              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    cardShadow levels
                  </h3>
                  <Accordion
                    mode="card"
                    size="sm"
                    cardShadow="none"
                    cardBorderThickness="thin"
                    cardBorderColor="gray-default-200"
                    itemGap="my-3"
                    accordionGap="mb-4"
                    items={[
                      {
                        title: "cardShadow='none'",
                        content:
                          "Flat card, only border is visible for separation.",
                      },
                    ]}
                  />
                  <Accordion
                    mode="card"
                    size="sm"
                    cardShadow="sm"
                    cardBorderThickness="none"
                    itemGap="my-3"
                    accordionGap="mb-4"
                    items={[
                      {
                        title: "cardShadow='sm'",
                        content:
                          "Subtle elevation, useful for soft emphasis lists.",
                      },
                    ]}
                  />
                  <Accordion
                    mode="card"
                    size="sm"
                    cardShadow="md"
                    cardBorderThickness="none"
                    itemGap="my-3"
                    accordionGap="mb-4"
                    items={[
                      {
                        title: "cardShadow='md'",
                        content:
                          "More prominent elevation, good for main content blocks.",
                      },
                    ]}
                  />
                  <Accordion
                    mode="card"
                    size="sm"
                    cardShadow="lg"
                    cardBorderThickness="none"
                    itemGap="my-3"
                    accordionGap="mb-4"
                    items={[
                      {
                        title: "cardShadow='lg'",
                        content:
                          "Strong elevation, ideal for focused sections or modals.",
                      },
                    ]}
                  />
                </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionShowcasePage;
