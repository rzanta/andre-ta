import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import Button from "./Button";

interface IFormButtonProps {
  className?: string;
  editModeActive?: (status: boolean) => void;
  deleteAllDataInput?: (status: boolean) => void;
  saveDataInput?: (status: boolean) => void;
}

export default function FormButton({ className, editModeActive, deleteAllDataInput, saveDataInput }: IFormButtonProps) {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => {
    const modeEdit = !isEditMode;
    setIsEditMode(modeEdit);
    editModeActive && editModeActive(modeEdit);
  }

  return(
    <div className={`bg-charcoal rounded-full my-2 flex justify-center ${className}`}>
      <div className="m-1 w-1/3 flex justify-center">
        <Button 
          className="w-60 flex justify-center rounded-full text-[#872A2A] text-xl hover:bg-dark-green"
          onClick={() => deleteAllDataInput && deleteAllDataInput(true)}
        >
          <HiTrash />
        </Button>
      </div>
      <div className="m-1 w-1/3 flex justify-center">
        <Button 
          variant={`${isEditMode ? 'success' : 'ghost'}`} 
          className="w-60 flex justify-center rounded-full text-white text-xl hover:bg-dark-green"
          onClick={handleEditMode}
        >
          <FaRegEdit />
        </Button>
      </div>
      <div className="m-1 w-1/3 flex justify-center">
        <Button
          className="w-60 flex justify-center rounded-full text-white text-xl hover:bg-dark-green"
          onClick={() => saveDataInput && saveDataInput(true)}
        >
          <FaRegSave />
        </Button>
      </div>
    </div>
  );
}