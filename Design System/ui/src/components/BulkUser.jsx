// @/forms/BulkUserForm.js
"use client";

import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MdAdd,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { createMultipleUsersApi } from "@/apiServices/authApiServices";
import { useState } from "react";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import { Icon } from "@iconify/react";

const BulkUserForm = ({ token, onSuccess, onClose }) => {
  const [showPasswords, setShowPasswords] = useState({});

  const togglePasswordVisibility = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const userSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["qa", "designer", "admin"], "Invalid role")
      .required("Role is required"),
  });

  const validationSchema = Yup.object({
    users: Yup.array()
      .of(userSchema)
      .min(1, "At least one user is required")
      .test("unique-emails", "Duplicate emails found", function (users) {
        if (!users) return true;
        const emails = users
          .map((user) => user.email?.toLowerCase())
          .filter(Boolean);
        const uniqueEmails = new Set(emails);
        return emails.length === uniqueEmails.size;
      }),
  });

  const initialValues = {
    users: [{ name: "", email: "", password: "", role: "designer" }],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createMultipleUsersApi(values.users, token);
      toast.success("Users created successfully!");
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Error creating users:", error);
      toast.error("Failed to create users");
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full max-w-5xl mx-auto max-h-[80vh] overflow-y-auto rounded-2xl border border-gray-default-200 bg-content-content1 p-5 md:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-lg md:text-2xl font-semibold text-primary-950-dark">
          Create users
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form className="space-y-4">
            <FieldArray name="users">
              {({ push, remove }) => (
                <div className="space-y-4">
                  <div className="space-y-4 max-h-110 overflow-y-auto">
                    {values.users.map((user, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-gray-default-200 bg-content-content1/60 p-4"
                      >
                        {/* Row header */}
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-sm font-medium text-primary-950-dark">
                            User {index + 1}
                          </h3>
                          {values.users.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="rounded-full p-1.5 text-gray-default-500 transition hover:bg-gray-default-100 hover:text-gray-default-700"
                            >
                              <RxCross2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        {/* Avatar preview */}
                        <div className="mb-3 flex justify-start">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-default-100 text-lg font-semibold uppercase text-primary-950-dark shadow-sm">
                            {user.name ? (
                              getInitials(user.name)
                            ) : (
                              <Icon
                                icon="solar:user-outline"
                                width="24"
                                height="24"
                                className="text-gray-default-500"
                              />
                            )}
                          </div>
                        </div>

                        {/* Fields grid */}
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
                          {/* Name */}
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-default-700">
                              Name
                            </label>
                            <Field name={`users[${index}].name`}>
                              {({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className={[
                                    "w-full rounded-lg border px-3 py-2 text-sm",
                                    "bg-content-content1 text-primary-950-dark placeholder:text-gray-default-400",
                                    "focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500",
                                    errors.users?.[index]?.name &&
                                    touched.users?.[index]?.name
                                      ? "border-danger"
                                      : "border-gray-default-200",
                                  ].join(" ")}
                                  placeholder="Enter name"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name={`users[${index}].name`}
                              component="p"
                              className="mt-1 text-xs text-danger"
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-default-700">
                              Email
                            </label>
                            <Field name={`users[${index}].email`}>
                              {({ field }) => (
                                <input
                                  {...field}
                                  type="email"
                                  className={[
                                    "w-full rounded-lg border px-3 py-2 text-sm",
                                    "bg-content-content1 text-primary-950-dark placeholder:text-gray-default-400",
                                    "focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500",
                                    errors.users?.[index]?.email &&
                                    touched.users?.[index]?.email
                                      ? "border-danger"
                                      : "border-gray-default-200",
                                  ].join(" ")}
                                  placeholder="Enter email"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name={`users[${index}].email`}
                              component="p"
                              className="mt-1 text-xs text-danger"
                            />
                          </div>

                          {/* Password */}
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-default-700">
                              Password
                            </label>
                            <div className="relative">
                              <Field name={`users[${index}].password`}>
                                {({ field }) => (
                                  <input
                                    {...field}
                                    type={
                                      showPasswords[index] ? "text" : "password"
                                    }
                                    className={[
                                      "w-full rounded-lg border px-3 py-2 pr-9 text-sm",
                                      "bg-content-content1 text-primary-950-dark placeholder:text-gray-default-400",
                                      "focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500",
                                      errors.users?.[index]?.password &&
                                      touched.users?.[index]?.password
                                        ? "border-danger"
                                        : "border-gray-default-200",
                                    ].join(" ")}
                                    placeholder="Enter password"
                                  />
                                )}
                              </Field>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(index)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-default-400 hover:text-gray-default-600"
                              >
                                {showPasswords[index] ? (
                                  <MdVisibilityOff className="h-4 w-4" />
                                ) : (
                                  <MdVisibility className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            <ErrorMessage
                              name={`users[${index}].password`}
                              component="p"
                              className="mt-1 text-xs text-danger"
                            />
                          </div>

                          {/* Role */}
                          <div>
                            <label className="mb-1 block text-xs font-medium text-gray-default-700">
                              Role
                            </label>
                            <Field name={`users[${index}].role`}>
                              {({ field }) => (
                                <select
                                  {...field}
                                  className={[
                                    "w-full rounded-lg border px-3 py-2 text-sm",
                                    "bg-content-content1 text-primary-950-dark",
                                    "focus:outline-none focus:ring-2 focus:ring-primary-500/70 focus:border-primary-500",
                                    errors.users?.[index]?.role &&
                                    touched.users?.[index]?.role
                                      ? "border-danger"
                                      : "border-gray-default-200",
                                  ].join(" ")}
                                >
                                  <option value="qa">QA</option>
                                  <option value="designer">Designer</option>
                                  <option value="admin">Admin</option>
                                </select>
                              )}
                            </Field>
                            <ErrorMessage
                              name={`users[${index}].role`}
                              component="p"
                              className="mt-1 text-xs text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Top-level array error (e.g. duplicate emails) */}
                  {errors.users && typeof errors.users === "string" && (
                    <div className="rounded-md bg-danger-50 p-2 text-xs text-danger">
                      {errors.users}
                    </div>
                  )}

                  {/* Add user button */}
                  <button
                    type="button"
                    onClick={() => {
                      push({
                        name: "",
                        email: "",
                        password: "",
                        role: "designer",
                      });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary-700"
                  >
                    <MdAdd className="h-4 w-4" />
                    Add another user
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Footer actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="min-w-[120px] rounded-xl border border-gray-default-300 bg-content-content1 px-6 py-2 text-sm font-medium text-gray-default-700 transition hover:bg-gray-default-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="min-w-[160px] rounded-xl bg-primary px-6 py-2 text-sm font-medium text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating users..."
                  : `Create ${values.users.length} user${
                      values.users.length > 1 ? "s" : ""
                    }`}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BulkUserForm;
