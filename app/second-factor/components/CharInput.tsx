import { cn } from "@/app/utils/cn";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormWatch,
} from "react-hook-form";

interface CharInputProps {
  setFocus: UseFormSetFocus<FieldValues>;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  required?: boolean;
  id: string;
}

export const CharInput: React.FC<CharInputProps> = ({
  id,
  watch,
  register,
  required,
  setFocus,
}) => {
  const value = watch(id);

  useEffect(() => {
    if (value) {
      // Go on next input
      const currentInputNumber = parseInt(id[id.length - 1]);
      console.log("Hello", currentInputNumber);
      if (currentInputNumber === 6) return;

      setFocus(`char${currentInputNumber + 1}`);
    }
  }, [value]);

  return (
    <Input
      maxLength={1}
      {...register(id, { required })}
      className={cn(
        "flex w-10 items-center justify-center text-center text-lg transition-all focus-visible:bg-transparent",
        value
          ? "ring-blue bg-transparent ring-[1.5px] ring-sky-400 ring-offset-[1.5px]"
          : "border-slate-300 bg-slate-200",
      )}
    />
  );
};
