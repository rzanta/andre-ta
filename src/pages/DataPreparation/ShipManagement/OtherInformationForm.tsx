import React, { useEffect, useState } from "react";
import TextField from "../../../components/InputField";
import Button from "../../../components/Button";
import Dropdowns from "../../../components/Selection";

interface IOtherInformationFormProps {
  className?: string;
  editMode?: boolean;
  nameForm?: (data: string) => void;
}

export default function OtherInformationForm({ className, editMode, nameForm }: IOtherInformationFormProps) {
  const [ moderenized, setModerenized ] = useState(Boolean);

  const platformAirCraftCarried: string[] = ["Fixed-Wings", "Helicopter", "UAV"]
  const electronicWarfare: string[] = ["EW1", "EW2", "EW3"];
  const boatsLandingCrafts: string[] = ["Boat1", "Boat2", "Boat3"];
  const propulsion: string[] = ["propulsion 1", "propulsion 2", "propulsion 3"];
  const warshipPower: string[] = ["Power 1", "Power 2", "Power 3"];

  return (
    <div className={`${className} py-4 px-2`}>
      <div className="flex items-center justify-between p-2">
        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Air Craft Carried</label>
        <div className="w-full">
          <Dropdowns id="airCraftCarried" editMode={editMode} className="text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" placeholder="Air Craft Carried" options={platformAirCraftCarried} onSelect={() => {}} />
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Electronic Warfare</label>
        <div className="w-full">
          <Dropdowns id="electronicWarfare" editMode={editMode} className="text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" placeholder="Electronic Warfare" options={electronicWarfare} onSelect={() => {}} />
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Boats & Landing Craft Carried</label>
        <div className="w-full">
          <Dropdowns id="boatsLandingCraftCarried" editMode={editMode} className="text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" placeholder="Boats & Landing Craft Carried" options={boatsLandingCrafts} onSelect={() => {}} />
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Propulsion</label>
        <div className="w-full">
          <Dropdowns id="propulsion" editMode={editMode} className="text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" placeholder="Propulsion" options={propulsion} onSelect={() => {}} />
        </div>
      </div>

      <div className="p-2">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <label className="text-gray-500 opacity-50 font-bold flex items-center text-base">Modernized</label>
          <div className="col-span-2 flex items-center space-x-4">
            <Button className="text-sm rounded-full px-6" variant="secondary">Yes</Button>
            <Button className="text-sm rounded-full px-6" variant="secondary">No</Button>
          </div>
        </div>

        <div className="grid grid-cols-12 mb-4">
          <label className="col-start-4 col-span-2 text-gray-500 flex items-center opacity-50 font-bold text-base">Year Modernized</label>
          <div className="col-span-7">
            <TextField id="yearModernized" typeInput="text" editMode={editMode} className="w-full rounded-lg" placeholder="Year Modernized" onChange={() => { }} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Warship Power</label>
        <div className="w-full">
          <Dropdowns id="warshipPower" editMode={editMode} className="text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" placeholder="Warship Power" options={warshipPower} onSelect={() => {}} />
        </div>
      </div>
    </div>
  );
}
