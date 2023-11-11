import React from "react";
import { barsIcon } from "../../assets";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SettingLayout = ({ children, title, className="" }) => {
  const { userData } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-b py-2 flex items-center gap-3">
        <button className="w-8 h-8 rounded-full border text-sm flex items-center justify-center hover:bg-zinc-300/50 active:scale-95 transition-all">
          {barsIcon}
        </button>
        <h1 className="text-xl cursor-pointer" onClick={() => navigate("/me")}>
          {userData.name}
        </h1>
      </div>
      <div className="py-8">
        <h2 className="text-3xl border-b py-3 font-semibold">{title}</h2>
        <div className={` ${className}`}>
        {children}
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
