"use client";

import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variantClasses = {
  basic: "bg-gray-default-200",
  pulse: "bg-gray-default-200 animate-pulse",
  shine: `
    relative overflow-hidden bg-gray-default-200
    before:absolute before:inset-0
    before:-translate-x-full before:animate-[shine_1.5s_infinite]
    before:bg-gradient-to-r 
    before:from-transparent before:via-gray-default-100/60 before:to-transparent
  `,
  glow: `
    bg-gray-default-200 animate-[glow_1.8s_ease-in-out_infinite]
  `,
  soft: "bg-gray-default-100",
};

export default function Skeleton({
  loading = true,
  variant = "basic",
  className = "",
  children,
}) {
  const classes = cn(
    "rounded-xl",
    variantClasses[variant],
    className
  );

  // ⭐ WRAPPER MODE (FIXED)
  if (children) {
    return (
      <div className="relative inline-block w-fit">
        {loading ? (
          <div className={classes}>
            {/* Invisible real content used to keep exact height */}
            <div className="opacity-0 pointer-events-none">{children}</div>
          </div>
        ) : (
          children
        )}
      </div>
    );
  }

  // ⭐ BLOCK MODE
  return <div className={classes} />;
}

<style jsx global>{`
  @keyframes shine {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes glow {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`}</style>
