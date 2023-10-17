import { ClapsPage, FullPost } from "../components";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPost } from "../features";
import { useEffect } from "react";

const IndividualPost = () => {
  const { authorId, postSlug } = useParams();
  const { allPosts, isClapsPageOpen } = useSelector((store) => store.posts);

  const post = allPosts.find(
    (post) => post.authorId === authorId && post.postSlug === postSlug
  );
  // console.log(post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPost(post));
  }, []);

  return (
    <div>
      {post ? (
        <>
          <FullPost {...post} />
          {isClapsPageOpen && <ClapsPage />}
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
