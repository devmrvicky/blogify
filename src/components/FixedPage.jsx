import React from "react";

const FixedPage = ({ children }) => {
  return (
    <div className="responds-page fixed top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center backdrop-blur-sm z-30">
      {children}
    </div>
  );
};

export default FixedPage;
