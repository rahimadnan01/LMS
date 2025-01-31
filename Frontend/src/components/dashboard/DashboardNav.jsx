import React from "react";
import ListItem from "../navigation/ListItem";
import { Link, NavLink, useLocation } from "react-router-dom";

const DashboardNav = ({ name }) => {
  const location = useLocation();
  const navLinks = [
    { name: "Dashboard", path: "adminDashboard" },
    { name: "Profile", path: "adminProfile" },
    { name: "Courses", path: "adminCourses" },
    { name: "Announcements", path: "adminAnnouncements" },
    { name: "Assignments", path: "adminAssignments" },
    { name: "Settings", path: "adminSettings" },
    { name: "Logout", path: "adminLogout" },
  ];
  return (
    <div className=" sm-w sm-h-2 sm-ml-0 md:h-[60%] lg:w-[25%] lg:h-[80%]  ml-8   shadow-2xl ">
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
              classes={`text-[15px] w-full h-full text-[#6b7385] font-semibold  cursor-pointer `}
            >
              <NavLink to={link.path}>
                <i
                  className={`fa-regular fa-user mr-2 ${(isActive) =>
                    isActive ? "active" : ""}`}
                ></i>
                {link.name}
              </NavLink>
            </ListItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNav;
