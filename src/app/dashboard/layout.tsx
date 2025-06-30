import Sidebar from "@/components/Sidebar";
import { JSX, PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-auto" suppressHydrationWarning={true}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
