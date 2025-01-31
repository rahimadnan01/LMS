import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import DashboardNav from "../components/dashboard/DashboardNav";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
const AdminPanel = () => {
  const location = useLocation();
  const dashboardRoutes = [
    "/dashboard",
    "/dashboard/adminDashboard",
    "/dashboard/studentDashboard",
    "/dashboard/instructorDashboard",
  ];
  return (
    <>
      <Navbar />
      <div className=" sm-jus-center  w-full min-h-screen flex flex-col ">
        <div className=" w-full h-[50vh]  mt-10 bg-gradient-to-r from-[#2f57ef] to-[#b966e7]"></div>
        <div className="  sm-flex sm-flex-col sm-w-full sm-gap sm-jus-center sm-h-3 sm-py-1 md:w-full md:h-[50vh] flex justify-evenly   lg:w-full lg:h-[80vh]  my-10  ">
          <DashboardNav />
          <Outlet />
        </div>
        {dashboardRoutes.includes(location.pathname) && (
          <div className=" sm-w sm-ml-0 sm-h-1 md:h-[50vh] md:w-[80%] lg:w-[60%] lg:h-[70vh] md:ml-[10%]  lg:ml-[35%] shadow-2xl rounded-md flex items-center justify-center ">
            HEllO I AM COURSES
          </div>
        )}
      </div>
      <div className="w-full  mb-10 ">
        <Footer />
      </div>
    </>
  );
};

export default AdminPanel;
