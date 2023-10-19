import { ClapsPage, FullPost, RespondPage } from "../components";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAllResponds, setCurrentPost } from "../features";
import { useEffect } from "react";
import dbService from "../appwrite/databaseService";

const IndividualPost = () => {
  const { authorId, postSlug } = useParams();
  const { allPosts, isPageOpen } = useSelector((store) => store.posts);

  const post = allPosts.find(
    (post) => post.authorId === authorId && post.postSlug === postSlug
  );
  // console.log(post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPost(post));
    (async function () {
      try {
        dispatch(addAllResponds([]));
        const rsp = await dbService.getAllRespondsByPostId(post);
        // console.log(rsp);
        if (rsp) {
          dispatch(addAllResponds(rsp.documents));
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className="w-full h-full bg-white">
      {post ? (
        <>
          <FullPost {...post} />
          {isPageOpen.clapsPage && <ClapsPage />}
          {isPageOpen.respondPage && <RespondPage />}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-2xl font-semibold italic">Post could not find.</p>
          <p className="text-sm text-zinc-300 py-3">
            maybe author id or post slug means url are wrong. <br />
            it is not matching any post
          </p>
          <Link to="/">Go to home</Link>
        </div>
      )}
    </div>
  );
};

export default IndividualPost;
