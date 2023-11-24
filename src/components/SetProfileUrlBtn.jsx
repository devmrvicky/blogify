import React from "react";
import { useDispatch } from "react-redux";
import { toggleActionPage } from "../features";

const SetProfileUrlBtn = () => {
  const dispatch = useDispatch();
  const openPopup = () => {
    dispatch(toggleActionPage({ setUserNameUrlPage: true }));
  };
  return (
    <div className="flex items-center px-2 py-1 border rounded">
      <div className="w-full flex-1">
        <h1>Create user name and profile url</h1>
        <p className="text-xs text-zinc-500">
          Your user name should be unique and start with "@" sign like
          "@uniqueusername" then your profile url will be
          'www.domainname.com/@uniqueusername'
        </p>
      </div>
      <button
        className="border px-4 py-1 rounded bg-green-400 text-white active:scale-95 transition-all"
        onClick={openPopup}
      >
        set
      </button>
    </div>
  );
};

export default SetProfileUrlBtn;
