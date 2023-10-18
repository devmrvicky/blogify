import React from "react";
import { ActionBtn } from "..";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage } from "../../features";
import { useState } from "react";
import { useEffect } from "react";

const RespondBtn = () => {
  const [totalResponds, setTotalResponds] = useState(null);
  const dispatch = useDispatch();
  const currentResponds = useSelector((store) => store.posts.currentResponds);
  // console.log(currentResponds);
  // const handleRespond = () => {
  //   console.log("click on respond btn");
  // };
  useEffect(() => {
    setTotalResponds(currentResponds.length);
  }, [currentResponds.length]);

  return (
    <ActionBtn
      actionType="comment"
      responds={totalResponds}
      onClick={() => dispatch(toggleActionPage({ respondPage: true }))}
    />
  );
};

export default RespondBtn;
