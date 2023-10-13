import React, { useEffect, useState } from "react";
import dbService from "../../appwrite/databaseService";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { PostCard } from "../../components";
import { addPostsById, replaceAllPosts } from "../../features";
import {
  eyeHide,
  eyeIcon,
  openLinkIcon,
  penIcon,
  trashIcon,
} from "../../assets";

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [btnAction, setBtnAction] = useState({
    btnName: "",
    postId: "",
    working: false,
  });
  const { userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { postsById, allPosts } = useSelector((store) => store.posts);

  const postBtns = [
    {
      name: "hide",
      icon: eyeIcon,
      active: true,
    },
    {
      name: "Unhide",
      icon: eyeHide,
      active: true,
    },
    {
      name: "Open post",
      icon: openLinkIcon,
      active: true,
    },
    {
      name: "Edit",
      icon: penIcon,
      active: true,
    },
    {
      name: "Delete",
      icon: trashIcon,
      active: true,
    },
  ];

  const deletePost = async (postId) => {
    try {
      // delete post logic
      setBtnAction((prev) => ({ ...prev, working: true }));
      const res = await dbService.deletePost(postId);
      if (res) {
        dispatch(replaceAllPosts(res.documents));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setBtnAction({ btnName: "", postId: "", working: false });
    }
  };

  const handleClick = ({ btnName, postId }) => {
    setBtnAction({ btnName, postId });
    if (btnName === "Delete") {
      deletePost(postId);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const posts = await dbService.getDocsByAuthId(userData);
        // console.log(posts);
        if (posts) {
          dispatch(addPostsById(posts.documents));
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [allPosts.length]);
  return (
    <div className="w-full h-full">
      <h1 className="p-3 text-xl font-semibold border-b">Posts</h1>
      <div className="relative w-full min-h-[500px] overflow-auto p-2">
        {loading ? (
          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <Oval
              height={80}
              width={80}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        ) : postsById.length ? (
          postsById.map((post) => (
            <div
              className="w-full border-b pb-5 mb-2 max-w-3xl mx-auto flex flex-col gap-3"
              key={post.$id}
            >
              <PostCard {...post} authorPost={true} />
              <div className="post-btns w-full flex-1 flex items-center gap-2">
                {postBtns.map((btn) => (
                  <button
                    key={btn.name}
                    className="flex gap-2 items-center px-4 py-2 rounded-full bg-zinc-50 active:scale-95 transition-all active:bg-zinc-200"
                    onClick={() =>
                      handleClick({ btnName: btn.name, postId: post.$id })
                    }
                  >
                    {!btnAction.working &&
                    btn.name !== btnAction.btnName &&
                    post.$id !== btnAction.postId ? (
                      <span>{btn.icon}</span>
                    ) : (
                      <Oval
                        height={20}
                        width={20}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
                    )}
                    <span className="text-sm">{btn.name}</span>
                  </button>
                ))}
              </div>
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

export default Posts;
