import React, { useEffect } from "react";
import MenuBtn from "./MenuBtn";
import { SettingCard } from "../../components";
import { barsIcon, categoryIcon } from "../../assets";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SettingLayout from "./SettingLayout";

const Preferences = () => {
  const { userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <SettingLayout title="Preferences">
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
    </SettingLayout>
  );
};

export default Preferences;
