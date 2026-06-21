import Sidebar from "@/components/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-700">
      <Sidebar />
      {/* Content area: offset for the fixed sidebar on md+ screens */}
      <main className="md:ml-64 min-h-screen">{children}</main>
    </div>
  );
};

export default layout;
