import React from "react";

function ListUnderline({ children }) {
  return (
    <ul className="flex items-center">
      <li className="group relative text-sm">
        <a
          href="#"
          className="text-gray-800 hover:text-blue-500 transition duration-300"
        >
          {children}
        </a>
        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
      </li>
    </ul>
  );
}

export default ListUnderline;
