import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn("px-12 min-h-screen w-full pt-8 pb-16 bg-white", className)}
    >
      {children}
    </div>
  );
};
