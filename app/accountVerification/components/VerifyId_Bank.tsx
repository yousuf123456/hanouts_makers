import { Button } from "@/components/ui/button";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Upload } from "./Upload";
import { Input2 } from "@/app/sharedComponents/Input2";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { LoadingButton } from "@/app/sharedComponents/LoadingButton";

interface VerifyId_BankProps {
  isLoading: boolean;
  goOnNextStep: () => void;
  goOnPrevStep: () => void;
  watch: UseFormWatch<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

export const VerifyId_Bank: React.FC<VerifyId_BankProps> = ({
  goOnPrevStep,
  goOnNextStep,
  isLoading,
  register,
  watch,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Button className="gap-2" onClick={goOnPrevStep}>
        <HiChevronLeft className="h-5 w-5 text-white" />
        Back
      </Button>

      <div className="flex flex-col gap-4">
        <h3 className="text-base font-medium text-black">
          Verify Your Identity Card
        </h3>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-text text-xs font-semibold text-slate-600">
              Front Side of Id Card
            </p>
            <div className="w-full">
              <Upload label="Click To Upload" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-text text-xs font-semibold text-slate-600">
              Back Side of Id Card
            </p>
            <div className="w-full">
              <Upload label="Click To Upload" />
            </div>
          </div>
        </div>
      </div>

      <Input2
        type="text"
        watch={watch}
        id="idCardName"
        required={true}
        isLoading={isLoading}
        disabled={isLoading}
        label="Name On Id Card"
        register={register}
        placeholder="Enter Name on Id Card"
      />

      <Input2
        type="text"
        watch={watch}
        id="idCardNumber"
        required={true}
        isLoading={isLoading}
        disabled={isLoading}
        label="13 Digit Number On Id Card"
        register={register}
        placeholder="Enter Number on Id Card"
      />

      <h3 className="text-base font-medium text-black">
        Verify Your Bank Account
      </h3>

      <div className="flex flex-col gap-2">
        <p className="font-text text-xs font-semibold text-slate-600">
          Upload the Front Page for Bankbook/Bank Statement/Cheque Copy/Mobile
          Banking Screenshot
        </p>
        <div className="w-full">
          <Upload label="Click To Upload" />
        </div>
      </div>

      <Input2
        type="text"
        watch={watch}
        id="accountHolderName"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Account Holder Name"
        register={register}
        placeholder="Enter Account Holder Name"
      />

      <Input2
        type="text"
        watch={watch}
        id="IBAN"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Should be Alpha numeric, 24 digits field, start with PK"
        register={register}
        placeholder="IBAN (ex:AA00AAAA000000000)"
      />

      <Input2
        type="text"
        watch={watch}
        id="bankName"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Bank Name"
        register={register}
        placeholder="Enter Bank Name"
      />

      <Input2
        type="text"
        watch={watch}
        id="bankCode"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Bank Code"
        register={register}
        placeholder="Enter Bank Code"
      />

      <Input2
        type="text"
        watch={watch}
        id="branchName"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Branch Name"
        register={register}
        placeholder="Enter Branch Name"
      />

      <Input2
        type="text"
        watch={watch}
        id="accountNumber"
        isLoading={isLoading}
        disabled={isLoading}
        required={true}
        label="Account Number"
        register={register}
        placeholder="Enter Account Number"
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
