// @/forms/BulkUserForm.js
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MdGroupAdd,
  MdAdd,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { Icon } from "@iconify/react";
import { createMultipleUsersApi } from "@/apiServices/authApiServices";
import { useState } from "react";
import { toast } from "react-toastify";

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
      onSuccess();
    } catch (error) {
      console.error("Error creating users:", error);
      toast.error("Failed to create users");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-5xl mx-auto max-h-[80vh] overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <MdGroupAdd className="h-6 w-6 text-primary-950-dark" />
        <h2 className="text-xl font-semibold text-primary-950-dark">
          Create Multiple Users
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
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {values.users.map((user, index) => (
                      <div
                        key={index}
                        className="border border-gray-default-300 rounded-xl p-4"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-sm font-medium text-gray-default-800">
                            User {index + 1}
                          </h3>
                          {values.users.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-danger hover:text-danger-600"
                            >
                              <Icon
                                              icon="fluent:delete-24-regular"
                                              width="24"
                                              height="24"
                                            />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                          {/* Name Field */}
                          <div>
                            <label className="block text-xs font-medium text-gray-default-800 mb-2">
                              Name
                            </label>
                            <Field name={`users[${index}].name`}>
                              {({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className={`w-full px-3 py-2 text-sm border border-gray-default-300 rounded   ${
                                    errors.users?.[index]?.name &&
                                    touched.users?.[index]?.name
                                      ? "border-danger"
                                      : "border-gray-default-400"
                                  }`}
                                  placeholder="Enter name"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name={`users[${index}].name`}
                              component="p"
                              className="text-danger text-xs mt-1"
                            />
                          </div>

                          {/* Email Field */}
                          <div>
                            <label className="block text-xs font-medium text-gray-default-800 mb-2">
                              Email
                            </label>
                            <Field name={`users[${index}].email`}>
                              {({ field }) => (
                                <input
                                  {...field}
                                  type="email"
                                  className={`w-full px-3 py-2 text-sm border rounded   ${
                                    errors.users?.[index]?.email &&
                                    touched.users?.[index]?.email
                                      ? "border-danger"
                                      : "border-gray-default-400"
                                  }`}
                                  placeholder="Enter email"
                                />
                              )}
                            </Field>
                            <ErrorMessage
                              name={`users[${index}].email`}
                              component="p"
                              className="text-danger text-xs mt-1"
                            />
                          </div>

                          {/* Password Field */}
                          <div>
                            <label className="block text-xs font-medium text-gray-default-800 mb-2">
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
                                    className={`w-full px-3 py-2 pr-10 text-sm border rounded   ${
                                      errors.users?.[index]?.password &&
                                      touched.users?.[index]?.password
                                        ? "border-danger"
                                        : "border-gray-default-400"
                                    }`}
                                    placeholder="Enter password"
                                  />
                                )}
                              </Field>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(index)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
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
                              className="text-danger text-xs mt-1"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-default-800 mb-2">
                              Role
                            </label>
                            <Field name={`users[${index}].role`}>
                              {({ field }) => (
                                <select
                                  {...field}
                                  className={`w-full px-3 py-2 text-sm border rounded   ${
                                    errors.users?.[index]?.role &&
                                    touched.users?.[index]?.role
                                      ? "border-danger"
                                      : "border-gray-default-400"
                                  }`}
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
                              className="text-danger text-xs mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.users && typeof errors.users === "string" && (
                    <div className="text-danger text-sm p-2 bg-danger-50 rounded">
                      {errors.users}
                    </div>
                  )}
<div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
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
                    className="flex items-center gap-2 px-4 py-2 text-primary-950-dark border border-gray-default-400 rounded-lg hover:bg-primary hover:text-white transition"
                  >
                    <MdAdd />
                    Add Another User
                  </button>
                </div>
                </div>
              )}
            </FieldArray>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-gray-default-400 text-gray-default-800 rounded-md hover:bg-gray-default-200 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Creating Users..."
                  : `Create ${values.users.length} User${
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
