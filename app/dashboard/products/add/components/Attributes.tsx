import { AttributeType } from "@/app/types";
import React from "react";
import { TextInput } from "./TextInput";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { SelectOptions } from "@/app/sharedComponents/SelectOptions";
import { InputContainer } from "./InputContainer";
import MultiSelect from "@/app/components/MultiSelect";

interface AttributesProps {
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
  attributes: AttributeType[];
}

export const Attributes: React.FC<AttributesProps> = ({
  attributes,
  register,
  control,
}) => {
  return (
    <div className="flex flex-col gap-6 p-2 border-[1px] border-slate-200 rounded-md">
      <h3 className="text-sm font-text font-semibold text-themeSecondary">
        Product Attributes
      </h3>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {attributes.map((attribute) =>
          attribute.select ? (
            <Controller
              control={control}
              name={`attr-${attribute.name}`}
              render={({ field }) => (
                <InputContainer heading={attribute.name}>
                  {attribute.multiSelect ? (
                    <MultiSelect
                      field={field}
                      label={attribute.name}
                      options={attribute.options}
                      placeHolder={`Select ${attribute.name}`}
                    />
                  ) : (
                    <SelectOptions
                      field={field}
                      label={attribute.name}
                      options={attribute.options}
                      placeHolder={`Select ${attribute.name}`}
                    />
                  )}
                </InputContainer>
              )}
            />
          ) : (
            <TextInput
              id={`attr-${attribute.name}`}
              heading={attribute.name}
              register={register}
            />
          )
        )}
      </div>
    </div>
  );
};
