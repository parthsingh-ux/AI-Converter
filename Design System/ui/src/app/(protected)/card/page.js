"use client";

import React from "react";
import Card from "@/components/Card";

export default function CardsPlaygroundPage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* HEADER */}
        <header className="space-y-3">


          <h1 className="text-3xl font-semibold tracking-tight">
            Card gallery
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            A single{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              Card
            </code>{" "}
            component that can render text-only cards, media cards, hero
            banners and product tiles using props like{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              variant
            </code>
            ,{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              size
            </code>
            ,{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              radius
            </code>
            ,{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              imagePosition
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              align
            </code>
            .
          </p>
        </header>

        {/* 1. BASIC TEXT CARDS */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Basic text cards
              </h2>
              <p className="text-sm text-gray-default-600">
                Simple cards without media. Controlled by{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  variant
                </code>
                ,{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  size
                </code>{" "}
                and{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  textColor
                </code>
                .
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: variant, size, radius, textColor
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 1. Simple text card */}
            <Card
              variant="neutral"
              size="sm"
              radius="md"
              elevation="sm"
              borderStyle="subtle"
              title=""
              description="Lorem ipsum dolor sit amet consectetur. Leo blandit vehicula velit non ut."
              footerAlign="left"
            />

            {/* 2. Description card */}
            <Card
              variant="neutral"
              size="sm"
              radius="md"
              elevation="sm"
              borderStyle="subtle"
              title="Description"
              description="The Object constructor creates an object wrapper for the given value. When called in a non-constructor context, Object behaves identically to new Object()."
              footerAlign="left"
            />

            {/* 3. Profile / content card */}
            <Card
              variant="neutral"
              size="sm"
              radius="md"
              elevation="sm"
              borderStyle="subtle"
              title="Room-filling sound. Intelligent assistant."
              description="Smart-home control. Works seamlessly with iPhone. Check it out."
              footerAlign="left"
            >
              <p className="pt-2 text-[11px] text-primary-500">
                Visit source code on Github.
              </p>
            </Card>
          </div>
        </section>

        {/* 2. HERO & FEATURED MEDIA */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Hero &amp; featured cards
              </h2>
              <p className="text-sm text-gray-default-600">
                Uses{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  imagePosition="background"
                </code>{" "}
                with{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  overlay
                </code>
                . Great for promo banners.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: variant, imagePosition, overlay, footerAlign, textColor
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 4. Hero background event card */}
            <Card
              variant="dark"
              size="lg"
              radius="lg"
              elevation="lg"
              borderStyle="none"
              imageSrc="https://images.pexels.com/photos/2837009/pexels-photo-2837009.jpeg"
              imagePosition="background"
              overlay
              title="Stream the Apple event"
              description=""
              textColor="text-yellow-500"
              footerAlign="left"
              footerTextColor="light"
            />

            {/* 5. Acme Book (dark product card) */}
            <Card
              variant="primary"
              size="lg"
              radius="lg"
              elevation="lg"
              borderStyle="none"
              eyebrow="NEW"
              title="Acme Book"
              description="Lorem ipsum dolor sit amet consectetur. Nunc tristique neque suspendisse ullamcorper non blandit."
              imageSrc="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg"
              imagePosition="background"
              overlay
              textColor="text-yellow-500"
              footerAlign="between"
              footerTextColor="light"
              footer={
                <>
                  <span>Available soon.</span>
                  <button className="rounded-full bg-primary-500 px-3 py-1 text-[11px] font-medium text-primary-50-dark">
                    Notify Me
                  </button>
                </>
              }
            />

            {/* 6. Acme Camera (blue product card) */}
            <Card
              variant="primary"
              size="lg"
              radius="lg"
              elevation="lg"
              borderStyle="none"
              eyebrow="NEW"
              title="Acme Camera"
              description=""
              imageSrc="https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg"
              imagePosition="background"
              overlay
              textColor="text-yellow-500"
              footerAlign="between"
              footerTextColor="light"
              footer={
                <>
                  <span>Available soon.</span>
                  <button className="rounded-full bg-primary-50-dark/90 px-3 py-1 text-[11px] font-medium text-primary-900">
                    Notify Me
                  </button>
                </>
              }
            />
          </div>
        </section>

        {/* 3. PRODUCT & MEDIA TILES */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Media &amp; product tiles
              </h2>
              <p className="text-sm text-gray-default-600">
                Combines{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  imagePosition="top"
                </code>{" "}
                with{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  imageAspect
                </code>{" "}
                for music / product cards.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: imagePosition, imageAspect, footerAlign
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 7. Frontend Radio (square music card) */}
            <Card
              variant="neutral"
              size="md"
              radius="lg"
              elevation="sm"
              borderStyle="subtle"
              eyebrow="DAILY MIX · 18 TRACKS"
              title="Frontend Radio"
              imageSrc="https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg"
              imagePosition="top"
              imageAspect="square"
              footerAlign="left"
            />

            {/* 8. Orange product card */}
            <Card
              variant="neutral"
              size="sm"
              radius="lg"
              elevation="sm"
              borderStyle="subtle"
              imageSrc="https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg"
              imagePosition="top"
              imageAspect="4:3"
              title=""
              footerAlign="between"
              footer={
                <>
                  <span>Orange</span>
                  <span className="text-gray-default-500">$5.50</span>
                </>
              }
            />

            {/* 9. iPad image-only card */}
            <Card
              variant="neutral"
              size="sm"
              radius="lg"
              elevation="sm"
              borderStyle="subtle"
              title="iPad"
              imageSrc="https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg"
              imagePosition="top"
              imageAspect="4:3"
              footerAlign="left"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
