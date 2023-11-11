import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage, updateUserMainData } from "../../features";
import { avatarIcon, penIcon, profileIcon } from "../../assets";
import dbService from "../../appwrite/databaseService";

const ProfileImg = ({ editableProfile = false }) => {
  const imgLink = `bg-[url("https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]`;
  const [img, setImg] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const dispatch = useDispatch();
  const { userMainData } = useSelector((store) => store.auth);
  const { profileImg, bgImg } = userMainData;
  // console.log(profileImg, bgImg);
  const handleFileUpload = async (e) => {
    try {
      if (profileImg) {
        const fileDeleted = await dbService.deleteFile(profileImg);
        if (!fileDeleted) return;
      }
      const res = await dbService.uploadFile(e.target.files[0]);
      // console.log(res);
      if (res) {
        dispatch(updateUserMainData({ ...userMainData, profileImg: res.$id }));
        setImg(dbService.filePreview(res.$id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (profileImg) {
      // fetch profile img url
      setImg(dbService.filePreview(profileImg));
    }
    if (bgImg) {
      // fetch background img url
      setBackgroundImg(`bg-[url(${dbService.previewBgImg(bgImg)})]`);
    }
  }, []);

  return (
    <div
      className={`bg-banner w-full h-[150px] bg-red-300 ${
        bgImg ? backgroundImg : imgLink
      } bg-center px-5 mb-16 relative rounded`}
    >
      <label
        htmlFor="profile-img"
        className="profile-img border-2 border-white bg-white rounded-full w-[140px] h-[140px] flex items-center justify-center relative -bottom-16 overflow-hidden after:contents-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-black/10 after:hidden hover:after:block cursor-pointer"
      >
        {/* {avatarIcon} */}
        {profileImg ? (
          <img src={img} alt="" />
        ) : (
          <span className="border w-full h-full rounded-full flex items-center justify-center">
            {avatarIcon}
          </span>
        )}
      </label>
      {editableProfile && (
        <input
          type="file"
          name="profile-img"
          id="profile-img"
          className="hidden"
          onChange={handleFileUpload}
        />
      )}
      {!editableProfile && (
        <button
          className="rounded-full w-12 h-12 active:bg-zinc-200/20 flex items-center justify-center absolute -bottom-16 right-0"
          onClick={() => dispatch(toggleActionPage({ profileEditPage: true }))}
        >
          <span className="active:scale-95 transition-all">{penIcon}</span>
        </button>
      )}
    </div>
  );
};

export default ProfileImg;
