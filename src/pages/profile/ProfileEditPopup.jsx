import React, { useEffect, useState } from "react";
import { Input, PopupPage, SubmitBtn } from "../../components";
import { xmark } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage } from "../../features";
import { useForm } from "react-hook-form";

const ProfileEditPopup = () => {
  // const [value, setValue] = useState("");
  const { userMainData } = useSelector((store) => store.auth);
  const {
    name,
    userName,
    bio,
    email,
    phone,
    interestedIn,
    contactInfo,
    website,
    userId,
  } = userMainData;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name,
    },
  });
  const dispatch = useDispatch();
  const saveUserMainData = (data) => {
    console.log(data);
  };
  // useEffect(() => {
  //   setValue(name);
  // }, []);
  return (
    <PopupPage>
      <div className="flex items-center py-2 border-b">
        <h1 className="flex-1 text-center text-2xl font-semibold pb-2">
          Edit profile
        </h1>
        <button
          className="ml-auto"
          onClick={() => dispatch(toggleActionPage({ profileEditPage: false }))}
        >
          {xmark}
        </button>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(saveUserMainData)}
      >
        <Input label="Full name" {...register("name", { required: true })} />
        {/* <Input label="User id" />
        <Input label="Bio" />
        <Input type="email" label="E-mail" />
        <Input type="number" label="Phone" />
        <Input type="text" label="Contact info" />
        <Input type="url" label="Website" /> */}
        <SubmitBtn type="submit">Save changes</SubmitBtn>
      </form>
    </PopupPage>
  );
};

export default ProfileEditPopup;
