import React from "react";
import DataPreparationLayout from "@/layouts/DataPreparationLayout";
import ShipList from "@/pages/DataPreparation/ShipManagement/ShipList";
import CreateShip from "@/pages/DataPreparation/ShipManagement/SteperCreateFormShip";

export default function SensorDataPreparation() {
  return (
    <DataPreparationLayout ListComponent={ShipList} FormComponent={CreateShip} headerLayout="Ship Management" />
  );
}