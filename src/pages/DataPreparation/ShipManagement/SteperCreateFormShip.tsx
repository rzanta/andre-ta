import React, { useState } from "react";
import Button from "@/components/Button";
import ProgressBarForm from "@components/ProgressBarForm";
import GeneralInformationForm from "./GeneralInformationForm";
import SpecificationForm from "./SpecificationForm";
import OtherInformationForm from "./OtherInformationForm";
import SensorForm from "./SensorForm";
import EffectorForm from "./EffectorForm";
import ModalAlert from "@/components/ModalAlert";

export default function SteperCreateFormShip() {
  const steps = [
    { formNumber: "01", titleForm: "General Information", status: "", active: false },
    { formNumber: "02", titleForm: "Ship Specification", status: "", active: false },
    { formNumber: "03", titleForm: "Other Information", status: "", active: false },
    { formNumber: "04", titleForm: "Sensors Component", status: "", active: false },
    { formNumber: "05", titleForm: "Effector  Component", status: "", active: false },
  ];
  
  const [headerText, setHeaderText] = useState(steps[0].titleForm);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalSave, setOpenModalSave] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-[#1B231C] rounded-lg pt-3 pb-1 px-6 flex flex-col tall:h-[55rem]">
      <div>
        <div className="text-white text-xl py-2 font-bold">{headerText}</div>
      </div>

      <div className="h-[26rem] tall:h-[53rem] overflow-hidden">
        {activeStep === 0 && <GeneralInformationForm />}
        {activeStep === 1 && <SpecificationForm />}
        {activeStep === 2 && <OtherInformationForm  />}
        {activeStep === 3 && <SensorForm  />}
        {activeStep === 4 && <EffectorForm  />}
      </div>
      <div className="flex mt-2 align-middle justify-between">
        <div>
          <ProgressBarForm steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} nameForm={setHeaderText}/>
        </div>
        <div className="flex content-center items-center">
          <div>
            <Button className="rounded-lg text-xs" variant="success">Submit</Button>
          </div>
        </div>
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
              />
            </div>
          </>
        )
      }
    </div>  
  );
}
