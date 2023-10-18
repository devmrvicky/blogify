import { Author, Container, Respond, RespondForm } from ".";
import { useSelector, useDispatch } from "react-redux";
import { toggleActionPage } from "../features";
import { messageBigIcon, xmark } from "../assets";
import { useState } from "react";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";

const RespondPage = () => {
  const [toReply, setToReply] = useState({ userName: "", isReply: false });
  const [responds, setResponds] = useState([]);
  const dispatch = useDispatch();
  const { currentResponds, currentPost, isPageOpen } = useSelector(
    (store) => store.posts
  );
  const closeRespondPage = (e) => {
    if (e.target.classList.contains("responds-page")) {
      dispatch(toggleActionPage(false));
    }
  };

  useEffect(() => {
    setResponds(currentResponds.filter((res) => !res.reply));
  }, [currentResponds.length]);

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
          {responds.length
            ? `${responds.length} ${
                responds.length > 1 ? "responds" : "respond"
              } for '${currentPost.title}'`
            : `Look like no respond for '${currentPost.title}'`}
        </h1>

        {!responds.length ? (
          isPageOpen.responding ? (
            <div className="w-full h-52 flex items-center justify-center">
              <Oval
                height={50}
                width={50}
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
          ) : (
            <div className="flex flex-col items-center text-xl font-semibold italic text-zinc-500">
              <span>{messageBigIcon}</span>
              <span>Respond to this post</span>
            </div>
          )
        ) : (
          responds.map((respond) => (
            <div className="respond py-4 border-b" key={respond.$id}>
              <Respond {...respond} setToReply={setToReply} />
            </div>
          ))
        )}
        {isPageOpen.responding && (
          <div className="w-full h-52 flex items-center justify-center">
            <Oval
              height={50}
              width={50}
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
        )}
        {/* <div className="responds pb-28">
            <Respond />
            <div className="nested-respond flex flex-col gap-4 ml-4 h-full border-l-4 my-2 pl-5">
              <Respond />
              <Respond />
              <Respond />
            </div>
            <Respond />
          </div> */}

        <RespondForm {...toReply} />

        <button
          className="absolute top-4 right-4 text-xl active:scale-95 transition-all"
          onClick={() => dispatch(toggleActionPage(false))}
        >
          <div className="svg-container">{xmark}</div>
        </button>
      </Container>
    </div>
  );
};

export default RespondPage;
