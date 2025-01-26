import React, { Children } from "react";

function ListItem({ children, classes }) {
  return (
    <div>
      <ul className="flex  items-center justify-evenly ">
        <a href="" className="cursor-pointer">
          <li
            className={`text-[#192334] hover:text-[#0d6efd] transition duration-400 ${classes}`}
          >
            {children}
          </li>
        </a>
      </ul>
    </div>
  );
}

export default ListItem;
