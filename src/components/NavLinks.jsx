import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = ({ name, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "p-2 py-5 text-sm min-w-max text-black  relative after:contents-[''] after:w-full after:h-[0.5px] after:bg-black after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2"
          : "p-2 text-sm min-w-max text-zinc-400 hover:text-black"
      }
    >
      {name}
    </NavLink>
  );
};

export default NavLinks;
