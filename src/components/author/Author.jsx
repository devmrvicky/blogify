import React from "react";
import { FaUser } from "react-icons/fa";
import useFormateDistanceDate from "../../formatDistance";

const Author = ({
  authorName,
  readTime,
  $createdAt,
  className = "",
  iconWidth = "w-12",
  iconHeight = "h-12",
  nameFontSize = "text-lg",
  dateFontSize = "text-xs",
  followBtn = true,
}) => {
  // const date = useFormateDistanceDate($createdAt);
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`${iconWidth} ${iconHeight} rounded-full border flex items-center justify-center`}
      >
        <FaUser />
      </div>
      <div>
        <div>
          <div className={`flex gap-3 ${nameFontSize}`}>
            <p>{authorName}</p>
            {followBtn && <button className="text-blue-800">Follow</button>}
          </div>
          <div className="flex items-center gap-2 mt-auto text-sm text-zinc-500">
            {readTime && (
              <>
                <p>{readTime}</p>
                <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
              </>
            )}
            <p className={`${dateFontSize}`}>
              {$createdAt && useFormateDistanceDate($createdAt)}
            </p>
            {/* <span className="w-1 h-1 bg-zinc-500 rounded-full"></span> */}
            <p className="hidden">200 follower</p>
          </div>
        </div>
        <button type="button" className="hidden">
          button
        </button>
      </div>
    </div>
  );
};

export default Author;
