import React from "react";
import { listItems } from "./index.js";
function NavList() {
  return (
    <div className="w-[50%] bg-red-400  ">
      <ul className="flex  items-center justify-evenly ">
        {listItems.map((item, index) => (
          <li
            className="text-[#192334] hover:text-[#0d6efd] transition duration-400"
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavList;
