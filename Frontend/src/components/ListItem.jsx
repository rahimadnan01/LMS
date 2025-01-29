import React from "react";

const ListItem = ({ children, classes }) => {
  return (
    <div className="inline-block">
      <ul className={`flex  items-mr-2  center justify-evenly gap-5`}>
        <li
          className={` ${classes} text-[#192334]  hover:text-[#0d6efd] transition duration-400 `}
        >
          {children}
        </li>
      </ul>
    </div>
  );
};

export default ListItem;
