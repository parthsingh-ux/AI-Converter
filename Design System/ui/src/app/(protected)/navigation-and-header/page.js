"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/SideBar";

export default function NavbarSidebarShowcasePage() {
  const [isOpenDark, setIsOpenDark] = useState(true);
  const [isOpenLight, setIsOpenLight] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { label: "Dashboard", href: "#", icon: "solar:home-2-line-duotone" },
    { label: "Analytics", href: "#", icon: "solar:chart-2-line-duotone" },
    { label: "Projects", href: "#", icon: "solar:folder-with-files-line-duotone" },
    { label: "Settings", href: "#", icon: "solar:settings-line-duotone" },
  ];

  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* PAGE HEADER */}
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Navbar & Sidebar playground
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            Composable{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              Navbar
            </code>{" "}
            and{" "}
            <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
              Sidebar
            </code>{" "}
            components with theme-aware light / dark modes, logo slots and
            menu configuration.
          </p>
        </header>

        {/* PROPS OVERVIEW */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Props overview
              </h2>
              <p className="text-sm text-gray-default-600">
                Core props for{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  &lt;Navbar /&gt;
                </code>{" "}
                and{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  &lt;Sidebar /&gt;
                </code>
                .
              </p>
            </div>

            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: mode, menuItems, isOpen, iconColor, logos…
            </span>
          </div>

          <div className="grid gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* Layout */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Layout & state
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>mode</code> — <code>"light" | "dark"</code>
                </li>
                <li>
                  <code>menuItems</code> — array of{" "}
                  <code>{`{ label, href, icon }`}</code>
                </li>
                <li>
                  <code>activeItem</code> — currently selected label (parent state)
                </li>
                <li>
                  <code>setActiveItem</code> — setter to update active menu
                </li>
              </ul>
            </div>

            {/* Navbar */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Navbar props
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>mode</code> — theme colors / tokens
                </li>
                <li>
                  <code>iconColor</code> — optional override for top-right icon
                </li>
                <li>
                  Uses{" "}
                  <code className="rounded bg-gray-default-100 px-1 py-0.5 text-[11px]">
                    useUserContext
                  </code>{" "}
                  for name, email & role.
                </li>
                <li>
                  Built-in logout handler with toast + redirect.
                </li>
              </ul>
            </div>

            {/* Sidebar */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Sidebar props
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>mode</code> — light / dark surface + border tokens
                </li>
                <li>
                  <code>isOpen</code> — collapsed vs expanded width
                </li>
                <li>
                  <code>setIsOpen</code> — toggle handler (parent-controlled)
                </li>
                <li>
                  <code>logoFullDark</code>, <code>logoMiniDark</code>,{" "}
                  <code>logoFullLight</code>, <code>logoMiniLight</code> — logo
                  URLs per theme
                </li>
                <li>
                  <code>children</code> /{" "}
                  <code className="rounded bg-gray-default-100 px-1 py-0.5 text-[11px]">
                    customSidebar
                  </code>{" "}
                  slot for custom content.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* NAVBAR ONLY */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Navbar (standalone)
              </h2>
              <p className="text-sm text-gray-default-600">
                Top app bar using{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  mode
                </code>{" "}
                and theme tokens to adapt between light and dark.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: mode, iconColor
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Dark Navbar */}
            <div className="overflow-hidden rounded-2xl border border-gray-default-200 bg-primary-950-dark">
              <div className="border-b border-gray-default-800 px-4 py-3">
                <h3 className="text-sm font-medium text-primary-900-dark">
                  Dark mode navbar
                </h3>
              </div>
              <Navbar mode="dark" />
            </div>

            {/* Light Navbar */}
            <div className="overflow-hidden rounded-2xl border border-gray-default-200 bg-content-content1">
              <div className="border-b border-gray-default-200 px-4 py-3">
                <h3 className="text-sm font-medium text-primary-950-dark">
                  Light mode navbar
                </h3>
              </div>
              <Navbar mode="light" />
            </div>
          </div>
        </section>

        {/* SIDEBAR ONLY */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Sidebar (standalone)
              </h2>
              <p className="text-sm text-gray-default-600">
                Collapsible vertical navigation using{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  isOpen
                </code>{" "}
                and{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  setIsOpen
                </code>{" "}
                from the parent.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: mode, isOpen, setIsOpen, menuItems
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Dark sidebar */}
            <div className="overflow-hidden rounded-2xl border border-gray-default-200 bg-primary-950-dark">
              <div className="border-b border-gray-default-800 px-4 py-3">
                <h3 className="text-sm font-medium text-primary-900-dark">
                  Dark mode sidebar
                </h3>
              </div>
              <div className="flex h-80">
                <Sidebar
                  mode="dark"
                  isOpen={isOpenDark}
                  setIsOpen={setIsOpenDark}
                  menuItems={menuItems}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <div className="flex flex-1 items-center justify-center text-primary-900-dark">
                  Content area
                </div>
              </div>
            </div>

            {/* Light sidebar */}
            <div className="overflow-hidden rounded-2xl border border-gray-default-200 bg-content-content1">
              <div className="border-b border-gray-default-200 px-4 py-3">
                <h3 className="text-sm font-medium text-primary-950-dark">
                  Light mode sidebar
                </h3>
              </div>
              <div className="flex h-80">
                <Sidebar
                  mode="light"
                  isOpen={isOpenLight}
                  setIsOpen={setIsOpenLight}
                  menuItems={menuItems}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                />
                <div className="flex flex-1 items-center justify-center text-gray-default-700">
                  Content area
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMBINED LAYOUT */}
        <section className="mb-6 space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Combined layout
              </h2>
              <p className="text-sm text-gray-default-600">
                Full-page layout with{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  Navbar
                </code>{" "}
                on top and{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  Sidebar
                </code>{" "}
                on the side, sharing the same{" "}
                <code className="rounded bg-gray-default-100 px-1 py-0.5 text-xs">
                  mode
                </code>{" "}
                prop.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              props: mode, isOpen, menuItems
            </span>
          </div>

          <div className="space-y-6">
            {/* Dark layout */}
            <div className="overflow-hidden rounded-2xl border border-gray-default-200 bg-primary-950-dark">
              <Navbar mode="dark" />
              <div className="flex h-80">
                <Sidebar
                  mode="dark"
                  isOpen={isOpenDark}
                  setIsOpen={setIsOpenDark}
                  menuItems={menuItems}
                />
                <main className="flex flex-1 items-center justify-center p-6 text-primary-900-dark">
                  Dark layout preview
                </main>
              </div>
            </div>

            {/* Light layout */}
            <div className="overflow-hidden rounded-2xl border border-gray-default-200 bg-content-content1">
              <Navbar mode="light" />
              <div className="flex h-80">
                <Sidebar
                  mode="light"
                  isOpen={isOpenLight}
                  setIsOpen={setIsOpenLight}
                  menuItems={menuItems}
                />
                <main className="flex flex-1 items-center justify-center p-6 text-primary-950-dark">
                  Light layout preview
                </main>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
