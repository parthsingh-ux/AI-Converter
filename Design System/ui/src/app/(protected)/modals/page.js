"use client";

import React from "react";
import UploadModals from "@/components/UploadModals";
import Popup from "@/components/Popup";
import BulkUserForm from "@/components/BulkUser";
import { Icon } from "@iconify/react";

export default function ModalShowcasePage() {
  return (
    <main className="rounded-2xl bg-gray-default-50 px-4 py-10 text-primary-950-dark md:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* ================= HEADER ================= */}
        <header className="space-y-3">
    

          <h1 className="text-3xl font-semibold tracking-tight">
            Modal Showcase
          </h1>

          <p className="max-w-2xl text-sm text-gray-default-600">
            Upload modals, confirmation popups and bulk forms, all built as
            reusable components and styled with your design tokens.
          </p>
        </header>

        {/* ================= PROPS OVERVIEW ================= */}
        <section className="space-y-4 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-primary-950-dark">
            Props Overview
          </h2>
          <p className="text-sm text-gray-default-600">
            High–level props for the modal components used on this page.
          </p>

          <div className="grid grid-cols-1 gap-4 text-xs text-gray-default-700 md:grid-cols-3">
            {/* UploadModal */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                <code>UploadModal</code>
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>onClose</code> — callback when modal should close
                </li>
                <li>
                  Drag &amp; drop + <code>&lt;input type="file" /&gt;</code>
                </li>
                <li>Internal file state, progress, status and toasts</li>
              </ul>
            </div>

            {/* Popup */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                <code>Popup</code>
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>isOpen</code> — controls visibility
                </li>
                <li>
                  <code>variant</code> —{" "}
                  <code>
                    "primary" | "secondary" | "success" | "danger" | "warning" |
                    "info"
                  </code>
                </li>
                <li>
                  <code>title</code>, <code>description</code>,{" "}
                  <code>primaryLabel</code>, <code>secondaryLabel</code>
                </li>
                <li>
                  <code>onPrimary</code>, <code>onSecondary</code>,{" "}
                  <code>onClose</code>, <code>icon</code>
                </li>
              </ul>
            </div>

            {/* BulkUserForm */}
            <div>
              <h3 className="mb-1 font-semibold text-primary-950-dark">
                <code>BulkUserForm</code>
              </h3>
              <ul className="space-y-1">
                <li>
                  <code>token</code> — auth token for API (string)
                </li>
                <li>
                  <code>onSuccess</code> — called after successful creation
                </li>
                <li>
                  <code>onClose</code> — optional close / cancel handler
                </li>
                <li>
                  Uses Formik + Yup for validation &amp; array of users
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= UPLOAD MODAL ================= */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Upload Modal
              </h2>
              <p className="text-sm text-gray-default-600">
                Drag &amp; drop CSV / Excel files with progress states,
                validation and toast feedback.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              component: UploadModal / UploadModals
            </span>
          </div>

          <div className="flex items-center justify-center bg-gray-default-50/80 rounded-2xl p-6 border border-dashed border-gray-default-200">
            {/* Assuming UploadModals is a trigger + modal handler */}
            <UploadModals />
          </div>
        </section>

        {/* ================= BULK USER CREATION MODAL ================= */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Bulk User Creation
              </h2>
              <p className="text-sm text-gray-default-600">
                Formik-powered bulk user creator with validation, avatar
                initials and dynamic user rows.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              component: BulkUserForm
            </span>
          </div>

          <div className="rounded-2xl border border-gray-default-100 bg-gray-default-50/70 p-4 md:p-5">
            {/* Provide safe no-op handlers + dummy token for the showcase */}
            <BulkUserForm
              token=""
              onSuccess={() => {}}
              onClose={() => {}}
            />
          </div>
        </section>

        {/* ================= ALERT / POPUP MODAL ================= */}
        <section className="space-y-5 rounded-2xl border border-gray-default-200 bg-content-content1 p-6 shadow-sm ">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-primary-950-dark">
                Alert / Confirmation Popup
              </h2>
              <p className="text-sm text-gray-default-600">
                Status-based modal with icon, title, description and primary /
                secondary actions.
              </p>
            </div>
            <span className="hidden rounded-full bg-gray-default-100 px-2 py-1 text-xs text-gray-default-600 md:inline-flex">
              component: Popup · props: variant, title, icon, actions…
            </span>
          </div>

          <div className="flex items-center justify-center bg-gray-default-50/80 rounded-2xl p-6 border border-dashed border-gray-default-200">
            <Popup
              isOpen={true}
              onClose={() => {}}
              variant="danger"
              title="Delete report?"
              description={
                "This action will permanently remove the selected report. You can’t undo this operation."
              }
              primaryLabel="Delete"
              secondaryLabel="Cancel"
              onPrimary={() => {
                // showcase handler – no-op in docs
              }}
              onSecondary={() => {}}
              icon={
                <Icon
                  icon="streamline-ultimate:bin-1"
                  width="20"
                  height="20"
                  className="text-danger"
                />
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
