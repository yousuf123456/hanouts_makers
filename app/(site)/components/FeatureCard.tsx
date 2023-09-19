import React from "react";

interface FeatureCardProps {
  heading: string;
  label: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ heading, label }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-neutral-200" />

      <div className="flex flex-col gap-1.5">
        <h4 className="text-2xl font-semibold text-black">{heading}</h4>

        <p className="text-sm text-black">{label}</p>
      </div>
    </div>
  );
};
