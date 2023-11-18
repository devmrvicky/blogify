import React, { useEffect, useState } from "react";
import { FaUserCircle, FaRegUserCircle, FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AuthorMenu from "./AuthorMenu";
import { toggleMenu } from "../../features";
import dbService from "../../appwrite/databaseService";
import env from "../../env/env";

const AuthorIcon = () => {
  const [img, setImg] = useState(null);
  const { status, userData, menuOpen, userMainData } = useSelector(
    (store) => store.auth
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleMenu(true));
  };

  useEffect(() => {
    if (userMainData?.profileImg) {
      // fetch profile img url
      setImg(
        dbService.filePreview(
          userMainData?.profileImg,
          env.appwriteProfileImgBucketId
        )
      );
    }
  }, [userMainData?.profileImg]);

  return (
    <div className="flex items-center gap-3 relative">
      {status ? (
        <div className="flex items-center gap-3">
          <span className="text-[24px]">{userData.name}</span>
          <div onClick={handleClick} className="flex items-center gap-1">
            {userMainData?.profileImg ? (
              <div className="w-10 h-10 overflow-hidden rounded-full">
                <img src={img} alt="profile-img" />
              </div>
            ) : (
              <FaUserCircle className="text-[40px] border-4 rounded-full cursor-pointer active:scale-90 transition-all" />
            )}
            <FaAngleDown />
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 text-zinc-400 hover:text-blue-600 ml-4 ${
            menuOpen && "text-blue-800"
          }`}
          onClick={handleClick}
        >
          <FaRegUserCircle className="text-[32px] cursor-pointer active:scale-90 transition-all" />
          <FaAngleDown />
        </div>
      )}
      {menuOpen && <AuthorMenu />}
    </div>
  );
};

export default AuthorIcon;
