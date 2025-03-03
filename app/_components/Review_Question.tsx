import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface Review_Question {
  children: ReactNode;
  className?: string;
}

export const Review_Question: React.FC<Review_Question> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("font-roboto text-sm font-medium text-black", className)}>
      {children}
    </p>
  );
};
