import React from "react";
import { CheckBox } from "@/app/_components/Checkbox";
import { TextInput } from "@/app/_components/TextInput";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { InputHeading } from "@/app/_components/InputHeading";

interface HideModuleHeadingFieldsProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
}

export const HideModuleHeadingFields: React.FC<
  HideModuleHeadingFieldsProps
> = ({ register, control }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <InputHeading>Hide Module Heading</InputHeading>
        <Controller
          control={control}
          defaultValue={false}
          name="hideModuleHeading"
          render={({ field }) => <CheckBox field={field} />}
        />
      </div>

      <div className="flex flex-col gap-0">
        <InputHeading>Module Heading</InputHeading>
        <TextInput
          id="moduleHeading"
          register={register}
          placeholder="Enter Module Heading"
        />
      </div>
    </div>
  );
};
