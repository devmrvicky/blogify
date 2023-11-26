import SettingLists from "./SettingLists";
import { useSelector } from "react-redux";
import ProfileFields from "./ProfileFields";

const Profile = ({ profileOwner = true, userData = {} }) => {
  const { userMainData } = useSelector((store) => store.auth);

  return (
    <>
      <ProfileFields userMainData={profileOwner ? userMainData : userData} />
      {profileOwner && <SettingLists />}
    </>
  );
};

export default Profile;
