import React, { useRef, useState } from "react";
import { changeText, mouseLeave } from "../index.js";

function BlueBtn({ classes }) {
  const btnRef = useRef(null);
  const [text, setText] = useState(` Start Learning →`);

  const handleHover = () => {
    changeText(btnRef, setText);
  };
  const handleMouseLeave = () => {
    mouseLeave(btnRef, setText);
  };
  return (
    <a href="" className="m-2">
      <button
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        className={`shadow-sm bg-white text-[#192335] px-12 py-0 h-12 leading-12 text-[16px] font-medium rounded-md outline-none hover:text-white hover:bg-[#2f57ef] transition duration-100 ease-in text-center cursor-pointer ${classes}`}
      >
        <span ref={btnRef} className="text-center">
          {text}
        </span>
      </button>
    </a>
  );
}

export default BlueBtn;
