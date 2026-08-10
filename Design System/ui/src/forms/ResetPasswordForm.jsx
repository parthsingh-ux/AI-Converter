"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdLockReset, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const ResetPasswordForm = ({ user, onSubmit, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Please confirm the password"),
  });

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await onSubmit(values.newPassword);
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <MdLockReset className="h-6 w-6 text-primary-base" />
        <h2 className="text-xl font-semibold text-gray-900">Reset Password</h2>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Resetting password for: <strong>{user?.name}</strong>
        </p>
        <p className="text-xs text-gray-500">{user?.email}</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Field name="newPassword">
                  {({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className={`w-full px-3 py-2 border rounded-lg  pr-10 ${
                        errors.newPassword && touched.newPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter new password"
                    />
                  )}
                </Field>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
              <ErrorMessage
                name="newPassword"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Field name="confirmPassword">
                {({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className={`w-full px-3 py-2 border rounded-lg focus:border-transparent ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirm new password"
                  />
                )}
              </Field>
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary-base text-white rounded-lg hover:bg-primary-hover transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
