import React, { useState } from "react";
import RestaurantHeader from "../components/owner/RestaurantHeader";
import RestaurantSidebar from "../components/owner/RestaurantSidebar";

const RestaurantLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <RestaurantSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#ea6a12]">
        <RestaurantHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 md:p-6 lg:p-8 bg-white z-10 shadow-[-5px_-5px_20px_rgba(0,0,0,0.02)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default RestaurantLayout;
