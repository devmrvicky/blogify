import React from "react";
import { Oval } from "react-loader-spinner";

const SubmitBtn = ({
  children,
  type = "submit",
  loading,
  handleClick,
  className = "px-6 py-2 rounded-full mt-auto",
  disable,
}) => {
  return (
    <button
      type={type}
      className={` text-white bg-green-500 ${
        !disable ? "hover:bg-green-600 active:scale-95" : "cursor-not-allowed"
      }  transition-all self-end flex items-center gap-5 ${className}`}
      onClick={handleClick}
      disabled={disable}
    >
      {loading && (
        <Oval
          height={20}
          width={20}
          color="#fff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#fff"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      <span>{children}</span>
    </button>
  );
};

export default SubmitBtn;
