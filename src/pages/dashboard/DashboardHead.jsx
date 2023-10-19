import React from "react";
import { FaBars } from "react-icons/fa6";

const DashboardHead = ({ title }) => {
  return (
    <div className="border-b px-3 py-2 flex items-center gap-3">
      <button type="button">
        <FaBars />
      </button>
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
};

export default DashboardHead;
