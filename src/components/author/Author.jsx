import React from "react";
import { FaUser } from "react-icons/fa";
import useFormateDistanceDate from "../../formatDistance";

const Author = ({ authorName, readTime, $createdAt }) => {
  const date = useFormateDistanceDate($createdAt);
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="w-12 h-12 rounded-full border flex items-center justify-center">
        <FaUser />
      </div>
      <div>
        <div>
          <div className="flex gap-3">
            <p className="text-lg">{authorName}</p>
            <button className="text-blue-800">Follow</button>
          </div>
          <div className="flex items-center gap-2 mt-auto text-sm text-zinc-500">
            <p>{readTime}</p>
            <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
            <p>{date}</p>
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
