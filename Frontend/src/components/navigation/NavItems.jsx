import React, { Children } from "react";
import { Link } from "react-router-dom";
function NavItems({ children, classes }) {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Article", path: "/article" },
  ];
  return (
    <div className="inline-block">
      <ul className={`flex  items-mr-2 center justify-evenly gap-5`}>
        {navLinks.map((link) => (
          <li
            key={link.path}
            className={` ${classes} text-[#192334] hover:text-[#0d6efd] transition duration-400 `}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavItems;
