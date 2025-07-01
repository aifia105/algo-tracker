"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { createContext, useContext } from "react";

const LayoutContext = createContext<{ isAuthRoute: boolean }>({
  isAuthRoute: false,
});

export const useLayout = () => useContext(LayoutContext);

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current route is an auth route
  const isAuthRoute = pathname?.startsWith("/auth");

  return (
    <LayoutContext.Provider value={{ isAuthRoute }}>
      {isAuthRoute ? (
        children
      ) : (
        <div className="flex min-h-screen bg-background">
          <Sidebar />
          <div className="flex-1 overflow-hidden">
            <main
              className="h-full overflow-auto"
              suppressHydrationWarning={true}
            >
              {children}
            </main>
          </div>
        </div>
      )}
    </LayoutContext.Provider>
  );
}
