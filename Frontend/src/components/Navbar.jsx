import React from "react";
import NavLogo from "./NavLogo.jsx";
import NavList from "./NavList.jsx";
import Button from "./Button.jsx";
import NavMenu from "./NavMenu.jsx";

function Navbar() {
  return (
    <div className="sm-nav-pad w-full  fixed top-0 left-0 pt-1 pb-1 px-8 flex items-center justify-between shadow-xl h-[15%] z-50 bg-white">
      <NavLogo></NavLogo>
      <NavMenu></NavMenu>
      <NavList></NavList>
      <Button classes={"sm-display-none"}>Join now</Button>
    </div>
  );
}

export default Navbar;
