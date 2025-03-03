import React from "react";
import { InputContainer } from "./InputContainer";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/app/utils/cn";

interface TextInputProps {
  id: string;
  type?: string;
  heading?: string;
  hidden?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  onClick?: () => void;
  placeholder?: string;
  takeCurrency?: boolean;
  onChange?: () => void;
  withoutHeading?: boolean;
  onFocus?: (params: any) => void;
  register: UseFormRegister<FieldValues>;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  type,
  hidden,
  onClick,
  heading,
  readOnly,
  required,
  disabled,
  onFocus,
  onChange,
  register,
  className,
  placeholder,
  takeCurrency,
  withoutHeading,
}) => {
  return (
    <>
      {!takeCurrency && !withoutHeading ? (
        <InputContainer heading={heading || ""}>
          <Input
            type={type}
            hidden={hidden}
            readOnly={readOnly}
            onClick={onClick}
            onFocus={onFocus}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            {...register(id, {
              required: required,
            })}
          />
        </InputContainer>
      ) : takeCurrency ? (
        <div className="flex gap-0">
          <div className="bg-slate-200 rounded-l-md border-r-0 border-[1px] border-slate-300 h-10 px-3 flex justify-center items-center">
            <p className="text-sm text-slate-500 font-text">PKR</p>
          </div>

          <Input
            type={type}
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
            })}
            className={cn("border-slate-300 rounded-l-none", className)}
          />
        </div>
      ) : (
        <Input
          type={type}
          hidden={hidden}
          onFocus={onFocus}
          onClick={onClick}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          {...register(id, {
            required: required,
          })}
          className={cn("border-slate-300", className)}
        />
      )}
    </>
  );
};
