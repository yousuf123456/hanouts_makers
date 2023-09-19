import React from "react";
import { FeatureCard } from "./FeatureCard";
import { handoutsFeatures } from "@/app/constants/seller";
import { Heading } from "./Heading";

export const WhySellOnHandouts = () => {
  return (
    <div className="flex flex-col gap-6">
      <Heading>Why to sell on Handouts ?</Heading>

      <div className="grid grid-cols-3 content-around gap-12">
        {handoutsFeatures.map((feature, i) => (
          <FeatureCard
            key={i}
            heading={feature.heading}
            label={feature.label}
          />
        ))}
      </div>
    </div>
  );
};
