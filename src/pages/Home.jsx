import React, { useEffect, useState } from "react";
import { Categories, Container, Hero, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { allPosts, collectedPosts } = useSelector((store) => store.posts);

  const { status } = useSelector((store) => store.auth);
  // console.log(posts);
  useEffect(() => {
    setPosts(
      allPosts.map((post) =>
        collectedPosts.find((collection) => collection === post.$id)
          ? { ...post, collected: true }
          : { ...post, collected: false }
      )
    );
  }, [collectedPosts.length]);

  return (
    <div>
      {!status && <Hero />}
      {/* recommended post */}
      <Container>
        {status && <Categories />}
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
      </Container>
    </div>
  );
};

export default Home;
