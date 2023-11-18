import React, { useEffect, useState } from "react";
import { Loading, Header, Popup, PreLoader } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  replaceAllPosts,
  showLoginPopup,
  toggleMenu,
  updateUserMainData,
} from "./features";
import dbService from "./appwrite/databaseService";
import { Watch } from "react-loader-spinner";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isWorking = useSelector((store) => store.loading.loading);
  const { userData, loginPopup } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showLoginPopup(false));
    (async function () {
      try {
        const userData = await authService.getUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
          navigate("/");
        }
        // todo : in future I will get all documents by using queries
        // get all posts when app mount
        const allDocs = await dbService.getAllDocs();
        if (allDocs) {
          dispatch(replaceAllPosts(allDocs.documents));
          // const { $id } = userData;
          // const postsReacts = await dbService.getPostReactById({
          //   $id,
          // });
          // if (postsReacts) {
          //   dispatch(addAllPostReact(postsReacts.documents));
          // }
        }
        // get user all main data when app is starting
        const res = await dbService.getAllUserDataByUserId(userData);
        const { $id, name, email, phone } = userData;
        // console.log(res.documents);
        if (res.documents.length) {
          // console.log("this user has user main data");
          dispatch(updateUserMainData(res.documents[0]));
        } else {
          // console.log("this user has not user main data");
          // user has not user main data, create it
          const userMainData = await dbService.createUserData({
            name,
            email,
            phone,
            userId: $id,
          });
          // console.log(userMainData);
          dispatch(updateUserMainData(userMainData));
        }
        dispatch(toggleMenu(false));
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate, userData?.$id]);

  return !isLoading ? (
    <div className="font-[poppins] bg-white">
      <Header />
      <main className="w-full">
        <Outlet />
        {isWorking && <Loading />}
        {loginPopup && <Popup />}
      </main>
      {/* <Footer /> */}
    </div>
  ) : (
    <PreLoader />
  );
};

export default App;
