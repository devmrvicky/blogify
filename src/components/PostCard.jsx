import React from "react";
import { FaUser } from "react-icons/fa";
import { bookmark, filledBookmarkIcon, sample } from "../assets";
import { Link } from "react-router-dom";
import useFormateDistanceDate from "../formatDistance";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { collectPost, deleteCollectedPost } from "../features";

const PostCard = ({
  $id,
  title,
  article,
  authorName,
  authorId,
  $createdAt,
  readTime,
  featuredId,
  categories,
  postSlug,
  collected = false,
  authorPost = false,
  dashboardPost = false,
  collectedPost = false,
}) => {
  const date = useFormateDistanceDate($createdAt);
  const { collectedPosts } = useSelector((store) => store.posts);
  const dispatch = useDispatch();

  const handlePostCollection = (postId) => {
    if (collectedPosts.includes(postId)) {
      dispatch(deleteCollectedPost(postId));
    } else {
      dispatch(collectPost(postId));
    }
  };

  return (
    <div className="my-5">
      <div className="rounded flex max-[370px]:flex-col-reverse items-center gap-3 max-w-3xl w-full ">
        <div className="text-area flex flex-col flex-1 relative">
          {!authorPost && (
            <div className="author flex items-center gap-2 max-[370px]:py-1">
              <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                <FaUser />
              </div>
              <p className="max-[370px]:relative max-[370px]:-top-[6px]">
                {authorName}
              </p>
            </div>
          )}
          <Link to={`/${authorId}/${postSlug}`}>
            <h2
              className={`py-2 max-[635px]:text-lg max-[422px]:text-base ${
                collectedPost
                  ? "text-base font-medium"
                  : "font-semibold text-xl"
              }`}
            >
              {title}
            </h2>
            {!collectedPost && (
              <div className="text-zinc-500 py-2 text-sm max-[635px]:hidden">
                {parse(
                  authorPost ? article.slice(0, 100) : article.slice(0, 200)
                )}
                ...
              </div>
            )}
          </Link>
          {!collectedPost && (
            <div
              className={`flex items-center gap-2 mt-auto text-xs text-zinc-500  max-[370px]:top-[23px] max-[370px]:left-10 ${
                dashboardPost ? "max-[370px]:static" : "max-[370px]:absolute"
              }`}
            >
              <p>{date}</p>
              {!authorPost && (
                <>
                  <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
                  <p>{readTime}</p>
                </>
              )}
              <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
              {categories?.map((category) => (
                <span
                  key={category}
                  className="bg-zinc-200/50 px-4 py-1 rounded-full text-xs mr-2"
                >
                  {category}
                </span>
              ))}
              {!authorPost && (
                <button
                  className="ml-auto mr-3 active:scale-95 transition-all"
                  onClick={() => handlePostCollection($id)}
                  disabled={dashboardPost ? false : collected}
                >
                  {collected ? filledBookmarkIcon : bookmark}
                </button>
              )}
            </div>
          )}
        </div>
        <div
          className={`img-container ${
            authorPost || collectedPost || dashboardPost
              ? `w-[100px] max-h-[100px]`
              : "w-[200px] max-h-[200px]"
          } max-[635px]:w-[150px] max-[422px]:w-[100px] max-[370px]:w-[200px] ${
            dashboardPost && "max-[370px]:max-h-none"
          }`}
        >
          <Link to={`/${authorId}/${postSlug}`}>
            <img
              src={sample}
              alt="sample-img"
              className="w-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
