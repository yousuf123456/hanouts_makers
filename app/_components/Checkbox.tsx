import React from "react";
import { cn } from "../utils/cn";
import Checkbox from "@mui/material/Checkbox";

interface CheckboxProps {
  field?: any;
  heading?: string;
  className?: string;
  defaultChecked?: boolean;
}

export const CheckBox: React.FC<CheckboxProps> = ({
  defaultChecked,
  heading,
  field,
}) => {
  return (
    <div className={cn("flex gap-1 items-center")}>
      {heading && <h4 className="text-base font-sans text-black">{heading}</h4>}

      <Checkbox defaultChecked={defaultChecked} {...field} size="small" />
    </div>
  );
};
