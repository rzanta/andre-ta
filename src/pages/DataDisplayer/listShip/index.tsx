import Card from "@/components/dataDisplayer/Card";
import DataDisplayerListPlatformLayout from "@/layouts/DataDisplayerListPlatformLayout";
import React from "react";
import List from "./ListShip";


export default function IndexListShip() {
  return <DataDisplayerListPlatformLayout CardComponent={List} />;
}
