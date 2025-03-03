import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

interface FieldTooltipProps {
  children: React.ReactNode;
}

export const FieldTooltip: React.FC<FieldTooltipProps> = ({ children }) => {
  return (
    <TooltipProvider>

      <Tooltip delayDuration={80}>
        <TooltipTrigger>
          <FaRegQuestionCircle className="w-[14px] h-[14px] text-slate-700" />
        </TooltipTrigger>

        <TooltipContent className="bg-black bg-opacity-80 max-w-[228px] text-sm shadow-none text-white font-roboto">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
