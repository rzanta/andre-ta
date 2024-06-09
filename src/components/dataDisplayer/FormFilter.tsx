import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Selection from "../Selection";

const CategoryFilter = [
  { id: "ship.category_id", name: "Ship Category" },
  { id: "ship.general_type", name: "General Type" },
  { id: "ship.sensor_id", name: "Sensor Category" },
  { id: "ship.effector_id", name: "Effector Category" },
  { id: "ship.speed", name: "Speed" },
  { id: "ship.length", name: "Length" },
];

const OperatorFilter = [
  { id: "less_than_equal", name: "<=" },
  { id: "less_than", name: "<" },
  { id: "equal", name: "=" },
  { id: "more_than", name: ">" },
  { id: "more_than_equal", name: ">=" },
];

const ValueFilter = [
  { id: "1", name: "tempur" },
  { id: "2", name: "induk" },
  { id: "3", name: "baja" },
  { id: "4", name: "teluk" },
  { id: "5", name: "medis" },
];

interface FilterParams {
  key: string;
  operator: string;
  value: string;
  child?: FilterParams[];
}

export default function FormFilter() {
  const { control } = useForm();
  const [filters, setFilters] = useState<FilterParams[]>([]);
  const [editMode, setIsEditMode] = useState(true);

  const handleChange = (
    index: number,
    field: keyof FilterParams,
    value: string
  ) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters[index] = {
        ...newFilters[index],
        [field]: value,
      };
      return newFilters;
    });
  };

  const handleChildChange = (
    parentIndex: number,
    childIndex: number,
    field: keyof FilterParams,
    value: string
  ) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      if (newFilters[parentIndex].child) {
        newFilters[parentIndex].child![childIndex] = {
          ...newFilters[parentIndex].child![childIndex],
          [field]: value,
        };
      }
      return newFilters;
    });
  };

  const addFilter = () => {
    setFilters([
      ...filters,
      { key: "", operator: "", value: "", child: [] },
    ]);
  };

  const addChildFilter = (index: number) => {
    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      if (!newFilters[index].child) {
        newFilters[index].child = [];
      }
      newFilters[index].child!.push({
        key: "",
        operator: "",
        value: "",
        child: [],
      });
      return newFilters;
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Filter Params:", filters);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {filters.map((filter, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              {/* untuk menyimpan filterParams bagian key */}
              <Selection
                editMode={editMode}
                className="bg-[#494D49] text-white px-3 py-2 flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                placeholder="Select Category Sensor"
                options={CategoryFilter}
                value={filter.key}
                onChange={(value) => {
                  const selectedOption = CategoryFilter.find(
                    (option) => option.name === value
                  );
                  handleChange(
                    index,
                    "key",
                    selectedOption ? selectedOption.id : ""
                  );
                }}
              />

              {/* untuk menyimpan filterParams bagian operator */}
              <Selection
                editMode={editMode}
                className="bg-[#494D49] text-white px-3 py-2 flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                placeholder="Operator"
                options={OperatorFilter}
                value={filter.operator}
                onChange={(value) => {
                  const selectedOption = OperatorFilter.find(
                    (option) => option.name === value
                  );
                  handleChange(
                    index,
                    "operator",
                    selectedOption ? selectedOption.id : ""
                  );
                }}
              />

              {/* untuk menyimpan filterParams bagian value */}
              <Selection
                editMode={editMode}
                className="bg-[#494D49] text-white px-3 py-2 flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                placeholder="Value"
                options={ValueFilter}
                value={filter.value}
                onChange={(value) => {
                  const selectedOption = ValueFilter.find(
                    (option) => option.name === value
                  );
                  handleChange(
                    index,
                    "value",
                    selectedOption ? selectedOption.id : ""
                  );
                }}
              />
            </div>

            {filter.child &&
              filter.child.map((child, childIndex) => (
                <div key={childIndex} className="ml-6 flex flex-row gap-3 mt-3">
                  <Selection
                    editMode={editMode}
                    className="bg-[#494D49] text-white px-3 py-2 flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                    placeholder="Select Category Sensor"
                    options={CategoryFilter}
                    value={child.key}
                    onChange={(value) => {
                      const selectedOption = CategoryFilter.find(
                        (option) => option.name === value
                      );
                      handleChildChange(
                        index,
                        childIndex,
                        "key",
                        selectedOption ? selectedOption.id : ""
                      );
                    }}
                  />

                  <Selection
                    editMode={editMode}
                    className="bg-[#494D49] text-white px-3 py-2 flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                    placeholder="Operator"
                    options={OperatorFilter}
                    value={child.operator}
                    onChange={(value) => {
                      const selectedOption = OperatorFilter.find(
                        (option) => option.name === value
                      );
                      handleChildChange(
                        index,
                        childIndex,
                        "operator",
                        selectedOption ? selectedOption.id : ""
                      );
                    }}
                  />

                  <Selection
                    editMode={editMode}
                    className="bg-[#494D49] text-white px-3 py-2 flex flex-row gap-4 items-center justify-between p-2 rounded-2xl border-2 border-white"
                    placeholder="Value"
                    options={ValueFilter}
                    value={child.value}
                    onChange={(value) => {
                      const selectedOption = ValueFilter.find(
                        (option) => option.name === value
                      );
                      handleChildChange(
                        index,
                        childIndex,
                        "value",
                        selectedOption ? selectedOption.id : ""
                      );
                    }}
                  />
                </div>
              ))}

            <button
              type="button"
              className="ml-6 mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => addChildFilter(index)}
            >
              Add Child Filter
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addFilter}
          className="bg-green text-black px-3 py-1 rounded"
        >
          Add Filter
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-black px-3 py-1 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
