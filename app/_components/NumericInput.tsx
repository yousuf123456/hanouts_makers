import React from "react";
import { InputContainer } from "./InputContainer";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/app/utils/cn";

interface NumericInputProps {
  id: string;
  type?: string;
  heading?: string;
  hidden?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  valueLabel?: string;
  onClick?: () => void;
  placeholder?: string;
  takeCurrency?: boolean;
  onChange?: () => void;
  withoutValueLabel?: boolean;
  onFocus?: (params: any) => void;
  register: UseFormRegister<FieldValues>;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  id,
  hidden,
  onClick,
  readOnly,
  required,
  disabled,
  onFocus,
  register,
  className,
  valueLabel,
  placeholder,
  withoutValueLabel,
}) => {
  return (
    <div className="flex w-full gap-0">
      {!withoutValueLabel && (
        <div className="bg-slate-200 rounded-l-md border-r-0 border-[1px] border-slate-300 h-10 px-3 flex justify-center items-center">
          <p className="text-sm text-slate-500 font-text">
            {valueLabel || "PKR"}
          </p>
        </div>
      )}

      <Input
        type="number"
        hidden={hidden}
        onFocus={onFocus}
        onClick={onClick}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        defaultValue={"Hello"}
        placeholder={placeholder}
        {...register(id, {
          required: required,
          valueAsNumber: true,
        })}
        className={cn(
          "border-slate-300",
          !withoutValueLabel && "rounded-l-none",
          className
        )}
      />
    </div>
  );
};
