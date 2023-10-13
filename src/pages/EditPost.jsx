import React from "react";
import WritePost from "./WritePost";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const EditPost = () => {
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState({});
  const { authorId, postSlug } = useParams();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store.auth);
  const posts = useSelector((store) => store.posts.allPosts);
  useEffect(() => {
    setLoader(true);
    setPost(
      posts.find(
        (post) => post.authorId === authorId && post.postSlug === postSlug
      )
    );

    if (!post || authorId !== userData.$id) {
      navigate(`/${authorId}`);
      return;
    }
    setLoader(false);
  });
  return <>{!loader ? <WritePost post={post} /> : <div>loading...</div>}</>;
};

export default EditPost;
