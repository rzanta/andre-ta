import React from "react";
import Button from "./Button";

interface IModalAlertProps {
  className?: string;
  headerText?: string;
  headerColor?: 'danger' | 'warning' | 'success';
  messageText: string;
  onCancel: () => void;
  onConfirm?: () => void;
}

export default function ModalAlert({ className, headerText, headerColor, messageText, onCancel, onConfirm }: IModalAlertProps) {
  return (
    <div className={`bg-[#494D49] py-4 px-8 w-2/5 rounded-lg items-center shadow-md font-bold ${className}`}>
      <div className="py-4 px-6 text-center w-full">
        {headerText && (
          <div className="text-2xl ">
            <p className={` pb-4 tracking-wide ${headerColor === 'danger' ? 'text-[#C13B3B]' : headerColor === 'warning' ? 'text-warning' : 'text-success'}`}>{headerText}</p>
          </div>
        )}
        <div className="text-base text-[#E1EAF5]">
          <p>{messageText}</p>
        </div>
      </div>
      <div className="flex justify-center py-1">
        <div className="mx-3">
          <Button
            variant="secondary"
            className="rounded-lg text-[20px] shadow-md"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
        <div className="mx-3">
          <Button type="submit" variant={headerColor === 'danger' ? 'danger' : headerColor === 'success' ? "success" : headerColor === 'warning' ? 'danger' : 'secondary'}
            className="rounded-lg text-[20px] shadow-md"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
