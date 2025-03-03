import React from "react";

interface StepToStartSellingCardProps {
  heading: string;
  label: string;
}

export const StepToStartSellingCard: React.FC<StepToStartSellingCardProps> = ({
  heading,
  label,
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-16 w-20 bg-neutral-100" />

      <div className="flex flex-col items-center gap-2">
        <h3 className="w-48 text-center text-xl text-black">{heading}</h3>

        <p className=" w-56 text-center text-xs text-black">{label}</p>
      </div>
    </div>
  );
};
