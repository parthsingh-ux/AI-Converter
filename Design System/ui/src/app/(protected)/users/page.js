// app/users/page.jsx
"use client";

import React from "react";
import Users from "@/components/Users";
import { FiUser } from "react-icons/fi";

const usersImage = "/userimage.jpg";

export default function UsersList() {
  return (
    <div className="bg-gray-50 rounded-2xl px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-primary-950-dark">Users</h1>
          <p className="text-sm text-gray-default-600">
            A flexible user preview component supporting avatars, icons,
            labels, and links, styled with theme colors.
          </p>
        </header>

        {/* ==================== PROPS OVERVIEW (FULL WIDTH) ==================== */}
        <section className="rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-primary-950-dark">
              Props Overview
            </h2>
            <p className="mt-1 text-sm text-gray-default-600">
              Core props for{" "}
              <code className="rounded bg-gray-default-100 px-1 text-xs">
                &lt;Users /&gt;
              </code>{" "}
              component.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-default-700">
            {/* Column 1 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">Core</h3>
              <ul className="space-y-1">
                <li>
                  <code>text</code> – main display name
                </li>
                <li>
                  <code>label</code> – secondary line (role, subtitle)
                </li>
                <li>
                  <code>display</code> –{" "}
                  <code>"image" | "icon" | "default"</code>
                </li>
                <li>
                  <code>imageSrc</code> – avatar image URL
                </li>
                <li>
                  <code>imageAlt</code> – image alt text
                </li>
                <li>
                  <code>icon</code> – React icon for icon mode
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Appearance
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>size</code> – <code>"sm" | "md" | "lg"</code>
                </li>
                <li>
                  <code>radius</code> –{" "}
                  <code>"none" | "sm" | "md" | "lg" | "full"</code>
                </li>
                <li>
                  <code>avatarColor</code> – theme color for avatar
                </li>
                <li>
                  <code>textColor</code> –{" "}
                  <code>"default" | "muted"</code>
                </li>
                <li>
                  <code>className</code> – extra wrapper classes
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                Link
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>linkLabel</code> – link text (e.g. handle)
                </li>
                <li>
                  <code>linkHref</code> – href for the link
                </li>
                <li>
                  <code>linkColor</code> – theme color for link
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==================== MAIN GRID (2 COL) ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* ---------- Basic Usage ---------- */}
          <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-gray-default-700 uppercase tracking-wide">
              Basic Usage
            </h2>
            <p className="text-xs text-gray-default-600">
              Simple user rows using image, default avatar, label, and link.
            </p>

            <div className="space-y-3 w-[260px]">
              {/* Image avatar */}
              <Users
                display="image"
                imageSrc={usersImage}
                text="Junior Garcia"
              />

              {/* Default Avatar */}
              <Users display="default" text="Default Avatar" />

              {/* With Description */}
              <Users
                display="image"
                imageSrc={usersImage}
                text="Junior Garcia"
                label="Software Engineer"
              />

              {/* With Link */}
              <Users
                display="image"
                imageSrc={usersImage}
                text="Junior Garcia"
                linkLabel="@jrgarciadev"
                linkHref="https://www.adaan.com/"
              />

              {/* With Icon Instead of Image */}
              <Users
                display="icon"
                icon={<FiUser size={18} />}
                text="With Icon Avatar"
                label="Icon-based user"
              />
            </div>
          </section>
          {/* ---------- Radius ---------- */}
          <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-gray-default-700 uppercase tracking-wide">
              Avatar Radius
            </h2>
            <p className="text-xs text-gray-default-600">
              Adjust avatar shape using{" "}
              <code className="bg-gray-default-100 px-1 rounded text-[11px]">
                radius
              </code>
              .
            </p>

            <div className="space-y-3 w-[260px]">
              <Users
                display="image"
                imageSrc={usersImage}
                text="Radius none"
                radius="none"
              />
              <Users
                display="image"
                imageSrc={usersImage}
                text="Radius sm"
                radius="sm"
              />
              <Users
                display="image"
                imageSrc={usersImage}
                text="Radius md"
                radius="md"
              />
              <Users
                display="image"
                imageSrc={usersImage}
                text="Radius lg"
                radius="lg"
              />
              <Users
                display="image"
                imageSrc={usersImage}
                text="Radius full"
                radius="full"
              />
            </div>
          </section>

          {/* ---------- Sizes ---------- */}
          <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-gray-default-700 uppercase tracking-wide">
              Sizes
            </h2>
            <p className="text-xs text-gray-default-600">
              Control avatar size with the{" "}
              <code className="bg-gray-default-100 px-1 rounded text-[11px]">
                size
              </code>{" "}
              prop.
            </p>

            <div className="space-y-3 w-[260px]">
              <Users
                display="image"
                imageSrc={usersImage}
                text="Small (size=sm)"
                size="sm"
              />
              <Users
                display="image"
                imageSrc={usersImage}
                text="Medium (size=md)"
                size="md"
              />
              <Users
                display="image"
                imageSrc={usersImage}
                text="Large (size=lg)"
                size="lg"
              />
            </div>
          </section>


          {/* ---------- Avatar Theme Colors ---------- */}
          <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-gray-default-700 uppercase tracking-wide">
              Avatar Theme Colors
            </h2>
            <p className="text-xs text-gray-default-600">
              Use{" "}
              <code className="bg-gray-default-100 px-1 rounded text-[11px]">
                avatarColor
              </code>{" "}
              to match your status or brand palette.
            </p>

            <div className="space-y-3 w-[260px]">
              <Users
                display="icon"
                icon={<FiUser size={18} />}
                text="Primary Avatar"
                avatarColor="primary"
              />
              <Users
                display="icon"
                icon={<FiUser size={18} />}
                text="Secondary Avatar"
                avatarColor="secondary"
              />
              <Users
                display="icon"
                icon={<FiUser size={18} />}
                text="Success Avatar"
                avatarColor="success"
              />
              <Users
                display="icon"
                icon={<FiUser size={18} />}
                text="Warning Avatar"
                avatarColor="warning"
              />
              <Users
                display="icon"
                icon={<FiUser size={18} />}
                text="Danger Avatar"
                avatarColor="danger"
              />
              <Users
                display="icon"
                icon={<FiUser size={18} />}
                text="Neutral Avatar"
                avatarColor="neutral"
              />
            </div>
          </section>

          {/* ---------- Link & Text Styles (full width on md via col-span-2) ---------- */}
          <section className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm space-y-4 mb-2 md:col-span-2">
            <h2 className="text-sm font-semibold text-gray-default-700 uppercase tracking-wide">
              Link & Text Styles
            </h2>
            <p className="text-xs text-gray-default-600">
              Control emphasis on name and link using{" "}
              <code className="bg-gray-default-100 px-1 rounded text-[11px]">
                textColor
              </code>{" "}
              and{" "}
              <code className="bg-gray-default-100 px-1 rounded text-[11px]">
                linkColor
              </code>
              .
            </p>

            <div className="space-y-3 w-[260px]">
              <Users
                display="image"
                imageSrc={usersImage}
                text="Default text / primary link"
                label="Regular emphasis"
                linkLabel="@user"
                linkHref="#"
                textColor="default"
                linkColor="primary"
              />
              <Users
                display="image"
                imageSrc={usersImage}
                text="Muted text / neutral link"
                label="Lower emphasis"
                linkLabel="@muted_user"
                linkHref="#"
                textColor="muted"
                linkColor="neutral"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
