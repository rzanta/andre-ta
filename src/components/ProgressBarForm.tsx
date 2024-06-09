import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "./Button";

interface IProgressBarFormProps {
  steps: { formNumber: string, titleForm: string }[];
  activeStep: number;
  setActiveStep: (index: number) => void;
  nameForm: (titleForm: string) => void;
}

export default function ProgressBarForm({ steps, activeStep, setActiveStep, nameForm }: IProgressBarFormProps) {
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    nameForm(steps[index].titleForm);
  };

  return (
    <div className="p-1 flex">
      {steps.map((step, index) => (
        <div key={index} className="w-full">
          <Button
            className={`px-0 py-0 text-left ${index === activeStep ? 'text-blue-500 hover:text-blue-700' : 'text-[#6E6F6E] hover:text-[#E1EAF5]'}`}
            onClick={() => handleStepClick(index)}
          >
            <div className="flex">
              <div className={`text-2xl p-1 content-center ${index === activeStep ? 'text-blue-500' : ''}`}>
                <p>{step.formNumber}</p>
              </div>
              <div className={`p-1 text-xs w-24 ${index === activeStep ? 'text-blue-500' : ''}`}>
                <p>{step.titleForm}</p>
              </div>
            </div>
            <div className="flex">
              <div className={`text-xl ${index === activeStep ? 'text-blue-500' : ''}`}>
                <IoCloseCircleOutline />
              </div>
              <div className="mx-2 w-full pt-2">
                <div className={`border-b-2 ${index === activeStep ? 'border-blue-500' : 'border-[#6E6F6E] hover:border-[#E1EAF5]'}`}></div>
              </div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
}
