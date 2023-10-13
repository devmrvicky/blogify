import React from "react";
import { ActionBtns, Author, Container } from ".";

const FullPost = ({
  title,
  article,
  authorName,
  readTime,
  $createdAt,
  categories,
}) => {
  return (
    <div className="py-10">
      <Container maxWidth="max-w-3xl">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <Author
          authorName={authorName}
          readTime={readTime}
          $createdAt={$createdAt}
        />
        <ActionBtns />
        <article className="py-10 font-['source-serif-pro'] text-[22px] text-zinc-700 leading-9">
          {article}
        </article>
        <div className="flex items-center gap-2 my-4">
          {categories?.map((category) => (
            <span
              key={category}
              className="bg-zinc-200/50 px-4 py-1 rounded-full text-xs mr-2"
            >
              {category}
            </span>
          ))}
        </div>
        <ActionBtns />
        {/* article end here */}
        {/* author full profile */}
        {/* recent post from current author */}
        {/* recommended from Blogify */}
        {/* footer */}
      </Container>
    </div>
  );
};

export default FullPost;
