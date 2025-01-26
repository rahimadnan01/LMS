import React from "react";

function ListUnderline({ children }) {
  return (
    <div>
      <ul>
        <li class="group relative text-lg">
          <a
            href="#"
            class="text-gray-800 hover:text-blue-500 transition duration-300"
          >
            {children}
          </a>
          <span class="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </li>
      </ul>
    </div>
  );
}

export default ListUnderline;
