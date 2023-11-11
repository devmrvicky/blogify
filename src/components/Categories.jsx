import React, { useEffect, useState } from "react";
import { NavLinks } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleActionPage } from "../features";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { userMainData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMouseMove = (e) => {
    // const target = e.target;
    // console.log(target);
  };

  const openCategoryPage = () => {
    navigate("/me/preferences/category");
    // dispatch(toggleActionPage({ categoryPopup: true }));
  };

  useEffect(() => {
    if (userMainData) {
      setCategories(userMainData.categories);
    }
  }, [userMainData?.categories?.length]);

  return (
    <div className="w-full max-w-3xl overflow-auto mt-5">
      <div
        className="flex items-center gap-2 w-full"
        onMouseMove={handleMouseMove}
      >
        <div className="categories-menu w-full flex items-center gap-5 pb-[3px] border-b overflow-hidden">
          {categories.length ? (
            categories.map((menu) => (
              <NavLinks
                name={menu}
                path={menu === "For you" ? "" : `/category:${menu}`}
                key={menu}
              />
            ))
          ) : (
            <div className="flex justify-between items-center w-full py-2">
              <p>Choose categories For the best experience</p>
              <button
                className="bg-green-400 text-white px-4 py-2 rounded-full active:bg-green-500 active:scale-95 transition-all"
                onClick={openCategoryPage}
              >
                Choose categories
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
