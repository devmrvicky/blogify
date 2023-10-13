import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { add, end, start } from "../../features";
import { ID } from "appwrite";
import dbService from "../../appwrite/databaseService";
import authService from "../../appwrite/authService";

const AddNoteForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.auth.userData);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "This is my first title",
      content: "This is my first note",
    },
  });
  const saveNote = async (data) => {
    try {
      dispatch(start());
      const finalData = { ownerId: userData.$id, ...data };
      const res = await dbService.createDocument(finalData);

      if (res) {
        dispatch(add(res));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      dispatch(end());
    }
  };
  return (
    <form
      onSubmit={handleSubmit(saveNote)}
      className="border p-5 flex flex-col gap-3 flex-1"
    >
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        {...register("title", {
          required: true,
        })}
        className="border px-3 py-1"
      />
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="10"
        placeholder="Content"
        {...register("content", {
          required: true,
        })}
        className="border px-3 py-1"
      ></textarea>
      <button
        type="submit"
        className="border px-3 py-1 active:scale-95 active:bg-zinc-200 transition-all"
      >
        Add note
      </button>
    </form>
  );
};

export default AddNoteForm;
