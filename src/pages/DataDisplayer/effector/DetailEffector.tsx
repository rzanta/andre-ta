import React, { useState } from "react";
import Background from "../../../assets/images/Background.jpg";

const DetailEffector = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search Term:", searchTerm);
  };

  return (
    <div className="flex-grow">
      {/* <div className="flex flex-row justify-between px-2 rounded-md mx-2 mt-4">
        <h1 className="text-white my-auto font-extrabold text-4xl">
          Data Displayer
        </h1>
        <button
          onClick={() => {}}
          className="px-8 py-1 bg-[#1D2420] text-xl my-auto rounded-md font-semibold text-white hover:bg-[#1D2A22] active:bg-[#171E1A] cursor-pointer ml-auto"
        >
          Landing Page
        </button>
      </div> */}
      <div className="bg-[#121714] mt-4 rounded-md text-white m-2">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl font-semibold">Effector Detail</h1>
          <button className="text-xl p-2 my-auto hover:bg-[#1D2420] hover:rounded-xl">
            <p>
              Back to Effector List <span className="font-bold text-xl">→</span>
            </p>
          </button>
        </div>
        <div className="flex flex-row rounded-lg border-2 border-white mt-4 px-2 py-4 min-w-max flex-grow items-center">
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
        {/* form group detail ship */}
        <div className="flex flex-col-reverse mt-8 gap-4 md:flex-row ">
          <div className="basis-3/5">
            <div className="flex flex-row justify-between">
              <div className="text-4xl font-extrabold">MARTADINATA CLASS</div>
              <div className="w-[40px] h-[40px] rounded-full bg-white">
                <img
                  src={Background}
                  alt="ship"
                  className="object-fill h-full rounded-xl"
                />
              </div>
            </div>
            <div className="text-3xl font-semibold">KRI R.E Martadinata</div>
            <div className="overflow-y-auto max-h-[720px] mt-8">
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Hull Number
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Environment
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Warfare Capability
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Manufacturer
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Beam
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Length
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Hull Design
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Commisioned
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Sailing
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  User
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Electronic Warfare & Decoys
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Boats & landing craft carried
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Propulsion
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Modernized
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Warship Powered
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
              <div className="flex flex-row m-auto items-center mb-4 mr-2">
                <p className="basis-2/5 text-white text-opacity-40 font-semibold mr-2">
                  Installed Power
                </p>
                <p className="basis-3/5 py-2 bg-[#494D49] rounded-lg pl-2">
                  311
                </p>
              </div>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default DetailEffector;
