import React, { useEffect, useState } from "react";
import dbService from "../../appwrite/databaseService";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { PostCard, PostCtrlBtn } from "../../components";
import {
  addPostsById,
  replaceAllPosts,
  updateUserMainData,
} from "../../features";
import {
  eyeHide,
  eyeIcon,
  openLinkIcon,
  penIcon,
  trashIcon,
} from "../../assets";
import { useNavigate } from "react-router-dom";
import { DashboardHead } from "..";

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [btnAction, setBtnAction] = useState({
    delete: false,
  });
  const { userData, userMainData } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postsById, allPosts } = useSelector((store) => store.posts);

  const deletePost = async (postId) => {
    try {
      // delete post logic
      setBtnAction((prev) => ({ ...prev, delete: true }));
      const allRemainingPosts = await dbService.deletePost(postId);
      if (allRemainingPosts) {
        dispatch(replaceAllPosts(allRemainingPosts.documents));
      }
      // console.log(allRemainingPosts.documents);
      const myPosts = allRemainingPosts.documents
        .filter((doc) => doc.authorId === userData.$id)
        .map((doc) => (doc.$id ? doc.$id : ""));
      const prepareData = {};
      for (let key in userMainData) {
        if (key[0] === "$") continue;
        prepareData[key] = userMainData[key];
      }
      prepareData.posts = [...myPosts];
      // console.log(prepareData);
      const res = await dbService.updateUserData(userMainData.$id, prepareData);
      if (res) {
        dispatch(updateUserMainData(res));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setBtnAction({ delete: false });
    }
  };

  const goToEditPage = ({ authorId, postSlug }) => {
    navigate(`/${authorId}/${postSlug}/edit`);
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
      <DashboardHead title={"Post"} />
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
              className={`w-full border-b pb-5 mb-2 max-w-3xl mx-auto flex flex-col gap-3 max-[370px]:gap-0`}
              key={post.$id}
            >
              <PostCard {...post} authorPost={true} dashboardPost={true} />
              <div className="post-btns w-full flex-1 flex items-center gap-2">
                <PostCtrlBtn
                  btnName="Edit post"
                  icon={penIcon}
                  onClick={() => goToEditPage(post)}
                />
                <PostCtrlBtn
                  btnName="Delete"
                  icon={trashIcon}
                  btnAction={btnAction.delete}
                  onClick={() => deletePost(post.$id)}
                />
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
