import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

import React from "react";

interface VoucherCardProps {
  templateId?: string;
  isTemplate?: boolean;
  endingDate: Date | undefined;
  valueOff: number | undefined;
  startingDate: Date | undefined;
  minOrderValue: number | undefined;
  discountType: "Money Value Voucher" | "Percentage Value Voucher";
}

export const VoucherCard: React.FC<VoucherCardProps> = ({
  valueOff,
  endingDate,
  isTemplate,
  templateId,
  startingDate,
  discountType,
  minOrderValue,
}) => {
  return (
    <div className="relative w-full h-full rounded-md bg-gradient-to-br from-purple-600 to-sky-400">
      {/* <div className="absolute left-0 top-1/2 w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" /> */}
      <div className="absolute h-full top-0 right-0 translate-x-1/2 justify-evenly flex flex-col gap-2">
        <div className="w-5 h-5 bg-white rounded-full " />
        <div className="w-5 h-5 bg-white rounded-full " />
        <div className="w-5 h-5 bg-white rounded-full " />
        <div className="w-5 h-5 bg-white rounded-full " />
      </div>

      <div className="w-full h-full flex justify-center items-center gap-3">
        <div className="p-4 h-full flex flex-col justify-between items-center">
          <div className="flex flex-col items-center gap-0">
            <h2 className=" text-lg font-semibold text-white font-text">
              {(valueOff || "Discount Value") +
                (discountType === "Money Value Voucher" ? " PKR" : " %") +
                " (Off)"}
            </h2>

            <p className="text-white font-roboto">
              Min Spend PKR. {minOrderValue}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs text-white font-roboto">Valid Till:</p>
            {startingDate && endingDate && (
              <p className="text-xs text-white font-roboto">
                {format(new Date(startingDate), " dd MMM yyyy")} -
                {format(new Date(endingDate), " dd MMM yyyy")}
              </p>
            )}
          </div>
        </div>

        {isTemplate && (
          <Link
            href={`/dashboard/sellerVouchers/details?templateId=${templateId}`}
          >
            <Button size={"sm"} className="bg-white text-black hover:bg-white">
              Try Now
            </Button>
          </Link>
        )}
      </div>

      <div className="absolute h-full top-0 left-0 -translate-x-1/2 justify-evenly flex flex-col gap-2">
        <div className="w-5 h-5 bg-white rounded-full " />
        <div className="w-5 h-5 bg-white rounded-full " />
        <div className="w-5 h-5 bg-white rounded-full " />
        <div className="w-5 h-5 bg-white rounded-full " />
      </div>
      {/* <div className="absolute right-0 top-1/2 w-8 h-8 bg-white rounded-full translate-x-1/2 -translate-y-1/2" /> */}
    </div>
  );
};
