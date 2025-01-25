import React from "react";
import NavLogo from "./NavLogo.jsx";
import NavList from "./NavList.jsx";
import Button from "./Button.jsx";
import BlueBtn from "./BlueBtn.jsx";

function Navbar() {
  return (
    <div className="w-full  fixed top-0 left-0 pt-1 pb-1 px-8 flex items-center justify-between shadow-xl">
      <NavLogo></NavLogo>
      <NavList></NavList>
      <Button>Join now</Button>
      <BlueBtn></BlueBtn>
    </div>
  );
}

export default Navbar;
