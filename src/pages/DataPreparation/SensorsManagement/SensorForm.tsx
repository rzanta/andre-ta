import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import api from "../../../services/index";
import FormButton from "../../../components/FormButton";
import TextField from "../../../components/InputField";
import Dropdowns from "../../../components/Selection";
import Button from "../../../components/Button";
import ModalAlert from "../../../components/ModalAlert";
import Toast from "../../../components/Toast";

interface CategorySensors {
  id: string;
  name: string;
}

export default function SensorForm() {
  const { register, control, reset, handleSubmit, watch } = useForm({
    defaultValues: {
      categoryId: "",
      name: "",
      manufacturerId: "",
      maxSurfaceRange: "",
      maxSubSurfaceRange: "",
      maxAirRange: "",
      frequency: "",
    },
  });
  const watchedValues = watch();
  const isFormEmpty = !Object.values(watchedValues).some((value) => value);
  const [editMode, setIsEditMode] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [resetValueDropdown, setResetValueDropdown] = useState(false);
  const [sensorCategories, setSensorCategories] = useState<
    Array<CategorySensors>
  >([]);
  const [manufacturer, setManufacturer] = useState<any>([]);
  const [toast, setToast] = useState({
    variant: "",
    headerText: "",
    messageBody: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleGetIdOption = (value: any) => {
    value = value.id;
    return value;
  };

  const getSensorCategory = async () => {
    api.sensor
      .getCategorySensor()
      .then((res) => {
        setSensorCategories(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createSensor = async (data: any) => {
    console.log(data);
    api.sensor
      .createSensor(data)
      .then((res) => {
        setToast({
          variant: "success",
          headerText: "Success",
          messageBody: "Data has been successfully added",
        });
        showToastMessage();
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        setToast({
          variant: "danger",
          headerText: "Error",
          messageBody: "Failed to add data",
        });
        showToastMessage();
      });
  };

  const getManufacturer = async () => {
    api.manufacturer
      .list()
      .then((res) => {
        const data = res.data.map(
          ({ id, name }: { id: string; name: string }) => ({ id, name })
        );
        setManufacturer(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSensorCategory();
    getManufacturer();
  }, []);

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleFormSubmit = handleSubmit((data: any) => {
    createSensor(data);
    reset();
    setResetValueDropdown(!resetValueDropdown);
  });

  return (
    <div className="bg-[#1B231C] rounded-lg pt-3 pb-1 px-6 flex flex-col h-[73vh]">
      <div>
        <FormButton
          editModeActive={setIsEditMode}
          deleteAllDataInput={setOpenModalDelete}
        />
      </div>
      <div className="h-[76%]">
        <form onSubmit={handleFormSubmit}>
          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Category
            </label>
            <div className="w-full relative">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Dropdowns
                    id="categorySensor"
                    editMode={editMode}
                    className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2"
                    placeholder="Select Category Sensor"
                    options={sensorCategories}
                    onSelect={(value) =>
                      field.onChange(handleGetIdOption(value))
                    }
                    resetValue={resetValueDropdown}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Name
            </label>
            <div className="w-full">
              <TextField
                id="nameSensor"
                className="w-full rounded-lg"
                placeholder="Input Name Sensor"
                textFloatingPlaceholder="Name"
                editMode={editMode}
                {...register("name")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Manufacturer
            </label>
            <div className="w-full relative">
              <Controller
                name="manufacturerId"
                control={control}
                render={({ field }) => (
                  <Dropdowns
                    id="manufacturer"
                    editMode={editMode}
                    placeholder="Manufacturer"
                    className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2"
                    options={manufacturer}
                    onSelect={(value) =>
                      field.onChange(handleGetIdOption(value))
                    }
                    resetValue={resetValueDropdown}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Max. Air Range
            </label>
            <div className="w-full">
              <TextField
                id="airRange"
                className="w-full rounded-lg"
                unit="kilometers"
                placeholder="Input Air Range"
                textFloatingPlaceholder="Max. Air Range"
                editMode={editMode}
                {...register("maxAirRange", {
                  setValueAs: (value) => parseFloat(value),
                })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Max. Surface Range
            </label>
            <div className="w-full">
              <TextField
                id="surfaceRange"
                className="w-full rounded-lg"
                unit="kilometers"
                placeholder="Input Surface Range"
                textFloatingPlaceholder="Max. Surface Range"
                editMode={editMode}
                {...register("maxSurfaceRange", {
                  setValueAs: (value) => parseFloat(value),
                })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Max. Sub-Surface Range
            </label>
            <div className="w-full">
              <TextField
                id="subSurfaceRange"
                className="w-full rounded-lg"
                unit="kilometers"
                placeholder="Max. Sub-Surface Range"
                editMode={editMode}
                textFloatingPlaceholder="Max. Sub-Surface Range"
                {...register("maxSubSurfaceRange", {
                  setValueAs: (value) => parseFloat(value),
                })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Frequency
            </label>
            <div className="w-full">
              <TextField
                id="frequency"
                className="w-full rounded-lg"
                unit="MHz"
                placeholder="Input Frequency"
                textFloatingPlaceholder="Frequency"
                editMode={editMode}
                {...register("frequency", {
                  setValueAs: (value) => parseFloat(value),
                })}
              />
            </div>
          </div>
          <div className="w-full grid items-center justify-center mt-6">
            <div>
              <Button
                type="submit"
                className={`rounded-lg text-base bg-success ${
                  isFormEmpty
                    ? "opacity-60"
                    : "cursor-pointer hover:bg-success/55"
                }`}
                disabled={isFormEmpty}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
      {showToast && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setShowToast(false)}
          ></div>
          <div className="fixed inset-x-0 bottom-3 left-3 z-20">
            <Toast
              className="w-72"
              variant={toast.variant}
              headerText={toast.headerText}
              messageBody={toast.messageBody}
              onClose={() => setShowToast(false)}
            />
          </div>
        </>
      )}
      {openModalDelete && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setOpenModalDelete(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <ModalAlert
              className="rounded-lg"
              headerText="Delete Data?"
              headerColor="danger"
              messageText="This data will be deleted from this form"
              onCancel={() => setOpenModalDelete(false)}
              onConfirm={() => {
                reset();
                setOpenModalDelete(false);
              }}
            />
          </div>
        </>
      )}
      {openModalSave && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setOpenModalSave(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <ModalAlert
              className="rounded-lg"
              headerText="Save Data Change?"
              headerColor="success"
              messageText="All data in this group of fields will be updated in the database"
              onCancel={() => setOpenModalSave(false)}
              onConfirm={() => {
                handleFormSubmit();
                setOpenModalSave(false);
                setResetValueDropdown(!resetValueDropdown);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
