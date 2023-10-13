import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { bell, drawing } from "../../assets";

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
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl px-4 relative hover:after:content-[''] after:w-full after:h-0.5 after:bg-blue-700 after:absolute after:-bottom-[19px] after:right-0"
                      : "text-xl px-4 text-zinc-400 hover:text-zinc-800"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            )
        )}
        {status && (
          <>
            <li>
              <NavLink
                to="/write-post"
                className={({ isActive }) =>
                  isActive
                    ? "hidden"
                    : "flex items-center px-4 py-1 border border-blue-800 hover:bg-zinc-50 cursor-pointer rounded-full gap-2 mx-2"
                }
              >
                <div className="w-6">
                  <img src={drawing} alt="write post" className="w-full" />
                </div>
                <p className="text-ls">write</p>
              </NavLink>
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
