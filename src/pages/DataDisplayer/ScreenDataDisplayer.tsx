import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import SidebarMenuDD from "../../components/SidebarMenuDD";
import ListSensorEffector from "./ship/ListSensorEffector";
import DetailShip from "./ship/DetailShip";
import ListEffector from "./effector/EffectorListShip";
import DetailEffector from "./effector/DetailEffector";
import ListSensor from "./sensor/SensorListShip";
import DetailSensor from "./sensor/DetailSensor";
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";
import IndexListEffector from "./listEffector";
import EffectorListById from "./effector/EffectorListShip"
import SensorList from "../DataPreparation/SensorsManagement/SensorList";

export default function ScreenDataDisplayer() {
  const [headerText, setHeaderText] = useState("");
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState(0); // State for selected tab index

  useEffect(() =>{
    const pathToHeaderText:{[key:string]:string} ={
      listSensor: "List Sensor",
      listEffector: "List Effector",
      detailShip: "Detail Ship",
      detailSensor: "Detail Sensor",
      detailEffector: "Detail Effector"
    };
    const pathKey = location.pathname.split("/").pop();
    const newText = pathKey?pathToHeaderText[pathKey] : "Data Displayer";
    setHeaderText(newText);
  }, [location.pathname]);

  const SensorManagement = [
    {
      title: "List Sensor",
      content: (
        <div>
          <SensorList />
        </div>
      ),
    },
    {
      title: "Detail Sensor",
      content: (
        <div>
          <DetailSensor/>
        </div>
      ),
    },
  ];

  const EffectorManagement = [
    {
      title: "List Effector",
      content: (
        <div>
          <EffectorListById />
        </div>
      ),
    },
    {
      title: "Detail Effector",
      content: (
        <div>
          <DetailEffector />
        </div>
      ),
    },
  ];



  return (
    <div className="bg-[#0A0F0C] w-full h-full flex flex-col">
      <div className="justify-between flex p-5 h-[10vh]">
        <div>
          <p className="font-bold text-3xl text-white">Data Displayer</p>
        </div>
        <div>
          <Link to="/">
            <Button className="text-lg w-52 rounded-lg" variant="secondary">
              Landing Page
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-grow bg-[#121714] ml-5 mr-5 mb-4 mt-4">
        <div className="rounded-l-lg">
          <SidebarMenuDD
            className="bg-[#121714] h-full w-35"
          />
        </div>
        <div className="w-full flex flex-col items-center flex-grow">
          <Routes>
            <Route path='detail-ship' element={<DetailShip/>}/>
            <Route path='list-effector' element={<ListEffector/>}/>
            <Route path='list-sensor' element={<ListSensor/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}
