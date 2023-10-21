import { Input, LabelBtn } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setSlug, addLabel } from "../features";
import { FaXmark } from "react-icons/fa6";

const PostOpts = ({ setPostOptOpen }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("opts-container")) {
      setPostOptOpen((prev) => !prev);
    }
  };
  const dispatch = useDispatch();
  const { slug, allLabels, selectedLabels } = useSelector(
    (store) => store.posts
  );
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
        <div className="select-field w-full">
          <h3 className="py-2">Categories</h3>
          <select
            name="category"
            id="category"
            className="border outline-none w-full p-1"
          >
            <option value="category1">category1</option>
            <option value="category2">category2</option>
            <option value="category3">category3</option>
            <option value="category4">category4</option>
            <option value="category5">category5</option>
          </select>
        </div>
        <div className=" w-full py-2">
          <Input
            type="text"
            label="Choose label"
            placeholder="react, JavaScript. etc"
            labelStyle="text-base font-regular"
            className="py-1 px-2 text-sm"
            // {...register("slug")}
          />
          <div className="labels">
            <div className="flex items-start flex-wrap gap-2 border rounded p-2 my-2 h-[300px] overflow-auto">
              {selectedLabels.map((label) => (
                <LabelBtn
                  label={label}
                  key={label}
                  selectedLabel={true}
                  handleAddLabel={() => dispatch(addLabel(label))}
                />
              ))}
              {allLabels.map((label) => (
                <LabelBtn
                  label={label}
                  key={label}
                  handleAddLabel={() => dispatch(addLabel(label))}
                />
              ))}
            </div>
          </div>
        </div>
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
