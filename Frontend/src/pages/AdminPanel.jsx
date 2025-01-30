import React from "react";
import DashboardNav from "../components/dashboard/DashboardNav";
import { Routes, Route, Outlet } from "react-router-dom";
const AdminPanel = () => {
  return (
    <div className="w-[100%] h-screen bg-white flex justify-center items-center mt-10 relative">
      <DashboardNav name={"Instructor"} />
      <Outlet></Outlet>
    </div>
  );
};

export default AdminPanel;
