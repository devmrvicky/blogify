import React from "react";
import { SettingCard } from "../../components";
import { avatarIcon, curlyBracketIcon, profileIcon } from "../../assets";

const SettingLists = () => {
  return (
    <div className="settings p-3 flex flex-col gap-2 border my-3 rounded">
      <h2 className="text-lg text-zinc-700 py-3">User Settings</h2>
      <div className="flex gap-3">
        <SettingCard
          settingName="Personal settings"
          details="Name, user name, email"
          icon={profileIcon}
          path="/me/personal-settings"
        />
        <SettingCard
          settingName={"user preference"}
          details="preferences"
          icon={curlyBracketIcon}
          path="/me/preferences"
        />
      </div>
    </div>
  );
};

export default SettingLists;
