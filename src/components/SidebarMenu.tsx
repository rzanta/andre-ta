import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShip } from "react-icons/fa6";
import { MdSensors } from "react-icons/md";
import { BsChatLeftDotsFill } from "react-icons/bs";
import Effector from "../../src/assets/icons/effector.svg";
import Button from "./Button";

interface ISidebarMenuProps {
  className?: string;
}

const menuItems = [
  { title: "Ship Management", icon: <FaShip />, path: "ship" },
  { title: "Sensors Management", icon: <MdSensors />, path: "sensor" },
  { title: "Effector Management", icon: <Effector />, path: "effector" },
  {
    title: "Notification Management",
    icon: <BsChatLeftDotsFill />,
    path: "notification",
  },
];

export default function SidebarMenu({ className }: ISidebarMenuProps) {
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
