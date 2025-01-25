import React from "react";
import { Logo } from "../assets/index";
function NavLogo() {
  return (
    <div className=" w-[13%] p-4 cursor-pointer">
      <img src={Logo} alt="" className="object-cover" />
    </div>
  );
}

export default NavLogo;
