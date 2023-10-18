import { Author, ClapsBtn } from ".";
import { comment, replyIcon } from "../assets";

const Respond = () => {
  return (
    <div className="respond py-4 border-b">
      <Author
        authorName={"user name"}
        className="pb-2"
        iconHeight="h-9"
        iconWidth="w-9"
        nameFontSize="text-sm"
      />
      <p className="text-sm py-2">
        Thank you for this. I'm new here and have been thinking of how to grow.
      </p>
      <div className="py-3 flex items-center gap-5">
        <ClapsBtn />
        <button className="flex items-center gap-3">
          <span>{comment}</span>
          <span>Hide replies</span>
        </button>
        <button className="flex items-center gap-3 ml-auto">
          <span>{replyIcon}</span>
          <span>Reply</span>
        </button>
      </div>
    </div>
  );
};

export default Respond;
