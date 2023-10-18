import { Author } from ".";
import { comment, replyIcon, claps as clapsIcon } from "../assets";

const Respond = ({ userName, respond, claps, $createdAt, setToReply }) => {
  return (
    <>
      <Author
        authorName={userName}
        className="pb-2"
        iconHeight="h-9"
        iconWidth="w-9"
        nameFontSize="text-sm"
        $createdAt={$createdAt}
      />
      <p className="text-sm py-2">{respond}</p>
      <div className="py-3 flex items-center gap-5">
        <button className="flex items-center gap-3">
          <span>{clapsIcon}</span>
          {claps > 0 && <span>{claps}</span>}
        </button>
        <button className="flex items-center gap-3">
          <span>{comment}</span>
          <span>Hide replies</span>
        </button>
        <button
          className="flex items-center gap-3 ml-auto"
          onClick={() =>
            setToReply((prev) => ({ userName, isReply: !prev.isReply }))
          }
        >
          <span>{replyIcon}</span>
          <span>Reply</span>
        </button>
      </div>
    </>
  );
};

export default Respond;
