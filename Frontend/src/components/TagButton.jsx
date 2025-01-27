import React from "react";

function TagButton({ children }) {
  return (
    <button className="inline-block h-8 leading-7 m-1 py-0 px-5 bg-[#f6f6f6] text-[14px] spacing-[0.3px] rounded-md text-[#6b7385] hover:text-[#2f57f1] hover:bg-[#e4e9fd] transition duration-300 cursor-pointer">
      {children}
    </button>
  );
}

export default TagButton;
