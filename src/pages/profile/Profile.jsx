import React from "react";
import { avatarIcon, penIcon, profileIcon, profileImg } from "../../assets";
import ProfileField from "./ProfileField";
import SettingLists from "./SettingLists";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage } from "../../features";
import ProfileImg from "./ProfileImg";

const Profile = () => {
  const dispatch = useDispatch();
  const { userData, userMainData } = useSelector((store) => store.auth);
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
  // console.log(userMainData);

  return (
    <>
      <div className="border rounded">
        <ProfileImg />
        <div className="profile-details flex flex-col px-5 gap-1">
          <h1 className="text-4xl">{name}</h1>
          <i className="text-zinc-400">{userName ? userName : userId}</i>
          <p className="py-1 text-sm">
            {bio}
            {/* Full Stack Developer with a knack for turning concepts into polished
            web and mobile applications, proficient in front-end and back-end
            technologies. */}
          </p>
          <ProfileField field="Email" value={email} />
          {phone && <ProfileField field="Phone" value={phone} />}
          {interestedIn && (
            <ProfileField field="Interested in" value={interestedIn} />
          )}
          {contactInfo && (
            <ProfileField field="Contact info" value={contactInfo} />
          )}
          {website && <ProfileField field="Website" value={website} />}
          <div className="stats flex gap-2 items-center justify-around mt-5 border-t py-7">
            <div className="flex flex-col  items-center">
              <span className="text-lg">100</span>
              <span className="text-xs text-zinc-500">Posts</span>
            </div>
            <div className="flex flex-col  items-center">
              <span className="text-lg">100k</span>
              <span className="text-xs text-zinc-500">Followers</span>
            </div>
            <div className="flex flex-col  items-center">
              <span className="text-lg">100</span>
              <span className="text-xs text-zinc-500">Following</span>
            </div>
            <div className="flex flex-col  items-center">
              <span className="text-lg">10m</span>
              <span className="text-xs text-zinc-500">claps</span>
            </div>
          </div>
        </div>
      </div>
      <SettingLists />
    </>
  );
};

export default Profile;
