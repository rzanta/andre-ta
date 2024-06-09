import React, { useState } from "react";
import shipBackground from "../assets/images/Background.jpg";
import shipBackgroundRemove from "../assets/images/Ship_background_remove.png";
import { RiCloseCircleFill } from "react-icons/ri";
import { BsExclamationCircleFill } from "react-icons/bs";
import Button from "../components/Button";
import ModalAlert from "../components/ModalAlert";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${shipBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        maxWidth: "100%",
        display: "flex",
        border: "solid 15px #121714",
        position: "relative",
      }}
    >
      <div className="container bg-[#121714]/[.800] mx-0 max-w-full h-full flex flex-col justify-between relative">
        <div className="flex justify-end p-0">
          <div className="h-16 w-16 bg-[#121714] justify-center flex items-center rounded-bl-md outline outline-offset-2 outline-[#0000]">
            <Button
              variant="ghost"
              className="focus:outline-none p-0 flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}
            >
              <RiCloseCircleFill className="text-3xl" />
            </Button>
          </div>
        </div>
        <div className="absolute w-full flex pt-5 justify-center align-middle">
          <img
            src={shipBackgroundRemove}
            alt="Ship"
            className="justify-center object-contain max-w-[60%]"
          />
        </div>
        <div className="text-white flex justify-start z-10">
          <div className="bg-[#121714] w-auto h-auto items-center justify-center p-4 rounded-tr-md shadow-lg">
            <div className="text-center pb-3">
              <p className="tracking-[.15em] font-bold text-[32px]">
                Platform Library
              </p>
            </div>
            <div className="items-center text-xl lg:text-xl w-full">
              <div className="justify-center items-center p-2 flex">
                <Link className="w-full" to="/data-displayer/list/list-ship">
                  <Button className="w-full rounded-lg" variant="secondary">
                    Data Displayer
                  </Button>
                </Link>
              </div>
              <div className="justify-center items-center p-2 flex">
                <Link className="w-full" to="/data-preparation/ship">
                  <Button className="w-full rounded-lg" variant="secondary">
                    Data Preparation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="content-end relative">
            <div
              className="p-3 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <BsExclamationCircleFill className="text-3xl" />
              {showTooltip && (
                <div
                  className="absolute text-xs bg-white text-[#0A0F0C] p-2 ml-10 top-0"
                  style={{
                    borderRadius: "10px 10px 10px 0",
                  }}
                >
                  Retrieve data about battleships, sensors, or effectors by
                  accessing the data displayer
                </div>
              )}
            </div>
            <div className="bg-[#121714] p-6 rounded-tr-lg">
              <p className="text-base font-normal">
                Search for and add data about <br /> battleships to the platform
                library.
              </p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <ModalAlert
              className="rounded-lg"
              messageText="Are you sure you want to log out from the platform library?"
              onCancel={handleCloseModal}
            />
          </div>
        </>
      )}
    </div>
  );
}
