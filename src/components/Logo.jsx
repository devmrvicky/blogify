import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <div className="w-10">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <p className="text-3xl text-zinc-500 font-semibold">Blogify</p>
      </div>
    </Link>
  );
};

export default Logo;
