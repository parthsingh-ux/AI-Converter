"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { SidebarProvider } from "@/context/SidebarContext";
import { useUserContext } from "@/context/UserContext";

function LayoutContent({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const { user } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();

  // const role = user?.role;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const allMenuItems = [
    {
      label: "Home",
      route: "/",
      icon: <Icon icon="heroicons:home" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Accordion",
      route: "/accordion",
      icon: <Icon icon="oui:arrow-down" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Alerts",
      route: "/alerts",
      icon: <Icon icon="cuida:alert-outline" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },

    {
      label: "Avatar",
      route: "/avatar",
      icon: <Icon icon="typcn:user" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Avatar-group",
      route: "/avatar-group",
      icon: <Icon icon="heroicons:users-20-solid" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Badge",
      route: "/badge",
      icon: <Icon icon="f7:app-badge-fill" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Breadcrumb",
      route: "/breadcrumb",
      icon: (
        <Icon
          icon="tdesign:component-breadcrumb-filled"
          width="20"
          height="20"
        />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Button",
      route: "/button",
      icon: (
        <Icon icon="icons8:rounded-rectangle-filled" width="20" height="20" />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Button-Group",
      route: "/button-group",
      icon: <Icon icon="ph:rectangles-two-fill" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Calendar and Date-Picker",
      route: "/calendar-and-date-picker",
      icon: <Icon icon="solar:calendar-bold" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Cards",
      route: "/card",
      icon: <Icon icon="subway:id-card" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Carousal",
      route: "/carousal",
      icon: <Icon icon="solar:slider-horizontal-bold" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Checkbox",
      route: "/checkbox",
      icon: <Icon icon="ri:checkbox-fill" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Checkbox-Group",
      route: "/checkbox-group",
      icon: <Icon icon="ix:checkboxes-filled" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Chip",
      route: "/chip",
      icon: (
        <Icon
          icon="material-symbols-light:voting-chip"
          width="20"
          height="20"
        />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Circular Progress",
      route: "/circular-progress",
      icon: (
        <Icon
          icon="material-symbols:progress-activity"
          width="20"
          height="20"
        />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Code",
      route: "/code",
      icon: <Icon icon="ph:code-fill" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Dev Mode",
      route: "/dev-mode",
      icon: <Icon icon="ph:code-fill" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Divider",
      route: "/divider",
      icon: (
        <Icon
          icon="tdesign:component-divider-vertical-filled"
          width="20"
          height="20"
        />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Dropdown",
      route: "/dropdown",
      icon: (
        <Icon icon="tdesign:component-dropdown-filled" width="20" height="20" />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Forms",
      route: "/forms",
      icon: <Icon icon="fluent:form-20-filled" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },

    {
      label: "Input And Text Field",
      route: "/input-and-text-field",
      icon: <Icon icon="solar:text-field-bold" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Input OTP",
      route: "/input-otp",
      icon: <Icon icon="teenyicons:otp-solid" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Link",
      route: "/link",
      icon: <Icon icon="mingcute:link-fill" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Modals",
      route: "/modals",
      icon: <Icon icon="vaadin:modal-list" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Navigation and Header",
      route: "/navigation-and-header",
      icon: (
        <Icon
          icon="streamline-sharp:layout-right-sidebar-solid"
          width="20"
          height="20"
        />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Number Input",
      route: "/number-input",
      icon: <Icon icon="mynaui:list-number-solid" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Pagination",
      route: "/pagination",
      icon: <Icon icon="stash:pagination-duotone" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Progress",
      route: "/progress",
      icon: <Icon icon="vaadin:progressbar" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Radio",
      route: "/radio",
      icon: <Icon icon="ri:radio-button-line" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Select",
      route: "/select",
      icon: <Icon icon="fluent:multiselect-24-filled" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Skeleton",
      route: "/skeleton",
      icon: (
        <Icon icon="fluent:content-view-24-filled" width="20" height="20" />
      ),
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Sliders",
      route: "/sliders",
      icon: <Icon icon="fa-solid:sliders-h" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Spinner",
      route: "/spinner",
      icon: <Icon icon="picon:spinner" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Switch",
      route: "/switch",
      icon: <Icon icon="ion:switch" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Table",
      route: "/table",
      icon: <Icon icon="streamline-plump:table-solid" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Tabs",
      route: "/tabs",
      icon: <Icon icon="iconoir:window-tabs-solid" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Tag",
      route: "/tag",
      icon: <Icon icon="ph:tag-simple-fill" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Time Input",
      route: "/time-input",
      icon: <Icon icon="fluent:time-picker-24-filled" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Toast",
      route: "/toast",
      icon: <Icon icon="material-symbols:toast" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Tool-Tip",
      route: "/tool-tip",
      icon: <Icon icon="material-symbols:tooltip" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },
    {
      label: "Users",
      route: "/users",
      icon: <Icon icon="fa-solid:user" width="20" height="20" />,
      type: "link",
      roles: ["admin"],
    },

  ];

  const menuItems = allMenuItems;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}>
        <div className="flex flex-col h-full w-full">
          <nav className="flex flex-col items-start w-full space-y-1">
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.route;

              return (
                <div
                  key={idx}
                  className={`group w-full flex items-center 
              ${isSidebarOpen ? "px-3" : "justify-center"}
              py-2 rounded-xl cursor-pointer transition-colors duration-150
              ${
                isActive
                  ? "bg-primary-400-dark text-white font-normal shadow-2xl shadow-primary-400-dark/40"
                  : "hover:bg-gray-100/10 text-gray-default-400-dark font-normal"
              }
            `}
                  onClick={
                    item.type === "link"
                      ? () => router.push(item.route)
                      : undefined
                  }
                >
                  {/* Icon: increased size, no bold */}
                  <div className={`text-lg ${isSidebarOpen ? "mr-3" : ""}`}>
                    {item.icon}
                  </div>

                  {/* Label: increased size, no bold */}
                  {isSidebarOpen && (
                    <span className="text-base font-normal">{item.label}</span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </Sidebar>

      <div className="flex-1 flex flex-col transition-all duration-300 overflow-x-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto bg-primary-50-dark rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function ProtectedLayout({ children }) {
  // const { loading, allowed } = useAuthGuard();

  // if (loading) return <Loader />;
  // if (!allowed) return null;

  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
