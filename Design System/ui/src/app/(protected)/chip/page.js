"use client";

import Chip from "@/components/Chip";

const ChipPage = () => {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Chip Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Solid · Outlined · Light · Flat · Faded · Shadow · Ghost — across
            sizes, colors and radii.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="mb-8 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            This page demonstrates the core props of the{" "}
            <code className="rounded bg-gray-default-100 px-1 text-xs">
              &lt;Chip /&gt;
            </code>{" "}
            component.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Visual
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>variant</code> —{" "}
                  <code>
                    "solid" | "outlined" | "light" | "flat" | "faded" | "shadow"
                    | "ghost"
                  </code>
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "warning" | "danger" |
                    "neutral"
                  </code>
                </li>
                <li>
                  <code>radius</code> —{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout & Size
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> — <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>className</code> — extra layout / utility classes
                </li>
                <li>
                  Inline layout with{" "}
                  <code>w-max</code> and content-based width.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior & Content
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isDisabled</code> — reduces opacity, blocks{" "}
                  <code>onClick</code>
                </li>
                <li>
                  <code>onClick</code> — click handler
                </li>
                <li>
                  <code>leftIcon</code>, <code>rightIcon</code> — React nodes
                  beside the label
                </li>
                <li>
                  <code>children</code> — chip label (text / node)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* MAIN DEMO SECTIONS */}
        <div className="space-y-8">
          {/* SECTION 1 – VARIANT × SIZE (NEUTRAL) */}
          <section className="bg-content-content1 rounded-2xl border border-gray-default-200 shadow-sm p-6">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Variant × Size (Neutral color)
              </h2>
              <p className="text-sm text-gray-default-600">
                Compare all variants across <strong>sm / md / lg</strong> using{" "}
                <code>color="neutral"</code>.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-[110px_repeat(7,1fr)] gap-4 justify-items-center items-center mb-2">
                  {/* Empty top-left corner cell */}
                  <div className="w-full" />

                  {/* Column Headers */}
                  {[
                    "Solid",
                    "Outlined",
                    "Light",
                    "Flat",
                    "Faded",
                    "Shadow",
                    "Ghost",
                  ].map((label) => (
                    <h3
                      key={label}
                      className="w-full text-center bg-primary-600 text-white text-xs font-medium p-2 rounded"
                    >
                      {label}
                    </h3>
                  ))}

                  {/* ROW 1 — SMALL */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    Small
                  </div>
                  <Chip size="sm" variant="solid" color="neutral" radius="none">
                    Chip-1
                  </Chip>
                  <Chip
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    radius="none"
                  >
                    Chip-2
                  </Chip>
                  <Chip size="sm" variant="light" color="neutral" radius="none">
                    Chip-3
                  </Chip>
                  <Chip size="sm" variant="flat" color="neutral" radius="none">
                    Chip-4
                  </Chip>
                  <Chip size="sm" variant="faded" color="neutral" radius="none">
                    Chip-5
                  </Chip>
                  <Chip size="sm" variant="shadow" color="neutral" radius="none">
                    Chip-6
                  </Chip>
                  <Chip size="sm" variant="ghost" color="neutral" radius="none">
                    Chip-7
                  </Chip>

                  {/* ROW 2 — MEDIUM */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    Medium
                  </div>
                  <Chip size="md" variant="solid" color="neutral" radius="none">
                    Chip-1
                  </Chip>
                  <Chip
                    size="md"
                    variant="outlined"
                    color="neutral"
                    radius="none"
                  >
                    Chip-2
                  </Chip>
                  <Chip size="md" variant="light" color="neutral" radius="none">
                    Chip-3
                  </Chip>
                  <Chip size="md" variant="flat" color="neutral" radius="none">
                    Chip-4
                  </Chip>
                  <Chip size="md" variant="faded" color="neutral" radius="none">
                    Chip-5
                  </Chip>
                  <Chip size="md" variant="shadow" color="neutral" radius="none">
                    Chip-6
                  </Chip>
                  <Chip size="md" variant="ghost" color="neutral" radius="none">
                    Chip-7
                  </Chip>

                  {/* ROW 3 — LARGE */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    Large
                  </div>
                  <Chip size="lg" variant="solid" color="neutral" radius="none">
                    Chip-1
                  </Chip>
                  <Chip
                    size="lg"
                    variant="outlined"
                    color="neutral"
                    radius="none"
                  >
                    Chip-2
                  </Chip>
                  <Chip size="lg" variant="light" color="neutral" radius="none">
                    Chip-3
                  </Chip>
                  <Chip size="lg" variant="flat" color="neutral" radius="none">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="faded" color="neutral" radius="none">
                    Chip-5
                  </Chip>
                  <Chip size="lg" variant="shadow" color="neutral" radius="none">
                    Chip-6
                  </Chip>
                  <Chip size="lg" variant="ghost" color="neutral" radius="none">
                    Chip-7
                  </Chip>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 – RADIUS × COLOR */}
          <section className="bg-content-content1 rounded-2xl border border-gray-default-200 shadow-sm p-6">
            <div className="mb-4 flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Radius × Color (Solid)
              </h2>
              <p className="text-sm text-gray-default-600">
                Compare how radius affects appearance across all solid colors.
              </p>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[980px]">
                <div className="grid grid-cols-[110px_repeat(6,1fr)] gap-4 justify-items-center items-center mb-2">
                  {/* TOP-LEFT EMPTY CELL */}
                  <div className="w-full" />

                  {/* HEADERS */}
                  {[
                    "Primary",
                    "Secondary",
                    "Success",
                    "Warning",
                    "Danger",
                    "Neutral",
                  ].map((label) => (
                    <h3
                      key={label}
                      className="w-full text-center bg-primary-600 text-white text-xs font-medium p-2 rounded"
                    >
                      {label}
                    </h3>
                  ))}

                  {/* ROW: None */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    None
                  </div>
                  <Chip size="lg" variant="solid" color="primary" radius="none">
                    Chip-N
                  </Chip>
                  <Chip
                    size="lg"
                    variant="solid"
                    color="secondary"
                    radius="none"
                  >
                    Chip-N
                  </Chip>
                  <Chip size="lg" variant="solid" color="success" radius="none">
                    Chip-3
                  </Chip>
                  <Chip size="lg" variant="solid" color="warning" radius="none">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="danger" radius="none">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="neutral" radius="none">
                    Chip-4
                  </Chip>

                  {/* ROW: Small */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    Small
                  </div>
                  <Chip size="lg" variant="solid" color="primary" radius="sm">
                    Chip-S
                  </Chip>
                  <Chip size="lg" variant="solid" color="secondary" radius="sm">
                    Chip-S
                  </Chip>
                  <Chip size="lg" variant="solid" color="success" radius="sm">
                    Chip-3
                  </Chip>
                  <Chip size="lg" variant="solid" color="warning" radius="sm">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="danger" radius="sm">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="neutral" radius="sm">
                    Chip-4
                  </Chip>

                  {/* ROW: Medium */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    Medium
                  </div>
                  <Chip size="lg" variant="solid" color="primary" radius="md">
                    Chip-M
                  </Chip>
                  <Chip size="lg" variant="solid" color="secondary" radius="md">
                    Chip-M
                  </Chip>
                  <Chip size="lg" variant="solid" color="success" radius="md">
                    Chip-3
                  </Chip>
                  <Chip size="lg" variant="solid" color="warning" radius="md">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="danger" radius="md">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="neutral" radius="md">
                    Chip-4
                  </Chip>

                  {/* ROW: Large */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    Large
                  </div>
                  <Chip size="lg" variant="solid" color="primary" radius="lg">
                    Chip-L
                  </Chip>
                  <Chip size="lg" variant="solid" color="secondary" radius="lg">
                    Chip-L
                  </Chip>
                  <Chip size="lg" variant="solid" color="success" radius="lg">
                    Chip-3
                  </Chip>
                  <Chip size="lg" variant="solid" color="warning" radius="lg">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="danger" radius="lg">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="neutral" radius="lg">
                    Chip-4
                  </Chip>

                  {/* ROW: Full */}
                  <div className="w-full text-center bg-gray-default-100 text-primary-950-dark text-xs font-semibold p-2 rounded">
                    Full
                  </div>
                  <Chip size="lg" variant="solid" color="primary" radius="full">
                    Chip-F
                  </Chip>
                  <Chip
                    size="lg"
                    variant="solid"
                    color="secondary"
                    radius="full"
                  >
                    Chip-F
                  </Chip>
                  <Chip size="lg" variant="solid" color="success" radius="full">
                    Chip-3
                  </Chip>
                  <Chip size="lg" variant="solid" color="warning" radius="full">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="danger" radius="full">
                    Chip-4
                  </Chip>
                  <Chip size="lg" variant="solid" color="neutral" radius="full">
                    Chip-4
                  </Chip>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3 – SMALL VARIANTS BY COLOR */}
          <section className="bg-content-content1 rounded-2xl border border-gray-default-200 shadow-sm p-6">
            <h2 className="mb-4 text-lg font-semibold text-primary-950-dark">
              Variants by Color (Small size)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* helper render for each color column */}
              {[
                { label: "Primary", color: "primary" },
                { label: "Secondary", color: "secondary" },
                { label: "Success", color: "success" },
                { label: "Warning", color: "warning" },
                { label: "Danger", color: "danger" },
                { label: "Neutral", color: "neutral" },
              ].map(({ label, color }) => (
                <div key={color}>
                  <h3 className="text-sm font-semibold mb-3 text-primary-950-dark">
                    {label} variants
                  </h3>
                  <div className="grid grid-cols-1 gap-3 justify-items-center items-center border border-gray-default-100 p-3 rounded-2xl">
                    <Chip size="sm" variant="solid" color={color} radius="none">
                      Solid
                    </Chip>
                    <Chip
                      size="sm"
                      variant="outlined"
                      color={color}
                      radius="none"
                    >
                      Outlined
                    </Chip>
                    <Chip
                      size="sm"
                      variant="light"
                      color={color}
                      radius="none"
                    >
                      Light
                    </Chip>
                    <Chip
                      size="sm"
                      variant="flat"
                      color={color}
                      radius="none"
                    >
                      Flat
                    </Chip>
                    <Chip
                      size="sm"
                      variant="faded"
                      color={color}
                      radius="none"
                    >
                      Faded
                    </Chip>
                    <Chip
                      size="sm"
                      variant="shadow"
                      color={color}
                      radius="none"
                    >
                      Shadow
                    </Chip>
                    <Chip
                      size="sm"
                      variant="ghost"
                      color={color}
                      radius="none"
                    >
                      Ghost
                    </Chip>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChipPage;
