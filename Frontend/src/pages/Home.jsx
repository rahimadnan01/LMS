import React from "react";
import Navbar from "../components/Navbar.jsx";
import CourseCard from "../components/CourseCard.jsx";
import Header from "../components/Header.jsx";

function Home() {
  return (
    <div className="w-full h-screen ">
      <Navbar></Navbar>
      <Header></Header>
      <CourseCard></CourseCard>
    </div>
  );
}

export default Home;
