import React from "react";
import { InputHeading } from "./InputHeading";

export const InputContainer = ({
  heading,
  children,
  subHeading,
}: {
  heading: string;
  subHeading?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <InputHeading subHeading={subHeading}>{heading}</InputHeading>

      {children}
    </div>
  );
};
