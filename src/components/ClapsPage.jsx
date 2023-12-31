import { Container } from ".";
import { useSelector, useDispatch } from "react-redux";
import { toggleActionPage } from "../features";
import { FaUserAlt } from "react-icons/fa";
import { xmark } from "../assets";

const ClapsPage = () => {
  const dispatch = useDispatch();
  const { currentPost } = useSelector((store) => store.posts);
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center backdrop-blur-sm"
      onClick={() => dispatch(toggleActionPage({ clapsPage: false }))}
    >
      <Container maxWidth="max-w-lg" className="text-black">
        <h1 className="text-2xl font-semibold">
          {currentPost.claps} claps from {currentPost.whoClaps.length}{" "}
          {currentPost.whoClaps.length > 1 ? "peoples " : "people "}
          for <i>'{currentPost.title}'</i>
        </h1>
        <div className="users flex flex-col gap-2 py-4">
          {currentPost.whoClaps.map((whoClap) => (
            <div
              className="flex items-center gap-5 p-2 rounded hover:bg-zinc-200/50"
              key={whoClap}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center border">
                <FaUserAlt />
              </div>
              <p className="text-xl">{whoClap}</p>
              <button className="ml-auto border px-2 py-1 rounded-full text-sm hover:bg-green-500 hover:border-green-500 hover:text-white">
                Follow
              </button>
            </div>
          ))}
        </div>
        <button
          className="absolute top-4 right-4 text-xl"
          onClick={() => dispatch(toggleActionPage({ clapsPage: false }))}
        >
          <div className="svg-container">{xmark}</div>
        </button>
      </Container>
    </div>
  );
};

export default ClapsPage;
