import React from "react";
import Button from "./Button";

interface ITabProps {
  title: string;
  onCLick: () => void;
  active: boolean;
}

export default function Tab({title, onCLick, active}: ITabProps) {
  return (
    <>
      <Button
        variant={`${active ? "darkSuccess" : "none"}`}
        className="px-4 py-2 rounded-t-lg mr-3 w-28 text-sm font-semibold"
        onClick={onCLick}
      >
        {title}
      </Button>
    </>
  );

}