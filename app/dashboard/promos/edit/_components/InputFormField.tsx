import React, { ComponentProps } from "react";

import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Control, FieldPath, FieldValues } from "react-hook-form";

type InputFormFieldProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
} & ComponentProps<"input">;

export function InputFormField<T extends FieldValues>({
  name,
  label,
  control,
  onChange,
  ...inputProps
}: InputFormFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...inputProps}
              {...field}
              onChange={(e) => {
                field.onChange(onChange ? onChange(e) : e.target.value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
