import React, { useState } from "react";
import Card from "../../../components/dataDisplayer/Card";
import CardSensorEffector from "../../../components/CardFilterSensorEffector";
import { Link } from "react-router-dom";

// interface Ship {
//   shipClass: string;
//   shipName: string;
//   shipID: string;
// }

// interface CardSensorEffectorProps {
//   shipClass: string;
//   shipName: string;
//   amount: number;
//   position: string;
//   type?: string;
// }

interface Props {
  // ships: Ship[];
  // filter: CardSensorEffectorProps[];
}

const ListShip: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] = useState(false);
  const [isDropdownFilterOpen, setIsDropdownFilterOpen] = useState(false);
  const emptyArray = Array.from({ length: 100 });
  const [showCategoryFilter, setShowCategoryFilter] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  const toggleDropdownCategory = () => {
    setIsDropdownCategoryOpen(!isDropdownCategoryOpen);
  };

  const toggleDropdownFilter = () => {
    setIsDropdownFilterOpen(!isDropdownFilterOpen);
  };

  const toggleFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };

  return (
    <div className="min-w-max min-h-max  bg-[#0A0F0C] py-2">
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
            <button
              id="dropDownFilter"
              onClick={toggleDropdownFilter}
              className="rounded-full border-2  border-white hover:bg-[#294734] active:bg-[#294734]"
              type="button"
            >
              <p className="text-xl  px-4 py-2 text-white font-semibold">
                Filter
              </p>
            </button>

            {isDropdownFilterOpen && (
              <div
                id="dropdown"
                className="z-10 w-[583px] absolute left-0 mt-3 bg-[#1D2A22] px-4 py-4 rounded-xl shadow"
              >
                <div
                  className="flex flex-row text-sm text-white justify-between items-center"
                  aria-labelledby="dropDownFilter"
                >
                  <p className="text-2xl font-bold">Filters</p>
                  <div className="flex flex-row justify-evenly gap-2">
                    <button className=" rounded-full px-2 hover:bg-[#bfb7b7] hover:text-black ">
                      <p>Clear all</p>
                    </button>
                    <button className="text-white bg-transparent border-2 border-white hover:bg-[#294734] rounded-2xl px-2 py-2.5 text-center inline-flex items-center ">
                      <p>Saved Filter</p>
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
                  </div>
                </div>

                <div className="my-4 mx-2 bg-[#294734] rounded-2xl px-4 py-4">
                  <div className="flex flex-row justify-between text-white items-center ">
                    {showCategoryFilter ? (
                      <button
                        className="flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                        onClick={toggleFilter}
                      >
                        <p>Select Filter</p>
                        <svg
                          className={`w-2.5 h-2.5  ms-3`}
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
                    ) : (
                      <div className="flex flex-row gap-3">
                        <button className="flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white">
                          <p>Category</p>
                          <svg
                            className={`w-2.5 h-2.5  ms-3`}
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
                        <button className="flex flex-row gap-2 items-center justify-between p-2 rounded-2xl border-2 border-white">
                          <p>Is</p>
                          <svg
                            className={`w-2.5 h-2.5  ms-3`}
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
                        <button className="flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white">
                          <p>Category</p>
                          <svg
                            className={`w-2.5 h-2.5  ms-3`}
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
                      </div>
                    )}
                    <button className="bg-transparent p-2 rounded-full hover:bg-[#6E6F6E]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="flex flex-row mt-2 px-2 py-1 bg-transparent text-white font-semibold gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>Add nested filter</p>
                  </button>
                </div>
                <div className="flex flex-row justify-between">
                  <button className="flex flex-row bg-transparent text-white font-semibold gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>Add filter</p>
                  </button>
                  <button className="flex flex-row bg-transparent text-white font-semibold gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <p>Apply</p>
                  </button>
                </div>
              </div>
            )}
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
              className="text-xl text-white my-auto flex-grow "
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
            <button
              id="dropDownCategory"
              onClick={toggleDropdownCategory}
              className="text-white bg-transparent border-2 border-white rounded-full px-5 py-2.5 text-center inline-flex items-center hover:bg-[#294734] gap-12"
              type="button"
            >
              <div className="absolute left-2.5 -top-2.5 bg-[#121714]  text-sm px-1 rounded-full">
                Category
              </div>
              <p className="text-xl font-semibold">Ship</p>
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
                  <li>
                    <Link
                      to="/data-displayer"
                      className="text-xl font-semibold block px-4 py-2 text-white"
                    >
                      Effector
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/data-displayer"
                      className="text-xl font-semibold block px-4 py-2 text-white"
                    >
                      Sensor
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-6 overflow-y-auto max-h-[840px] ">
          <>
            {/* Loop untuk membuat 10 kartu */}
            {/* {emptyArray.map((_, index) => (
              <Card key={index} />
            ))} */}
          </>
          {/* {ships.map((ship, index) => (
            key={index}
            shipClass={ship.shipClass}
            shipName={ship.shipName}
            shipId={ship.shipID}
          ))} */}
        </div>
        {/* <div className="overflow-y-auto max-h-[840px]">
          {filter.map((data, index) => (
            <CardSensorEffector
              key={index}
              shipClass={data.shipClass}
              shipName={data.shipName}
              amount={data.amount}
              position={data.position}
              type={data.type}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ListShip;

{
  /* <div className="flex flex-col w-full text-white mt-4">
          {ships.map((ship) => (
            <div key={ship.shipID} className="border-b">
              <h3 className="text-xl font-bold">{ship.shipClass}</h3>
              <p>
                {ship.shipName} ({ship.shipID})
              </p>
            </div>
          ))}
        </div> */
}
