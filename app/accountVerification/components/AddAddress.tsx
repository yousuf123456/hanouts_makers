import { SelectOptions } from "@/app/sharedComponents/SelectOptions";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import citiesList from "@/app/assets/cities.json";
import { areas, provinces } from "@/app/constants/selectOptions";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/app/sharedComponents/LoadingButton";

interface AddAddressProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
  watch: UseFormWatch<FieldValues>;
  goOnPrevStep: () => void;
  goOnNextStep: () => void;
  isLoading: boolean;
}

export const AddAddress: React.FC<AddAddressProps> = ({
  watch,
  control,
  register,
  isLoading,
  goOnNextStep,
  goOnPrevStep,
}) => {
  const [cities, setCities] = useState<string[]>([]);

  const provinceSelected = watch("province");
  const citySelected = watch("city");

  useEffect(() => {
    if (provinceSelected) {
      if (provinceSelected === "Islamabad") setCities(["Islamabad"]);
      else
        setCities(
          citiesList
            .filter(
              (cityData) =>
                cityData.admin_name.toLowerCase() ===
                provinceSelected.toLowerCase(),
            )
            .map((cityData) => cityData.city),
        );
    }
  }, [provinceSelected]);

  return (
    <div className="flex flex-col gap-8">
      <Button disabled={isLoading} className="gap-2" onClick={goOnPrevStep}>
        <HiChevronLeft className="h-5 w-5 text-white" />
        Back
      </Button>

      <div className="flex w-full flex-col gap-1">
        <p className="font-text text-xs font-semibold text-slate-600">
          Province
        </p>
        <Controller
          control={control}
          name="province"
          render={({ field }) => (
            <SelectOptions
              isLoading={isLoading}
              field={field}
              required={true}
              label="Provinces"
              options={provinces}
              placeHolder="Select A Province"
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <p className="font-text text-xs font-semibold text-slate-600">City</p>
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <SelectOptions
              isLoading={isLoading}
              field={field}
              required={true}
              disabled={!provinceSelected}
              options={cities}
              placeHolder="Select A City"
              label="Cities"
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <p className="font-text text-xs font-semibold text-slate-600">Area</p>
        <Controller
          control={control}
          name="area"
          render={({ field }) => (
            <SelectOptions
              isLoading={isLoading}
              field={field}
              required={true}
              disabled={!citySelected}
              options={areas}
              placeHolder="Select Area"
              label="Areas"
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <p className="font-text text-xs font-semibold text-slate-600">
          Detailed Address
        </p>

        <Textarea
          disabled={isLoading}
          id="detailedAddress"
          placeholder="Type your address in detail"
          {...register("detailedAddress")}
        />
      </div>

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
