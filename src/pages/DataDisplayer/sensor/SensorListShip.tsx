import React, { useState } from "react";
import Card from "../../../components/dataDisplayer/Card";
import CardSensorEffector from "../../../components/CardFilterSensorEffector";
import { Link } from "react-router-dom";
import Background from "../../../assets/images/Background.jpg";

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

const ListSensor: React.FC<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] = useState(false);
  const [isDropdownFilterOpen, setIsDropdownFilterOpen] = useState(false);
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
    <div className="w-full">
      <div className="bg-[#121714] mt-4 rounded-md text-white m-2">
        <h1 className="text-4xl font-semibold">Sensor List - Data Dummy</h1>
        <div className="flex flex-row rounded-lg border-2 border-white my-4 px-2 py-4 min-w-max flex-grow items-center">
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
        <div className="overflow-y-auto max-h-[863px] w-full">
          <CardSensorEffector />
          <CardSensorEffector />
          <CardSensorEffector />
          <CardSensorEffector />
          <CardSensorEffector />
        </div>
        {/* <div className="flex flex-col-reverse mt-8 gap-4 md:flex-row ">
          <div className="basis-3/5 bg-[#121714]">
            <div className="bg-[#121714] flex">asd</div>
          </div>
          <div className="basis-2/5">
            <div className="w-full h-[370px] rounded-xl mx-auto">
              <img
                src={Background}
                alt="ship"
                className="object-fill h-full rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-[#3F4640] text-center rounded-xl min-h-32 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400">
                <p className="text-white text-opacity-40 text-xl mb-2">
                  Sensor
                </p>
                <p className="text-white text-5xl font-bold">02</p>
              </div>
              <div className="bg-[#3F4640] text-center rounded-xl min-h-32 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400">
                <p className="text-white text-opacity-40 text-xl mb-2">
                  Effector
                </p>
                <p className="text-white text-5xl font-bold">06</p>
              </div>
              <div className="bg-[#3F4640] rounded-xl min-h-24 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400 px-4">
                <p className="text-white text-opacity-40 text-sm">
                  General Type
                </p>
                <p className="text-xl font-semibold">Frigate</p>
              </div>
              <div className="bg-[#3F4640] rounded-xl min-h-24 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400 px-4">
                <p className="text-white text-opacity-40 text-sm">Category</p>
                <p className="text-xl font-semibold">Surface Combatant</p>
              </div>
              <div className="bg-[#3F4640] rounded-xl min-h-24 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400 px-4">
                <p className="text-white text-opacity-40 text-sm">
                  Cruising Speed
                </p>
                <p className="text-xl font-semibold">14-18 Knots</p>
              </div>
              <div className="bg-[#3F4640] rounded-xl min-h-24 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400 px-4">
                <p className="text-white text-opacity-40 text-sm">
                  Combat Range
                </p>
                <p className="text-xl font-semibold">2.500-5.000 Nm</p>
              </div>
              <div className="bg-[#3F4640] rounded-xl min-h-24 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400 px-4">
                <p className="text-white text-opacity-40 text-sm">Max. Speed</p>
                <p className="text-xl font-semibold">28 Knots</p>
              </div>
              <div className="bg-[#3F4640] rounded-xl min-h-24 content-center hover:bg-[#6E6F6E] active:bg-[#6E6F6E] transition-all duration-400 px-4">
                <p className="text-white text-opacity-40 text-sm">Crew</p>
                <p className="text-xl font-semibold">122 Staff</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ListSensor;

// <div className="w-max">
//   <div className="bg-[#121714] bg-yellow-300 rounded-md p-4 ">
//     <h1 className="text-white font-bold text-4xl mb-4">
//       List Sensor - KRI R.E Martadinata
//     </h1>
//     <div>
//       <div className="flex flex-row rounded-lg border-2 border-white px-2 py-2 flex-grow items-center">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="white"
//           className="w-6 h-6 m-auto mx-2"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
//           />
//         </svg>
//         <form
//           onSubmit={handleSubmit}
//           className="text-xl text-white my-auto flex-grow "
//         >
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleInputChange}
//             placeholder="Search"
//             className="bg-transparent border-none outline-none text-white placeholder-white w-full"
//           />
//         </form>
//       </div>
//     </div>
//     {/* {ships.map((ship, index) => (
//       <Card
//         key={index}
//         shipClass={ship.shipClass}
//         shipName={ship.shipName}
//         shipId={ship.shipID}
//       />
//     ))} */}
//     <div className="overflow-y-auto max-h-[840px]">
//       {/* {filter.map((data, index) => ( */}
//       <CardSensorEffector
//       // key={index}
//       // shipClass={data.shipClass}
//       // shipName={data.shipName}
//       // amount={data.amount}
//       // position={data.position}
//       // type={data.type}
//       />
//       {/* ))} */}
//     </div>
//   </div>
// </div>
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
