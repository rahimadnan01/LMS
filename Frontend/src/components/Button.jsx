import React from "react";
import { useRef } from "react";
import { mouseEnterBtn } from "./index.js";
function Button({ children }) {
  const boxRef = useRef(null);
  const handleHover = () => {
    mouseEnterBtn(boxRef);
  };
  return (
    <a href="">
      <button
        ref={boxRef}
        onMouseEnter={handleHover}
        className={`py-0 px-6 h-11 leading-11 text-white bg-gradient-to-r from-[#2f57ef] to-[#b966e7] rounded-sm cursor-pointer hover:bg-gradient-to-r hover:from-[#b966e7] hover:to-[#2f57ef] transition duration-700 ease-in relative hover:after-content after-content `}
      >
        {Array.from(children).map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </button>
    </a>
  );
}

export default Button;
