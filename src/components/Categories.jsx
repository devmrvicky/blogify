import React from "react";
import Container from "./Container";

const Categories = () => {
  const handleMouseMove = (e) => {
    // const target = e.target;
    // console.log(target);
  };
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
  return (
    <div className="w-full max-w-3xl border-b overflow-auto mt-5">
      <div
        className="flex items-center gap-2 w-full"
        onMouseMove={handleMouseMove}
      >
        <button className="px-3 py-3 text-zinc-400 min-w-max hover:text-black">
          For you
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className="px-3 py-3 text-zinc-400 min-w-max hover:text-black"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
