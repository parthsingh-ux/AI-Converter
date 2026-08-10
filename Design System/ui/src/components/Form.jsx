"use client";

import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginForm({
  mode = "light",        // "light" | "dark"
  className = "",
  title = "Login",       // optional override
  submitLabel = "Login", // optional override
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isDark = mode === "dark";

  // container surface
  const containerClasses = isDark
    ? "bg-primary-950-dark text-primary-50-dark border border-gray-default-700"
    : "bg-content-content1 text-primary-950-dark border border-gray-default-200";

  // labels
  const labelClasses = isDark
    ? "text-gray-default-200"
    : "text-gray-default-700";

  // inputs
  const inputClasses = isDark
    ? "bg-primary-950-dark/80 border border-gray-default-600 text-primary-50-dark placeholder:text-gray-default-400-dark"
    : "bg-content-content1 border border-gray-default-300 text-primary-950-dark placeholder:text-gray-default-400";

  const dividerBorder = isDark
    ? "border-gray-default-700"
    : "border-gray-default-300";

  const dividerText = isDark
    ? "text-gray-default-400-dark bg-primary-950-dark"
    : "text-gray-default-400 bg-content-content1";

  const buttonClasses =
    "bg-layout-focus hover:bg-primary-hover";

  return (
    <div
      className={[
        "w-full space-y-6 rounded-2xl p-5 md:p-6 shadow-lg",
        "transition-colors duration-200",
        containerClasses,
        className,
      ].join(" ")}
    >
      {/* Logo placeholder */}
      <div className="mb-6 flex justify-start">
        <div
          className="relative"
          style={{
            width: "180px",
            height: "45px",
            backgroundImage: isDark
              ? "url('/Adaan-logo-white.png')"
              : "url('/logo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Title */}
      <h2
        className={[
          "text-2xl md:text-3xl font-bold tracking-tight",
          isDark ? "text-primary-50" : "text-primary-950-dark",
        ].join(" ")}
      >
        {title}
      </h2>

      {/* Form (UI-only) */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* Email */}
        <div className="relative">
          <h3 className={`${labelClasses} mb-2 text-sm font-medium`}>
            Email Address
          </h3>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            className={[
              "w-full rounded-xl p-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary-base",
              inputClasses,
            ].join(" ")}
          />
        </div>

        {/* Password */}
        <div className="relative">
          <h3 className={`${labelClasses} mb-2 text-sm font-medium`}>
            Password
          </h3>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            className={[
              "w-full rounded-xl p-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary-base",
              inputClasses,
            ].join(" ")}
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-default-400-dark"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={[
            "w-full rounded-xl p-3 text-sm font-medium text-white",
            "transition-transform duration-150 hover:scale-[1.02]",
            buttonClasses,
          ].join(" ")}
        >
          {submitLabel}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="flex items-center justify-center">
          <div className={`w-1/4 border-t ${dividerBorder}`} />
          <span
            className={[
              "px-4 text-xs font-medium uppercase tracking-wide",
              "rounded-full",
              dividerText,
            ].join(" ")}
          >
            OR
          </span>
          <div className={`w-1/4 border-t ${dividerBorder}`} />
        </div>
      </div>

      {/* Social login button */}
      <div className="flex w-full flex-col items-center justify-center">
        <button
          type="button"
          className={[
            "w-full rounded-xl py-2.5 text-sm font-medium",
            "border transition-colors",
            isDark
              ? "border-gray-default-600 bg-primary-950-dark/80 text-primary-50"
              : "border-gray-default-300 bg-content-content1 text-primary-950-dark hover:bg-gray-default-50",
          ].join(" ")}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
