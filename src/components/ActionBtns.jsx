import React from "react";
import { ActionBtn } from ".";

const ActionBtns = () => {
  return (
    <div className="flex items-center gap-3 border-b border-t py-4 px-2">
      <ActionBtn actionType="claps" actionCount="20" />
      <ActionBtn actionType="comment" actionCount="20" />
    </div>
  );
};

export default ActionBtns;
