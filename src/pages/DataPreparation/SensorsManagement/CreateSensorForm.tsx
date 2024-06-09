import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormButton from "@/components/FormButton";
import TextField from "@/components/InputField";
import Selection from "@/components/Selection";
import Button from "@/components/Button";
import ModalAlert from "@/components/ModalAlert";
import Toast from "@/components/Toast";
import { ApiHandler } from "@/services/apiHandler";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface CategorySensors {
  id: string;
  name: string;
}

const schema = yup.object().shape({
  categoryId: yup.string().required("Category is required"),
  name: yup.string().required("Name is required"),
  manufacturerId: yup.string().required("Manufacturer is required"),
  maxSurfaceRange: yup.number().required("Max Surface Range is required"),
  maxSubSurfaceRange: yup.number().required("Max Sub-Surface Range is required"),
  maxAirRange: yup.number().required("Max Air Range is required"),
  frequency: yup.number().required("Frequency is required"),
});

export default function SensorFormDetail() {
  const { register, control, reset, watch } = useForm({
    defaultValues: {
      categoryId: "",
      name: "",
      manufacturerId: "",
      maxSurfaceRange: 0,
      maxSubSurfaceRange: 0,
      maxAirRange: 0,
      frequency: 0,
    },
    resolver: yupResolver(schema),
  });
  const watchedValues = watch();
  const isFormEmpty = !Object.values(watchedValues).some((value) => value);
  const [editMode, setIsEditMode] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [sensorCategories, setSensorCategories] = useState<Array<CategorySensors>>([]);
  const [manufacturer, setManufacturer] = useState<any>([]);
  const [toast, setToast] = useState({
    variant: "",
    headerText: "",
    messageBody: "",
  });
  const [showToast, setShowToast] = useState(false);

  const getSensorCategory = async () => {
    await ApiHandler.get('/sensor-categories').then((response) => {
      setSensorCategories(response.data.data);
    }).catch((error) => {
      console.error(error);
    });
  };

  const createSensor = async (data: any) => {
    await ApiHandler.post("dp/create-sensor", {
      categoryId: findIdSensorCategoryByName(data.categoryId),
      name: data.name,
      manufacturerId: findIdManufacturerByName(data.manufacturerId),
      maxSurfaceRange: data.maxSurfaceRange,
      maxSubSurfaceRange: data.maxSubSurfaceRange,
      maxAirRange: data.maxAirRange,
      frequency: data.frequency,
    })
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
    await ApiHandler.get("/manufacturers").then((res) => {
      const data = res.data.data.map(
        ({ id, name }: { id: string; name: string }) => ({ id, name })
      );
      setManufacturer(data);
    }).catch((err) => {
      console.error(err);
    });
  };

  const findIdSensorCategoryByName = (value: string) => {
    value = sensorCategories.find((item) => item.name === value)?.id || "";;
    return value;
  };

  const findIdManufacturerByName = (value: string) => {
    value = manufacturer.find((item: { name: string; }) => item.name === value)?.id || "";;
    return value;
  }

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };


  useEffect(() => {
    getSensorCategory();
    getManufacturer();
  }, []);

  return (
    <div className="bg-[#1B231C] rounded-lg pt-3 pb-1 px-6 flex flex-col h-[73vh]">
      <div>
        <FormButton
          editModeActive={setIsEditMode}
          deleteAllDataInput={setOpenModalDelete}
        />
      </div>
      <div className="h-[76%] flex-1">
        <form>
          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Category
            </label>
            <div className="w-full relative">
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Selection
                    editMode={editMode}
                    className="bg-[#494D49] text-white px-3 py-2"
                    placeholder="Select Category Sensor"
                    options={sensorCategories}
                    value={field.value}
                    onChange={(value) =>
                      field.onChange(value)
                    }
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
                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                placeholder="Input Name Sensor"
                textFloatingPlaceholder="Name"
                disabled={!editMode}
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
                  <Selection
                    editMode={editMode}
                    placeholder="Manufacturer"
                    className="bg-[#494D49] text-white px-3 py-2"
                    options={manufacturer}
                    value={field.value}
                    onChange={(value) =>
                      field.onChange(value)
                    }
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
                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                unit="kilometers"
                placeholder="Input Air Range"
                textFloatingPlaceholder="Max. Air Range"
                disabled={!editMode}
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
                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                unit="kilometers"
                placeholder="Input Surface Range"
                textFloatingPlaceholder="Max. Surface Range"
                disabled={!editMode}
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
                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                unit="kilometers"
                placeholder="Max. Sub-Surface Range"
                disabled={!editMode}
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
                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                unit="MHz"
                placeholder="Input Frequency"
                textFloatingPlaceholder="Frequency"
                disabled={!editMode}
                {...register("frequency", {
                  setValueAs: (value) => parseFloat(value),
                })}
              />
            </div>
          </div>
          <div className="w-full grid items-center justify-center mt-6">
            <div>
              <Button
                type="button"
                className={`rounded-lg text-base bg-success ${
                  isFormEmpty
                    ? "opacity-60"
                    : "cursor-pointer hover:bg-success/55"
                }`}
                disabled={isFormEmpty}
                onClick={() => setOpenModalSave(true)}
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
                createSensor(watchedValues);
                setIsEditMode(false);
                reset();
                setOpenModalSave(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
