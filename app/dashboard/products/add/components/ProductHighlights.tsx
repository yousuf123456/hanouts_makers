import React from "react";
import { InputContainer } from "./InputContainer";
import { Quill } from "@/app/components/Quill";
import { Control, Controller, FieldValues } from "react-hook-form";

interface ProductHighlightsProps {
  control: Control<FieldValues, any>;
}

export const ProductHighlights: React.FC<ProductHighlightsProps> = ({
  control,
}) => {
  const placeholder = `Example

  • Waterproof watch
  • Rose color availaible for limited edition only
  • Length of band: 24cm
  • Dial diameter: 3cm
  • Suitable for multiple ocasions
  `;

  return (
    <InputContainer
      heading="Product Highlights"
      subHeading="Having accurate product information raises discoverability."
    >
      <div className="mt-4">
        <Controller
          control={control}
          name="highlights"
          render={({ field }) => (
            <Quill field={field} placeholder={placeholder} />
          )}
        />
      </div>
    </InputContainer>
  );
};
