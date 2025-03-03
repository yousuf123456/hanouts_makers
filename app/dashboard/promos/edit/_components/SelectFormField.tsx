import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type SelectFormFieldProps<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  placeholder?: string;
  selectItems: { value: string; label: string }[];
};

export function SelectFormField<T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  selectItems,
}: SelectFormFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {selectItems.map((selectItem) => (
                <SelectItem value={selectItem.value}>
                  {selectItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
