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
import { cn } from "../utils/cn";

interface SelectOptionsProps {
  defaultValue?: string | number;
  options?: string[] | number[];
  onClick?: () => void;
  onChange?: (e: any) => void;
  type?: "string" | "number";
  selectedOptions?: string[];
  linkOptions?: {
    label: string;
    searchParam: string;
  }[];
  placeHolder?: string;
  isLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string;
  label: string;
  field?: any;
}

export const SelectOptions: React.FC<SelectOptionsProps> = ({
  selectedOptions,
  defaultValue,
  placeHolder,
  linkOptions,
  isLoading,
  disabled,
  required,
  className,
  onChange,
  onClick,
  options,
  label,
  value,
  field,
  type,
}) => {
  const itemsToMapOver = options || (linkOptions as any);

  const onValueChange = (value: string) => {
    const formattedValue = type === "number" ? parseInt(value) : value;

    field?.onChange && field.onChange(formattedValue);
    onChange && onChange(formattedValue);
  };

  return (
    <Select
      {...field}
      value={value}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        onClick={onClick}
        className={cn(
          "line-clamp-1 h-[38px] w-full gap-2 bg-slate-50 placeholder:text-slate-200",
          className
        )}
      >
        <SelectValue
          className="line-clamp-1 placeholder:text-slate-200"
          placeholder={placeHolder}
        />
      </SelectTrigger>

      <SelectContent
        className={cn(
          "z-[1000] max-h-72 w-full overflow-y-auto",
          isLoading && "opacity-60"
        )}
      >
        <SelectGroup>
          <SelectLabel className="capitalize">{label}</SelectLabel>

          {itemsToMapOver?.map((option: any, i: number) => (
            <SelectItem
              disabled={
                selectedOptions &&
                selectedOptions.filter(
                  (selectedOption) => option === selectedOption
                ).length > 0
              }
              key={i}
              value={option.label || option}
            >
              {option.label || option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
