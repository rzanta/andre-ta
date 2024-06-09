import Card from "@/components/dataDisplayer/Card";
import DataDisplayerListPlatformLayout from "@/layouts/DataDisplayerListPlatformLayout";
import React from "react";
import ListSensor from "./ListSensor";

export default function IndexListSensor() {
  return <DataDisplayerListPlatformLayout CardComponent={ListSensor} />;
}
