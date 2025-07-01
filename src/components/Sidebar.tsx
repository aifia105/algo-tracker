"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardIcon,
  UserIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HistoryIcon,
  ProgressIcon,
} from "./icons/Icons";
import { useAuthStore } from "@/stores/authStore";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const { user, logout, loading, error } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: DashboardIcon,
      href: "/dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      name: "Progress",
      icon: ProgressIcon,
      href: "",
      isActive: pathname === "/progress",
    },
    {
      name: "History",
      icon: HistoryIcon,
      href: "/history",
      isActive: pathname === "/history",
    },
    {
      name: "Profile",
      icon: UserIcon,
      href: "",
      isActive: pathname === "/profile",
    },
  ];

  const handleLogout = () => {
    try {
      const res = logout();
      if (res) {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`${className} bg-surface border-r rounded-r-2xl border-custom transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col overflow-hidden`}
    >
      <div className="p-4 border-b border-custom">
        {isCollapsed ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 flex-shrink-0">
              <Image
                src="/icon.svg"
                alt="AlgoTracker Logo"
                width={32}
                height={32}
                className="rounded-full transition-all duration-300"
              />
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg hover:text-[#E5E7EB] text-secondary cursor-pointer hover:bg-[#38BDF8]/20 transition-colors duration-300 flex-shrink-0"
            >
              <ChevronRightIcon className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0">
                <Image
                  src="/icon.svg"
                  alt="AlgoTracker Logo"
                  width={48}
                  height={48}
                  className="rounded-full transition-all duration-300"
                />
              </div>

              <h2 className="text-primary text-lg font-bold whitespace-nowrap">
                Algo Tracker
              </h2>
            </div>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:text-[#E5E7EB] text-secondary cursor-pointer hover:bg-[#38BDF8]/20 transition-colors duration-300 flex-shrink-0"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center rounded-lg transition-all duration-300 group p-3 ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  item.isActive
                    ? "bg-primary text-main font-medium"
                    : "text-secondary hover:text-[#E5E7EB] hover:bg-[#38BDF8]/20"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <item.icon
                    className={`${
                      isCollapsed ? "w-6 h-6" : "w-5 h-5"
                    } transition-all duration-300 ${
                      item.isActive
                        ? "text-background"
                        : "text-secondary group-hover:text-[#E5E7EB]"
                    }`}
                    strokeWidth={2}
                  />
                </div>
                <span
                  className={`transition-all duration-300 whitespace-nowrap ${
                    isCollapsed
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-2 border-t border-custom">
        {error && !isCollapsed && (
          <div className="mb-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={loading}
          className={`flex items-center rounded-lg w-full gap-2 text-left text-secondary hover:text-[#F87171] transition-all duration-300 group p-3 ${
            isCollapsed ? "justify-center ml-1" : ""
          } ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            <LogoutIcon
              className={`${
                isCollapsed ? "w-6 h-6" : "w-5 h-5"
              } transition-all duration-300`}
              strokeWidth={2}
            />
          </div>
          <span
            className={`transition-all duration-300 whitespace-nowrap ${
              isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
            }`}
          >
            {loading ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>

      <div className="p-4 border-t border-custom bg-background rounded-br-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-background" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-main text-sm font-medium truncate capitalize">
                {user?.username}
              </p>
              <p className="text-secondary text-xs truncate">{user?.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
