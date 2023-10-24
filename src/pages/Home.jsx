import React, { useEffect, useState } from "react";
import {
  Categories,
  CategoryPosts,
  Container,
  Hero,
  PostCard,
} from "../components";
import { useSelector } from "react-redux";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  // const { allPosts, collectedPosts } = useSelector((store) => store.posts);

  const { status } = useSelector((store) => store.auth);
  // // console.log(posts);
  // useEffect(() => {
  //   setPosts(
  //     allPosts.map((post) =>
  //       collectedPosts.find((collection) => collection === post.$id)
  //         ? { ...post, collected: true }
  //         : { ...post, collected: false }
  //     )
  //   );
  // }, [collectedPosts.length]);

  return (
    <div>
      {!status && <Hero />}
      {/* recommended post */}
      <Container>
        {status && <Categories />}
        <CategoryPosts />
      </Container>
    </div>
  );
};

export default Home;
