// import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect } from "react";
import { Container, Input, PostOpts, RTE } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { open } from "../features/editorSlice";
import { useForm } from "react-hook-form";
import dbService from "../appwrite/databaseService";
import { add, end, start, setSlug, replaceAllPosts } from "../features";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaXmark, FaBars } from "react-icons/fa6";
import { Oval } from "react-loader-spinner";

const WritePost = ({ post }) => {
  const [posting, setPosting] = useState(false);
  const [postOptOpen, setPostOptOpen] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        article: post?.article || "",
      },
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { $id, name } = useSelector((store) => store.auth.userData);
  const postSlug = watch("title").split(" ").join("-");
  dispatch(setSlug(postSlug));

  const calculateReadingTime = (text) => {
    const base = 200;
    const totalWords = text.split(/\s+/).length;
    return totalWords / base < 1
      ? "less that a min"
      : Math.ceil(totalWords / base) + " min read";
  };

  const postArticle = async (data) => {
    try {
      setPosting(true);
      const prepareData = {
        ...data,
        authorId: $id,
        authorName: name,
        readTime: calculateReadingTime(data.article),
        postSlug,
      };
      if (post) {
        const updatedPosts = await dbService.updatePost(post.$id, prepareData);
        if (updatedPosts) {
          dispatch(replaceAllPosts(updatedPosts.documents));
          navigate(`/${$id}/${postSlug}`);
          return;
        }
      } else {
        const postData = await dbService.createDocument(prepareData);
        if (postData) {
          dispatch(add(postData));
          const authorId = $id;
          navigate(`/${authorId}/${postSlug}`);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setPosting(false);
    }
  };

  // const slugTransform = useCallback((value) => {
  //   if (value && typeof value === "string")
  //     return value
  //       .trim()
  //       .toLowerCase()
  //       .replace(/[^a-zA-Z\d\s]+/g, "-")
  //       .replace(/\s/g, "-");

  //   return "";
  // }, []);

  // React.useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "title") {
  //       setValue("slug", slugTransform(value.title), { shouldValidate: true });
  //     }
  //   });
  // return () => subscription.unsubscribe();
  // }, [watch, slugTransform, setValue]);

  return (
    <div className="relative">
      <Container maxWidth="max-w-3xl">
        <h1 className="text-3xl font-semibold py-5 text-center font-['gt-super-regular'] tracking-widest">
          {post ? "Update" : "Write"} Your story
        </h1>
        <form action="" onSubmit={handleSubmit(postArticle)}>
          <Input
            type="text"
            label="Post title"
            placeholder="Title"
            className="rounded-lg mb-4 text-xl"
            {...register("title", {
              required: true,
            })}
          />
          <RTE
            name="article"
            label="Article"
            control={control}
            defaultValue={getValues("article")}
          />

          <div className="form-control-btns">
            <button
              type="submit"
              className={`flex items-center px-4 py-1 border ${
                post ? "bg-blue-400" : "bg-green-500"
              } text-white hover:bg-green-800 cursor-pointer rounded-full gap-2 mx-2 active:scale-95 transition-all text-lg ml-auto`}
            >
              {posting && (
                <Oval
                  height={20}
                  width={20}
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
              {post ? "update" : "Publish"}
            </button>
          </div>
        </form>
      </Container>
      {/* post options section */}
      <button
        className={`w-10 h-10 rounded-full active:bg-zinc-100 active:scale-95 transition-all flex items-center justify-center absolute top-[20px] right-[20px] z-20 text-lg ${
          postOptOpen && "-translate-x-[200px]"
        }`}
        onClick={() => setPostOptOpen((prev) => !prev)}
      >
        {!postOptOpen ? <FaBars /> : <FaXmark />}
      </button>
      {postOptOpen && <PostOpts setPostOptOpen={setPostOptOpen} />}
    </div>
  );
};

export default WritePost;
