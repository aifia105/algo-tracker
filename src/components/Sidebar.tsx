"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  UserIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./icons/Icons";
import { div } from "three/tsl";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
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
      name: "Profile",
      icon: UserIcon,
      href: "/profile",
      isActive: pathname === "/profile",
    },
  ];

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <div
      className={`${className} bg-surface border-r rounded-r-2xl border-custom transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-custom">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <Image
                src="/icon.svg"
                alt="AlgoTracker Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-primary text-xl font-bold">Algo Tracker</h2>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-background transition-colors duration-200 text-secondary hover:text-main"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-4 h-4" />
            ) : (
              <ChevronLeftIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  item.isActive
                    ? "bg-primary text-background font-medium"
                    : "text-secondary hover:text-main hover:bg-background"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    item.isActive
                      ? "text-background"
                      : "text-secondary group-hover:text-main"
                  }`}
                />
                {!isCollapsed && (
                  <span className="transition-opacity duration-200">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-custom">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-3 rounded-lg w-full text-left text-secondary hover:text-danger hover:bg-background transition-all duration-200 group"
        >
          <LogoutIcon className="w-5 h-5 text-secondary group-hover:text-danger" />
          {!isCollapsed && (
            <span className="transition-opacity duration-200">Logout</span>
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 border-t border-custom bg-background">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-main text-sm font-medium truncate">John Doe</p>
              <p className="text-secondary text-xs truncate">
                john@example.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
