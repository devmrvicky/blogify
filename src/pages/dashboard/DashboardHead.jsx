import React from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage } from "../../features";

const DashboardHead = ({ title }) => {
  const { isPageOpen } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  return (
    <div className="border-b px-3 py-2 flex items-center gap-3">
      <button
        type="button"
        className={`hidden max-[800px]:block transition-all ${
          isPageOpen.dashboardSidebar && "translate-x-[200px]"
        }`}
        onClick={() =>
          dispatch(
            toggleActionPage({ dashboardSidebar: !isPageOpen.dashboardSidebar })
          )
        }
      >
        {!isPageOpen.dashboardSidebar ? <FaBars /> : <FaXmark />}
      </button>
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export default DashboardHead;
