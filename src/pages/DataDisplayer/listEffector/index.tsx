import Card from "@/components/dataDisplayer/Card";
import DataDisplayerListPlatformLayout from "@/layouts/DataDisplayerListPlatformLayout";
import React from "react";
import ListEffector from "./ListEffector";

export default function IndexListEffector() {
  return <DataDisplayerListPlatformLayout CardComponent={ListEffector} />;
}
