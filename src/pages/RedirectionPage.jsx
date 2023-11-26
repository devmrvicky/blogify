import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import { useSelector } from "react-redux";
import Profile from "./profile/Profile";
import { Container } from "../components";

const RedirectionPage = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [userData, setUserData] = useState({});
  const { authorId } = useParams();
  const navigate = useNavigate();
  const { userMainData, allUserMainData } = useSelector((store) => store.auth);

  useEffect(() => {
    setUserData(
      allUserMainData.filter((userData) => userData.userName === authorId)[0]
    );
    if (authorId === userMainData.userName) {
      navigate("/me");
    } else {
      setOpenProfile(authorId[0] === "@");
    }
  }, []);

  return openProfile ? (
    <Container maxWidth="max-w-3xl" className="h-full py-2">
      <Profile profileOwner={false} userData={userData} />
    </Container>
  ) : (
    <Dashboard />
  );
};

export default RedirectionPage;
