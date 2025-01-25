import React from "react";
import { Logo } from "../assets/index";
function NavLogo() {
  return (
    <div className="bg-red-200 w-[13%] p-4">
      <img src={Logo} alt="" className="object-cover" />
    </div>
  );
}

export default NavLogo;
