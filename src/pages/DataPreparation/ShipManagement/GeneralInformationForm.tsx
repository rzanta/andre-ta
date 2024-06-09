import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { GeneralInformation } from "@/schema validation/Ship";
import { useForm, Controller } from "react-hook-form";
import { ApiHandler } from "@/services/apiHandler";
import { ShipCategory, ShipGeneralType } from "@/models/Ship";
import WarfareCapability from "@/models/WarfareCapability";
import MilitaryCorps from "@/models/MilitaryCorps";
import Manufacturer from "@/models/Manufacturer";
import InputField from "@/components/InputField";
import Select from "@/components/Selection";
import Button from "@/components/Button";
import { FaImage } from "react-icons/fa6";
import ModalsAddImage from "@/components/ModalsImage";
import FormButton from "@/components/FormButton";
import ModalAlert from "@/components/ModalAlert";
import { useFormik } from "formik";

const onSubmit = async (values: any, actions: { resetForm: () => void; }) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export default function GeneralInformationForm() {
  const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      class: "",
      hullNumber: "",
      name: "",
      environment: "",
      shipGeneralTypeId: "",
      shipCategoryId: "",
      warfareCapabilitiesIds: [],
      lethalityLevel: "",
      manufacturerId: "",
      ownerId: "",
      hullDesign: "",
      commissionedYear: 0,
      sailing: "",
      crew: 0,
    },
    validationSchema: GeneralInformation,
    onSubmit
  });

  const [warfareCapabilities, setWarfareCapabilities] = useState<Array<WarfareCapability>>([]);
  const [militaryCorps, setMilitaryCorps] = useState<Array<MilitaryCorps>>([]);
  const [manufacturers, setManufacturers] = useState<Array<Manufacturer>>([]);
  const [shipCategories, setShipCategories] = useState<Array<ShipCategory>>([]);
  const [shipGeneralTypes, setShipGeneralTypes] = useState<Array<ShipGeneralType>>([]);

  const [editMode, setIsEditMode] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [isModalImageOpen, setIsModalAddImageOpen] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [imageType, setImageType] = useState("");

  const platformEvironments = [
    { id: "1", name: "Air" }, 
    { id: "2", name: "Surface" }, 
    { id: "3", name: "Subsurface" }, 
    { id: "4", name: "Land" }
  ];

  const hullDesign = [
    { id: "1", name: "Mono Hull" },
    { id: "2", name: "Tri-maran Hull" },
    { id: "3", name: "Catamaran Hull" },
    { id: "4", name: "SWATH Hull" },
    { id: "5", name: "Semi-Submersible" },
    { id: "6", name: "Stealth" }
  ];

  const sailingEnv = [
    { id: "1", name: "River" },
    { id: "2", name: "Coastal" },
    { id: "3", name: "Deep Sea" }
  ]

  const handleOpenModalAddImage = (imageType: string, totalImages: number) => {
    setImageType(imageType);
    setTotalImages(totalImages);
    setIsModalAddImageOpen(true);
  }

  const handleCloseModalAddImage = () => {
    setIsModalAddImageOpen(false);
  }

  const findIdByName = (name: string, data: any[]) => {
    const item = data.find((item) => item.name === name);
    return item ? item.id : "";
  }

  // const handleChange = (e: any, name: any) => {
  //   const { value } = e.target;
  //   setFormGeneralData({
  //     ...formGeneralData,
  //     [name]: value
  //   });
  // };

  // const handleDropdownSelect = (value: string | string[], field: string) => {
  //   setFormGeneralData({
  //     ...formGeneralData,
  //     [field]: value
  //   });
  // };

  // const handleSaveDataForm = () => {
  //   setOpenModalSave(false);
  //   console.log(formGeneralData);
  // }

  const handleDeleteAllData = () => {
    // setFormGeneralData(initialFormData);
    setOpenModalDelete(false);
  }

  const getWarfareCapabilities = async () => {
    await ApiHandler.get('/warfare-capabilities').then((res) => {
      setWarfareCapabilities(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getMilitaryCorps = async () => {
    await ApiHandler.get('/military-corpses').then((res) => {
      setMilitaryCorps(res.data.data);
      console.log(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getManufacturers = async () => {
    await ApiHandler.get('/manufacturers').then((res) => {
      setManufacturers(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getShipGeneralType = async () => {
    await ApiHandler.get('/ship-general-types').then((res) => {
      setShipGeneralTypes(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const getShipCategories = async () => {
    await ApiHandler.get('/ship-categories').then((res) => {
      setShipCategories(res.data.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  const saveDataForm = (value: any) => {
    console.log(value);
  }

  useEffect(() => {
    getWarfareCapabilities();
    getMilitaryCorps();
    getManufacturers();
    getShipGeneralType();
    getShipCategories();
  }, []);

  return(
    <div className={`h-full flex flex-col`}>
      <div>
        <FormButton editModeActive={setIsEditMode} deleteAllDataInput={setOpenModalDelete} saveDataInput={setOpenModalSave} />
      </div>
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit} className="overflow-y-auto" autoComplete="off">
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Class</label>
            <div className="w-full">
              <InputField
                name="class"
                value={values.class}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                }  
                placeholder="Input Class Name"
                textFloatingPlaceholder="Class"
                disabled={!editMode}
              />
              {errors.class && touched.class && <div className="text-light-red text-xs">{errors.class}</div>}
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40  opacity-50 font-bold w-1/3 text-base">Hull Number</label>
            <div className="w-full">
              <InputField 
                name="hullNumber"
                value={values.hullNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                } 
                placeholder="Input Hull Number"
                textFloatingPlaceholder="Hull Number"
                disabled={!editMode}
              />
              {errors.hullNumber && touched.hullNumber && <div className="text-light-red text-xs">{errors.hullNumber}</div>}
            </div>
          </div>
          {/* <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Object Picture</label>
            <div className="w-full">
              <Button
                disabled={!editMode}
                type="button"
                className={`bg-[#494D49] rounded-full flex text-sm items-center py-2 px-4 ${!editMode ? 'opacity-50' : 'hover:bg-[#E1EAF5] hover:text-secondary'}`}
                onClick={() => handleOpenModalAddImage("ship", 4)}
              >
                <FaImage/>
                <span className="px-2">
                  Image
                </span>
              </Button>
            </div>
          </div> */}
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Ships Name</label>
            <div className="w-full">
              <InputField
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                } 
                placeholder="Input Ship Name"
                textFloatingPlaceholder="Ship Name"
                disabled={!editMode}
              />
              {errors.name && touched.name && <div className="text-light-red text-xs">{errors.name}</div>}
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Environment</label>
            <div className="w-full">
              <Select
                editMode={editMode}
                value={values.environment}
                onChange={handleChange}
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="Environment" 
                options={platformEvironments}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Platform General Type</label>
            <div className="w-full">
              <Select 
                editMode={editMode}
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="Platform General Type" 
                options={shipGeneralTypes} 
                value={values.shipGeneralTypeId}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Category</label>
            <div className="w-full">
              <Select
                editMode={editMode} 
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="Category" 
                options={shipCategories} 
                value={values.shipCategoryId}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Warfare Capability</label>
            <div className="w-full">
              <Select 
                editMode={editMode} 
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="Warfare Capability" 
                options={warfareCapabilities} 
                // value={values.warfareCapabilitiesIds}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Commisioned Year</label>
            <div className="w-full">
              <InputField
                name="commissionedYear"
                value={values.commissionedYear}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                } 
                placeholder="Input Commisioned Year"
                textFloatingPlaceholder="Commisioned Year"
                disabled={!editMode}
              />
              {errors.commissionedYear && touched.commissionedYear && <div className="text-light-red text-xs">{errors.commissionedYear}</div>}
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Manufacturer</label>
            <div className="w-full">
              <Select 
                editMode={editMode} 
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="Manufacturer" options={manufacturers} 
                value={values.manufacturerId}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">User</label>
            <div className="w-full">
              <Select 
                editMode={editMode} 
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="User" options={militaryCorps} 
                value={values.ownerId}
                onChange={handleChange }
              />
            </div>
          </div>
          {/* <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Object Picture</label>
            <div className="w-full">
              <Button
                disabled={!editMode}
                type="button"
                className={`bg-[#494D49] rounded-full flex text-sm items-center py-2 px-4 ${!editMode ? 'opacity-50' : 'hover:bg-[#E1EAF5] hover:text-secondary'}`}
                onClick={() => handleOpenModalAddImage("flag", 1)}
              >
                <FaImage/>
                <span className="px-2">
                  Image
                </span>
              </Button>
            </div>
          </div> */}
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Hull Design</label>
            <div className="w-full">
              <Select
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="Hull Design" options={hullDesign} 
                value={values.hullDesign}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Sailing</label>
            <div className="w-full">
              <Select
                editMode={editMode} 
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2" 
                placeholder="Sailing" 
                options={sailingEnv} 
                value={values.sailing}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-2">
            <label className="text-white/40 opacity-50 font-bold w-1/3 text-base">Crew</label>
            <div className="w-full">
              <InputField
                name="crew"
                value={values.crew}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                }
                placeholder="Input Crew" 
                textFloatingPlaceholder="Crew"
                disabled={!editMode}
              />
              {errors.crew && touched.crew && <div className="text-light-red text-xs">{errors.crew}</div>}  
            </div>
          </div>
          <button type="submit">Click Me</button>
        </form>
      </div>
      {
        openModalDelete && (
          <>
            <div 
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={() => setOpenModalDelete(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-20">
              <ModalAlert
                className="rounded-lg"
                headerText='Delete Data?'
                headerColor='danger'
                messageText="This data will be permanently deleted from this list"
                onCancel={() => setOpenModalDelete(false)}
              />
            </div>
          </>
        )
      }
      {
        openModalSave && (
          <>
            <div 
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={() => setOpenModalSave(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-20">
              <ModalAlert
                className="rounded-lg"
                headerText='Save Data Change?'
                headerColor='success'
                messageText="All data in this group of fields will be updated in the database"
                onCancel={() => setOpenModalSave(false)}
                onConfirm={() => {
                  handleSubmit();
                  setOpenModalSave(false);
                }}
              />
            </div>
          </>
        )
      }
      {/* {
        isModalImageOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black opacity-50 z-20"
              onClick={() => setIsModalAddImageOpen(false)}
            ></div>
            <div className="fixed inset-0 flex items-center justify-center z-20">
              <ModalsAddImage
                onSave={() => {}}
                maxImages={totalImages}
                initialImages={imageType === "ship" ? formGeneralData.objectPicture : formGeneralData.flag}
                onCancel={handleCloseModalAddImage}
              />
            </div>
          </>
        )
      } */}
    </div>
  );
}