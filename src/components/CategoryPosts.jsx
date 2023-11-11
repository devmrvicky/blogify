import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostsLists } from ".";

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const { allPosts, collectedPosts } = useSelector((store) => store.posts);
  const params = useParams()

  useEffect(() => {
    setPosts(
      allPosts.map((post) =>
        collectedPosts.find((collection) => collection === post.$id)
          ? { ...post, collected: true }
          : { ...post, collected: false }
      )
    );
  }, [collectedPosts.length]);
  return <PostsLists posts={posts} />;
};

export default CategoryPosts;
// const [posts, setPosts] = useState([]);
//   const params = useParams();
//   const { allPosts } = useSelector((store) => store.posts);
//   useEffect(() => {
//     setPosts(allPosts.filter(({ categories }) => categories.includes(params)));
//   });
