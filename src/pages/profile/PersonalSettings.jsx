import { NavLink, Outlet } from "react-router-dom";
import { profileIcon, email } from "../../assets";
import SettingLayout from "./SettingLayout";
import NavLinks from "../../components/NavLinks";

const PersonalSettings = () => {
  return (
    <SettingLayout title="Personal settings" className="flex flex-col h-full">
      <div className="setting-menus flex gap-2 border-b pb-0.5">
        <NavLinks
          name="Profile"
          path="/me/personal-settings/profile"
          settingIcon={profileIcon}
        />
        <NavLinks
          name="Email & password"
          path="/me/personal-settings/email-password"
          settingIcon={email}
        />
        {/* <NavLink
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
        <NavLink
          to="/me/personal-settings/email-password"
          className={({ isActive }) =>
            isActive
              ? `profile flex items-center rounded px-2 py-2 bg-slate-100 gap-3 cursor-pointer`
              : `profile flex items-center rounded px-2 py-2 hover:bg-slate-100 gap-3 cursor-pointer`
          }
        >
          <span>{profileIcon}</span>
          <span>Email & password</span>
        </NavLink> */}
      </div>
      <div className="flex-1 p-2">
        <Outlet />
      </div>
    </SettingLayout>
  );
};

export default PersonalSettings;
