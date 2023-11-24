import React from "react";
import { ActionBtns, Author, Container } from ".";
import parse from "html-react-parser";

const FullPost = ({
  title,
  article,
  authorName,
  readTime,
  $createdAt,
  categories,
  authorId,
  $id,
  claps,
  whoClaps,
}) => {
  // console.log(authorId, $id);
  return (
    <div className="py-10">
      <Container maxWidth="max-w-3xl">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <Author
          authorId={authorId}
          $id={$id}
          authorName={authorName}
          readTime={readTime}
          $createdAt={$createdAt}
          className="py-8"
        />
        <ActionBtns claps={claps} />
        <article className="py-10 font-['source-serif-pro'] leading-9 text-[22px]">
          <div className="">{parse(article)}</div>
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
        <ActionBtns claps={claps} />
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
