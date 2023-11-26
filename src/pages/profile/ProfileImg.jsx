import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage, updateUserMainData } from "../../features";
import { avatarIcon, penIcon, shareIcon } from "../../assets";
import dbService from "../../appwrite/databaseService";
import { Oval } from "react-loader-spinner";
import { FaPenAlt } from "react-icons/fa";
import env from "../../env/env";

const ProfileImg = ({ editableProfile = false, userMainData = {} }) => {
  const [updating, setUpdating] = useState(false);
  const [img, setImg] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&q=80&w=1469&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const dispatch = useDispatch();
  // const { userMainData } = useSelector((store) => store.auth);
  const { profileImg, bgImg } = userMainData;

  const handleFileUpload = async (e, field, fileId, bucketId) => {
    try {
      setUpdating(true);
      if (fileId) {
        const fileDeleted = await dbService.deleteFile(fileId, bucketId);
        if (!fileDeleted) return;
      }
      const res = await dbService.uploadFile(e.target.files[0], bucketId);
      if (res) {
        const prepareData = {};
        for (let key in userMainData) {
          if (key[0] === "$") continue;
          prepareData[key] = userMainData[key];
        }
        prepareData[field] = res.$id;
        const updatedRes = await dbService.updateUserData(
          userMainData.$id,
          prepareData
        );
        if (updatedRes) {
          dispatch(updateUserMainData({ ...userMainData, [field]: res.$id }));
          if (field === "profileImg") {
            setImg(dbService.filePreview(res.$id, bucketId));
          }
          if (field === "bgImg")
            setBackgroundImg(
              dbService.filePreview(res.$id, env.appwriteBgImgBucketId)
            );
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (profileImg) {
      // fetch profile img url
      setImg(dbService.filePreview(profileImg, env.appwriteProfileImgBucketId));
    }
    if (bgImg) {
      // fetch background img url
      setBackgroundImg(dbService.filePreview(bgImg, env.appwriteBgImgBucketId));
    }
  }, []);

  return (
    <div
      className={`bg-banner w-full h-[150px] bg-red-300 bg-center bg-cover px-5 mb-16 relative rounded`}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* bg img updating btn */}
      {editableProfile && (
        <label
          htmlFor="changeBgImg"
          type="button"
          className="absolute right-2 bottom-2 w-8 h-8 border rounded-full flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer"
        >
          <FaPenAlt />
        </label>
      )}
      <label
        htmlFor="profile-img"
        className={`profile-img border-2 border-white bg-white rounded-full w-[140px] h-[140px] flex items-center justify-center relative -bottom-16 overflow-hidden after:contents-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0  ${
          updating
            ? "after:bg-black/80 after:block"
            : "after:bg-black/10 after:hidden hover:after:block"
        } cursor-pointer`}
      >
        {/* {avatarIcon} */}
        {profileImg ? (
          <img src={img} alt="" />
        ) : (
          <span className="border w-full h-full rounded-full flex items-center justify-center">
            {avatarIcon}
          </span>
        )}
        {updating && (
          <span className="absolute top-0 left-0 z-20 border w-full h-full rounded-full flex items-center justify-center">
            <Oval
              height={50}
              width={50}
              color="#fff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#fff"
              strokeWidth={3}
              strokeWidthSecondary={2}
            />
          </span>
        )}
      </label>
      {editableProfile && (
        <>
          <input
            type="file"
            name="profile-img"
            id="profile-img"
            className="hidden"
            onChange={(e) =>
              handleFileUpload(
                e,
                "profileImg",
                profileImg,
                env.appwriteProfileImgBucketId
              )
            }
          />
          <input
            type="file"
            name="profile-img"
            id="changeBgImg"
            className="hidden"
            onChange={(e) =>
              handleFileUpload(e, "bgImg", bgImg, env.appwriteBgImgBucketId)
            }
          />
        </>
      )}
      {!editableProfile && (
        <button
          className="rounded-full w-12 h-12 active:bg-zinc-200/20 flex items-center justify-center absolute -bottom-16 right-2"
          // onClick={() => dispatch(toggleActionPage({ profileEditPage: true }))}
        >
          <span className="active:scale-95 transition-all">{shareIcon}</span>
        </button>
      )}
    </div>
  );
};

export default ProfileImg;
