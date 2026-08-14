"use client";

import "./globals.css";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserProvider } from "@/Design System/ui/src/context/UserContext";
import { SidebarProvider } from "@/Design System/ui/src/context/SidebarContext";
import { Icon } from "@iconify/react";

function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/", icon: "solar:widget-3-bold" },
    { label: "Page Deployment", href: "/deploy", icon: "solar:rocket-2-bold" },
    { label: "Theme History", href: "/history", icon: "solar:history-bold" },
    { label: "Documentation", href: "/docs", icon: "solar:document-bold" },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#010B14] text-[#F2F4F9] font-sans antialiased">
      {/* CLEAN HEADER BAR (No extra borders) */}
      <header className="h-16 bg-[#010B14] px-6 flex items-center justify-between z-30 shrink-0">
        {/* Left: Adaan Logo + App Title */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/Adaan-logo-white.png"
              alt="Adaan"
              className="h-7 object-contain"
            />
          </Link>
          <div className="h-4 w-px bg-[#4B545D]/30 mx-1 hidden sm:block" />
          <span className="font-bold text-lg text-white tracking-tight">AI Converter</span>
        </div>

      </header>

      {/* BODY LAYOUT: SIDEBAR + WHITE CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR (No extra borders) */}
        <aside
          className={`bg-[#010B14] p-3 pt-0 flex flex-col transition-all duration-300 shrink-0 ${isSidebarOpen ? "w-60" : "w-20"
            }`}
        >
          {/* Inner Menu Card (Clean borderless) */}
          <div className="bg-[#021528] rounded-2xl p-3 flex flex-col h-full shadow-xl">
            {/* Header & Collapse Toggle */}
            <div className="flex items-center justify-between pb-3 mb-2">
              {isSidebarOpen && (
                <span className="text-xs font-semibold text-[#97A3AF] uppercase tracking-wider pl-1">
                  Menu
                </span>
              )}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-7 h-7 rounded-lg bg-transparent hover:bg-[#191C1F] flex items-center justify-center text-[#97A3AF] hover:text-white transition-colors ml-auto"
                title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                <Icon
                  icon={isSidebarOpen ? "ep:d-arrow-left" : "ep:d-arrow-right"}
                  width="16"
                  height="16"
                />
              </button>
            </div>

            {/* Menu Items List */}
            <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;

                return (
                  <button
                    key={idx}
                    onClick={() => item.href !== "#" && router.push(item.href)}
                    className={`w-full flex items-center ${isSidebarOpen ? "px-3.5 justify-start" : "justify-center"
                      } py-2.5 rounded-xl font-medium text-sm transition-all ${isActive
                        ? "bg-[#0A69C9] text-white shadow-lg shadow-[#0A69C9]/30 font-semibold"
                        : "text-[#97A3AF] hover:text-white hover:bg-[#191C1F]"
                      }`}
                  >
                    <Icon
                      icon={item.icon}
                      width="18"
                      height="18"
                      className={`shrink-0 ${isActive ? "text-white" : "text-[#97A3AF]"}`}
                    />
                    {isSidebarOpen && (
                      <span className="ml-3 truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Version Footer */}
            {isSidebarOpen && (
              <div className="pt-3 text-center">
                <span className="text-[10px] text-[#97A3AF]/60 font-mono">
                  AI Converter v1.4.0
                </span>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT AREA: WHITE BACKGROUND (#F2F4F9) WITH ROUNDED TOP-LEFT CORNER */}
        <main className="flex-1 overflow-auto bg-[#F2F4F9] text-[#021528] rounded-tl-2xl p-6 sm:p-8 min-w-0 shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>AI Converter — AI Elementor Theme Generator</title>
        <meta name="description" content="Convert HTML, CSS, Images, PDFs, and Prompts into Elementor-ready themes." />
      </head>
      <body>
        <UserProvider>
          <SidebarProvider>
            <AppLayout>{children}</AppLayout>
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
