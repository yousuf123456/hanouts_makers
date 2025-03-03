import React from "react";
import { cn } from "../utils/cn";

interface SeperatorProps {
  className?: string;
  vertical?: boolean;
}

export const Seperator: React.FC<SeperatorProps> = ({
  className,
  vertical,
}) => {
  return (
    <hr
      className={cn(
        "my-1 h-[1px] w-full border-none bg-slate-300",
        vertical && "mx-1 my-0 h-[40px] w-[1px]",
        className,
      )}
    />
  );
};
