import React from "react";
import FooterLinks from "../navigation/FooterLinks.jsx";
import BlueBtn from "../ui/BlueBtn.jsx";
import { Logo } from "../../assets/index.js";
import ListUnderline from "../navigation/ListUnderline.jsx";
import { reviews } from "../index.js";
const Footer = () => {
  return (
    <>
      <div className="sm-flex-col sm-items-center w-full h-50% flex gap-10 mt-[5rem] justify-evenly items-center  border-t-1 border-t-[#6b7385]  ">
        <div className="sm-w-full sm-gap md:w-[50%]   h-full lg:w-[30%]  flex flex-col justify-start gap-4 px-8 mt-10">
          <div className=" h-10 w-30 ml-2 ">
            <img className="object-contain w-full h-full" src={Logo} alt="" />
          </div>
          <div className="mb-4 flex flex-col justify-items-start gap-3">
            <p className="sm-w text-[16px] leading-6 text-[#6b7385] ml-2">
              We’re always in search for talented and motivated people. Don’t be
              shy introduce yourself!
            </p>
            <BlueBtn
              classes={
                " text-white bg-gradient-to-r from-[#2f57ef] to-[#b966e7] rounded-sm cursor-pointer hover:bg-gradient-to-r hover:from-[#b966e7] hover:to-[#2f57ef] transition duration-700 ease-in"
              }
            />
          </div>
        </div>
        <div className="sm-w-full  flex justify-evenly w-1/2 h-full items-center">
          <FooterLinks />
          <FooterLinks />
          <FooterLinks />
        </div>
      </div>
      <div className=" sm-mt-1 sm-flex-col w-full h-[10%] pt-3 flex justify-evenly items-center ">
        <p className="text-[1rem] leading-6 text-[#6b7385] ">
          Copyright © 2025 All Rights Reserved
        </p>
        <div className="sm-gap-2 flex items-center h-full gap-4">
          {reviews.map((review, index) => (
            <ListUnderline key={index}>footer Link</ListUnderline>
          ))}
        </div>
      </div>
    </>
  );
};

export default Footer;
