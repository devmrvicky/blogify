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
        console.log(userData);
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
          navigate("/");
        }
        // todo : in future I will get all documents by using queries
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
        const res = await dbService.getAllUserDataByUserId(userData);
        if (res) {
          // console.log(userData);
          const { name, email, phone } = userData;
          const prepareData = { ...res.documents[0], name, email, phone };
          // console.log(prepareData);
          dispatch(updateUserMainData(prepareData));
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
