import React from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Courses from "./pages/Courses.jsx";
import Article from "./pages/Article.jsx";
import Profile from "./components/dashboard/Profile.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import DashboardSidebar from "./components/dashboard/DashboardSidebar.jsx";
import DashboardCourses from "./components/dashboard/DashboardCourses.jsx";
import DashboardAnnouncements from "./components/dashboard/DashboardAnnouncements.jsx";
import DashboardAssignments from "./components/dashboard/DashboardAssignments.jsx";
import DashboardSettings from "./components/dashboard/DashboardSettings.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/dashboard",
    element: <AdminPanel />,
    children: [
      {
        index: true,
        element: <DashboardSidebar />,
      },
      {
        path: "adminDashboard",

        element: <DashboardSidebar />,
      },
      {
        path: "adminProfile",
        element: <Profile />,
      },
      {
        path: "adminCourses",
        element: <DashboardCourses />,
      },
      {
        path: "adminAnnouncements",
        element: <DashboardAnnouncements />,
      },
      {
        path: "adminAssignments",
        element: <DashboardAssignments />,
      },
      {
        path: "adminSettings",
        element: <DashboardSettings />,
      },
    ],
  },
  {
    path: "/article",
    element: <Article />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
