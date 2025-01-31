import React from "react";
import CourseCard from "../components/ui/CourseCard.jsx";
import Header from "../components/sections/Header.jsx";
import SmallCard from "../components/ui/SmallCard.jsx";
import Footer from "../components/layout/Footer.jsx";
import Navbar from "../components/layout/Navbar.jsx";

function Home() {
  return (
    <div className="w-full h-screen ">
      <Navbar />
      <Header />
      <CourseCard />
      <CourseCard />
      <div className="sm-flex-col sm-jus-center md:flex-col md:flex md:items-center md:justify-center  lg:flex-row lg:justify-evenly lg:flex-wrap ">
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
