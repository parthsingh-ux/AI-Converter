"use client";

import Link from "next/link";
import { useSidebarContext } from "@/context/SidebarContext";
import { Icon } from "@iconify/react";
import React from "react";

export default function Sidebar({
  mode = "dark",
  isOpen,
  setIsOpen,
  menuItems = [],
  children,
  logoFullDark = "/Adaan-logo-white.png",
  logoMiniDark = "/Adaan-logo-white-col.png",
  logoFullLight = "/logo.png",
  logoMiniLight = "/fav-logo.png",
}) {
  const { customSidebar } = useSidebarContext();

  const themeColors = {
    dark: {
      outerBg: "bg-primary-950-dark",
      cardBg: "bg-primary-900",
      border: "border-gray-default-200-dark",
      label: "text-gray-default-500-dark",
      toggle: "text-gray-default-600-dark",
      link: "text-gray-default-900-dark",
      hover: "hover:bg-primary-800/70",
      logoFull: logoFullDark,
      logoMini: logoMiniDark,
    },
    light: {
      outerBg: "bg-content-content1",
      cardBg: "bg-gray-default-50",
      border: "border-gray-default-200",
      label: "text-gray-default-600",
      toggle: "text-gray-default-700",
      link: "text-primary-950-dark",
      hover: "hover:bg-gray-default-100",
      logoFull: logoFullLight,
      logoMini: logoMiniLight,
    },
  };

  const theme = themeColors[mode] || themeColors.dark;

  return (
    <div className="relative h-full">
      {/* Outer shell – height comes from parent (e.g. h-90 / h-[420px]) */}
      <div
        className={`${theme.outerBg} h-full shadow-xl flex flex-col transition-all duration-300 ${
          isOpen ? "w-56" : "w-20"
        }`}
      >
        {/* LOGO (fixed) */}
        <div className="pt-4 pb-4 flex justify-center">
          <Link
            href="/"
            className="flex h-12 items-center justify-center w-full"
          >
            {isOpen ? (
              <img
                src={theme.logoFull}
                alt="logo"
                className="w-32 object-contain px-2"
              />
            ) : (
              <img
                src={theme.logoMini}
                alt="logo"
                className="w-8 object-contain"
              />
            )}
          </Link>
        </div>

        {/* INNER CARD – fills remaining height */}
        <div className="flex-1 px-2 pb-3">
          <div
            className={`${theme.cardBg} ${theme.border} rounded-2xl p-3 
            transition-all duration-300 flex flex-col h-full ${
              isOpen ? "w-full" : "w-16 mx-auto"
            }`}
          >
            {/* HEADER (fixed inside card) */}
            <div className="flex items-center justify-between w-full mb-3 flex-shrink-0">
              {isOpen && (
                <h2 className={`${theme.label} text-sm`}>
                  Menu
                </h2>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg ${theme.toggle}`}
              >
                <Icon
                  icon={isOpen ? "ep:d-arrow-left" : "ep:d-arrow-right"}
                  width="18"
                  height="18"
                />
              </button>
            </div>

            {/* MENU AREA  */}
            <div
              className="
                flex-1 
                overflow-y-auto 
                pr-1 
                max-h-[calc(95vh-140px)]
                [scrollbar-width:none] [-ms-overflow-style:none]
              "
            >
              {customSidebar ? (
                customSidebar
              ) : children ? (
                children
              ) : (
                <nav className="w-full space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href }
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm 
                        ${theme.link} ${theme.hover} transition-colors
                        ${!isOpen ? "justify-center" : ""}`}
                    >
                      {item.icon && (
                        <Icon
                          icon={item.icon}
                          width="18"
                          height="18"
                          className="flex-shrink-0"
                        />
                      )}
                      {isOpen && <span>{item.label}</span>}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
