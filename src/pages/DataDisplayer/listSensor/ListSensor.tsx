import Card from "@/components/dataDisplayer/Card";
import React from "react";

export default function ListSensor() {
  const ships = Array.from({ length: 10 }, (_, index) => ({
    platformClass: `class ship dummy ${index}`,
    platformId: `${index}`,
    platformName: `ship name dummy ${index}`,
  }));
  return (
    <div className="grid grid-cols-2 pt-4 gap-2 mx-2 px-4 overflow-y-auto max-h-[73vh]">
      {ships.map((ship, index) => (
        <Card
          platformClass={ship.platformClass}
          platformId={ship.platformId}
          platformName={ship.platformName}
        />
      ))}
    </div>
  );
}
