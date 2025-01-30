import React from "react";
import NavLogo from "../ui/NavLogo.jsx";
import NavList from "../navigation/NavList.jsx";
import Button from "../ui/Button.jsx";
import NavMenu from "../navigation/NavMenu.jsx";

function Navbar() {
  return (
    <div className="sm-nav-pad w-full  fixed top-0 left-0 pt-1 pb-1 px-8 flex items-center justify-between shadow-xl h-[15%] z-50 bg-white">
      <NavLogo />
      <NavMenu />
      <NavList />
      <Button classes={"sm-display-none"}>Join now</Button>
    </div>
  );
}

export default Navbar;
