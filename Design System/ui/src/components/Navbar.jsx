"use client";

import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { Icon } from "@iconify/react";
import Switch from "./Switch";

export default function Navbar({ mode = "dark" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useUserContext();

  const isDevMode = pathname === '/dev-mode';

  const colorMap = {
    dark: {
      bg: "bg-primary-950-dark",
      text: "text-primary-900-dark",
      icon: "text-primary-800-dark",
      border: "border-gray-default-200-dark",
      subText: "text-content-content4-dark",
      buttonBg: "bg-gray-default-100-dark/90",
      dropdownBg: "bg-primary-900",
      dropdownText: "text-primary-900-dark",
      dropdownBorder: "border-gray-default-200-dark",
      muted: "text-gray-default-500-dark",
      avatarBg: "bg-gray-default-100-dark/30",
      iconColor: "text-white",
      textColor: "text-danger",
      textBgColor: "bg-danger-50",
    },
    light: {
      bg: "bg-content-content1",
      text: "text-primary-950-dark",
      icon: "text-gray-default-700",
      border: "border-gray-default-200",
      subText: "text-gray-default-500",
      buttonBg: "bg-gray-default-100",
      dropdownBg: "bg-content-content1",
      dropdownText: "text-primary-950-dark",
      dropdownBorder: "border-gray-default-200",
      muted: "text-gray-default-500",
      avatarBg: "bg-gray-default-100",
      iconColor: "text-primary-950-dark",
      textColor: "text-danger",
      textBgColor: "bg-danger-50",
    },
  };

  const theme = colorMap[mode] || colorMap.dark;

  const getUserName = () => {
    if (!user?.email) return "User";
    return user.email
      .split("@")[0]
      .replace(/\./g, " ")
      .replace(/(^\w|\s\w)/g, (c) => c.toUpperCase());
  };

  const userInitials = getUserName()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/signin");
  };
  const layoutBgClass = "bg-gray-100";

  return (
<nav
  className={`${theme.bg} shadow-md px-3 h-20 relative flex items-center overflow-visible`}
>

      <div className="flex items-center justify-between w-full">
        {/* LEFT */}
        <div className="py-4 px-5">
          <p className={`text-sm font-medium mb-1 ${theme.text}`}>
            {getUserName()}
          </p>

          {user?.role && (
            <p className={`text-xs ${theme.subText}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          )}
        </div>

        {/* RIGHT */}
        <div className="py-4 px-5 flex space-x-4">
          {/* DEV MODE SWITCH */}
          <div className="flex items-center space-x-5">
            <span className={`text-xs ${theme.subText}`}>Component Mode</span>
            <Switch
              isOn={isDevMode}
              setIsOn={(newVal) => newVal ? router.push('/dev-mode') : router.push('/')}
              size="sm"
              color="primary"
            />
            <span className={`text-xs ${theme.subText}`}>Dev Mode</span>
          </div>

          {/* NOTIFICATION BUTTON */}
          <button
            className={`${theme.iconColor} ${theme.buttonBg} ${theme.border}
              w-9 h-9 rounded-xl border-2 flex items-center justify-center`}
          >
            <Icon icon="mingcute:notification-line" width="20" height="20" />
          </button>

          {/* USER DROPDOWN */}
          <div ref={dropdownRef} className="relative w-9 h-9">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`${theme.text} ${theme.buttonBg} ${theme.border}
                w-9 h-9 rounded-xl border-2 flex items-center font-semibold justify-center`}
            >
              {userInitials}
            </button>

            {dropdownOpen && (
              <div
                className={`${theme.dropdownBg} ${theme.dropdownText} ${theme.dropdownBorder}
                  absolute right-0 mt-4 w-80 border rounded-xl shadow-xl z-50 p-6`}
            >
              {/* HEADER */}
              <div
                className={`flex items-center justify-between border-b pb-5 mb-4 ${theme.dropdownBorder}`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.avatarBg} ${theme.text}`}
                  >
                    {userInitials}
                  </div>

                  <div>
                    <div className="font-semibold">{getUserName()}</div>
                    <div className={`text-xs ${theme.muted}`}>
                      {user?.email}
                    </div>
                  </div>
                </div>

                <button className={`${theme.iconColor}`}>
                  <Icon icon="solar:bell-linear" width="24" height="24" />
                </button>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className={`flex items-center w-full px-2 py-2 ${theme.textColor} hover:${theme.textBgColor} hover:bg-danger-50 rounded-lg`}
              >
                <Icon
                  icon="solar:logout-2-bold"
                  width="18"
                  height="18"
                  className="mr-2"
                />
                Logout
              </button>
            </div>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
}
