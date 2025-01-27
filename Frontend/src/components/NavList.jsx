import React from "react";
import { listItems } from "./index.js";
import ListItem from "./ListItem.jsx";
function NavList() {
  return (
    <div className=" sm-display-none w-[50%]  ">
      <ul className="flex  items-center justify-evenly ">
        {listItems.map((item, index) => (
          <ListItem key={index} children={item}></ListItem>
        ))}
      </ul>
    </div>
  );
}

export default NavList;
