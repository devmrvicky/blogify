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
  updateAllUserMainData,
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
        const allUserMainData = await dbService.getAllUserMainData();
        if (allUserMainData.documents.length) {
          dispatch(updateAllUserMainData(allUserMainData.documents));
        }
        // get user main data by user id for individual user
        const res = await dbService.getAllUserDataByUserId(userData.$id);
        const { $id, name, email, phone } = userData;
        const myPosts = allDocs.documents.filter(
          (doc) => doc.authorId === userData.$id
        );
        const myPostsIds = myPosts.map((doc) => (doc.$id ? doc.$id : ""));
        const totalClaps = myPosts
          .filter((post) => post.whoClaps.length)
          .map((post) => (post.whoClaps ? post.whoClaps : ""))
          .flatMap((item) => (Array.isArray(item) ? item : [item]));
        if (res.documents.length) {
          // console.log("this user has user main data");
          dispatch(
            updateUserMainData({
              ...res.documents[0],
              posts: myPostsIds,
              claps: totalClaps,
            })
          );
        } else {
          // console.log("this user has not user main data");
          // user has not user main data, create it
          const userMainData = await dbService.createUserData({
            name,
            email,
            phone,
            userId: $id,
            posts: myPostsIds,
            claps: totalClaps,
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
