import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryButton(){
  const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Ship");
    
    const toggleDropdownCategory = () => {
      setIsDropdownCategoryOpen(!isDropdownCategoryOpen);
    };

    const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      setIsDropdownCategoryOpen(false);
    };

    const tabData = [
      { title: "ship", route: "list-ship" },
      { title: "effector", route: "list-effector" },
      { title: "sensor", route: "list-sensor" },
    ];

    return (
      <div>
        <button
          id="dropDownCategory"
          onClick={toggleDropdownCategory}
          className="text-white bg-transparent border-2 border-white rounded-full px-2 py-2.5 text-center inline-flex items-center hover:bg-[#294734] gap-12"
          type="button"
        >
          <div className="absolute left-2.5 -top-2.5 bg-[#121714] text-sm px-1 rounded-full">
            Category
          </div>
          <p className="text-xl font-semibold">{selectedCategory}</p>
          <svg
            className={`w-2.5 h-2.5 ${
              isDropdownCategoryOpen ? "rotate-180" : ""
            } ms-3`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isDropdownCategoryOpen && (
          <div
            id="dropdown"
            className="z-10 absolute right-0 mt-2 bg-[#1D2A22] divide-y divide-whites rounded-xl shadow"
          >
            <ul
              className="py-2 text-sm text-gray-700 divide-y-[1px]"
              aria-labelledby="dropDownCategory"
            >
              {tabData
                .filter((tab) => tab.title !== selectedCategory)
                .map((tab, index) => (
                  <li key={index}>
                    <Link to={tab.route}>
                    <button
                      onClick={() => handleCategorySelect(tab.title)}
                      className="text-xl font-semibold block px-7 py-2 text-white"
                    >
                      {tab.title}
                    </button>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
}