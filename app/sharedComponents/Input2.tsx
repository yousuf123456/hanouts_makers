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
    <div className="w-full flex flex-col gap-1 items-start">
      <p className="text-slate-600 text-xs font-text font-semibold">{label}</p>

      <div className="w-full relative">
        {icon ? icon : ""}
        <input
          {...register(id, {
            required,
          })}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cn(
            input2Styling,
            fieldValue.length
              ? "ring-2 ring-green-400 bg-white"
              : "bg-slate-100 focus-visible:ring-2 focus-visible:ring-green-400",
            isRequirementsMatched === false &&
              fieldValue.length &&
              "ring-2 ring-red-500",
            error && "focus-visible:ring-red-500 ring-red-500 ring-2",
            showPassNotMatchingError &&
              "focus-visible:ring-red-500 ring-red-500 ring-2",
            isLoading || disabled ? "ring-opacity-30" : ""
          )}
        />
      </div>

      {showPassNotMatchingError && (
        <p className="text-red-500 text-xs font-text font-semibold">
          Passwords does not match
        </p>
      )}
    </div>
  );
};
