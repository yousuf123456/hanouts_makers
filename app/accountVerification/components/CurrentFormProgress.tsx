import { sellerAccountVerificationSteps } from "@/app/constants/seller";
import { SellerAccountVerificationStepsType } from "@/app/types";
import { cn } from "@/lib/utils";
import { Progress } from "@nextui-org/react";
import { PhoneCall } from "lucide-react";
import React from "react";

interface CurrentFormProgressProps {
  currentStep: SellerAccountVerificationStepsType;
  label: string;
}

export const CurrentFormProgress: React.FC<CurrentFormProgressProps> = ({
  currentStep,
  label,
}) => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8 px-80">
        <ul>
          {sellerAccountVerificationSteps.map((step, i) => (
            <li key={i} className=" inline-block">
              <div className="mr-16 flex items-center gap-2 ">
                <div
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-black opacity-50",
                    currentStep === step && "bg-themeBlue"
                  )}
                />

                <p
                  className={cn(
                    "text-base font-semibold text-black opacity-60",
                    currentStep === step && "text-themeBlue"
                  )}
                >
                  {step}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col">
          <h3 className="font-sans text-2xl font-semibold text-black">
            {currentStep}
          </h3>

          <p className="text-sm font-medium text-slate-600">{label}</p>
        </div>
      </div>

      <Progress
        size="sm"
        color="success"
        value={
          ((sellerAccountVerificationSteps.indexOf(currentStep) + 1) / 3) * 100
        }
      />
    </div>
  );
};
