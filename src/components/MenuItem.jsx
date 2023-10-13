import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = ({ path, icon, name }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? `px-4 py-2 text-left bg-zinc-50 w-full cursor-pointer flex items-center gap-3`
          : "px-4 py-2 text-left hover:bg-zinc-50 w-full cursor-pointer flex items-center gap-3"
      }
    >
      {icon && <span>{icon}</span>}
      <span>{name}</span>
    </NavLink>
  );
};

export default MenuItem;
