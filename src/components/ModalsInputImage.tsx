import React, { useState } from "react";
import Button from "./Button";
import { RiCloseCircleFill } from "react-icons/ri";
import { HiTrash } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";

interface IFileInputModalProps {
  className?: string;
  onSave: (file: Blob) => void;
  onCancel: () => void;
}

export default function FileInputModal({ onSave, onCancel }: IFileInputModalProps) {
  const [file, setFile] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [messageStatus, setMessageStatus] = useState<string | null>(null);

  const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
  const statusUpload = ["success", "failed", "deleted"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      validationFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSave(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
      validationFile(event.dataTransfer.files[0]);
    }
  };

  const handleDeleteImage = () => {
    setFile(null);
    setUploadStatus(statusUpload[2]);
    setMessageStatus("Your previously uploaded file has been successfully deleted.");
  }

  const validationFile = (file : Blob | null) => {
    if (!file) {
      setFile(null);
      return
    }
    if (file.size > MAX_SIZE) {
      setUploadStatus(statusUpload[1]);
      setMessageStatus("File size is too large");
      return
    } else {
      setUploadStatus(statusUpload[0]);
      setMessageStatus("File has been uploaded successfully");
    }
  }

  return (
    <div className="bg-[#494D49] rounded-lg px-6 py-3">
      <div className="py-2 border-white flex items-center justify-between">
        <div className="flex text-white items-center text-xl font-bold">
          <Button 
            className="px-0 py-0" type="button"
            onClick={handleDeleteImage}
            disabled={!file ? true : false}
          >
            <HiTrash className={`text-danger text-xl ${!file ? '' : 'hover:text-secondary' }`}/>
          </Button>
        </div>
        <div className="flex text-white items-center text-xl font-bold">
          <Button className="px-0 py-0" type="button" onClick={onCancel}>
            <RiCloseCircleFill className="text-white text-xl hover:text-secondary"/>
          </Button>
        </div>
      </div>
      <div 
        className={`my-3 flex flex-col items-center justify-center border-2 border-white rounded-lg py-3 px-10 ${
          isDragging ? 'border-dashed border-secondary' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-white text-sm">
          <p>Maximum upload file size is 2 MB.</p>
        </div>
        <div className={`text-sm ${uploadStatus === statusUpload[0] || uploadStatus === statusUpload[2] ? 'text-success' : uploadStatus === statusUpload[1] ? 'text-warning' : ''}`}>
          <p>{messageStatus}</p>
        </div>
        <div className="p-3 flex flex-col items-center justify-center">
          <div className="py-1">
            <FiDownload className="text-white text-3xl font-extrabold"/>
          </div>
          <div className="py-1 mt-3">
            <label className="cursor-pointer bg-secondary text-white py-1 px-4 rounded-lg">
              Choose File
              <input type="file" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        </div>
        <div className="text-sm text-white">
          <p>or drag and drop files here to add them.</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="px-3">
          <Button
            onClick={onCancel}
            className="shadow-lg rounded-lg text-[20px] font-bold shadow-xl text-base py-2 px-8 w-full bg-secondary hover:bg-[#494D49]"
          >
            Cancel
          </Button>  
        </div>
        <div className="px-3">
          <Button
            onClick={handleSubmit}
            disabled={uploadStatus !== "success" ? true : false}
            className={`shadow-lg rounded-lg text-[20px] font-bold shadow-xl text-base py-2 px-8 w-full bg-success ${uploadStatus !== "success" ? 'opacity-50' : 'hover:bg-green'}`}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
