import Card from "@/components/dataDisplayer/Card";
import React from "react";

export default function ListEffector() {
  const effectors = Array.from({ length: 10 }, (_, index) => ({
    platformClass: `class effector dummy ${index}`,
    platformId: `${index}`,
    platformName: `effector name dummy ${index}`,
  }));
  return (
    <div className="grid grid-cols-2 pt-4 gap-2 mx-2 px-4 overflow-y-auto max-h-[73vh]">
      {effectors.map((effector, index) => (
        <Card
          platformClass={effector.platformClass}
          platformId={effector.platformId}
          platformName={effector.platformName}
        />
      ))}
    </div>
  );
}
