import React from "react";

function Button({ children }) {
  return (
    <div>
      <Button className="py-0 px-6 h-11 leading-11 text-white bg-gradient-to-r from-[#2f57ef] via-[#b966e7] to-[#2f57ef]">
        {children}
      </Button>
    </div>
  );
}

export default Button;
