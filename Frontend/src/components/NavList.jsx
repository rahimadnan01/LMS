import React from "react";
import { listItems } from "./index.js";
import ListItem from "./ListItem.jsx";
function NavList() {
  return (
    <div className="w-[50%]  ">
      <ul className="flex  items-center justify-evenly ">
        {listItems.map((item, index) => (
          <a key={index} href="" className="cursor-pointer">
            <ListItem children={item}></ListItem>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default NavList;
