import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { clearIcon } from "../assets";

const Notification = () => {
  const [posts, setPosts] = useState([]);
  const { allPosts, collectedPosts } = useSelector((store) => store.posts);
  const { authorId } = useParams();

  const notificationMenus = [
    {
      name: "All",
      path: `/${authorId}/notification`,
    },
    {
      name: "Articles",
      path: `/${authorId}/articles`,
    },
    {
      name: "Responds",
      path: `/${authorId}/notification/responds`,
    },
    {
      name: "Claps",
      path: `/${authorId}/notification/claps`,
    },
  ];

  // console.log(posts);
  useEffect(() => {
    setPosts(
      allPosts.filter((post) =>
        collectedPosts.find((postId) => postId === post.$id)
      )
    );
  }, [collectedPosts.length]);
  return (
    <div>
      <Container className="py-5 h-full">
        <h1 className="text-3xl py-4 ">Notification</h1>
        <div className="max-w-2xl">
          <div className="notification-menu flex items-center gap-5 border-b">
            {notificationMenus.map((menu) => (
              <NavLink
                to={menu.path}
                key={menu.name}
                className={({ isActive }) =>
                  isActive
                    ? "p-2 text-sm text-black  relative after:contents-[''] after:w-full after:h-[0.5px] after:bg-black after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2"
                    : "p-2 text-sm text-zinc-400 hover:text-black"
                }
              >
                {menu.name}
              </NavLink>
            ))}
            <button className="mx-2 w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-all active:bg-zinc-100 cursor-pointer ml-auto">
              {clearIcon}
            </button>
          </div>
          {posts.map((post) => (
            <div key={post.$id} className="border rounded px-5 my-2">
              <PostCard {...post} collectedPost={true} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Notification;
