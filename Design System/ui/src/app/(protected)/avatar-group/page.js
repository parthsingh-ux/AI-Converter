"use client";
import React from "react";
import Avatar, { AvatarGroup } from "@/components/Avatar";

const AvatarPage = () => {
  return (
    <div className="rounded-2xl bg-gray-default-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary-950-dark">
            Avatar Component Showcase
          </h1>
          <p className="mt-2 text-sm text-gray-default-600">
            Sizes, radiuses, variants and groups — compact visual reference.
          </p>
        </header>

        {/* VARIANT + COLOR + GROUP LAYOUTS */}
        <section className="rounded-2xl bg-content-content1 border border-gray-default-200 shadow-sm p-5 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Variant &amp; Color (Groups)
            </h2>
            <span className="text-[11px] uppercase tracking-wide text-gray-default-400">
              Row · Stack · Grid
            </span>
          </div>

          <p className="text-xs text-gray-default-600 mb-4">
            Icon, image and text avatars combined into different group layouts:
            row alignment, stacked overlaps and simple grids.
          </p>

          <div className="border border-primary-950-dark/40 rounded-xl p-4 md:p-5 bg-gray-default-50 space-y-6">
            {/* Groups by color / variant */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Primary row group */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium text-gray-default-700">
                  Row group · primary
                </span>
                <AvatarGroup layout="row" spacing={10}>
                  <Avatar size="md" variant="icon" color="primary" />
                  <Avatar
                    size="md"
                    variant="text"
                    color="primary"
                    text="PS"
                    textColor="var(--color-content-content1)"
                  />
                  <Avatar
                    size="md"
                    variant="image"
                    color="primary"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                  <Avatar
                    size="md"
                    variant="image"
                    color="primary"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                </AvatarGroup>
              </div>

              {/* Secondary / warning stacked */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium text-gray-default-700">
                  Stack group · warning
                </span>
                <AvatarGroup layout="stack" overlap={16} max={4}>
                  <Avatar
                    size="md"
                    variant="image"
                    color="warning"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                  <Avatar
                    size="md"
                    variant="image"
                    color="warning"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                  <Avatar
                    size="md"
                    variant="image"
                    color="warning"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                  <Avatar
                    size="md"
                    variant="image"
                    color="warning"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                  <Avatar
                    size="md"
                    variant="image"
                    color="secondary"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                </AvatarGroup>
              </div>

              {/* Grid group */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-medium text-gray-default-700">
                  Grid group
                </span>
                <AvatarGroup grid columns={3}>
                  <Avatar size="sm" variant="icon" color="success" />
                  <Avatar size="sm" variant="icon" color="warning" />
                  <Avatar size="sm" variant="icon" color="danger" />
                  <Avatar
                    size="sm"
                    variant="text"
                    color="default"
                    text="PS"
                    textColor="var(--color-layout-foreground)"
                  />
                  <Avatar
                    size="sm"
                    color="warning"
                    variant="image"
                    src="/Adaan-logo-white-col.png"
                    imageScale={0.5}
                  />
                  <Avatar size="sm" variant="icon" color="secondary" />
                </AvatarGroup>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AvatarPage;
