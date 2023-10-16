import React from "react";
import svgIcons from "../assets/svgIcons";

const ActionBtn = ({ actionType, claps = 0, className = "" }) => {
  return (
    <div
      className={`${actionType} flex items-center gap-2 text-zinc-400 ${className}`}
    >
      <button type="button" onClick={onClick}>
        {svgIcons[actionType]}
      </button>
      <span className="claps-count">{claps !== 0 && claps}</span>
    </div>
  );
};

export default ActionBtn;
