import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { bell, drawing } from "../../assets";
import WritePostBtn from "../WritePostBtn";

// const useStore = () => useSelector((store) => store.posts);

const Nav = () => {
  const { status } = useSelector((store) => store.auth);

  const navItems = [
    {
      name: "About",
      path: "/about",
      active: !status,
    },
    {
      name: "Contact",
      path: "/contact-us",
      active: !status,
    },
  ];
  return (
    <nav className="flex items-center ml-auto">
      <ul className="flex items-center">
        {navItems.map(
          (item) =>
            item.active && (
              <li key={item.name} className="max-[380px]:hidden">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl max-[500px]:text-base px-4 max-[500px]:px-2 relative hover:after:content-[''] after:w-full after:h-0.5 after:bg-blue-700 after:absolute after:-bottom-[19px] max-[500px]:after:-bottom-[16px] after:right-0"
                      : "max-[500px]:text-base px-4 max-[500px]:px-2 text-zinc-400 hover:text-zinc-800"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            )
        )}
        {status && (
          <>
            <li className="max-[545px]:hidden">
              <WritePostBtn text="write" />
            </li>
            <li className="mx-2 w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-all active:bg-zinc-100 cursor-pointer">
              {bell}
            </li>
          </>
        )}
      </ul>
      <div></div>
    </nav>
  );
};

export default Nav;
