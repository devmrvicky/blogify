import React from "react";
import svgIcons from "../../assets/svgIcons";

const ActionBtn = ({
  actionType,
  claps = 0,
  clapped = false,
  className = "",
  onClick,
  updated = true,
  handleClapsPage,
}) => {
  return (
    <div
      className={`${actionType} flex items-center gap-2 ${
        updated ? "text-zinc-800" : `text-zinc-400`
      } ${className}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="active:scale-95 transition-all"
      >
        {!clapped ? svgIcons[actionType] : svgIcons.filledClaps}
      </button>
      <span className="claps-count" onClick={handleClapsPage}>
        {claps !== 0 && claps}
      </span>
    </div>
  );
};

export default ActionBtn;
