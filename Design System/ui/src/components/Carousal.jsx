"use client";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

/**
 * Carousel (imageSize + thumb-only type support)
 *
 * New type supported:
 * - "thumb-only"  -> renders only the thumbnail strip (arrows + thumbs)
 *
 * All previous props preserved.
 */

const RADIUS_TOKENS = { sm: "6px", md: "12px", lg: "20px" };

function resolveRadius(val, fallback = "12px") {
  if (!val) return fallback;
  if (typeof val === "string") {
    if (RADIUS_TOKENS[val]) return RADIUS_TOKENS[val];
    return val;
  }
  return `${val}px`;
}

function parseSizeValue(val) {
  if (val == null) return { type: "auto", value: null };
  if (typeof val === "number") return { type: "px", value: val };
  if (typeof val === "string") {
    const s = val.trim();
    if (s.endsWith("%")) {
      const n = parseFloat(s.slice(0, -1));
      return Number.isFinite(n) ? { type: "percent", value: n } : { type: "auto", value: null };
    }
    if (s.endsWith("px")) {
      const n = parseFloat(s.slice(0, -2));
      return Number.isFinite(n) ? { type: "px", value: n } : { type: "auto", value: null };
    }
    const n = Number(s);
    if (Number.isFinite(n)) return { type: "px", value: n };
  }
  return { type: "auto", value: null };
}

export default function Carousel({
  images = [],
  type = "with-thumbs", // "with-thumbs" | "simple" | "thumb-only"
  radius = "md",
  thumbnailRadius = "sm",
  showThumbnails,
  showDots = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 4000,
  visibleThumbnails = 5,
  className = "",
  maxViewportHeight = 820,
  imageSize = null,
}) {
  const [index, setIndex] = useState(0);
  const len = images.length;
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);
  const autoRef = useRef(null);

  const imageSizesRef = useRef(Array(images.length).fill(null));
  const [viewportHeight, setViewportHeight] = useState(260);

  const mainRadius = resolveRadius(radius);
  const thumbRadius = resolveRadius(thumbnailRadius);
  const shouldShowThumbs =
    typeof showThumbnails === "boolean" ? showThumbnails : type === "with-thumbs";

  // keyboard nav (works in all modes)
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, len]);

  // autoplay (ignored in thumb-only mode)
  useEffect(() => {
    if (!autoPlay || type === "thumb-only") return;
    stopAuto();
    autoRef.current = setInterval(() => setIndex((s) => (s + 1) % len), autoPlayInterval);
    return () => stopAuto();
  }, [autoPlay, autoPlayInterval, len, type]);

  function stopAuto() {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }

  function go(i) {
    const next = ((i % len) + len) % len;
    setIndex(next);
    // center thumbnail into view
    if (thumbsRef.current) {
      const thumbs = Array.from(thumbsRef.current.querySelectorAll("[data-thumb-index]"));
      const activeThumb = thumbs[next];
      if (activeThumb) {
        const container = thumbsRef.current;
        const thumbRect = activeThumb.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const scrollLeft =
          container.scrollLeft +
          (thumbRect.left - contRect.left) -
          contRect.width / 2 +
          thumbRect.width / 2;
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      }
    }
  }
  function next() {
    go(index + 1);
  }
  function prev() {
    go(index - 1);
  }

  // recompute viewport height (skipped in thumb-only)
  useEffect(() => {
    if (type === "thumb-only") return;
    computeAndSetViewportHeight(index);
    function onResize() {
      computeAndSetViewportHeight(index);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images, imageSize, type]);

  function resolveDesiredWidthPx(imgIndex) {
    const container = mainRef.current;
    if (!container) return null;
    const containerWidth = Math.max(200, container.clientWidth);
    const perImg = images[imgIndex] && images[imgIndex].imageSize;
    const parsed =
      perImg != null ? parseSizeValue(perImg) : parseSizeValue(imageSize);
    if (parsed.type === "auto") return null;
    if (parsed.type === "px") return Math.min(parsed.value, containerWidth);
    if (parsed.type === "percent") {
      const pxVal = Math.round((parsed.value / 100) * containerWidth);
      return Math.max(40, Math.min(pxVal, containerWidth));
    }
    return null;
  }

  function computeAndSetViewportHeight(imgIndex) {
    const sizes = imageSizesRef.current[imgIndex];
    const container = mainRef.current;
    if (!container) return;
    const containerWidth = Math.max(200, container.clientWidth);
    const desiredPx = resolveDesiredWidthPx(imgIndex);
    if (sizes && sizes.w && sizes.h) {
      const baseWidth = desiredPx || containerWidth;
      const scaledH = Math.min(
        Math.round((sizes.h * baseWidth) / sizes.w),
        maxViewportHeight
      );
      setViewportHeight(scaledH);
    } else {
      const found = imageSizesRef.current.find((s) => s && s.w && s.h);
      const baseWidth = desiredPx || containerWidth;
      if (found) {
        const scaledH = Math.min(
          Math.round((found.h * baseWidth) / found.w),
          maxViewportHeight
        );
        setViewportHeight(scaledH);
      } else {
        setViewportHeight(Math.min(420, Math.round(baseWidth * 0.45)));
      }
    }
  }

  function handleImgLoad(e, idx) {
    try {
      const img = e.target;
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      imageSizesRef.current[idx] = { w, h };
      if (idx === index) computeAndSetViewportHeight(idx);
    } catch (err) {}
  }

  if (!images || images.length === 0) {
    return (
      <div className={`text-sm text-gray-default-500 ${className}`}>
        No images
      </div>
    );
  }

  function thumbWidthFor(visible) {
    return Math.max(56, Math.floor((Math.min(640, visible * 80)) / visible));
  }
  const thumbWidth = thumbWidthFor(visibleThumbnails);

  // --------------------------
  // RENDER: thumb-only mode
  // --------------------------
  if (type === "thumb-only") {
    return (
      <div
        className={`carousel-thumb-only ${className} w-full flex items-center justify-center`}
      >
        <div className="relative flex items-center gap-3">
          {/* Left arrow */}
          {showArrows && (
            <button
              aria-label="Previous"
              onClick={prev}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-content-content1/90 border border-gray-default-200 shadow-sm hover:bg-content-content1 transition mr-2"
              style={{ zIndex: 20 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6L9 12L15 18"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <div
            ref={thumbsRef}
            className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1"
            style={{ alignItems: "center", scrollbarWidth: "none", maxWidth: "820px" }}
          >
            {images.map((img, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  data-thumb-index={i}
                  onClick={() => go(i)}
                  className={`relative flex-none rounded-lg overflow-hidden transition-transform ${
                    active ? "scale-105 ring-2 ring-primary-500/50" : "hover:scale-102"
                  }`}
                  style={{
                    width: thumbWidth,
                    height: 56,
                    padding: 6,
                    background: "white",
                    border: active
                      ? "1px solid rgba(59,130,246,0.12)"
                      : "1px solid rgba(15,23,42,0.04)",
                    borderRadius: thumbRadius,
                    boxShadow: active
                      ? "0 6px 18px rgba(59,130,246,0.08)"
                      : "0 2px 6px rgba(2,6,23,0.04)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt || `thumb-${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      borderRadius:
                        typeof thumbnailRadius === "string" &&
                        thumbnailRadius.endsWith("%")
                          ? thumbnailRadius
                          : "6px",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right arrow */}
          {showArrows && (
            <button
              aria-label="Next"
              onClick={next}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-content-content1/90 border border-gray-default-200 shadow-sm hover:bg-content-content1 transition ml-2"
              style={{ zIndex: 20 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#334155"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  // --------------------------
  // RENDER: normal modes
  // --------------------------
  return (
    <div className={`carousel-root ${className} max-w-full`}>
      <div
        // ref={mainRef}
        className="relative bg-content-content1 flex items-center p-8 justify-center overflow-hidden h-[500px]"
        style={{
          borderRadius: mainRadius,
          height: viewportHeight,
          transition: "height 320ms ease",
          boxShadow: "0 4px 12px rgba(15,23,42,0.06)",
        }}
        onMouseEnter={() => stopAuto()}
        onMouseLeave={() => {
          if (autoPlay) {
            stopAuto();
            autoRef.current = setInterval(
              () => setIndex((s) => (s + 1) % len),
              autoPlayInterval
            );
          }
        }}
      >
        <div className="w-full h-full relative">
          {images.map((img, i) => {
            const active = i === index;
            const desiredPx = resolveDesiredWidthPx(i);
            const imgStyle = {
              opacity: active ? 1 : 0,
              pointerEvents: active ? "auto" : "none",
              transition: "opacity 400ms ease",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              maxWidth: desiredPx ? `${desiredPx}px` : "100%",
              maxHeight: "100%",
              width: desiredPx ? `${desiredPx}px` : "auto",
              height: "auto",
              objectFit: "contain",
              position: "absolute",
            };

            return (
              <img
                key={i}
                src={img.src}
                alt={img.alt || `slide-${i + 1}`}
                onLoad={(e) => handleImgLoad(e, i)}
                className="absolute transition-opacity duration-400"
                style={imgStyle}
              />
            );
          })}
        </div>

        {/* Arrows */}
        {showArrows && (
          <>
            <button
              aria-label="Previous slide"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center bg-default shadow-sm hover:bg-content-content1 transition"
              style={{ zIndex: 40 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Icon
                  icon="oui:arrow-left"
                  width="22"
                  height="22"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </button>

            <button
              aria-label="Next slide"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center bg-default shadow-sm hover:bg-content-content1 transition"
              style={{ zIndex: 40 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Icon
                  icon="oui:arrow-right"
                  width="22"
                  height="22"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {showDots && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === index ? "bg-gray-default-800" : "bg-gray-default-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails rail */}
      {shouldShowThumbs && (
        <div className="mt-4">
          <div
            ref={thumbsRef}
            className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1"
            style={{ alignItems: "center", scrollbarWidth: "none" }}
          >
            {images.map((img, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  data-thumb-index={i}
                  onClick={() => go(i)}
                  className={`relative flex-none rounded-lg overflow-hidden transition-transform ${
                    active ? "scale-105" : "hover:scale-102"
                  }`}
                  style={{
                    width: thumbWidth,
                    height: 56,
                    padding: 6,
                    background: "white",
                    border: active
                      ? "1px solid rgba(59,130,246,0.12)"
                      : "1px solid rgba(15,23,42,0.04)",
                    borderRadius: thumbRadius,
                    boxShadow: active
                      ? "0 6px 18px rgba(59,130,246,0.08)"
                      : "0 2px 6px rgba(2,6,23,0.04)",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt || `thumb-${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      borderRadius:
                        typeof thumbnailRadius === "string" &&
                        thumbnailRadius.endsWith("%")
                          ? thumbnailRadius
                          : "6px",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
