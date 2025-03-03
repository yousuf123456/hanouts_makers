import React from "react";
import { Heading } from "./Heading";
import { StepToStartSellingCard } from "./StepToStartSellingCard";
import { stepsToStartSelling } from "@/app/constants/seller";

export const StepsToStartSelling = () => {
  return (
    <div className="flex flex-col gap-6">
      <Heading>Steps To Start Selling</Heading>

      <div className="flex justify-between gap-6">
        {stepsToStartSelling.map((step) => (
          <StepToStartSellingCard
            key={step.heading}
            heading={step.heading}
            label={step.label}
          />
        ))}
      </div>
    </div>
  );
};
