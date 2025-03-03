import { cn } from "@/lib/utils";
import React from "react";
import { FieldTooltip } from "./FieldTooltip";

export const InputHeading = ({
  required,
  children,
  className,
  subHeading,
  fieldTooltip,
}: {
  children: React.ReactNode;
  fieldTooltip?: string;
  subHeading?: string;
  className?: string;
  required?: boolean;
}) => {
  return (
    <div className="flex gap-1 items-center">
      {required && <p className="text-themeBlue text-lg">*</p>}

      <div className={cn("flex flex-shrink-0 flex-col gap-0", className)}>
        <div className="flex items-center gap-2">
          <p className=" text-black font-roboto text-sm font-medium capitalize">
            {children}
          </p>
          {fieldTooltip && <FieldTooltip>{fieldTooltip}</FieldTooltip>}
        </div>

        <p className="text-sm text-neutral-500">{subHeading}</p>
      </div>
    </div>
  );
};
