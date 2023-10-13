import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import authService from "../../appwrite/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { end, start } from "../../features";

const DeleteIdentity = ({ $id }) => {
  const [deleteForm, setDeleteForm] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteAccount = async () => {
    try {
      dispatch(start());
      const res = await authService.deleteAccount($id);
      console.log(res);
      if (res) {
        navigate("/");
      }
    } catch (error) {
    } finally {
      dispatch(end());
    }
  };

  return (
    <div className="w-full h-16 border bg-zinc-200/50 flex items-center justify-between px-3 my-3">
      <p className="text-xl text-semibold">Delete Account</p>
      <button
        className="text-sm border w-36 py-2 bg-red-500 text-white rounded active:scale-90 active:bg-red-800 transition-all"
        onClick={deleteAccount}
      >
        Delete Account
      </button>

      {/* confirmation password form */}
      {deleteForm && (
        <div
          className="confirm-password-form bg-black/50 backdrop-blur fixed top-0 left-0 w-full h-full flex items-center justify-center"
          onClick={() => setDeleteForm(false)}
        >
          <form
            action=""
            className="w-full max-w-xl p-5 flex flex-col gap-3 bg-white border rounded relative"
            onSubmit={deleteAccount}
          >
            <h1 className="text-center text-xl text-semibold p-3">
              Enter your email id and password
            </h1>
            <div
              className="absolute top-3 right-3"
              onClick={() => setDeleteForm(false)}
            >
              <FaXmark />
            </div>
            <div className="input-field flex flex-col gap-2 flex-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-1 border outline-none"
                placeholder="example@gmail.com"
                // required
              />
            </div>
            <div className="input-field flex flex-col gap-2 flex-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-1 border outline-none"
                placeholder="example@gmail.com"
                // required
              />
            </div>
            <button
              type="submit"
              className="text-sm border w-36 py-2 bg-red-500 text-white rounded active:scale-90 active:bg-red-800 transition-all flex-1"
            >
              Delete Account
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeleteIdentity;
