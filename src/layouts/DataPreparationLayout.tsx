import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Button from "@components/Button";
import SidebarMenu from "@components/SidebarMenu";
import Tabs from "@components/Tabs";

interface DataPreparationLayoutProps {
  ListComponent: React.FC
  FormComponent: React.FC
  headerLayout?: string
}

export default function DataPreparationLayout({ListComponent, FormComponent, headerLayout} : DataPreparationLayoutProps) {

  const DataPrepataionTabs = [
    {
      title: "List",
      content: (
        <div className="text-white h-80">
          <ListComponent/>
        </div>
      ),
    },
    {
      title: "Add",
      content: (
        <div className="p-0 h-full">
          <FormComponent/>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#0A0F0C] w-full min-h-screen max-h-screen">
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
              {headerLayout}
            </p>
          </div>
          <div className="flex-1 p-2 h-full">
            <Tabs className="w-full" tabs={DataPrepataionTabs} />
          </div>
        </div>
      </div>
    </div>
  );
}
