import React from "react";
import ProfileImg from "./ProfileImg";
import {
  Input,
  SetProfileUrlBtn,
  SubmitBtn,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import SetUserNamePopup from "./SetUserNamePopup";

const NameSetting = () => {
  const { name } = useSelector((store) => store.auth.userMainData);
  const { isPageOpen } = useSelector((store) => store.posts);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name,
    },
  });
  return (
    <div>
      <ProfileImg editableProfile={true} />
      <form className="flex gap-2">
        {/* <Input
          type="text"
          label="Name"
          className="py-1 px-2"
          placeholder="Vicky k."
          value={name && name}
        /> */}
        <Input
          label="Full name"
          className="py-1 px-2"
          {...register("name", { required: true })}
        />
        <SubmitBtn className="px-2 py-1 rounded">update</SubmitBtn>
      </form>
      <div className="py-3">
        <label htmlFor="bio" className="text-xl font-semibold">
          Bio
        </label>
        <textarea
          label="Bio"
          className="py-1 px-2 outline-none border w-full h-[200px]"
          placeholder="Write sort bio..."
          {...register("bio", { required: true })}
        ></textarea>
      </div>
      <SetProfileUrlBtn />
      {isPageOpen.setUserNameUrlPage && <SetUserNamePopup />}
    </div>
  );
};

export default NameSetting;
