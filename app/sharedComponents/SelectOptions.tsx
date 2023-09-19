"use client";
import * as React from "react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

interface SelectOptionsProps {
  onChange?: (e: any) => void;
  defaultValue?: string;
  linkOptions?: {
    label: string;
    searchParam: string;
  }[];
  placeHolder?: string;
  isLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
  options?: string[];
  label: string;
  field?: any;
}

export const SelectOptions: React.FC<SelectOptionsProps> = ({
  defaultValue,
  placeHolder,
  linkOptions,
  isLoading,
  disabled,
  required,
  onChange,
  options,
  label,
  field,
}) => {
  const itemsToMapOver = options || (linkOptions as any);

  return (
    <Select
      {...field}
      required={required}
      disabled={disabled}
      onValueChange={(value) => {
        field && field.onChange(value);
        onChange && onChange(value);
      }}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="line-clamp-1 h-[38px] w-full gap-2 bg-slate-100 placeholder:text-slate-500">
        <SelectValue className=" line-clamp-1" placeholder={placeHolder} />
      </SelectTrigger>

      <SelectContent
        className={clsx(
          "z-[1000] max-h-72 w-full overflow-y-auto",
          isLoading && "opacity-60",
        )}
      >
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {itemsToMapOver?.map((option: any, i: number) => (
            <SelectItem key={i} value={option.label || option}>
              {option.label || option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
