"use client";

import React from "react";
import Avatar, { AvatarGroup } from "@/components/Avatar";

const AvatarShowcasePage = () => {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Avatar Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Sizes, radiuses, variants, colors and grouping options — all in one
            place.
          </p>
        </header>

        {/* Props Overview */}
        <section className="mb-10 rounded-2xl bg-content-content1 border border-gray-default-200 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            This page demonstrates the main props of the{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;Avatar /&gt;
            </code>{" "}
            and{" "}
            <code className="rounded-md bg-gray-default-100 px-1.5 py-0.5 text-xs">
              &lt;AvatarGroup /&gt;
            </code>{" "}
            components.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Avatar Props
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
                  <code>variant</code> —{" "}
                  <code>"icon" | "image" | "text"</code>
                </li>
                <li>
                  <code>color</code> —{" "}
                  <code>
                    "default" | "primary" | "secondary" | "success" | "warning" |
                    "danger" | "neutral"
                  </code>
                </li>
                <li>
                  <code>border</code> — <code>"none" | "sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>borderColor</code> — same tokens as{" "}
                  <code>color</code>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Content & Styling
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>text</code> — used to compute initials for{" "}
                  <code>variant="text"</code>
                </li>
                <li>
                  <code>src</code>, <code>alt</code> — used when{" "}
                  <code>variant="image"</code>
                </li>
                <li>
                  <code>iconColor</code> — icon color (for{" "}
                  <code>variant="icon"</code>)
                </li>
                <li>
                  <code>textColor</code> — text/initials color
                </li>
                <li>
                  <code>imageScale</code> — zoom image relative to container
                </li>
                <li>
                  <code>style</code>, <code>className</code> — custom styling
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                AvatarGroup Props
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>layout</code> — <code>"row" | "stack"</code>
                </li>
                <li>
                  <code>grid</code> — <code>boolean</code> (grid mode toggle)
                </li>
                <li>
                  <code>columns</code> — columns in grid mode
                </li>
                <li>
                  <code>max</code> — max visible, shows <code>+N</code> circle
                </li>
                <li>
                  <code>overlap</code> — px overlap in stack layout
                </li>
                <li>
                  <code>spacing</code> — gap between avatars
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main grid: 2 columns on large screens */}
        <div className="grid grid-cols-1  gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Size */}
            <section className="bg-content-content1 rounded-2xl border border-gray-default-200 shadow-sm p-5">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Size
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                The <code>size</code> prop controls width, height and icon/text
                scale.
              </p>

              <div className="border border-gray-default-300 rounded-xl p-4 bg-gray-default-50">
                <div className="grid grid-cols-3 gap-6 justify-items-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="sm"
                      variant="icon"
                      color="default"
                      radius="full"
                    />
                    <span className="text-xs text-gray-default-600">sm</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="md"
                      variant="icon"
                      color="default"
                      radius="full"
                    />
                    <span className="text-xs text-gray-default-600">md</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="lg"
                      variant="icon"
                      color="default"
                      radius="full"
                    />
                    <span className="text-xs text-gray-default-600">lg</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Radius */}
            <section className="bg-content-content1 rounded-2xl border border-gray-default-200 shadow-sm p-5">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Radius
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                The <code>radius</code> prop controls the border radius.
              </p>

              <div className="border border-gray-default-300 rounded-xl p-4 bg-gray-default-50">
                <div className="grid grid-cols-5 gap-4 justify-items-center items-center">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" variant="icon" color="default" radius="none" />
                    <span className="text-xs text-gray-default-600">none</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" variant="icon" color="default" radius="sm" />
                    <span className="text-xs text-gray-default-600">sm</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" variant="icon" color="default" radius="md" />
                    <span className="text-xs text-gray-default-600">md</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="lg" variant="icon" color="default" radius="lg" />
                    <span className="text-xs text-gray-default-600">lg</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="lg"
                      variant="icon"
                      color="default"
                      radius="full"
                    />
                    <span className="text-xs text-gray-default-600">full</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Variants & Colors */}
            <section className="bg-content-content1 rounded-2xl border border-gray-default-200 shadow-sm p-5">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Variants & Colors
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                Use <code>variant</code> and <code>color</code> together to get
                different avatar styles.
              </p>

              <div className="border border-gray-default-300 rounded-xl p-4 bg-gray-default-50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 place-items-center">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="md" variant="icon" color="default" radius="full" />
                    <span className="text-xs text-gray-default-600">
                      default
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="md" variant="icon" color="primary" radius="full" />
                    <span className="text-xs text-gray-default-600">
                      primary
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="md"
                      variant="icon"
                      color="secondary"
                      radius="full"
                    />
                    <span className="text-xs text-gray-default-600">
                      secondary
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="md" variant="icon" color="success" radius="full" />
                    <span className="text-xs text-gray-default-600">
                      success
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="md" variant="icon" color="warning" radius="full" />
                    <span className="text-xs text-gray-default-600">
                      warning
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar size="md" variant="icon" color="danger" radius="full" />
                    <span className="text-xs text-gray-default-600">
                      danger
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="md"
                      variant="image"
                      color="default"
                      radius="full"
                      src="/Adaan-logo-white-col.png"
                      alt="Adaan"
                      imageScale={0.55}
                    />
                    <span className="text-xs text-gray-default-600">
                      image
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="md"
                      variant="text"
                      color="default"
                      text="Parth Singh"
                      radius="full"
                      textColor="var(--color-layout-foreground)"
                    />
                    <span className="text-xs text-gray-default-600">
                      text
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <Avatar
                      size="md"
                      variant="text"
                      color="danger"
                      text="Parth Singh"
                      radius="full"
                      border="md"
                      borderColor="default"
                      textColor="var(--color-content-content1)"
                    />
                    <span className="text-xs text-gray-default-600">
                      text + border
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* AvatarGroup examples */}
            {/* <section className="bg-content-content1 rounded-2xl border border-gray-default-200 shadow-sm p-5">
              <h2 className="text-lg font-semibold text-primary-950-dark mb-2">
                Avatar Group Layouts
              </h2>
              <p className="text-sm text-gray-default-600 mb-4">
                Use <code>AvatarGroup</code> to display lists, stacked avatars,
                or grids.
              </p>

              <div className="space-y-6">
         
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-default-500 mb-2">
                    layout="row"
                  </h3>
                  <AvatarGroup spacing={12}>
                    <Avatar
                      size="sm"
                      variant="text"
                      color="primary"
                      text="Parth Singh"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="secondary"
                      text="Alex Doe"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="success"
                      text="Jane Roe"
                    />
                  </AvatarGroup>
                </div>

           
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-default-500 mb-2">
                    layout="stack" • overlap=12 • max=4
                  </h3>
                  <AvatarGroup layout="stack" overlap={12} max={4}>
                    <Avatar
                      size="sm"
                      variant="image"
                      color="default"
                      src="/Adaan-logo-white-col.png"
                      imageScale={0.55}
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="primary"
                      text="Parth Singh"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="secondary"
                      text="Alex Doe"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="success"
                      text="Jane Roe"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="warning"
                      text="Mark Lee"
                    />
                  </AvatarGroup>
                </div>

  
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-default-500 mb-2">
                    grid mode • columns=4
                  </h3>
                  <AvatarGroup grid columns={4}>
                    <Avatar
                      size="sm"
                      variant="text"
                      color="primary"
                      text="Parth Singh"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="secondary"
                      text="Alex Doe"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="success"
                      text="Jane Roe"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="warning"
                      text="Mark Lee"
                    />
                    <Avatar
                      size="sm"
                      variant="text"
                      color="danger"
                      text="Foo Bar"
                    />
                    <Avatar
                      size="sm"
                      variant="image"
                      color="default"
                      src="/Adaan-logo-white-col.png"
                       imageScale={0.55}
                    />
                  </AvatarGroup>
                </div>
              </div>
            </section> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarShowcasePage;
