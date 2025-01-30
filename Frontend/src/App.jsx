import React from "react";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Courses from "./pages/Courses.jsx";
import Article from "./pages/Article.jsx";
import Profile from "./components/dashboard/Profile.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

import DashboardSidebar from "./components/dashboard/DashboardSidebar.jsx";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />

        <Route path="/dashboard" element={<AdminPanel />}>
          <Route index element={<DashboardSidebar />} />
          <Route path="adminDashboard" element={<DashboardSidebar />} />
          <Route path="adminProfile" element={<Profile />} />
        </Route>
        <Route path="/article" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
