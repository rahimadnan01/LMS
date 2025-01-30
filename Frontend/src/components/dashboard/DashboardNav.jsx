import React from "react";
import ListItem from "../navigation/ListItem";
import { Link, useLocation } from "react-router-dom";

const DashboardNav = ({ name }) => {
  const location = useLocation();
  const navLinks = [
    { name: "Dashboard", path: "adminDashboard" },
    { name: "Profile", path: "adminProfile" },
  ];
  return (
    <div className="w-[25%] h-[80%] absolute left-10 shadow-2xl">
      <div className="w-[100%] min-h-full bg-[#fff] border-4 border-[#cfa2e8]  rounded-md px-5 py-5">
        <p className="text-[12px] text-[#6b7385] font-semibold ">
          Welcome to {name}
        </p>
        {navLinks.map((link) => (
          <div
            key={link.name}
            className="border-b-1 border-b-[#6b7385] py-2 my-3"
          >
            <ListItem
              classes={`text-[15px] w-full h-full text-[#6b7385] font-semibold  cursor-pointer ${
                location.pathname === "/dashboard/adminDashboard"
                  ? "text-blue-700"
                  : ""
              }`}
            >
              <i className="fa-regular fa-user mr-2"></i>
              <Link to={link.path}>{link.name}</Link>
            </ListItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNav;
