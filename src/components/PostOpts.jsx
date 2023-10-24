import { Input, LabelBtn } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setSlug, addLabel, removeLabel, addCategories } from "../features";
import { useEffect, useState } from "react";

const PostOpts = ({ setPostOptOpen }) => {
  const [labels, setLabels] = useState([]);
  const handleClick = (e) => {
    if (e.target.classList.contains("opts-container")) {
      setPostOptOpen((prev) => !prev);
    }
  };
  const dispatch = useDispatch();
  const { slug, allLabels, selectedLabels } = useSelector(
    (store) => store.posts
  );
  const { register, watch, handleSubmit } = useForm({
    defaultValues: {
      slug,
    },
  });

  const categories = [
    "Developer",
    "Programmer",
    "Architect",
    "Designer",
    "Engineer",
    "Analyst",
    "Administrator",
    "Consultant",
    "Specialist",
    "Manager",
    "Lead",
    "Expert",
    "Guru",
    "Contributor",
    "Tester",
    "Hacker",
    "Coder",
    "Scrum Master",
    "Data Scientist",
    "DevOps",
    "UI/UX",
    "Backend",
    "Frontend",
    "Full-Stack",
    "Web",
    "Mobile",
    "Security",
    "Network",
  ];

  const savePostData = ({ slug, category }) => {
    dispatch(setSlug(slug.split(" ").join("-")));
    dispatch(addCategories(category));
  };

  useEffect(() => {
    setLabels(Array.from(new Set(allLabels)));
  }, [allLabels.length]);

  return (
    <div
      className="opts-container w-full h-full absolute top-0 right-0 z-20"
      onClick={handleClick}
    >
      <section className="bg-white shadow-lg w-96 h-full flex flex-col items-center gap-3 p-4 ml-auto">
        <h3 className="py-2 text-xl font-semibold font-['gt-super-regular'] ">
          Post options
        </h3>
        <form onSubmit={handleSubmit(savePostData)}>
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
              {...register("category", { required: false })}
            >
              <option disabled defaultValue>
                Choose category
              </option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className=" w-full py-2">
            {/* <Input
              type="text"
              label="Choose label"
              placeholder="react, JavaScript. etc"
              labelStyle="text-base font-regular"
              className="py-1 px-2 text-sm"
              {...register("label")}
            /> */}
            <div className="labels">
              <div className="flex items-start flex-wrap gap-2 border rounded p-2 my-2 h-[300px] overflow-auto">
                {selectedLabels.map((label) => (
                  <LabelBtn
                    label={label}
                    key={label}
                    selectedLabel={true}
                    handleAddLabel={() => dispatch(removeLabel(label))}
                  />
                ))}
                {labels.map((label) => (
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
            type="submit"
            className="text-sm px-3 py-1 rounded bg-green-500 text-white mt-auto"
          >
            Save
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostOpts;
