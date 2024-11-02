"use client"; // Marks this file as a client component

import { useState } from "react";
import SideNav from "@/components/SideNav";
import ResponsiveSideNav from "@/components/ResponsiveSideNav";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full bg-dspLightPink">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex w-fit">
        <SideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Responsive Sidebar for mobile screens */}
      <div className="flex w-full md:hidden">
        <ResponsiveSideNav />
      </div>

      {/* Main Content Area */}
      <div
        className={`w-full transition-all duration-500 ease-in-out p-5 ${
          isSidebarOpen ? "md:ml-[270px]" : "md:ml-20"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
