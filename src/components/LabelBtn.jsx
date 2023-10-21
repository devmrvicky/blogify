import React from "react";
import { FaXmark } from "react-icons/fa6";

const LabelBtn = ({ label, handleAddLabel, selectedLabel }) => {
  return (
    <button
      className={`border ${
        selectedLabel
          ? "border-green-500 bg-green-200 hover:bg-green-500 text-black hover:text-white"
          : "hover:text-zinc-700 text-zinc-600 hover:bg-zinc-200"
      }  px-2 py-1 text-xs active:scale-95 transition-all flex items-center rounded-full gap-2`}
      onClick={handleAddLabel}
    >
      <span>{label}</span>
      <span>
        <FaXmark />
      </span>
    </button>
  );
};

export default LabelBtn;
