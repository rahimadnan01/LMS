import React from "react";
import Navbar from "../components/layout/Navbar";

const Article = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-red-400 flex justify-center items-center">
        <p>Article</p>
      </div>
    </>
  );
};

export default Article;
