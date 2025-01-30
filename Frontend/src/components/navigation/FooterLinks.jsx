import React from "react";
import { reviews } from "../index.js";
import ListUnderline from "./ListUnderline.jsx";
const FooterLinks = () => {
  return (
    <div className="   mt-10 flex  justify-center items-center">
      <div className="   ">
        <h1 className="font-semibold text-[#192335] ">Useful Links</h1>
        {reviews.map((review, index) => (
          <ListUnderline key={index} classes={"flex-col my-1 "}>
            footerLink
          </ListUnderline>
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;
