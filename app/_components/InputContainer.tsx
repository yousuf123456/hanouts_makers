import React from "react";
import { InputHeading } from "./InputHeading";
import { cn } from "../utils/cn";

export const InputContainer = ({
  heading,
  children,
  onClick,
  subHeading,
  className,
}: {
  heading: string;
  className?: string;
  onClick?: () => void;
  subHeading?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn("w-full flex flex-col gap-1", className)}
    >
      <InputHeading subHeading={subHeading}>{heading}</InputHeading>

      {children}
    </div>
  );
};
