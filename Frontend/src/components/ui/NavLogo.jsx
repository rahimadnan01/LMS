import React from "react";
import { Logo } from "../../assets/index.js";
function NavLogo() {
  return (
    <div className="sm-logo-nav w-[13%] p-4 cursor-pointer">
      <img src={Logo} alt="" className="object-cover" />
    </div>
  );
}

export default NavLogo;
