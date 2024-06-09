import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShip } from "react-icons/fa6";
import { MdSensors } from "react-icons/md";
import Effecttor from "../assets/icons/effector.svg";
import Button from "./Button";

interface ISidebarMenuDDProps {
  className?: string;
}

const menuItems = [
  {
    title: "Detail Ship",
    icon: <FaShip />,
    path: "detail-ship",
  },
  {
    title: "List Sensors",
    icon: <MdSensors />,
    path: "list-sensor",
  },
  {
    title: "List Effectors",
    icon: <Effecttor />,
    path: "list-effector",
  },
];
export default function SidebarMenuDD({
  className, // Receive new prop
}: ISidebarMenuDDProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<number>(() => {
    const currentPath = location.pathname.split("/").pop();
    const currentIndex = menuItems.findIndex(
      (item) => item.path === currentPath
    );
    return currentIndex >= 0 ? currentIndex : 0;
  });

  const handleMenuClick = (index: number, path: string) => {
    setSelectedMenu(index);
    navigate(`/data-preparation/${path}`);
  };

  return (
    <div className={`relative rounded-l-lg flex-auto ${className}`}>
      <div className="top-0 absolute z-0 w-[74px] h-full rounded-l-lg bg-charcoal"></div>
      <div className="justify-start z-10 items-center content-center h-[100%]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`relative justify-start text-white items-center rounded-full z-50 ml-3 ${
              selectedMenu === index ? "bg-charcoal" : ""
            }`}
          >
            <div
              className={`z-10 items-center h-20 w-[70px] rounded-full overflow-visible content-center ${
                selectedMenu === index ? "bg-charcoal" : ""
              }`}
            >
              <div className="items-center">
                <Button
                  onClick={() => handleMenuClick(index, item.path)}
                  className={`text-3xl shrink-0 p-3.5 rounded-full ${
                    selectedMenu === index ? "bg-dark-green" : ""
                  }`}
                >
                  {item.icon}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
