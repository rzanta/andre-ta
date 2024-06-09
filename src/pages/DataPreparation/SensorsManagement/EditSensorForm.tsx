import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "@/components/FormButton";
import TextField from "@/components/InputField";
import Selection from "@/components/Selection";
import Button from "@/components/Button";
import ModalAlert from "@/components/ModalAlert";
import Toast from "@/components/Toast";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ApiHandler } from "@/services/apiHandler";
import { Manufacturer, SensorDetail, SensorCategory } from "models";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  categoryId: yup.string().required(),
  name: yup.string().required(),
  manufacturerId: yup.string().required(),
  maxSurfaceRange: yup.string().required(),
  maxSubSurfaceRange: yup.string().required(),
  maxAirRange: yup.string().required(),
  frequency: yup.string().required(),
  categoryName: yup.string(),
  manufacturerName: yup.string(),
});

export default function EditSensorForm() {
  const { control, reset, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      categoryId: "",
      name: "",
      manufacturerId: "",
      maxSurfaceRange: "",
      maxSubSurfaceRange: "",
      maxAirRange: "",
      frequency: "",
      categoryName: "",
      manufacturerName: "",
    },
    resolver: yupResolver(schema),
  });
  const [manufacturer, setManufacturer] = useState<Manufacturer[]>([]);
  const [sensorDetail, setSensorDetail] = useState<SensorDetail | null>(null);
  const [sensorCategories, setSensorCategories] = useState<SensorCategory[]>([]);
  const [editMode, setIsEditMode] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [resetValueDropdown, setResetValueDropdown] = useState(false);
  const [toast, setToast] = useState({
    variant: "",
    headerText: "",
    messageBody: "",
  });
  const [showToast, setShowToast] = useState(false);
  const watchedValues = watch();
  const navigate = useNavigate();
  const isFormEmpty = !Object.values(watchedValues).some((value) => value);

  const getIdInPath = () => {
    const path = window.location.pathname.split("/");
    const id = path[path.length - 1];
    return id.toString();
  };

  const getSensorCategory = async () => {
    await ApiHandler.get('/sensor-categories').then((response) => {
      setSensorCategories(response.data.data);
    }).catch((error) => {
      console.error(error);
    });
  };


  const getSensorById = async (id: string) => {
    await ApiHandler.get(`/dp/sensors/${id}`).then((response) => {
      setSensorDetail(response.data);
      setValue("categoryId", response.data.category.id);
      setValue("name", response.data.name);
      setValue("manufacturerId", response.data.manufacturer.id);
      setValue("maxSurfaceRange", response.data.maxSurfaceRange);
      setValue("maxSubSurfaceRange", response.data.maxSubSurfaceRange);
      setValue("maxAirRange", response.data.maxAirRange);
      setValue("frequency", response.data.frequency);
      setValue("categoryName", response.data.category.name);
      setValue("manufacturerName", response.data.manufacturer.name);
      console.log(response.data);
    }
    ).catch((error) => {
      console.error(error);
    });
  };

  const getManufacturer = async () => {
    await ApiHandler.get('/manufacturers').then((response) => {
      setManufacturer(response.data.data);
    }).catch((error) => {
      console.error(error);
    });
  };

  const updateDataSensor = async (data: any) => {
    await ApiHandler.put(`/dp/update-sensor/${getIdInPath()}`, 
    {
      data: {
        categoryId: findIdSensorCategoryByName(data.categoryName),
        name: data.name,
        manufacturerId: findIdManufacturerByName(data.manufacturerName),
        maxSurfaceRange: data.maxSurfaceRange,
        maxSubSurfaceRange: data.maxSubSurfaceRange,
        maxAirRange: data.maxAirRange,
        frequency: data.frequency,
      }
    }).then(() => {
      setToast({
        variant: "success",
        headerText: "Success",
        messageBody: "Data has been updated successfully",
        });
        showToastMessage();
    }).catch((error) => {
      setToast({
        variant: "danger",
        headerText: "Error",
        messageBody: error.response.data.message,
      });
      showToastMessage();
    });
  }

  const findIdSensorCategoryByName = (value: string): string => {
    value = sensorCategories.find((item) => item.name === value)?.id || "";;
    return value;
  };

  const findIdManufacturerByName = (value: string): string => {
    value = manufacturer.find((item: { name: string; }) => item.name === value)?.id || "";;
    return value;
  }

  const handleOptionManufacturer = (data: any) => {
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));
  };

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  
  const handleFormSubmit = handleSubmit((data: any) => {
    console.log(data);
    updateDataSensor(data);
  });
  
  const handleBackToListData = () => {
    navigate("/data-preparation/sensor");
  };

  useEffect(() => {
    getSensorById(getIdInPath());
    getManufacturer();
    getSensorCategory();
  }, []);

  return (
    <div className="bg-[#0A0F0C] w-full min-h-screen max-h-screen">
      <div className="flex justify-between p-5 h-[8vh] items-center">
        <div>
          <p className="font-bold text-2xl text-white">Data Preparation</p>
        </div>
        <div>
          <Link to="/">
            <Button className="text-sm w-50 rounded-lg" variant="secondary">
              Landing Page
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex h-[91vh] bg-[#121714] rounded-lg mx-5 overflow-hidden">
        <div className="flex-1 ml-2 flex flex-col">
          <div className="py-2 px-4 justify-between flex">
            <p className="text-white text-2xl font-bold tracking-tight leading-9">
              Effector Detail Page
            </p>
            <Button
              className="px-0 py-0 text-sm flex items-center hover:opacity-50"
              onClick={handleBackToListData}
            >
              Back to List Data <MdKeyboardArrowRight className="ml-2" />
            </Button>
          </div>
          <div className="flex-1 p-2 overflow-auto h-full">
            <div className="bg-[#121714] rounded-lg pt-3 pb-1 px-6 flex flex-col">
              <FormButton
                editModeActive={setIsEditMode}
                deleteAllDataInput={setOpenModalDelete}
              />
              {sensorDetail && (
                <div className="h-[80%] mt-6">
                  <form
                    className="justify-between flex flex-col"
                    onSubmit={handleFormSubmit}
                  >
                    <div className="mb-6">
                      <div className="flex items-center p-2">
                        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
                          Category
                        </label>
                        <div className="w-full">
                          <Controller
                            name="categoryName"
                            control={control}
                            render={({ field }) => (
                              <Selection
                                id="categorySensor"
                                editMode={editMode}
                                className="bg-[#494D49] text-white px-3 py-2"
                                placeholder="Select Category Sensor"
                                options={sensorCategories}
                                value={field.value}
                                onSelect={(value) =>
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
                          <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                id="nameSensor"
                                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                                placeholder="Input Name Sensor"
                                textFloatingPlaceholder="Name Sensor"
                                editMode={editMode}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2">
                        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
                          Manufacturer
                        </label>
                        <div className="w-full">
                          <Controller
                            name="manufacturerName"
                            control={control}
                            render={({ field }) => (
                              <Selection
                                id="manufacturer"
                                editMode={editMode}
                                placeholder="Manufacturer"
                                className="bg-[#494D49] text-white px-3 py-2"
                                options={handleOptionManufacturer(manufacturer)}
                                value={field.value}
                                onSelect={(value) =>
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
                          <Controller
                            name="maxAirRange"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                id="maxAirRange"
                                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                                unit="kilometers"
                                placeholder="Input Max. Air Range"
                                textFloatingPlaceholder="Max. Air Range"
                                editMode={editMode}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2">
                        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
                          Max. Surface Range
                        </label>
                        <div className="w-full">
                          <Controller
                            name="maxSurfaceRange"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                id="surfaceRange"
                                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                                unit="kilometers"
                                placeholder="Input Surface Range"
                                textFloatingPlaceholder="Max. Surface Range"
                                editMode={editMode}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2">
                        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
                          Max. Sub-Surface Range
                        </label>
                        <div className="w-full">
                          <Controller
                            name="maxSubSurfaceRange"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                id="subSurfaceRange"
                                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                                unit="kilometers"
                                placeholder="Input Max. Surface Range"
                                textFloatingPlaceholder="Max. Sub-Surface Range"
                                editMode={editMode}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2">
                        <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
                          Frequency
                        </label>
                        <div className="w-full">
                          <Controller
                            name="frequency"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                id="frequency"
                                className="w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2"
                                unit="MHz"
                                placeholder="Input Frequency"
                                textFloatingPlaceholder="Frequency"
                                editMode={editMode}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                        </div>
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
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
