import clsx from "clsx";
import React, { ReactNode, useEffect } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { HiEyeOff } from "react-icons/hi";
import { cn } from "../utils/cn";
import { TextInput } from "../_components/TextInput";

interface Input2Props {
  id: string;
  type: string;
  label: string;
  error?: string;
  placeholder: string;
  isLoading?: boolean;
  disabled?: boolean;
  required: boolean;
  icon?: ReactNode;
  isRequirementsMatched?: boolean;
  defaultValue?: string | undefined | null;
  validateConfirmPass?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  setValue?: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export const input2Styling = `
    transition-all
    rounded-[2px]
    w-full 
    py-2
    px-3
    font-text
    text-sm
    text-black
    placeholder:text-sm 
    placeholder:flex
    placeholder:h-full
    placeholder:items-center
    placeholder:text-slate-400
    focus-visible:bg-white
    focus-visible:outline-none
    focus-visible:inset
`;

export const Input2: React.FC<Input2Props> = ({
  id,
  type,
  label,
  error,
  placeholder,
  isLoading,
  disabled,
  required,
  icon,
  defaultValue,
  isRequirementsMatched,
  validateConfirmPass,
  onFocus,
  setValue,
  onBlur,
  watch,
  register,
}) => {
  const fieldValue = watch(id);
  const password = watch("password");

  useEffect(() => {
    if (defaultValue && setValue) {
      setValue(id, defaultValue);
    }
  }, [defaultValue]);

  const showPassNotMatchingError = !!(
    validateConfirmPass &&
    fieldValue.length &&
    password !== fieldValue
  );

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <p className="font-text text-xs font-semibold text-slate-600">{label}</p>

      <div className="relative w-full">
        {icon ? icon : ""}
        <TextInput
          id={id}
          type={type}
          register={register}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
        />
      </div>

      {showPassNotMatchingError && (
        <p className="font-text text-xs font-semibold text-red-500">
          Passwords does not match
        </p>
      )}
    </div>
  );
};
