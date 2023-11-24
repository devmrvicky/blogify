import React from "react";
import ProfileImg from "./ProfileImg";
import {
  Input,
  PopupPage,
  SetProfileUrlBtn,
  SubmitBtn,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { xmark } from "../../assets";
import { toggleActionPage } from "../../features";

const NameSetting = () => {
  const { name } = useSelector((store) => store.auth.userMainData);
  const { isPageOpen } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
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
      {isPageOpen.setUserNameUrlPage && (
        <PopupPage>
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-lg text-center w-full flex-1">
              set user name and profile url
            </h1>
            <button
              className="active:scale-95 transition-all"
              onClick={() =>
                dispatch(toggleActionPage({ setUserNameUrlPage: false }))
              }
            >
              {xmark}
            </button>
          </div>
          <form action="">
            <Input
              type="text"
              label="User name"
              placeholder="@username"
              dis={`Create a unique user name that must start with "@" sign. create user name with 'a-zA-z0-9' and some spacial characters like "_", "-", ".".`}
            />
            <SubmitBtn className="px-4 py-1 rounded mt-4">Create</SubmitBtn>
          </form>
        </PopupPage>
      )}
    </div>
  );
};

export default NameSetting;
