import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Logo = ({ logoWidth = "w-10", logoText = "text-3xl" }) => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <div className={`${logoWidth}`}>
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <p className={`${logoText} text-zinc-500 font-semibold`}>Blogify</p>
      </div>
    </Link>
  );
};

export default Logo;
