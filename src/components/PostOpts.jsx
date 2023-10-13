import { Input } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setSlug } from "../features";

const PostOpts = ({ setPostOptOpen }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("opts-container")) {
      setPostOptOpen((prev) => !prev);
    }
  };
  const dispatch = useDispatch();
  const { slug } = useSelector((store) => store.posts);
  const { register, watch } = useForm({
    defaultValues: {
      slug,
    },
  });
  dispatch(setSlug(watch("slug").split(" ").join("-")));

  return (
    <div
      className="opts-container w-full h-full absolute top-0 right-0 z-20"
      onClick={handleClick}
    >
      <section className="bg-white shadow-lg w-72 h-full flex flex-col items-center gap-3 p-4 ml-auto">
        <h3 className="py-2 text-xl font-semibold font-['gt-super-regular'] ">
          Post options
        </h3>
        <Input
          type="text"
          label="slug"
          placeholder="how-to-lear-react"
          {...register("slug")}
        />

        <button
          type="button"
          className="text-sm px-3 py-1 rounded bg-green-500 text-white mt-auto"
        >
          Save
        </button>
      </section>
    </div>
  );
};

export default PostOpts;
