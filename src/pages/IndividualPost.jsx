import React from "react";
import { FullPost } from "../components";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IndividualPost = () => {
  const { authorId, postSlug } = useParams();
  const posts = useSelector((store) => store.posts.allPosts);

  const post = posts.find(
    (post) => post.authorId === authorId && post.postSlug === postSlug
  );

  return (
    <div>
      {post ? (
        <FullPost {...post} />
      ) : (
        <div className="text-2xl font-semibold italic text-center py-10">
          Something went wrong...
        </div>
      )}
    </div>
  );
};

export default IndividualPost;
