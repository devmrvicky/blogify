import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { categoryIcon } from "../../assets";

const MenuBtn = () => {
  return (
    <button className="flex w-full border px-3 py-1">
      <span>{categoryIcon}</span>
      <div className="flex flex-col items-start">
        <p className="text-xl font-semibold text-zinc-500">Categories</p>
        <span className="text-zinc-400 text-sm">customize your interest</span>
      </div>
      <span className="ml-auto">
        <FaAngleRight />
      </span>
    </button>
  );
};

export default MenuBtn;
