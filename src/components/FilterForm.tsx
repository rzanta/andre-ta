import React from "react";

interface FilterParameter {
  key: string;
  operator: string;
  //   "operator" : "'>'/'<'/'>='/'<='/'='/'!='"
  value: string;
  child?: FilterParameter;
}

interface ParameterFormGroupProps {
  filterParam: FilterParameter;
}

const ParameterFormGroup: React.FC<ParameterFormGroupProps> = ({
  filterParam,
}) => {
  return (
    <div>
      <input type="text" placeholder="Category" />
      <input type="text" />
      <input type="text" />
    </div>
  );
};

const FilterForm = () => {
  const [filterParams, setFilterParams] = React.useState<
    Array<FilterParameter>
  >([]);

  return (
    <div className="my-4 mx-2 bg-[#294734] rounded-2xl px-4 py-4">
      <div className="flex flex-row justify-between text-white items-center ">
        <button
          className="flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
          onClick={() => {}}
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
  );
};

export default FilterForm;
