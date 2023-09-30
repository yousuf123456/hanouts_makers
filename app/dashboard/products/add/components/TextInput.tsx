import React from "react";
import { InputContainer } from "./InputContainer";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  id: string;
  type?: string;
  heading: string;
  required?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  onClick,
  heading,
  required,
  disabled,
  register,
  placeholder,
}) => {
  return (
    <InputContainer heading={heading}>
      <Input
        {...register(id, { required: required })}
        type={type}
        onClick={onClick}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />
    </InputContainer>
  );
};
