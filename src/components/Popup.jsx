import React from "react";
import { showLoginPopup } from "../features";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Loading = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hidePopup = () => {
    dispatch(showLoginPopup(false));
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center"
      onClick={hidePopup}
    >
      <div className="card w-96 py-8 flex flex-col items-center gap-10 bg-white rounded">
        <h1 className="text-2xl font-semibold">You are not login.</h1>
        <div className="btns flex items-center gap-10">
          <button
            className="border px-5 py-2 active:scale-95 transition-all hover:bg-zinc-500 active:bg-zinc-700 hover:text-white"
            onClick={hidePopup}
          >
            Ok
          </button>
          <button
            className="border px-5 py-2 active:scale-95 transition-all bg-green-500 active:bg-green-700 text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
        <p className="text-xs italic">
          I am new here.{" "}
          <Link to="/signup" className="hover:underline text-blue-800">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loading;
