import React, { useEffect, useState } from "react";
import { Input, PopupPage, SubmitBtn } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage, updateUserMainData } from "../../features";
import { xmark } from "../../assets";
import { useForm } from "react-hook-form";
import { removeDollarSign } from "../../common-methods";
import dbService from "../../appwrite/databaseService";
import { Link } from "react-router-dom";

const SetUserNamePopup = () => {
  const [urlUpdating, setUrlUpdating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const { userMainData, allUserMainData } = useSelector((store) => store.auth);
  const { userName } = userMainData;
  const { register, handleSubmit } = useForm({
    defaultValues: { userName: userName || "" },
  });

  const createUserName = async ({ userName }) => {
    try {
      setUpdating(true);
      if (userName[0] !== "@") {
        alert('user name must start with "@"');
        return;
      } else {
        const availableUser = allUserMainData.filter(
          (userData) => userData.userName === userName
        );
        // setIsAvailable(!availableUser.length ? true : false);
        if (availableUser.length) {
          alert("user name is already exit please try another name");
        } else {
          const prepareData = removeDollarSign(userMainData);
          prepareData.userName = userName;
          const res = await dbService.updateUserData(
            userMainData.$id,
            prepareData
          );
          if (res) {
            dispatch(updateUserMainData(res));
            dispatch(toggleActionPage({ setUserNameUrlPage: false }));
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const setProfileUrl = async () => {
    try {
      setUrlUpdating(true);
      const url = `${window.location.origin}/${userMainData.userName}`;
      const prepareData = removeDollarSign(userMainData);
      prepareData.profileUrl = url;
      const res = await dbService.updateUserData(userMainData.$id, prepareData);
      if (res) {
        dispatch(updateUserMainData(res));
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setUrlUpdating(false);
    }
  };

  return (
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
      <form action="" onSubmit={handleSubmit(createUserName)}>
        <Input
          type="text"
          label="User name"
          placeholder="@username"
          dis={`Create a unique user name that must start with "@" sign. create user name with 'a-zA-z0-9' and some spacial characters like "_", "-", ".".`}
          {...register("userName", { required: false })}
        />
        <div className="btns flex gap-2">
          <SubmitBtn
            className="px-4 py-1 rounded mt-2"
            disable={isAvailable}
            loading={updating}
          >
            {userMainData.userName ? "Update" : "Create"}
          </SubmitBtn>
          {/* <SubmitBtn className="px-4 py-1 rounded mt-2">
        Create user name and profile url
      </SubmitBtn> */}
        </div>
      </form>

      {userMainData.userName && (
        <div className="mt-10 flex justify-between items-center gap-10">
          <div className="flex-1 w-full">
            <h2 className="text-xl font-semibold">Profile url</h2>
            {userMainData.profileUrl ? (
              <Link
                to={userMainData.profileUrl}
                target="_blank"
                className="text-sm block hover:text-black hover:underline border rounded px-4 py-1 mt-3"
              >
                {userMainData.profileUrl}
              </Link>
            ) : (
              <p className="text-sm text-zinc-400 border rounded px-4 py-1 mt-3">{`${window.location.origin}/${userMainData.userName}`}</p>
            )}
          </div>
          <SubmitBtn
            className="px-2 py-1 rounded"
            loading={urlUpdating}
            handleClick={setProfileUrl}
          >
            {userMainData.profileUrl ? "Update profile ulr" : "set profile url"}
          </SubmitBtn>
        </div>
      )}
    </PopupPage>
  );
};

export default SetUserNamePopup;
