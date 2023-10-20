import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout as authLogout, start, end, toggleMenu } from "../../features";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authService from "../../appwrite/authService";
import { logoutIcon, profileIcon, dashboard } from "../../assets";
import WritePostBtn from "../WritePostBtn";

const AuthorMenu = () => {
  const { status, userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menus = [
    {
      item: "Login",
      path: "/login",
      status: !status,
    },
    {
      item: "Signup",
      path: "/signup",
      status: !status,
    },
    {
      item: "Profile",
      path: "/profile",
      status: status,
      icon: profileIcon,
    },
    {
      item: "Dashboard",
      path: `/${userData?.$id}`,
      status: status,
      icon: dashboard,
    },
  ];

  const hideMenus = () => {
    dispatch(toggleMenu(false));
  };

  const logout = async () => {
    try {
      dispatch(start());
      const deleteSession = await authService.logout();
      if (deleteSession) {
        dispatch(authLogout());
        navigate("/");
      }
    } catch (error) {
      console.log("logout " + error.message);
    } finally {
      dispatch(end());
    }
  };

  return (
    <div
      className="fixed w-full h-full top-0 left-0 overflow-hidden z-10"
      onClick={hideMenus}
    >
      <div className="border p-2 bg-white shadow-md flex flex-col rounded gap-2 absolute top-14 w-80 max-[500px]:w-64 right-2 z-30">
        <h2 className="text-center text-xl max-[500px]:text-lg font-semibold py-3 text-blue-800">
          {!status ? (
            <>
              Get started with
              <Link to="/" className="italic underline">
                Blogify
              </Link>
            </>
          ) : (
            "welcome in Blogify"
          )}
        </h2>
        {status && (
          <div className="hidden max-[545px]:block py-2 max-w-[250px] max-[500px]:max-w-[200px] mx-auto">
            <WritePostBtn text="create a post" />
          </div>
        )}
        {menus.map(
          (menu) =>
            menu.status && (
              <button
                key={menu.item}
                className={`flex text-center w-full ${
                  !status && "max-w-[250px] max-[500px]:max-w-[200px]"
                } mx-auto`}
              >
                <NavLink
                  to={menu.path}
                  className={
                    !status
                      ? ({ isActive }) =>
                          isActive
                            ? `px-4 py-2 hover:bg-zinc-100 bg-zinc-100 w-full cursor-pointer border border-blue-800 rounded-full font-semibold text-blue-800`
                            : "py-2 hover:bg-zinc-100 w-full cursor-pointer border border-blue-800 rounded-full font-semibold text-blue-800 "
                      : ({ isActive }) =>
                          isActive
                            ? `px-4 py-2 text-left bg-zinc-50 w-full cursor-pointer flex items-center gap-3 text-lg`
                            : "px-4 py-2 text-left hover:bg-zinc-50 w-full cursor-pointer flex items-center gap-3 text-lg"
                  }
                >
                  {menu.icon && <span>{menu.icon}</span>}
                  <span>{menu.item}</span>
                </NavLink>
              </button>
            )
        )}

        {status && (
          <button
            onClick={logout}
            className="px-4 py-3 rounded-lg text-left hover:bg-zinc-50 w-full cursor-pointer flex items-center"
          >
            <span className="w-10">{logoutIcon}</span>
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthorMenu;
