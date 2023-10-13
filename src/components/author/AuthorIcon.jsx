import React, { useState } from "react";
import { FaUserCircle, FaRegUserCircle, FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AuthorMenu from "./AuthorMenu";
import { toggleMenu } from "../../features";

const AuthorIcon = () => {
  const { status, userData, menuOpen } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleMenu(true));
  };

  return (
    <div className="flex items-center gap-3 relative">
      {status ? (
        <div className="flex items-center gap-3">
          <span className="text-[24px]">{userData.name}</span>
          <div onClick={handleClick} className="flex items-center gap-1">
            <FaUserCircle className="text-[40px] border-4 rounded-full cursor-pointer active:scale-90 transition-all" />
            <FaAngleDown />
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 text-zinc-400 hover:text-blue-600 ml-4 ${
            menuOpen && "text-blue-800"
          }`}
          onClick={handleClick}
        >
          <FaRegUserCircle className="text-[32px] cursor-pointer active:scale-90 transition-all" />
          <FaAngleDown />
        </div>
      )}
      {menuOpen && <AuthorMenu />}
    </div>
  );
};

export default AuthorIcon;
