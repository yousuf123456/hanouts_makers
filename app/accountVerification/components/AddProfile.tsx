import { Input2 } from "@/app/sharedComponents/Input2";
import { LoadingButton } from "@/app/sharedComponents/LoadingButton";
import { Button } from "@/components/ui/button";

import React from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { HiChevronRight } from "react-icons/hi";

interface AddProfileProps {
  isLoading: boolean;
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
  goOnNextStep: () => void;
}

export const AddProfile: React.FC<AddProfileProps> = ({
  watch,
  isLoading,
  register,
  goOnNextStep,
}) => {
  return (
    <div className="flex w-full flex-col gap-8">
      <Input2
        type="text"
        watch={watch}
        id="storeName"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Store Name"
        register={register}
        placeholder="Enter Store Name"
      />

      <Input2
        id="email"
        type="text"
        watch={watch}
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Email"
        register={register}
        placeholder="Enter Your Email"
      />

      <Input2
        type="text"
        watch={watch}
        id="phone"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Mobile Number"
        register={register}
        placeholder="Enter Mobile Number"
      />

      <LoadingButton
        isLoading={isLoading}
        className="gap-2 bg-themeBlue hover:bg-blue-600"
        onClick={goOnNextStep}
      >
        Next
        <HiChevronRight className="h-5 w-5 text-white" />
      </LoadingButton>
    </div>
  );
};
