import { NavLink, Outlet } from "react-router-dom";
import { profileIcon } from "../../assets";
import SettingLayout from "./SettingLayout";

const PersonalSettings = () => {
  return (
    <SettingLayout title="Personal settings" className="flex h-full">
      <div className="setting-menus flex flex-col gap-2 border-r w-48 p-2">
        <NavLink
          to="/me/personal-settings/profile"
          className={({ isActive }) =>
            isActive
              ? `profile flex items-center rounded px-2 py-2 bg-slate-100 gap-3 cursor-pointer`
              : `profile flex items-center rounded px-2 py-2 hover:bg-slate-100 gap-3 cursor-pointer`
          }
        >
          <span>{profileIcon}</span>
          <span>Profile</span>
        </NavLink>
      </div>
      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </SettingLayout>
  );
};

export default PersonalSettings;
