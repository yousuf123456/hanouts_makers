import { Quill } from "@/app/components/Quill";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { InputContainer } from "./InputContainer";

interface DescriptionInputs {
  control: Control<FieldValues, any>;
}

export const DescriptionInputs: React.FC<DescriptionInputs> = ({ control }) => {
  const placeholder = `Example

Introducing the Lumina Nova, a watch that redefines elegance and innovation.

• Quantum Precision: Powered by a QuantumCore movement, the Lumina Nova ensures precise timekeeping in all conditions.
• Holographic Display: The holographic sapphire crystal offers a 3D time display for a captivating visual experience.
• Lightweight Durability: Crafted from a cutting-edge hyperalloy, it's robust yet incredibly lightweight.
• Smart Connectivity: Seamlessly integrate with your digital life via the built-in AI assistant.

Other Info: 
• Material: Metal
• Color: Black, White, Green
• Style: Bussiness/Travel`;

  return (
    <InputContainer
      heading="Add Description"
      subHeading="Having long description helps to build trust by providing more key information in both picture and text form."
    >
      <div className="mt-4 ">
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Quill field={field} placeholder={placeholder} />
          )}
        />
      </div>
    </InputContainer>
  );
};
