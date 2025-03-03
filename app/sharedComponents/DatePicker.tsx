"use client";

// import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dynamic from "next/dynamic";

const DynamicDatePicker = dynamic(() =>
  import("@mui/x-date-pickers/DatePicker").then((mod) => mod.DatePicker)
);

import * as React from "react";

interface DatePickerProps {
  isLoading?: boolean;
  disabled?: boolean;
  minDate?: any;
  label: string;
  field: any;
}

export function DateChooser({
  isLoading,
  disabled,
  minDate,
  label,
  field,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DynamicDatePicker
        {...field}
        label={label}
        minDate={minDate}
        value={field.value}
        disabled={disabled}
        slotProps={{ textField: { size: "small" } }}
        sx={{ mt: 1, width: 160, minHeight: 36, fontSize: 6 }}
      />
    </LocalizationProvider>
  );
}
