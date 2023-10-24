import React from "react";
import { PostCard } from ".";

const PostsLists = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return (
          <div
            className="post-card-wrapper flex flex-col gap-3 my-5 mx-2"
            key={post.$id}
          >
            <PostCard {...post} />
          </div>
        );
      })}
      {!posts.length && <div>Could not find any post?</div>}
    </div>
  );
};

export default PostsLists;
