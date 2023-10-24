import React from "react";
import { NavLinks } from ".";

const Categories = () => {
  const handleMouseMove = (e) => {
    // const target = e.target;
    // console.log(target);
  };
  const categories = [
    "For you",
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
    <div className="w-full max-w-3xl overflow-auto mt-5">
      <div
        className="flex items-center gap-2 w-full"
        onMouseMove={handleMouseMove}
      >
        <div className="categories-menu flex items-center gap-5 pb-[3px] border-b overflow-hidden">
          {categories.map((menu) => (
            <NavLinks
              name={menu}
              path={menu === "For you" ? "" : `/category:${menu}`}
              key={menu}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
