import React from "react";
import { ActionBtn } from "..";
import { useDispatch } from "react-redux";
import { toggleActionPage } from "../../features";

const RespondBtn = () => {
  const dispatch = useDispatch();

  // const handleRespond = () => {
  //   console.log("click on respond btn");
  // };

  return (
    <ActionBtn
      actionType="comment"
      actionCount="20"
      onClick={() => dispatch(toggleActionPage({ respondPage: true }))}
    />
  );
};

export default RespondBtn;
