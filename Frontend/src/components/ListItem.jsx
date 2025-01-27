import React, { Children } from "react";

function ListItem({ children, classes }) {
  return (
    <div className="inline-block">
      <ul className={`flex  items-center justify-evenly`}>
        <a href="" className="cursor-pointer">
          <li
            className={` ${classes} text-[#192334] hover:text-[#0d6efd] transition duration-400 `}
          >
            {children}
          </li>
        </a>
      </ul>
    </div>
  );
}

export default ListItem;
