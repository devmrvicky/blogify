import React, { useEffect, useState } from "react";
import { Container, FixedPage } from "../../components";
import { xmark } from "../../assets";
import { useDispatch } from "react-redux";
import { toggleActionPage } from "../../features";

const CategoriesPopup = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [chosenCategories, setChosenCategories] = useState([]);
  const dispatch = useDispatch();
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

  return (
    <FixedPage>
      <Container
        maxWidth="max-w-3xl"
        className="text-black bg-white/70 h-[90%] overflow-auto px-5 py-5 backdrop-grayscale  border flex flex-col gap-5 rounded"
      >
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
        <button className="px-6 py-2 rounded-full text-white bg-green-500 active:bg-green-600 active:scale-95 transition-all self-end mt-auto">
          save
        </button>
      </Container>
    </FixedPage>
  );
};

export default CategoriesPopup;
