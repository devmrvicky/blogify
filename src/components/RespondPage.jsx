import { Author, Container, Respond, RespondForm } from ".";
import { useSelector, useDispatch } from "react-redux";
import { toggleActionPage } from "../features";
import { messageBigIcon, xmark } from "../assets";

const RespondPage = () => {
  // console.log("open respond page");
  const dispatch = useDispatch();
  const { currentPost } = useSelector((store) => store.posts);
  const closeRespondPage = (e) => {
    if (e.target.classList.contains("responds-page")) {
      dispatch(toggleActionPage(false));
    }
  };
  return (
    <div
      className="responds-page fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center backdrop-blur-sm"
      onClick={closeRespondPage}
    >
      <Container
        maxWidth="max-w-lg"
        className="text-black h-full overflow-auto px-2"
      >
        <h1 className="text-2xl font-semibold text-center py-5 border-b">
          {/* 200 Responds for <i>'This title'</i> */}
          Look like no respond for <i>'This title'</i>
        </h1>

        <div className="flex flex-col items-center text-xl font-semibold italic text-zinc-500">
          <span>{messageBigIcon}</span>
          <span>Respond to this post</span>
        </div>

        {/* <div className="responds pb-28">
          <Respond />
          <div className="nested-respond flex flex-col gap-4 ml-4 h-full border-l-4 my-2 pl-5">
            <Respond />
            <Respond />
            <Respond />
          </div>
          <Respond />
        </div> */}

        <RespondForm />

        <button
          className="absolute top-4 right-4 text-xl"
          onClick={closeRespondPage}
        >
          <div className="svg-container">{xmark}</div>
        </button>
      </Container>
    </div>
  );
};

export default RespondPage;
