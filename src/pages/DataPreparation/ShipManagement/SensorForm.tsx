import React, { useEffect, useState } from "react";
import InputField from "@/components/InputField";
import Select from "@/components/Selection";
import Button from "@/components/Button";
import { SensorCategory } from "@/models/Sensor";
import { HiTrash } from "react-icons/hi";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdSensors } from "react-icons/md";
import { ApiHandler } from "@/services/apiHandler";
import { Field, FieldArray, Form, Formik, useFormik } from "formik";

interface ISensorFormProps {
  editMode?: boolean;
  nameForm?: (data: string) => void;
}

const onSubmit = async (values: any, actions: { resetForm: () => void; }) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export default function SensorForm() {
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      sensorPositionId: "",
      shipId: "",
      sensorId: "",
      amount: 0,
      positionId: "",
      position: {
        id: "",
        name: ""
      }
    },
    onSubmit
  });

  const formInitialValues = {
    sensorPositionId: "",
    shipId: "",
    sensorId: "",
    amount: 0,
    positionId: "",
    position: {
      id: "",
      name: ""
    }
  }
  const [sensorCategories, setSensorCategories] = useState<Array<SensorCategory>>([]);
  const [shipSection, setShipSection] = useState([]);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [editMode, setIsEditMode] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const increaseQuantity = (data : number) => {
    return data + 1;
  };

  const decreaseQuantity = (data : number) => {
    if (data === 0) return data = 0;
    return data - 1;
  };

  const getSensorCategories = async () => {
    await ApiHandler.get("/sensor-categories").then((res) => {
      setSensorCategories(res.data.data);
    }).catch((err) => {
      console.log(err);
    }
  )}

  const getShipSection = async () => {
    await ApiHandler.get('/ship-sections').then((res) => {
      setShipSection(res.data.data);
      console.log(res.data.data);
    }).catch((err) => {
      console.log(err);
    }
  )}

  useEffect(() => {
    getSensorCategories();
    getShipSection();
  }, []);


  return (
    <div className="flex-1 h-[50vh]">
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
          <div className="m-1 w-1/3 flex justify-center">
            <Button
              className="w-60 flex justify-center rounded-full text-white text-xl hover:bg-dark-green items-center"
            >
              <MdSensors /> <span className="ml-2 text-bold text-xl">+</span>
            </Button>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{ forms: [formInitialValues] }}
        // onSubmit={values =>
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //   }, 500)
        // }
        onSubmit={onSubmit}
        render={({ values }) => (
          <Form>
            <FieldArray
              name="forms"
              render={arrayHelpers => (
                <div>
                  {values.forms.map((formItem, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between p-2">
                      <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Sensor Category</label>
                      <div className="w-full relative z-20">
                        <Select
                          value={formItem.sensorId}
                          onChange={handleChange}
                          className="bg-[#494D49] text-white focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                          placeholder="Environment" 
                          options={sensorCategories}
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
                            value={formItem.amount}
                            onClick={() => decreaseQuantity(formItem.amount)}
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
                            value={formItem.amount}
                            onClick={() => increaseQuantity(formItem.amount)}
                            className={`rounded-full px-6 py-2 text-xl font-bold shadow-lg ${!editMode ? 'bg-secondary opacity-50' : 'bg-secondary hover:opacity-75'}`}
                          >+</Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2">
                      <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Position</label>
                      <div className="w-full relative z-0">
                        <Select
                          className="bg-[#494D49] text-white focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                          placeholder="Position" 
                          value={formItem.positionId}
                          options={shipSection} 
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          arrayHelpers.insert(index, formInitialValues)
                        }
                      >
                        +
                      </button>
                    </div>
                  ))}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      />
      {/* <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between p-2">
          <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Sensor Category</label>
          <div className="w-full relative z-20">
            <Select
              value={values.sensorId}
              onChange={handleChange}
              className="bg-[#494D49] text-white focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
              placeholder="Environment" 
              options={sensorCategories}
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
              className="bg-[#494D49] text-white focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
              placeholder="Position" 
              options={shipSection} 
              onChange={handleChange}
            />
          </div>
        </div>
      </form> */}
    </div>
  );
}
