import React from "react";
import Navbar from "../components/layout/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-red-400 flex justify-center items-center">
        <h1>Hello about </h1>
      </div>
    </>
  );
};

export default About;
