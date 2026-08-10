"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Snowfall from "@/components/Snowfall";

const SignIn = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/");
  };

  return (
    <div
      className="fixed h-screen overflow-y-hidden bg-primary-950-dark overflow-x-hidden inset-0 flex justify-center items-center  p-5 "
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Snowfall />
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden hidden sm:block">
        <div>
          <div className="glow-blob bg-danger absolute w-[25vw] h-[25vw] top-[25%] left-[70%] opacity-60 rounded-[80%] blur-[50px]" />
          <div className="glow-blob bg-primary absolute w-[25vw] h-[25vw] bottom-[5%] left-[55%] opacity-60 rounded-full blur-[50px]" />
          <div className="glow-blob bg-warning absolute w-[25vw] h-[25vw] top-[10%] right-[30%] opacity-30 rounded-full blur-[50px]" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-7xl md:p-10 lg:p-16 mx-auto z-10 items-center justify-center">
        {/* Mobile Header */}
        <div className="block md:hidden text-left text-white w-full mb-4">
          <h1 className="text-4xl  leading-none">
            <span className="text-5xl font-bold sm:text-6xl text-white">
              Re-useable{" "}
            </span>
            <span className="text-5xl  sm:text-4xl text-primary">
              Component System
            </span>
          </h1>
        </div>

        {/* Left Side - Branding (hidden on mobile) */}
        <div className="hidden md:flex w-1/2 flex-col justify-center text-white px-4">
          <div className="max-w-lg">
            <h1 className="text-white text-6xl mb-3 font-bold leading-none">
              Re-useable
            </h1>
            <h1 className="text-5xl leading-none mb-4 text-primary">
              Component System
            </h1>
            <p className="text-subtext-muted leading-relaxed font-weight-400">
              A unified design system offering customizable components with
              consistent styles, sizes, colors, and radii. Built to ensure
              seamless UI development, maintain visual harmony, and accelerate
              product creation across all screens.
            </p>
          </div>
        </div>

        {/* right side  */}
        <div className="w-full md:w-1/2 bg-white z-10 shadow-2xl rounded-lg p-6 md:p-8 space-y-4 animate-fade-in">
          <div className="flex justify-start mb-6">
            <div
              className="relative"
              style={{
                width: "160px",
                height: "40px",
                backgroundImage: "url('/logo.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          <h2 className="text-3xl font-bold text-primary-50-dark">Welcome</h2>
          <p className="text-gray-default-600 mb-6">
            Explore our comprehensive library of reusable components and design tokens.
          </p>

          <button
            onClick={handleGetStarted}
            className="w-full text-white p-3 rounded-xl bg-layout-focus hover:bg-primary-hover hover:scale-[1.02] transition font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
