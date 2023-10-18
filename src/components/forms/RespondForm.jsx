import React from "react";
import { Author } from "..";

const RespondForm = () => {
  return (
    <form className="respond-writer max-w-lg w-full h-24 bg-white border shadow-lg fixed bottom-2 left-1/2 -translate-x-1/2 focus-within:border-2 focus-within:h-96 rounded-sm transition-all flex flex-col">
      <label htmlFor="respond-writer" className="items-center p-2 flex">
        <Author
          authorName="Author name"
          iconHeight="h-8"
          iconWidth="w-8"
          nameFontSize="text-sm"
          followBtn={false}
        />
        <button
          type="submit"
          className="px-3 py-1 bg-green-400 hover:bg-green-600 rounded-full text-white text-sm ml-auto"
        >
          Respond
        </button>
      </label>
      <textarea
        name="respond-writer"
        id="respond-writer"
        className="w-full px-4 py-2 outline-none text-sm flex-1"
        placeholder="Respond on this post"
      ></textarea>
    </form>
  );
};

export default RespondForm;
