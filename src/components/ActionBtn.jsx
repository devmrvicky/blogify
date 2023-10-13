import React from "react";
import svgIcons from "../assets/svgIcons";

const ActionBtn = ({ actionType, actionCount, className = "" }) => {
  return (
    <div
      className={`${actionType} flex items-center gap-2 text-zinc-400 ${className}`}
    >
      <button type="button">{svgIcons[actionType]}</button>
      <span className="claps-count">{actionCount}</span>
    </div>
  );
};

export default ActionBtn;
