import React from "react";
import Button from "./Button";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";

interface IToastProps {
  className?: string;
  variant?: string;
  headerText?: string;
  messageBody?: string;
  onClose?: () => void;
}

export default function Toast({ className, variant = 'success', headerText, messageBody, onClose }: IToastProps) {
  return(
    <div className={`rounded-lg px-4 py-2 ${className} ${variant === 'success' ? 'bg-dark-green' : 'bg-danger'}`}>
      <div className={`flex items-center py-1 justify-between ${variant === 'success' ? 'border-2 border-dark-green border-b-success' :'border-2 border-danger border-b-light-red'} `}>
        <div className="flex items-center font-bold text-base">
          {variant === 'success' ? <AiOutlineCheckCircle className="text-xl text-success"/> : <RiErrorWarningLine className="text-xl text-light-red"/>} <span className="px-2 text-white">{headerText}</span>
        </div>
        <div>
          <Button className="px-0 py-0 flex items-center text-black text-[#1F221F] hover:text-[#1F221F]/40"
            onClick={onClose}
          >
            <MdOutlineClose />
          </Button>
        </div>
      </div>
      <div className="p-1 text-xs text-white">
        <p>{messageBody}</p>
      </div>
    </div>
  )
}