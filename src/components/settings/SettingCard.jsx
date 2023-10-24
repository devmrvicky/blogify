import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const SettingCard = ({
  settingName,
  details,
  icon,
  path,
  width = "w-72",
  height = "h-24",
  nestedMenu = false,
}) => {
  return (
    <NavLink
      to={path}
      className={`group block ${
        nestedMenu
          ? "hover:bg-zinc-300/20 pt-3 pb-4"
          : "border rounded-lg bg-zinc-300/10 py-2"
      } active:bg-zinc-300/30 px-3 ${width} ${height} cursor-pointer`}
    >
      <div className="flex flex-col justify-between active:scale-95 transition-all w-full h-full relative">
        <div className={`flex items-center gap-2`}>
          <p className="icon w-8 h-8 bg-slate-400/10 flex items-center justify-center rounded">
            {icon}
          </p>
          <p className={`${nestedMenu ? "text-base" : "text-lg"}`}>
            {settingName}
          </p>
          <button className="ml-auto group-hover:translate-x-1 transition-all">
            <FaAngleRight />
          </button>
        </div>
        {!nestedMenu && (
          <p className={`text-sm self-end text-zinc-300 italic"`}>{details}</p>
        )}
      </div>
    </NavLink>
  );
};

export default SettingCard;
