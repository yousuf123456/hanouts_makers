import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
}) => {
  return (
    <div
      id={id}
      className={cn("p-4 bg-white rounded-md shadow-md w-full", className)}
    >
      {children}
    </div>
  );
};
