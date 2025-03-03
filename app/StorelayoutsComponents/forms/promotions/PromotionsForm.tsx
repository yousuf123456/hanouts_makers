import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { FormActions } from "../FormActions";
import { HideModuleHeadingFields } from "../HideModuleHeadingFields";
import { InputHeading } from "@/app/_components/InputHeading";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddVoucher } from "@/app/_components/AddVoucher";
import toast from "react-hot-toast";

interface PromotionsFormProps {
  initialData: {
    [key: string]: any;
  };
  componentName: string;
  onEditLayoutFormSubmit: (componentName: string, data: FieldValues) => void;
}

export default function PromotionsForm({
  initialData,
  componentName,
  onEditLayoutFormSubmit,
}: PromotionsFormProps) {
  const { register, setValue, handleSubmit, control, watch } =
    useForm<FieldValues>({
      defaultValues: {
        voucherSelection: "automatic",
        withoutModuleHeading: !!initialData.withoutModuleHeading,
        ...(initialData || {}),
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onEditLayoutFormSubmit(componentName, data);
  };

  const voucherSelection = watch("voucherSelection");

  const voucherId = watch("voucherId");

  const onAddVoucher = (ids: string[], bucketId: string) => {
    if (!ids || ids.length === 0 || !bucketId)
      return toast.error("Something goes wrong");

    console.log(ids, bucketId);
    setValue("voucherId", ids[0]);
    setValue("bucketId", bucketId);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <InputHeading>Voucher Selection</InputHeading>
          <Controller
            control={control}
            name="voucherSelection"
            render={({ field }) => (
              <RadioGroup
                {...field}
                defaultValue={"automatic"}
                className="flex items-center gap-16"
                onValueChange={(val) => field.onChange(val)}
              >
                <div className="flex items-center gap-3">
                  <InputHeading>Automatic</InputHeading>
                  <RadioGroupItem value="automatic" id="r3" />
                </div>

                <div className="flex items-center gap-3">
                  <InputHeading>Manual</InputHeading>
                  <RadioGroupItem value="manual" id="r3" />
                </div>
              </RadioGroup>
            )}
          />

          <div className="flex flex-col gap-0">
            {voucherSelection === "automatic" ? (
              <p className="font-roboto text-sm text-themeBlue">
                The system will automatically select the most recent voucher of
                your store
              </p>
            ) : (
              <AddVoucher
                maxSelections={1}
                onAddVoucher={onAddVoucher}
                selectedVouchers={voucherId ? [voucherId] : []}
              />
            )}
          </div>
        </div>

        {!initialData.withoutModuleHeading && (
          <HideModuleHeadingFields register={register} control={control} />
        )}

        <FormActions />
      </div>
    </form>
  );
}
