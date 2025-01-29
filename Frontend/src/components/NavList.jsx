import React from "react";
import { listItems } from "./index.js";
import NavItems from "./NavItems.jsx";

function NavList() {
  return (
    <div className=" sm-display-none w-[50%]  ">
      <ul className="flex  items-center justify-evenly ">
        <NavItems></NavItems>
      </ul>
    </div>
  );
}

export default NavList;
