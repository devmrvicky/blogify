import React, { useEffect, useState } from "react";
import { Loading, Header, Popup } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllPostReact,
  login,
  logout,
  replaceAllPosts,
  showLoginPopup,
  toggleMenu,
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
        dispatch(toggleMenu(false));
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
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [navigate, userData?.$id]);

  return !isLoading ? (
    <div className="font-[poppins]">
      <Header />
      <main className="w-full">
        <Outlet />
        {isWorking && <Loading />}
        {loginPopup && <Popup />}
      </main>
      {/* <Footer /> */}
    </div>
  ) : (
    <div className="w-full h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#4fa94d"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default App;
