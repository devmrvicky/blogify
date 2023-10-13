import React from "react";
import { Categories, Container, Hero, PostCard } from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  const posts = useSelector((store) => store.posts.allPosts);

  const { status } = useSelector((store) => store.auth);

  return (
    <div>
      {!status && <Hero />}
      {/* recommended post */}
      <Container>
        {status && <Categories />}
        {posts.map((post) => (
          <div
            className="post-card-wrapper flex flex-col gap-3 my-5 mx-2"
            key={post.$id}
          >
            <PostCard {...post} />
          </div>
        ))}
        {!posts.length && <div>Could not find any post?</div>}
      </Container>
    </div>
  );
};

export default Home;
