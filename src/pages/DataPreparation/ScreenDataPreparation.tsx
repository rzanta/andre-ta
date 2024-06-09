import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import SidebarMenu from "../../components/SidebarMenu";
import Tabs from "../../components/Tabs";
import MultiStepFormShip from "./ShipManagement/SteperCreateFormShip";
import SensorFormDetail from "./SensorsManagement/CreateSensorForm";
import EffectorFormDetail from "./EffectorsManagement/EffectorFormDetail";
import IndexShip from "./ShipManagement/ShipList";
import IndexSensor from "./SensorsManagement/SensorList";
import IndexEffector from "./EffectorsManagement/Index";

export default function ScreenDataPreparation() {
  const [headerText, setHeaderText] = useState("");
  const location = useLocation();

  useEffect(() => {
    const pathToHeaderText: { [key: string]: string } = {
      ship: "Ship Management",
      sensor: "Sensor Management",
      effector: "Effector Management",
      notification: "Notification Management",
    };
    const pathKey = location.pathname.split("/").pop();
    const newText = pathKey ? pathToHeaderText[pathKey] : "Data Preparation";
    setHeaderText(newText);
  }, [location.pathname]);

  const tabDataShipManagement = [
    {
      title: "List",
      content: (
        <div className="text-white h-80">
          <IndexShip />
        </div>
      ),
    },
    {
      title: "Add",
      content: (
        <div className="p-0 h-full">
          <MultiStepFormShip />
        </div>
      ),
    },
  ];

  const SensorManagement = [
    {
      title: "List",
      content: (
        <div className="text-white h-80">
          <IndexSensor />
        </div>
      ),
    },
    {
      title: "Add",
      content: (
        <div className="p-0 h-full">
          <SensorFormDetail />
        </div>
      ),
    },
  ];

  const EffectorManagement = [
    {
      title: "List",
      content: (
        <div className="text-white h-80">
          <IndexEffector />
        </div>
      ),
    },
    {
      title: "Add",
      content: (
        <div className="p-0 h-full">
          <EffectorFormDetail />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#0A0F0C] w-full h-screen">
      <div className="flex justify-between p-5 h-[8vh] items-center">
        <div>
          <p className="font-bold text-2xl text-white">Data Preparation</p>
        </div>
        <div>
          <Link to="/">
            <Button className="text-sm w-50 rounded-lg" variant="secondary">
              Landing Page
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex h-[91vh] bg-[#121714] rounded-lg mx-5 overflow-hidden">
        <div className="h-full rounded-l-lg">
          <SidebarMenu className="bg-[#121714] h-full w-35" />
        </div>
        <div className="flex-1 ml-2 flex flex-col">
          <div className="py-2">
            <p className="text-white text-2xl font-bold tracking-tight leading-9">
              {headerText}
            </p>
          </div>
          <div className="flex-1 p-2 overflow-auto h-full">
            <Routes>
              <Route
                path="ship"
                element={
                  <Tabs className="w-full" tabs={tabDataShipManagement} />
                }
              />
              <Route
                path="sensor"
                element={<Tabs className="w-full" tabs={SensorManagement} />}
              />
              <Route
                path="effector"
                element={<Tabs className="w-full" tabs={EffectorManagement} />}
              />
              <Route
                path="notification"
                element={
                  <div className="text-white">
                    Notification Management Content
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
