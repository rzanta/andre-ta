import React, { useState, useEffect } from "react";
import Button from "./Button";
import { PiFolderSimplePlusFill } from "react-icons/pi";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdImageNotSupported } from "react-icons/md";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import FileInputModal from "./ModalsInputImage";

interface IModalsAddImageProps {
  className?: string;
  onCancel: () => void;
  maxImages: number;
  onSave: (images: { url: string; alt: string }[]) => void;
  initialImages: { url: string; alt: string }[];
}

export default function PopUpAddImage({ onCancel, maxImages, onSave, initialImages }: IModalsAddImageProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [showFileInputModal, setShowFileInputModal] = useState(false);
  const [targetImageIndex, setTargetImageIndex] = useState<number | null>(null);
  const [imageData, setImageData] = useState<{ url: string; alt: string }[]>([]);

  useEffect(() => {
    setImageData(initialImages.length > 0 ? initialImages : Array.from({ length: maxImages }, (_, i) => ({ url: "", alt: `Image ${i + 1}` })));
  }, [initialImages, maxImages]);

  const showNextImage = () => {
    setImageIndex((index) => (index === imageData.length - 1 ? 0 : index + 1));
  };

  const showPrevImage = () => {
    setImageIndex((index) => (index === 0 ? imageData.length - 1 : index - 1));
  };

  const handleFileSave = (file: Blob) => {
    if (targetImageIndex !== null) {
      const updatedImageData = [...imageData];
      updatedImageData[targetImageIndex].url = URL.createObjectURL(file);
      setImageData(updatedImageData);
      setTargetImageIndex(null);
    }
    setShowFileInputModal(false);
  };

  const handleButtonClick = (index: number) => {
    setTargetImageIndex(index);
    setShowFileInputModal(true);
  };

  const handleSubmit = () => {
    onSave(imageData);
    onCancel();
  };

  if (showFileInputModal) {
    return <FileInputModal onSave={handleFileSave} onCancel={() => setShowFileInputModal(false)} />;
  }

  return (
    <div className="bg-[#494D49] rounded-lg p-6">
      <div className="border-b-2 border-white flex items-center align-center relative justify-center">
        <div className="flex text-white items-center text-xl font-bold">
          <PiFolderSimplePlusFill />
          <span className="px-3">Nama Folder</span>
        </div>
        <div className="absolute right-0 top-0">
          <Button className="px-0 py-0" type="button" onClick={onCancel}>
            <RiCloseCircleFill className="text-white text-xl hover:text-secondary" />
          </Button>
        </div>
      </div>
      <div className="my-3 px-8 justify-center items-center flex flex-col">
        <div className="relative bg-[#6E6F6E] rounded-lg w-80 h-80 tall:h-96 tall:w-96 flex justify-center items-center align-center">
          {imageData.map(({ url, alt }, index) => (
            <div
              key={index}
              className={`${
                index === imageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } transition-opacity transition-transform duration-500 ease-in-out absolute w-full h-full flex justify-center items-center rounded-lg`}
            >
              {url ? (
                <img
                  src={url}
                  alt={alt}
                  className="w-full h-full rounded-lg"
                />
              ) : (
                <MdImageNotSupported className="text-3xl text-white" />
              )}
            </div>
          ))}
          <div>
            <Button
              type="button"
              onClick={showPrevImage}
              hidden={maxImages === 1}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 px-2 py-2 hover:opacity-50 font-black text-3xl"
            >
              <MdArrowBackIosNew className="text-white" />
            </Button>
            <Button
              type="button"
              onClick={showNextImage}
              hidden={maxImages === 1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-2 hover:opacity-50 font-black text-3xl"
            >
              <MdArrowForwardIos className="text-white" />
            </Button>
          </div>
        </div>
        <div className="flex justify-start items-center h-full mt-4 w-full">
          {
            maxImages > 1 && (
            <div className="flex items-center h-full">
              {imageData.map((_, index) => (
                <Button
                  key={index}
                  className={`bg-secondary mr-3 rounded-full px-2 py-1 transition-all duration-300 ease-in-out ${index === imageIndex ? 'bg-dark-green px-6 py-1' : 'bg-success'}`}
                  onClick={() => setImageIndex(index)}
                ></Button>
              ))}
            </div>
            )
          }
        </div>
      </div>
      <div className={`grid ${maxImages === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 py-2`}>
        {imageData.map((image, index) => (
          <div key={index} className={`flex justify-center items-center ${maxImages === 1 ? 'w-full' : ''}`}>
            <Button
              className="rounded-lg text-xs tall:text-base w-full py-2 shadow-md bg-secondary hover:bg-[#E1EAF5] hover:text-secondary"
              onClick={() => handleButtonClick(index)}
            >
              {image.alt}
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3">
        <div className="mx-2">
          <Button
            className="rounded-lg text-[20px] font-bold shadow-lg text-base tall:text-xl py-2 px-8 w-full bg-secondary hover:bg-[#494D49]"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
        <div className="mx-2">
          <Button
            variant="success"
            className="rounded-lg text-[20px] font-bold shadow-xl text-base tall:text-xl py-2 px-8 w-full"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
