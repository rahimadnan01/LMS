import React from "react";
import Navbar from "../components/Navbar.jsx";
import CourseCard from "../components/CourseCard.jsx";
import Header from "../components/Header.jsx";
import SmallCard from "../components/SmallCard.jsx";
import FooterLinks from "../components/FooterLinks.jsx";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <div className="w-full h-screen ">
      <Navbar></Navbar>
      <Header></Header>
      <CourseCard></CourseCard>
      <CourseCard></CourseCard>
      <div className="sm-flex-col sm-jus-center md:flex-col md:flex md:items-center md:justify-center  lg:flex-row lg:justify-evenly lg:flex-wrap ">
        <SmallCard></SmallCard>
        <SmallCard></SmallCard>
        <SmallCard></SmallCard>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
