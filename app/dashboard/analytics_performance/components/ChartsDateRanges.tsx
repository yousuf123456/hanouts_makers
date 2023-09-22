import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  TotalChartsDateRanges as TotalChartsDateRangesItems,
  TotalChartsDateRangesDefault,
} from "@/app/constants/selectOptions";

interface ChartsDateRangesProps {
  setFilter: React.Dispatch<React.SetStateAction<{}>>;
  dateRangesDefault: any;
  dateRanges: any;
}

export const ChartsDateRanges: React.FC<ChartsDateRangesProps> = ({
  dateRangesDefault,
  dateRanges,
  setFilter,
}) => {
  const onChange = (value: string) => {
    setFilter((prev) => ({ ...prev, createdAt: { $gte: new Date(value) } }));
  };

  return (
    <Select
      onValueChange={onChange}
      defaultValue={dateRangesDefault.value.toISOString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a date range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Date Ranges</SelectLabel>
          {dateRanges.map((dateRange: any, i: number) => (
            <SelectItem key={i} value={dateRange.value.toISOString()}>
              {dateRange.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
