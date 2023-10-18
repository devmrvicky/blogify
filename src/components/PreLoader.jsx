import React from "react";
import { logo } from "../assets";
import { BarLoader } from "react-spinners";

const PreLoader = () => {
  return (
    <div className="w-full h-screen bg-white relative">
      <div className="flex flex-col items-center gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-16">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <div>
          <BarLoader color="#375ad7" loading speedMultiplier={1} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 absolute bottom-4 left-1/2 -translate-x-1/2">
        <p className="text-3xl text-zinc-500 font-semibold">Blogify</p>
        <p>Made with ❤️ in Bharat</p>
      </div>
    </div>
  );
};

export default PreLoader;
