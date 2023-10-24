import React from "react";
import { Container, SettingCard } from "../../components";
import { FaBars } from "react-icons/fa6";
import { barsIcon, curlyBracketIcon } from "../../assets";
import { useSelector } from "react-redux";
import SettingLists from "./SettingLists";
import { Outlet, useNavigate } from "react-router-dom";

const Profile = () => {
  const { status, userData } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  return (
    <div>
      {status ? (
        <Container>
          <div className="border-b py-2 flex items-center gap-3">
            <button className="w-8 h-8 rounded-full border text-sm flex items-center justify-center hover:bg-zinc-300/50 active:scale-95 transition-all">
              {barsIcon}
            </button>
            <h1
              className="text-xl cursor-pointer"
              onClick={() => navigate("/me")}
            >
              {userData.name}
            </h1>
          </div>
          <Outlet />
        </Container>
      ) : (
        <h1>You are not authorized person.</h1>
      )}
    </div>
  );
};

export default Profile;
