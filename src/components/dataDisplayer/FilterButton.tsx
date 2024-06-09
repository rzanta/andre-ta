import React, { useState } from "react";
import icon from "../../assets/icons/Vector_Right.png";
import { Controller, useForm } from "react-hook-form";
import Selection from "../Selection";

const CategoryFilter = [
  {
    key:"ship.category_id",
    title:"Ship Category"
  },
  {
    key:"ship.general_type",
    title:"General Type"
  },
  {
    key:"ship.sensor_id",
    title:"Sensor Category"
  },
  {
    key:"ship.effector_id",
    title:"Effector Category"
  },
  {
    key:"ship.speed",
    title:"Speed"
  },
  {
    key:"ship.length",
    title:"Length"
  }
]

export default function FilterButton(){
  const {control} = useForm({
    defaultValues: {

    }
  }); 
  const [isDropdownFilterOpen, setIsDropdownFilterOpen] = useState(false);
  const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(true);
  const [editMode, setIsEditMode] = useState(false);
  
  const toggleFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };



    const toggleDropdownFilter = () => {
      setIsDropdownFilterOpen(!isDropdownFilterOpen);
    };

    return (
      <div>
        <form>
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
                  <div className="flex flex-row gap-3">
                    {/* <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Selection
                    editMode={editMode}
                    className="bg-[#494D49] text-white px-3 py-2 flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                    placeholder="Select Category Sensor"
                    options={}
                    value={field.value}
                    onChange={(value) =>
                      field.onChange(value)
                    }
                  />
                )} */}
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
                      <p>Value</p>
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
                  {/* {showCategoryFilter ? (
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
                      <p>Value</p>
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
                )} */}
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
        </form>
      </div>
    );
}