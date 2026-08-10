"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiUserPlus, FiEdit, FiEye, FiEyeOff } from "react-icons/fi";
import { signupApi, updateUserApi } from "@/apiServices/authApiServices";
import { useState } from "react";
import { toast } from "react-toastify";

const getValidationSchema = (isEditing) =>
  Yup.object().shape({
    name: Yup.string().trim().required("Name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email is required"),
    role: Yup.string()
      .oneOf(["admin", "qa", "designer"], "Invalid role")
      .required("Role is required"),
    password: isEditing
      ? Yup.string().notRequired()
      : Yup.string()
          .min(6, "Minimum 6 characters")
          .required("Password is required"),
  });

const UserForm = ({ selectedUser, token, onClose, onSuccess }) => {
  const isEditing = !!selectedUser;
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    role: selectedUser?.role || "",
    password: "",
    is_active: selectedUser?.is_active ?? true,
    is_verified: selectedUser?.is_verified ?? true,
    createdBy: selectedUser?.createdBy?.email || "N/A",
    updatedBy: selectedUser?.updatedBy?.email || "N/A",
  };

  const userFormFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "qa", label: "QA" },
        { value: "designer", label: "Designer" },
      ],
    },
    ...(!isEditing
      ? [{ name: "password", label: "Password", type: "password" }]
      : []),
    { name: "createdBy", label: "Created By", type: "text", readOnly: true },
    { name: "updatedBy", label: "Updated By", type: "text", readOnly: true },
  ];

  const dropdownFields = [
    {
      name: "is_active",
      label: "Active Status",
      options: [
        { value: true, label: "Active" },
        { value: false, label: "Inactive" },
      ],
    },
    {
      name: "is_verified",
      label: "Verification Status",
      options: [
        { value: true, label: "Verified" },
        { value: false, label: "Unverified" },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-start md:items-center px-3 sm:px-4 py-4 sm:py-6 overflow-y-auto">
      <div className="w-full max-w-xl sm:max-w-2xl  p-3 sm:p-4 md:p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(isEditing)}
          onSubmit={async (values, actions) => {
            try {
              const processedValues = {
                ...values,
                is_active:
                  values.is_active === "true" || values.is_active === true,
                is_verified:
                  values.is_verified === "true" || values.is_verified === true,
              };

              if (isEditing) {
                await updateUserApi(selectedUser._id, processedValues, token);
                toast.success(`User "${values.name}" updated successfully!`);
              } else {
                await signupApi(processedValues, token);
                toast.success(`User "${values.name}" created successfully!`);
              }

              actions.setSubmitting(false);
              onSuccess?.();
            } catch (err) {
              console.error("Form submission error:", err);
              const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong";
              toast.error(
                isEditing
                  ? `Failed to update user: ${errorMessage}`
                  : `Failed to create user: ${errorMessage}`
              );
              actions.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 sm:space-y-6">
              {/* Header */}
              <div className="flex items-center justify-center sm:justify-start text-primary-950-dark">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3 text-center sm:text-left">
                  {isEditing ? <FiEdit /> : <FiUserPlus />}
                  <span>{isEditing ? "Edit User" : "Create User"}</span>
                </h1>
              </div>

              {/* Main fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {userFormFields.map((field) => {
                  if (field.type === "select") {
                    return (
                      <div key={field.name} className="flex flex-col col-span-1">
                        <label
                          htmlFor={field.name}
                          className="font-medium mb-1 text-xs sm:text-sm"
                        >
                          {field.label}
                        </label>
                        <Field
                          as="select"
                          id={field.name}
                          name={field.name}
                          className="border border-gray-default-400 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring w-full"
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name={field.name}
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={field.name} className="flex flex-col col-span-1">
                      <label
                        htmlFor={field.name}
                        className="font-medium mb-1 text-xs sm:text-sm"
                      >
                        {field.label}
                      </label>
                      {field.type === "password" ? (
                        <div className="relative">
                          <Field
                            id={field.name}
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            className="border border-gray-default-400 px-3 py-2 rounded-md text-sm w-full pr-10 focus:outline-none focus:ring"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword((prev) => !prev)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-default-600"
                          >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                          </button>
                        </div>
                      ) : (
                        <Field
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          disabled={field.readOnly}
                          className={`border border-gray-default-400 px-3 py-2 rounded-md text-sm w-full ${
                            field.readOnly
                              ? "bg-white text-gray-default-900 cursor-not-allowed"
                              : "focus:outline-none focus:ring"
                          }`}
                        />
                      )}

                      <ErrorMessage
                        name={field.name}
                        component="div"
                        className="text-red-500  text-xs mt-1"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Dropdown fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {dropdownFields.map((field) => (
                  <div key={field.name} className="flex flex-col col-span-1">
                    <label
                      htmlFor={field.name}
                      className="font-medium mb-1 text-xs text-gray-default-900 sm:text-sm"
                    >
                      {field.label}
                    </label>
                    <Field
                      as="select"
                      id={field.name}
                      name={field.name}
                      className="border border-gray-default-400 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring w-full"
                    >
                      {field.options.map((opt) => (
                        <option key={opt.value.toString()} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Field>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-default-400 text-gray-default-800 rounded-md hover:bg-gray-default-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition disabled:opacity-70"
                >
                  {isSubmitting
                    ? "Processing..."
                    : isEditing
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserForm;
