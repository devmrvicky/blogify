import React, { useEffect, useState } from "react";
import { Loading, Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./appwrite/authService";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, replaceAllPosts, toggleMenu } from "./features";
import dbService from "./appwrite/databaseService";
import { Watch } from "react-loader-spinner";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isWorking = useSelector((store) => store.loading.loading);
  const { userData } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const userData = await authService.getUser();
        if (userData) {
          dispatch(login(userData));
          const allDocs = await dbService.getAllDocs();
          // console.log(allDocs);
          if (allDocs) {
            dispatch(replaceAllPosts(allDocs.documents));
          }
        } else {
          dispatch(logout());
          navigate("/");
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
    <div className="font-[poppins]">
      <Header />
      <main className="w-full">
        <Outlet />
        {isWorking && <Loading />}
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
