import React from "react";
import { NavLink } from "react-router-dom";
import { drawing } from "../assets";

const WritePostBtn = ({ text = "write" }) => {
  return (
    <NavLink
      to="/write-post"
      className={({ isActive }) =>
        isActive
          ? "hidden"
          : "flex items-center px-4 py-1 border border-blue-800 hover:bg-zinc-50 cursor-pointer rounded-full gap-2 mx-2"
      }
    >
      <div className="w-6">
        <img src={drawing} alt="write post" className="w-full" />
      </div>
      <p className="text-ls">{text}</p>
    </NavLink>
  );
};

export default WritePostBtn;
