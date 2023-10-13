import React from "react";
import { Oval } from "react-loader-spinner";

const PostCtrlBtn = ({ btnName, btnAction = false, icon, onClick }) => {
  return (
    <button
      className="flex gap-2 items-center px-4 py-2 rounded-full bg-zinc-50 active:scale-95 transition-all active:bg-zinc-200 hover:shadow"
      onClick={onClick}
    >
      {!btnAction ? (
        <span>{icon}</span>
      ) : (
        <Oval
          height={20}
          width={20}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      <span className="text-sm">{btnName}</span>
    </button>
  );
};

export default PostCtrlBtn;
