import React from "react";
import ProfileImg from "./ProfileImg";
import { Input, SubmitBtn } from "../../components";

const NameSetting = () => {
  return (
    <div>
      <ProfileImg editableProfile={true} />
      <div className="flex gap-2">
        <Input
          type="text"
          label="Name"
          className="py-1 px-2"
          placeholder="Vicky k."
        />
        <SubmitBtn className="px-2 py-1 rounded">update</SubmitBtn>
      </div>
    </div>
  );
};

export default NameSetting;
