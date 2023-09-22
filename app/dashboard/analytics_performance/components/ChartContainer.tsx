import React from "react";

interface ChartContainerProps {
  children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};
