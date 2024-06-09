import CategoryButton from '@/components/dataDisplayer/CategoryButton';
import FilterButton from '@/components/dataDisplayer/FilterButton';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';


interface DataDisplayerListPlatformProps{
    CategoryComponent?: React.FC,
    TitleCategoryComponent?: string,
    CardComponent: React.FC,
    FilterComponent?: React.FC,
}


export default function DataDisplayerListPlatformLayout({
  CategoryComponent,
  TitleCategoryComponent,
  CardComponent,
  FilterComponent,
}: DataDisplayerListPlatformProps) {

  const [searchTerm, setSearchTerm] = useState("");
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Search Term:", searchTerm);
    };

      const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setSearchTerm(event.target.value);
      };
  return (
    <div className="w-full min-h-screen max-h-screen bg-[#0A0F0C] py-2">
      <div className="flex flex-row justify-between px-2 rounded-md mx-2 mt-4">
        <h1 className="text-white my-auto font-bold text-4xl">
          Data Displayer
        </h1>
        <Link to="/">
          <button
            onClick={() => {}}
            className="px-8 py-1 bg-[#1D2420] text-xl my-auto rounded-md font-semibold text-white hover:bg-[#1D2A22] active:bg-[#171E1A] cursor-pointer ml-auto"
          >
            Landing Page
          </button>
        </Link>
      </div>
      <div className="bg-[#121714] mx-4 my-4 rounded-md p-4 ">
        <h1 className="text-white font-bold text-4xl mb-4">Home</h1>
        <div className="flex flex-row justify-between items-center gap-8">
          <div className="relative inline-block text-left">
            {/* {FilterComponent && <FilterComponent />} */}
            <FilterButton/>
          </div>
          <div className="flex flex-row rounded-lg border-2 border-white px-2 py-2 min-w-max flex-grow items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6 m-auto mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <form
              onSubmit={handleSubmit}
              className="text-xl text-white my-auto flex-grow"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search"
                className="bg-transparent border-none outline-none text-white placeholder-white w-full"
              />
            </form>
          </div>

          <div className="relative inline-block text-left text-white">
            {/* {CategoryComponent && <CategoryComponent />} */}
            <CategoryButton />
          </div>
        </div>
        <div className="py-2">
          <CardComponent />
        </div>
      </div>
    </div>
  );
}