"use client";

import React from "react";

export default function Snowfall() {
  const flakes = Array.from({ length: 50 });

  return (
    <>
      <div className="snowfall-wrapper">
        {flakes.map((_, i) => (
          <span
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${10 + Math.random() * 20}px`,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      {/* Component Scoped CSS */}
      <style jsx>{`
        .snowfall-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        .snowflake {
          position: absolute;
          top: -10%;
          color: var(--color-primary-100);
          opacity: 0.8;
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          user-select: none;
        }

        @keyframes snowfall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
          }
        }

        /* Optional: Disable on mobile */
        @media (max-width: 768px) {
          .snowfall-wrapper {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
