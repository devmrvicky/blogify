import React from "react";
import MenuBtn from "./MenuBtn";
import { SettingCard } from "../../components";
import { categoryIcon } from "../../assets";
import { Outlet } from "react-router-dom";

const Preferences = () => {
  return (
    <div className="py-8">
      <h2 className="text-3xl border-b py-3 font-semibold">Preferences</h2>
      <div className="flex">
        <div className="left-side border-r w-1/5 flex flex-col gap-2 p-2">
          <SettingCard
            settingName={"Category"}
            details={"customize your interest"}
            icon={categoryIcon}
            width="auto"
            height="auto"
            nestedMenu={true}
            path="/me/preferences/category"
          />
        </div>
        <div className="right-side w-4/5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Preferences;
