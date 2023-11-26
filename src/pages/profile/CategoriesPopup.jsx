import React, { useEffect, useState } from "react";
import { Container, FixedPage, PopupPage, SubmitBtn } from "../../components";
import { xmark } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { toggleActionPage, updateUserMainData } from "../../features";
import dbService from "../../appwrite/databaseService";
import { Oval } from "react-loader-spinner";
import { removeDollarSign } from "../../common-methods";

const CategoriesPopup = () => {
  const [updating, setUpdating] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [chosenCategories, setChosenCategories] = useState([]);
  const dispatch = useDispatch();
  const { userMainData, userData } = useSelector((store) => store.auth);
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
    "Technology",
    "Travel",
    "Food",
    "Health",
    "Fashion",
    "Lifestyle",
    "Sports",
    "Entertainment",
    "Business",
    "Education",
    "Finance",
    "Marketing",
    "Science",
    "Art",
    "Music",
    "Books",
    "Movies",
    "Gaming",
    "History",
    "Politics",
    "Home Improvement",
    "DIY",
    "Photography",
    "Nature",
    "Parenting",
    "Self-Improvement",
    "Relationships",
    "Spirituality",
    "Pets",
    "Cars",
    "Fitness",
    "Travel Tips",
    "Hiking",
    "Camping",
    "Cooking",
    "Baking",
    "Vegetarianism",
    "Veganism",
    "Gluten-Free",
    "Allergies",
    "Mental Health",
    "Productivity",
    "Time Management",
    "Freelancing",
    "E-commerce",
    "Startup",
    "Cryptocurrency",
    "Web Development",
    "Mobile Apps",
    "Social Media",
    "Search Engine Optimization",
    "Content Marketing",
    "Email Marketing",
    "Green Living",
    "Environmental Issues",
    "Fashion Trends",
    "Interior Design",
    "Outdoor Adventure",
    "Extreme Sports",
    "Movie Reviews",
    "TV Shows",
    "Music Reviews",
    "Classical Music",
    "Modern Art",
    "Contemporary Art",
    "Literary Fiction",
    "Mystery Novels",
    "Travel Destinations",
    "Budget Travel",
    "Luxury Travel",
    "Adventure Travel",
    "Parenting Tips",
    "Child Development",
    "Parenting Humor",
    "Self-Help",
    "Personal Finance",
    "Investing",
    "Retirement Planning",
    "Science News",
    "Space Exploration",
    "History Lessons",
    "Political Analysis",
    "Home Renovation",
    "Gardening",
    "Crafts",
    "Event Planning",
    "Wedding Planning",
    "Photography Tips",
    "Wildlife Photography",
    "Landscapes",
    "Family Photography",
    "Travel Photography",
    "Spiritual Guidance",
    "Religious Studies",
    "Pet Care",
    "Pet Adoption",
    "Car Maintenance",
    "Car Buying Tips",
    "Fitness Workouts",
    "Nutrition",
    "Dieting",
    "Healthy Recipes",
    "Budgeting",
    "Debt Management",
    "Cybersecurity",
    "Web Design",
    "App Development",
    "Social Networking",
    "Video Marketing",
    "Influencer Marketing",
    "Email Newsletter Marketing",
  ];

  const updateCategoriesList = async () => {
    try {
      setUpdating(true);
      // if (userMainData) {
      const prepareData = removeDollarSign(userMainData);
      prepareData.categories = chosenCategories;
      const res = await dbService.updateUserData(userMainData.$id, prepareData);
      if (res) {
        dispatch(updateUserMainData(res));
      }
      // } else {
      //   const prepareData = {
      //     userId: userData.$id,
      //     categories: chosenCategories,
      //   };
      //   const res = await dbService.createUserData(prepareData);
      //   if (res) {
      //     dispatch(updateUserMainData(res));
      //   }
      // }
    } catch (error) {
      console.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const selectCategories = (category) => {
    if (chosenCategories.length >= 10 || chosenCategories.includes(category))
      return;
    setChosenCategories((prev) => [category, ...prev]);
  };

  useEffect(() => {
    setAllCategories(
      categories.map((category) =>
        chosenCategories.find((chosenCategory) => chosenCategory === category)
          ? { category, chooses: true }
          : { category, chooses: false }
      )
    );
  }, [chosenCategories.length]);

  useEffect(() => {
    if (userMainData) {
      setChosenCategories(userMainData.categories);
    }
  }, []);

  return (
    <PopupPage>
      <button
        className="ml-auto"
        onClick={() => dispatch(toggleActionPage(false))}
      >
        {xmark}
      </button>

      <h1 className="text-center text-2xl font-bold">
        Choose categories in which you interested
      </h1>
      {chosenCategories.length > 0 && (
        <div>Total {chosenCategories.length} of 10</div>
      )}
      <div className="categories border-t border-b py-4 overflow-auto flex gap-3 flex-wrap items-start justify-start">
        {allCategories.map(({ category, chooses }) => (
          <button
            key={category}
            className={`px-3 py-1 border rounded-full active:scale-95 transition-all text-sm ${
              chooses
                ? "border-green-400 bg-green-400 text-white"
                : "active:bg-zinc-300/30"
            }`}
            onClick={() => selectCategories(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <SubmitBtn
        type="submit"
        loading={updating}
        handleClick={updateCategoriesList}
      >
        Save
      </SubmitBtn>
    </PopupPage>
  );
};

export default CategoriesPopup;
