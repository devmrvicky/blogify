import React, { useEffect, useState } from "react";
import { FaPenAlt } from "react-icons/fa";
import authService from "../../appwrite/authService";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import CategoriesPopup from "./CategoriesPopup";
import { toggleActionPage } from "../../features";

const CategoriesLists = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { isPageOpen } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await authService.getUserPrefs();
        console.log(res);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="px-4 py-6">
      <h3 className="text-2xl">Categories</h3>
      {loading ? (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <>
          <div className="border-t border-b flex gap-3 py-5 my-5">
            {categories.length ? (
              ""
            ) : (
              <div className="text-center w-full py-5">
                You have not choose any categories.
                <br /> Please tell us about your interest.
              </div>
            )}
          </div>
          <button
            className="flex items-center gap-2 text-sm bg-green-400 text-white px-3 py-2 active:scale-95 transition-all active:bg-green-600 rounded-full"
            onClick={() => dispatch(toggleActionPage({ categoryPopup: true }))}
          >
            <span>
              <FaPenAlt />
            </span>
            <span>Customize categories</span>
          </button>
        </>
      )}
      {isPageOpen.categoryPopup && <CategoriesPopup />}
    </div>
  );
};

export default CategoriesLists;
