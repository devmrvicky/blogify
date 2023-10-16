import { FullPost } from "../components";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IndividualPost = () => {
  const { authorId, postSlug } = useParams();
  const posts = useSelector((store) => store.posts.allPosts);

  const post = posts.find(
    (post) => post.authorId === authorId && post.postSlug === postSlug
  );

  return (
    <div>
      {post ? (
        <FullPost {...post} />
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
