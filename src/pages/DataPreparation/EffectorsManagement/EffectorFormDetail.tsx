import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormButton from "../../../components/FormButton";
import TextField from "../../../components/InputField";
import Dropdowns from "../../../components/Selection";
import Button from "../../../components/Button";
import api from "../../../services/index";
import ModalAlert from "../../../components/ModalAlert";
import {
  getEffectorCategory,
  postCreateEffector,
} from "../../../services/EffectorServices";

interface CategoryEffectors {
  id: string;
  name: string;
}

export default function SensorFormDetail() {
  const { register, handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      name: "",
      lethalityLevel: "",
      categoryId: "",
      manufacturerId: "",
      maxMissilePerRound: "",
      avgSpeed: "",
      maxFireRate: "",
      caliber: "",
    },
  });
  const [editMode, setIsEditMode] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [resetValueDropdown, setResetValueDropdown] = useState(false);
  const [effectorCategories, setEffectorCategories] = useState<
    Array<CategoryEffectors>
  >([]);
  const [manufacturer, setManufacturer] = useState<any>([]);
  const lethality: any = [
    { name: "low" },
    { name: "medium" },
    { name: "high" },
  ];

  const onSubmitForm = (data: any) => {
    console.log(data);
  };

  const handleGetIdOption = (value: any) => {
    value = value.id;
    return value;
  };

  const createEffector = async (data: any) => {
    postCreateEffector(data)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.error(e));
  };

  const getEffCategory = async () => {
    getEffectorCategory()
      .then((res) => {
        console.log(res);
        setEffectorCategories(res);
      })
      .catch((e) => {
        console.error(e);
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
    getEffCategory();
    getManufacturer();
  }, []);

  const watchedValues = watch();
  const isFormEmpty = !Object.values(watchedValues).some((value) => value);

  return (
    <div className="bg-[#1B231C] rounded-lg pt-3 pb-1 px-6 flex flex-col h-[73vh]">
      <div>
        <FormButton
          editModeActive={setIsEditMode}
          deleteAllDataInput={setOpenModalDelete}
        />
      </div>
      <div className="h-[75%] overflow-auto">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Name
            </label>
            <div className="w-full">
              <TextField
                id="nameEffector"
                className="w-full rounded-lg"
                textFloatingPlaceholder="Name"
                placeholder="Input Name Effector"
                editMode={editMode}
                {...register("name")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Lethality
            </label>
            <div className="w-full relative">
              <Controller
                name="lethalityLevel"
                control={control}
                render={({ field }) => (
                  <Dropdowns
                    id="lethality"
                    editMode={editMode}
                    className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2"
                    placeholder="Lethality"
                    options={lethality}
                    onSelect={(value) =>
                      field.onChange(handleGetIdOption(value))
                    }
                    resetValue={resetValueDropdown}
                  />
                )}
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Defence Capability
            </label>
            <div className="w-full">
              <Button
                type="button"
                // onClick={() => handleToogleDefeceCapability(true)}
                className={`rounded-full px-6 py-1 mr-3 text-base text-white hover:bg-[#494D49] shadow-2xl 
                ${dataForm.defenceCapability ? "bg-[#494D49]" : "bg-charcoal"} 
                ${editMode ? "cursor-pointer" : "opacity-25"}`}
              >
                yes
              </Button>
              <Button
                type="button"
                // onClick={() => handleToogleDefeceCapability(false)}
                className={`rounded-full px-6 py-1 ml-3 text-base text-white bg-charcoal hover:bg-[#494D49] shadow-2xl ${
                  !dataForm.defenceCapability ? "bg-[#494D49]" : "bg-charcoal"
                } ${editMode ? "cursor-pointer" : "opacity-25"}`}
              >
                no
              </Button>
            </div>
          </div> */}

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Weapon Category
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
                    placeholder="Weapon Category"
                    options={effectorCategories}
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
                    className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2"
                    placeholder="Manufacturer"
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

          {/* <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              ESM Signature Type
            </label>
            <div className="w-full relative">
              <Dropdowns
                id="esmSignature"
                editMode={editMode}
                className="bg-[#494D49] text-white rounded-lg focus:bg-[#1B231C] focus:outline-none focus:ring-2 focus:ring-[#2C4CBE] px-3 py-2"
                placeholder="ESM Signature Type"
                options={esmSignature}
                onSelect={(value) =>
                  handleDropdownSelect(value, "esmSignature")
                }
              />
            </div>
          </div> */}

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Max. Missiles
            </label>
            <div className="w-full">
              <TextField
                id="maxMissilePerRound"
                className="w-full rounded-lg"
                unit="Rounds"
                placeholder="Input Max. Missiles"
                textFloatingPlaceholder="Max. Missiles"
                typeInput="text"
                editMode={editMode}
                {...register("maxMissilePerRound")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Average Speed
            </label>
            <div className="w-full">
              <TextField
                id="avgSpeed"
                className="w-full rounded-lg"
                unit="knots"
                placeholder="Input Average Speed"
                textFloatingPlaceholder="Average Speed"
                typeInput="text"
                editMode={editMode}
                {...register("avgSpeed")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Max. Fire Rate
            </label>
            <div className="w-full">
              <TextField
                id="maxFireRate"
                className="w-full rounded-lg"
                unit="rpm"
                placeholder="Max. Fire Rate"
                textFloatingPlaceholder="Max. Fire Rate"
                typeInput="text"
                editMode={editMode}
                {...register("maxFireRate")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">
              Caliber
            </label>
            <div className="w-full">
              <TextField
                id="caliber"
                className="w-full rounded-lg"
                unit="mm"
                placeholder="Max. Fire Rate"
                textFloatingPlaceholder="Max. Fire Rate"
                typeInput="text"
                editMode={editMode}
                {...register("caliber")}
              />
            </div>
          </div>
          <div className="w-full grid items-center justify-center mt-4">
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
                createEffector(watchedValues);
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
