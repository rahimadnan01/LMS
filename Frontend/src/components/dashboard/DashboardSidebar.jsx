import React from "react";


const DashboardSidebar = ({ children }) => {
  return (
    <div className="w-[65%] h-[80%]  absolute right-3 overflow-y-auto hide-scrollbar flex items-center justify-center shadow-2xl">
      {children}
    </div>
  );
};

export default DashboardSidebar;
