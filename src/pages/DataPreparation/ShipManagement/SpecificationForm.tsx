import React, { useState } from "react";
import { Specification } from "@/schema validation/Ship";
import TextField from "@/components/InputField";
import FormButton from "@/components/FormButton";
import ModalAlert from "@/components/ModalAlert";
import { useFormik } from "formik";

interface SpecificationFormProps{
  className?: string;
  editMode?: boolean;
}

const onSubmit = async (values: any, actions: { resetForm: () => void; }) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

export default function SpecificationForm({ className}: SpecificationFormProps) {
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      cruisingSpeed: 0,
      maxSpeed: 0,
      combatRange: 0,
      displacement: 0,
      beam: 0,
      length: 0,
      draft: 0
    },
    validationSchema: Specification,
    onSubmit
  });

  const [editMode, setIsEditMode] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [isModalImageOpen, setIsModalAddImageOpen] = useState(false);


  const showData = (data : any) => {
    console.log(data);
  }

  const displayValue = (value: number): string => {
    return value === 0 ? "" : value.toString();
  };

  return(
    <div className={`${className} h-full flex flex-col`}>
      <div>
        <FormButton editModeActive={setIsEditMode} deleteAllDataInput={setOpenModalDelete} saveDataInput={setOpenModalSave} />
      </div>
      <div className="flex-1 overflow-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Cruising Speed</label>
            <div className="w-full">
              <TextField
                name="cruisingSpeed"
                value={displayValue(values.cruisingSpeed)}
                onChange={handleChange}
                onBlur={handleBlur}
                id="cruisingSpeed" 
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                } 
                unit="km/hour" 
                placeholder="Cruising Speed"
              />
              {errors.cruisingSpeed && touched.cruisingSpeed && <div className="text-light-red text-xs">{errors.cruisingSpeed}</div>}
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Max. Speed</label>
            <div className="w-full">
              <TextField
                name="maxSpeed"
                value={displayValue(values.maxSpeed)}
                onChange={handleChange}
                onBlur={handleBlur}
                id="maxSpeed" 
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                } 
                unit="kts" 
                placeholder="Max. Speed"
              />
              {errors.maxSpeed && touched.maxSpeed && <div className="text-light-red text-xs">{errors.maxSpeed}</div>}
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Combat Range</label>
            <div className="w-full">
              <TextField
                name="combatRange"
                value={displayValue(values.combatRange)}
                onChange={handleChange}
                onBlur={handleBlur}
                id="combatRange" 
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'text-white/25 '
                  }`
                }  
                unit="Nm" 
                placeholder="Combat Range"
              />
              {errors.combatRange && touched.combatRange && <div className="text-light-red text-xs">{errors.combatRange}</div>} 
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Displacement</label>
            <div className="w-full">
              <TextField
                name="displacement"
                value={displayValue(values.displacement)}
                onChange={handleChange}
                onBlur={handleBlur}
                id="displacement" 
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                }  
                unit="ton" 
                placeholder="Displacement"
              />
              {errors.displacement && touched.displacement && <div className="text-light-red text-xs">{errors.displacement}</div>}  
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Draft</label>
            <div className="w-full">
              <TextField
                name="draft"
                value={displayValue(values.draft)}
                onChange={handleChange}
                onBlur={handleBlur}
                id="draft" 
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                } 
                unit="ton" 
                placeholder="Draft"
              />
              {errors.draft && touched.draft && <div className="text-light-red text-xs">{errors.draft}</div>} 
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Beam</label>
            <div className="w-full">
              <TextField
                name="beam"
                value={displayValue(values.beam)}
                onChange={handleChange}
                onBlur={handleBlur}
                id="beam" 
                className={`w-full rounded-lg text-white z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25 '
                  }`
                } 
                unit="m" 
                placeholder="Beam"
              />
              {errors.beam && touched.beam && <div className="text-light-red text-xs">{errors.beam}</div>}  
            </div>
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-gray-500 opacity-50 font-bold w-1/3 text-base">Length</label>
            <div className="w-full">
              <TextField
                name="length"
                value={displayValue(values.length)}
                onChange={handleChange}
                onBlur={handleBlur}
                id="length" 
                className={`w-full rounded-lg z-10 bg-[#494D49] px-4 py-2 
                  ${editMode ? 
                    'placeholder:text-white' : 
                    'placeholder:text-white/25'
                  }`
                }  
                unit="m" 
                placeholder="Length"
              />
              {errors.length && touched.length && <div className="text-light-red text-xs">{errors.length}</div>}  
            </div>
          </div>
        </form>
      </div>
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
    </div>
  );
}