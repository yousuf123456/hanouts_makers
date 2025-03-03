"use client";

import React, { useState } from "react";
import { CurrentFormProgress } from "./CurrentFormProgress";
import { SellerAccountVerificationStepsType, VendorType } from "@/app/types";
import { AddProfile } from "./AddProfile";
import { FieldValues, useForm } from "react-hook-form";
import { sellerAccountVerificationSteps } from "@/app/constants/seller";
import { AddAddress } from "./AddAddress";
import { VerifyId_Bank } from "./VerifyId_Bank";
import axios from "axios";

function needToUpdateInDataBase(prevData: any, newData: any): boolean {
  return !(JSON.stringify(prevData) === JSON.stringify(newData));
}

interface AccountVerificationFormProps {
  currentVendor: VendorType;
}

export const AccountVerificationForm: React.FC<
  AccountVerificationFormProps
> = ({ currentVendor }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [currentStep, setCurrentStep] =
    useState<SellerAccountVerificationStepsType>("Add Profile");

  const labels = {
    "Add Profile": "First we have to get to know more about you",
    "Add Address": "Enter your address details",
    "Verify Id & Bank":
      "Let us know about your bank information, don’t worry we’ll keep this information confidential",
  };

  const { register, watch, control, getValues } = useForm<FieldValues>({
    defaultValues: {
      storeName: currentVendor?.profile?.storeName || "",
      email: currentVendor?.profile?.email || "",
      phone: currentVendor?.phone || "",
      province: currentVendor?.address?.province || undefined,
      city: currentVendor?.address?.city || undefined,
      area: currentVendor?.address?.area || undefined,
      detailedAddress: currentVendor?.address?.detailedAddress || "",
      idCardName: currentVendor?.Id_BankInfo?.idCardName || "",
      idCardNumber: currentVendor?.Id_BankInfo?.idCardNumber || "",
      accountHolderName: currentVendor?.Id_BankInfo?.accountHolderName || "",
      IBAN: currentVendor?.Id_BankInfo?.IBAN || "",
      bankName: currentVendor?.Id_BankInfo?.bankName || "",
      bankCode: currentVendor?.Id_BankInfo?.bankCode || "",
      branchName: currentVendor?.Id_BankInfo?.branchName || "",
      accountNumber: currentVendor?.Id_BankInfo?.accountNumber || "",
    },
  });

  const goOnNextStep = () => {
    // setIsLoading(true);
    const values = getValues();

    const profile = {
      email: values.email,
      phone: values.phone,
      storeName: values.storeName,
    };
    const address = {
      province: values.province,
      city: values.city,
      area: values.area,
      detailedAddress: values.detailedAddress,
    };
    const Id_BankInfo = {
      idCardName: values.idCardName,
      idCardNumber: values.idCardNumber,
      accountHolderName: values.accountHolderName,
      IBAN: values.IBAN,
      bankName: values.bankName,
      bankCode: values.bankCode,
      branchName: values.branchName,
      accountNumber: values.accountNumber,
    };

    const dataObjectKey =
      currentStep === "Add Profile"
        ? "profile"
        : currentStep === "Add Address"
          ? "address"
          : "Id_BankInfo";

    const dataToSend =
      currentStep === "Add Profile"
        ? profile
        : currentStep === "Add Address"
          ? address
          : Id_BankInfo;

    const needToUpdateData = needToUpdateInDataBase(
      currentVendor[dataObjectKey],
      dataToSend,
    );

    if (!needToUpdateData) {
      if (
        sellerAccountVerificationSteps.indexOf(currentStep) ===
        sellerAccountVerificationSteps.length - 1
      )
        return;
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentStep(
        //@ts-ignore
        sellerAccountVerificationSteps[
          sellerAccountVerificationSteps.indexOf(currentStep) + 1
        ],
      );
    }

    axios
      .post("../../api/fillVendorInfo", { [dataObjectKey]: dataToSend })
      .then(() => {
        if (
          sellerAccountVerificationSteps.indexOf(currentStep) ===
          sellerAccountVerificationSteps.length - 1
        )
          return;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setCurrentStep(
          //@ts-ignore
          sellerAccountVerificationSteps[
            sellerAccountVerificationSteps.indexOf(currentStep) + 1
          ],
        );
      })
      .finally(() => setIsLoading(false));
  };

  const goOnPrevStep = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setCurrentStep(
      //@ts-ignore
      sellerAccountVerificationSteps[
        sellerAccountVerificationSteps.indexOf(currentStep) - 1
      ],
    );
  };

  return (
    <div className="flex flex-col gap-12">
      {
        <CurrentFormProgress
          currentStep={currentStep}
          //@ts-ignore
          label={labels[currentStep]}
        />
      }

      <div className="px-96 pb-28">
        {currentStep === "Add Profile" && (
          <AddProfile
            goOnNextStep={goOnNextStep}
            isLoading={isLoading}
            register={register}
            watch={watch}
          />
        )}

        {currentStep === "Add Address" && (
          <AddAddress
            watch={watch}
            control={control}
            register={register}
            isLoading={isLoading}
            goOnNextStep={goOnNextStep}
            goOnPrevStep={goOnPrevStep}
          />
        )}

        {currentStep === "Verify Id & Bank" && (
          <VerifyId_Bank
            goOnNextStep={goOnNextStep}
            goOnPrevStep={goOnPrevStep}
            isLoading={isLoading}
            register={register}
            watch={watch}
          />
        )}
      </div>
    </div>
  );
};
