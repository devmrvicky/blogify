import React from "react";
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import authService from "../../appwrite/authService";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { end, start, toggleActionPage } from "../../features";
import { MenuItem } from "../../components";

const Dashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const { authorId } = useParams();
  const dispatch = useDispatch();
  const { isPageOpen } = useSelector((store) => store.posts);
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Overview",
      path: `/${authorId}`,
      icon: "",
      active: true,
    },
    {
      name: "Posts",
      path: `/${authorId}/posts`,
      icon: "",
      active: true,
    },
    {
      name: "Collections",
      path: `/${authorId}/collections`,
      icon: "",
      active: true,
    },
  ];

  useEffect(() => {
    // console.log("Dashboard also running.")
    (async function () {
      try {
        // dispatch(start());
        const userData = await authService.getUser();
        if (userData && userData.$id === authorId) {
          setLoggedIn(true);
          setAuthorName(userData.name);
        } else {
          if (authorId[0] !== "@") {
            navigate("/");
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatch(end());
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(toggleActionPage({ dashboardSidebar: false }));
  }, [navigate]);

  return (
    <div className="dashboard bg-white flex w-full h-[90vh]">
      <div
        className={`dashboard-menus w-1/4 max-[800px]:w-[200px] border p-2 max-[800px]:fixed bg-white z-20 h-full translate-x-0 transition-all ${
          isPageOpen.dashboardSidebar
            ? "max-[800px]:translate-x-0"
            : "max-[800px]:-translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-semibold px-2 py-4">
          Welcome
          <br />
          {authorName}
        </h1>
        <div className="menus py-4">
          {menuItems.map((menu) => (
            <button key={menu.name} className="flex text-center w-full">
              <MenuItem {...menu} />
            </button>
          ))}
        </div>
      </div>
      <div className="dashboard-contents w-3/4 border max-[800px]:w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
