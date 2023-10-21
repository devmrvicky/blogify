import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components";
import DashboardHead from "./DashboardHead";

const Notification = () => {
  const [posts, setPosts] = useState([]);
  const { allPosts, collectedPosts } = useSelector((store) => store.posts);

  // console.log(posts);
  useEffect(() => {
    setPosts(
      allPosts
        .map((post) =>
          collectedPosts.find((collection) => collection === post.$id)
            ? { ...post, collected: true }
            : { ...post, collected: false }
        )
        .filter((post) => post.collected)
    );
  }, [collectedPosts.length]);

  return (
    <div className="w-full h-full">
      <DashboardHead title={"Collections"} />
      <div className="relative w-full min-h-[500px] overflow-auto p-2">
        {posts.length ? (
          posts.map((post) => (
            <div
              className={`w-full border-b pb-5 mb-2 max-w-3xl mx-auto flex flex-col gap-3 max-[370px]:gap-0`}
              key={post.$id}
            >
              <PostCard {...post} dashboardPost={true} />
            </div>
          ))
        ) : (
          <div className="text-xl font-semibold text-center py-5">
            You have any post.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
