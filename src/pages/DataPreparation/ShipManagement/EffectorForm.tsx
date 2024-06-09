import React, { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import Select from "@/components/Selection";
import Button from "@/components/Button";
import Manufacturer from "@/models/Manufacturer";
import { ShipSection } from "@/models/Ship";
import { ApiHandler } from "@/services/apiHandler";
import { HiTrash } from "react-icons/hi";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { useFormik } from "formik";

interface ISensorFormProps {
  editMode?: boolean;
  nameForm?: (data: string) => void;
}

export default function SensorForm() {
  const [effectorComponent, setEffectorComponent] = useState<Array<any>>([
    {
      id: "",
      effectorId: "",
      amount: 0,
      positionId: "",
    }
  ]);
  const [manufacturers, setManufacturers] = useState<Array<Manufacturer>>([]);
  const [shipSection, setShipSection] = useState<Array<ShipSection>>([]);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [editMode, setIsEditMode] = useState(false);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 0) return setQuantity(0);
    setQuantity(quantity - 1);
  };

  const categorySensor: string[] = ["Radar", "Sonar", "EOTs"];
  const positionSensor: string[] = ["Front Deck", "Main Deck", "Rear Deck"];

  const getManufacturers = async () => {
    await ApiHandler.get("/manufacturers").then((res) => {
      setManufacturers(res.data);
    }).catch((err) => {
      console.log(err);
    }
  )}

  const getShipSection = async () => {
    await ApiHandler.get("/ship-section").then((res) => {
      setShipSection(res.data);
    }).catch((err) => {
      console.log(err);
    }
  )}

  useEffect(() => {
    getManufacturers();
    getShipSection();
  }, []);

  return (
    <div>
      <div>
        <div className="bg-charcoal rounded-full my-2 flex justify-center">
          <div className="m-1 w-1/3 flex justify-center">
            <Button 
              className="w-60 flex justify-center rounded-full text-[#872A2A] text-xl hover:bg-dark-green"
            >
              <HiTrash />
            </Button>
          </div>
          <div className="m-1 w-1/3 flex justify-center">
            <Button 
              variant={`${editMode ? 'success' : 'ghost'}`} 
              className="w-60 flex justify-center rounded-full text-white text-xl hover:bg-dark-green"
            >
              <FaRegEdit />
            </Button>
          </div>
          <div className="m-1 w-1/3 flex justify-center">
            <Button
              className="w-60 flex justify-center rounded-full text-white text-xl hover:bg-dark-green"
            >
              <FaRegSave />
            </Button>
          </div>
        </div>
      </div>
      <form>
        <div className="flex items-center justify-between p-2">
          <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Category</label>
          <div className="w-full relative z-20">
            <Select 
              id="categorySensor"
              className="text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
              placeholder="Environment" 
              options={categorySensor}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-2">
          <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Name</label>
          <div className="w-full relative z-10">
            <InputField
              className="w-full rounded-lg" 
              placeholder="Name"
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-2">
          <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Quantity</label>
          <div className="flex justify-between items-center w-full relative z-0">
            <div>
              <Button
                type="button"
                disabled={!editMode}
                onClick={decreaseQuantity}
                className={`rounded-full px-6 py-2 text-xl font-bold shadow-lg ${!editMode ? 'bg-secondary opacity-50' : 'bg-secondary hover:opacity-75'}`}
              >-</Button>
            </div>
            <div>
              <p className="text-base text-white font-bold"> {quantity} </p>
            </div>
            <div>
              <Button
                type="button"
                disabled={!editMode}
                onClick={increaseQuantity}
                className={`rounded-full px-6 py-2 text-xl font-bold shadow-lg ${!editMode ? 'bg-secondary opacity-50' : 'bg-secondary hover:opacity-75'}`}
              >+</Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2">
          <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Position</label>
          <div className="w-full relative z-0">
            <Select 
              id="position" 
              editMode={editMode} 
              className="text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
              placeholder="Position" 
              options={positionSensor} 
              onSelect={() => {}} 
            />
          </div>
        </div>
      </form>
    </div>
  );
}
