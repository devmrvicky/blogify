import React from "react";
import { useSelector } from "react-redux";
import ProfileImg from "./ProfileImg";
import { Link } from "react-router-dom";
import ProfileField from "./ProfileField";

const ProfileFields = ({ userMainData }) => {
  // const { userData, userMainData } = useSelector((store) => store.auth);
  const {
    name,
    userName,
    profileUrl,
    bio,
    email,
    phone,
    interestedIn,
    contactInfo,
    website,
    userId,
    posts,
    followers,
    following,
    claps,
  } = userMainData;
  return (
    <div className="border rounded">
      <ProfileImg userMainData={userMainData} />
      <div className="profile-details flex flex-col px-5 gap-1">
        <h1 className="text-4xl">{name}</h1>
        <i className="text-zinc-400">{userName ? userName : userId}</i>
        {profileUrl && (
          <Link
            to={profileUrl}
            target="_target"
            className="text-sm hover:underline my-2"
          >
            {profileUrl}
          </Link>
        )}
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
            <span className="text-lg">{posts.length}</span>
            <span className="text-xs text-zinc-500">Posts</span>
          </div>
          <div className="flex flex-col  items-center">
            <span className="text-lg">{followers.length}</span>
            <span className="text-xs text-zinc-500">Followers</span>
          </div>
          <div className="flex flex-col  items-center">
            <span className="text-lg">{following.length}</span>
            <span className="text-xs text-zinc-500">Following</span>
          </div>
          <div className="flex flex-col  items-center">
            <span className="text-lg">{claps.length}</span>
            <span className="text-xs text-zinc-500">claps</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFields;
