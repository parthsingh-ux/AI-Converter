"use client";

import React from "react";
import Carousel from "@/components/Carousal"; // keep your filename

const slides = [
  { src: "Shoes.jpg", alt: "Grey sneaker 1" },
  { src: "Shoes1.jpg", alt: "Grey sneaker 2" },
  { src: "Shoes2.jpg", alt: "Grey sneaker 3" },
  { src: "Shoes3.jpg", alt: "Grey sneaker 4" },
];

export default function CarouselShowcasePage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 text-primary-950-dark py-10">
      <div className="mx-auto max-w-6xl px-6 space-y-10">
        {/* HEADER */}
        <header className="space-y-3">

          <h1 className="text-3xl font-bold text-primary-950-dark">
            Carousel Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            A flexible <code>&lt;Carousel /&gt;</code> that supports{" "}
            <b>with-thumbs</b>, <b>thumb-only</b>, and <b>simple</b> layouts,
            plus autoplay, themable arrows/dots and responsive sizing.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">
            Props Overview
          </h2>
          <p className="mb-4 text-sm text-gray-default-600">
            Quick reference of the main props demonstrated on this page.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-2 lg:grid-cols-3">
            {/* Column 1 – Layout & Content */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout & Content
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>images</code> —{" "}
                  <code>{`Array<{ src, alt?, imageSize? }>`}</code>
                </li>
                <li>
                  <code>type</code> —{" "}
                  <code>"with-thumbs" | "simple" | "thumb-only"</code>
                </li>
                <li>
                  <code>className</code> — extra wrapper classes
                </li>
                <li>
                  <code>radius</code> — main viewport radius token or px value
                </li>
                <li>
                  <code>thumbnailRadius</code> — thumbnail pill radius
                </li>
              </ul>
            </div>

            {/* Column 2 – Visual & Sizing */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Visual & Sizing
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>showThumbnails</code> — force show/hide thumbnail rail
                </li>
                <li>
                  <code>showDots</code> — show pagination dots
                </li>
                <li>
                  <code>showArrows</code> — show left/right arrows
                </li>
                <li>
                  <code>visibleThumbnails</code> — hint for thumbnail sizing
                </li>
                <li>
                  <code>imageSize</code> — per-carousel width (
                  <code>number</code>, <code>"px"</code> or <code>"%"</code>)
                </li>
                <li>
                  <code>maxViewportHeight</code> — max height for viewport
                </li>
              </ul>
            </div>

            {/* Column 3 – Behavior */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Behavior
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>autoPlay</code> — rotate slides automatically
                </li>
                <li>
                  <code>autoPlayInterval</code> — interval in ms (default 4000)
                </li>
                <li>
                  Keyboard — <code>ArrowLeft</code> /{" "}
                  <code>ArrowRight</code> for previous / next
                </li>
                <li>
                  <code>type="thumb-only"</code> — autoplay is ignored
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* MAIN GRID OF EXAMPLES */}
        <div className="grid grid-cols-1 gap-6 ">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Layout Variants */}
            <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium">
                Layout variants (<code>type</code>)
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                Switch the main layout using{" "}
                <code className="bg-gray-default-100 px-1 rounded text-xs">
                  type
                </code>{" "}
                — <b>with-thumbs</b>, <b>thumb-only</b>, and <b>simple</b>.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    type="with-thumbs"
                  </h3>
                  <p className="mb-2 text-xs text-gray-default-600">
                    Main viewport + thumbnail rail, ideal for product or
                    gallery views.
                  </p>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="with-thumbs"
                      radius="16px"
                      thumbnailRadius="8px"
                      showDots
                      showArrows
                      autoPlay={false}
                      visibleThumbnails={6}
                      imageSize={420}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    type="thumb-only"
                  </h3>
                  <p className="mb-2 text-xs text-gray-default-600">
                    Only the thumbnail strip acts as a selector. Autoplay is
                    automatically disabled.
                  </p>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="thumb-only"
                      radius="16px"
                      thumbnailRadius="8px"
                      showArrows
                      showDots={false}
                      autoPlay={false}
                      visibleThumbnails={7}
                      imageSize={400}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    type="simple"
                  </h3>
                  <p className="mb-2 text-xs text-gray-default-600">
                    Clean viewport with arrows and dots only.
                  </p>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="simple"
                      radius="16px"
                      thumbnailRadius="8px"
                      showDots
                      showArrows
                      autoPlay={false}
                      visibleThumbnails={5}
                      imageSize="80%"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Controls: dots, arrows, thumbnails */}
            <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium">
                Dots, arrows & thumbnails
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                Toggle indicators and thumbs with{" "}
                <code>showDots</code>, <code>showArrows</code> and{" "}
                <code>showThumbnails</code>.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    showDots=false • showArrows=true
                  </h3>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="simple"
                      showDots={false}
                      showArrows
                      radius="md"
                      visibleThumbnails={4}
                      imageSize={380}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    showDots=true • showArrows=false
                  </h3>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="simple"
                      showDots
                      showArrows={false}
                      radius="md"
                      visibleThumbnails={4}
                      imageSize={380}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    showThumbnails=false (with-thumbs)
                  </h3>
                  <p className="mb-2 text-xs text-gray-default-600">
                    Force hide thumbnail rail even if{" "}
                    <code>type="with-thumbs"</code>.
                  </p>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="with-thumbs"
                      showThumbnails={false}
                      showDots
                      showArrows
                      radius="lg"
                      imageSize={420}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Autoplay & intervals */}
            <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium">
                Autoplay & interval
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                Use <code>autoPlay</code> and{" "}
                <code>autoPlayInterval</code> to cycle through slides
                automatically (paused on hover).
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    autoPlay=true • autoPlayInterval=4000
                  </h3>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="simple"
                      autoPlay
                      autoPlayInterval={4000}
                      showDots
                      showArrows
                      radius="md"
                      imageSize={420}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    Faster interval (2000ms)
                  </h3>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="with-thumbs"
                      autoPlay
                      autoPlayInterval={2000}
                      showDots
                      showArrows
                      radius="lg"
                      visibleThumbnails={5}
                      imageSize="70%"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-gray-default-500">
                  Note: <code>type="thumb-only"</code> always ignores{" "}
                  <code>autoPlay</code>.
                </p>
              </div>
            </section>

            {/* Sizing: radius, imageSize & maxViewportHeight */}
            <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-5 shadow-sm">
              <h2 className="mb-1 text-lg font-medium">
                Radius & sizing
              </h2>
              <p className="mb-4 text-sm text-gray-default-600">
                Control viewport shape and slide size with{" "}
                <code>radius</code>, <code>thumbnailRadius</code>,{" "}
                <code>imageSize</code> and{" "}
                <code>maxViewportHeight</code>.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    radius="sm" • thumbnailRadius="sm"
                  </h3>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="with-thumbs"
                      radius="sm"
                      thumbnailRadius="sm"
                      showDots
                      showArrows
                      visibleThumbnails={6}
                      imageSize={360}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    radius="lg" • imageSize="60%" • maxViewportHeight=320
                  </h3>
                  <div className="rounded-xl border border-gray-default-200 bg-gray-default-50 p-3">
                    <Carousel
                      images={slides}
                      type="simple"
                      radius="lg"
                      thumbnailRadius="lg"
                      showDots
                      showArrows
                      imageSize="60%"
                      maxViewportHeight={320}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-default-500">
                    imageSize per slide
                  </h3>
                  <p className="mb-2 text-xs text-gray-default-600">
                    Individual slides can override{" "}
                    <code>imageSize</code> using{" "}
                    <code>images[i].imageSize</code>.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
