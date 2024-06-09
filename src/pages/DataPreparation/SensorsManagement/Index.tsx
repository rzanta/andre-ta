import React from "react";
import DataPreparationLayout from "@/layouts/DataPreparationLayout";
import SensorList from "@/pages/DataPreparation/SensorsManagement/SensorList";
import CreateSensorForm from "@/pages/DataPreparation/SensorsManagement/CreateSensorForm";

export default function SensorDataPreparation() {
  return (
    <DataPreparationLayout ListComponent={SensorList} FormComponent={CreateSensorForm} headerLayout="Sensor Management"/>
  );
}