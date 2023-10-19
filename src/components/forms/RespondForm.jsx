import React from "react";
import { Author } from "..";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import dbService from "../../appwrite/databaseService";
import { Oval } from "react-loader-spinner";
import { addRespond, toggleActionPage } from "../../features";

const RespondForm = ({ userName, isReply = false }) => {
  const { userData } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { currentPost, isPageOpen } = useSelector((store) => store.posts);
  // console.log(currentPost);
  const { register, handleSubmit } = useForm();
  const handleRespondForm = async (data) => {
    try {
      dispatch(toggleActionPage({ respondPage: true, responding: true }));
      const prepareData = {
        ...data,
        postId: currentPost.$id,
        reply: false,
        userName: userData.name,
        userId: userData.$id,
        claps: 0,
      };
      const res = await dbService.createResponds(prepareData);
      if (res) {
        dispatch(addRespond(res));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(toggleActionPage({ respondPage: true, responding: false }));
    }
  };
  return (
    <form
      className={`respond-writer max-w-lg w-full bg-white border shadow-lg flex flex-col rounded-sm h-24 focus-within:border-2 fixed bottom-2 left-1/2 -translate-x-1/2 focus-within:h-96 transition-all`}
      onSubmit={handleSubmit(handleRespondForm)}
    >
      <label htmlFor="respond-writer" className="items-center p-2 flex gap-3">
        <Author
          authorName={userData.name}
          iconHeight="h-8"
          iconWidth="w-8"
          nameFontSize="text-sm"
          followBtn={false}
        />
        {isReply && (
          <>
            <p className="font-semibold italic text-zinc-400">To</p>
            <Author
              authorName={userName}
              iconHeight="h-6"
              iconWidth="w-6"
              nameFontSize="text-sm"
              followBtn={false}
            />
          </>
        )}
        <button
          type="submit"
          className={`px-3 py-1 bg-green-400 hover:bg-green-600 ${
            isPageOpen.responding && "bg-green-800"
          } rounded-full text-white text-sm ml-auto flex items-center gap-2`}
          disabled={isPageOpen.responding}
        >
          {isPageOpen.responding && (
            <Oval
              height={15}
              width={15}
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
          <span>Respond</span>
        </button>
      </label>
      <textarea
        name="respond-writer"
        id="respond-writer"
        className="w-full px-4 py-2 outline-none text-sm flex-1"
        placeholder="Respond on this post"
        autoFocus
        {...register("respond", { required: true })}
      ></textarea>
    </form>
  );
};

export default RespondForm;
