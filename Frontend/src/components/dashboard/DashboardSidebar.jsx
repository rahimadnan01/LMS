import React from "react";
import DashboardCourses from "./DashboardCourses";
import DashboardCard from "./DashboardCard";

const DashboardSidebar = () => {
  return (
    <>
      <div className=" sm-py-1 sm-w sm-ml-0  w-[65%] h-[100%]  ml-10  overflow-y-auto hide-scrollbar flex flex-wrap items-center justify-center shadow-2xl gap-2">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
    </>
  );
};

export default DashboardSidebar;
