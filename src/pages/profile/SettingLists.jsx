import React from "react";
import { SettingCard } from "../../components";
import { curlyBracketIcon } from "../../assets";

const SettingLists = () => {
  return (
    <div className="settings p-3">
      <SettingCard
        settingName={"user preference"}
        details="preferences"
        icon={curlyBracketIcon}
        path="/me/preferences"
      />
    </div>
  );
};

export default SettingLists;
