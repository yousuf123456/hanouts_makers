"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { VoucherType } from "@/app/types";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy } from "lucide-react";

interface VoucherProps {
  voucher?: VoucherType;
}

export default function Voucher({ voucher }: VoucherProps) {
  const [copied, setCopied] = useState(false);

  const sideCylindersCs =
    "absolute top-0 h-8 w-8 -translate-y-1/2 rounded-full bg-white";

  const isDiscountOff = voucher?.discountType === "Percentage Value";

  const discountLabel = isDiscountOff
    ? `${voucher.discountOffValue} % Off On Min Spend ${voucher.minOrderValue} Rupees`
    : `${voucher?.discountOffValue} Rs Off On Min Spend ${voucher?.minOrderValue} Rupees`;

  const defaultLabel = "250 Rs Off On Min Spend 1250 Rupees";

  const startingDate = voucher?.startingDate || new Date();
  const endingDate = voucher?.endingDate || new Date();

  const vouchersLeft = voucher?.totalVouchers || 100;

  return (
    <div className="flex w-full justify-center ">
      <div className="grid min-h-[180px] w-full max-w-2xl">
        <div className="h-full rounded-t-md bg-blue-400 px-4 py-2">
          <div className="flex h-full flex-col justify-between gap-2">
            <h2 className="font-text text-lg font-semibold text-white @[440px]:text-xl @md:text-2xl">
              {voucher ? discountLabel : defaultLabel}
            </h2>

            <div className="flex justify-between">
              <div className="flex flex-col gap-0">
                <h4 className="font-roboto text-[15px] leading-5 text-black @md:text-base">
                  Valid From:
                </h4>
                <h4 className="font-roboto text-sm leading-5 text-black @[440px]:text-[15px] @md:text-base">
                  {format(startingDate, "yyyy-M-d") +
                    " / " +
                    format(endingDate, "yyyy-M-d")}
                </h4>
              </div>

              <h4 className="font-roboto text-sm leading-5 text-black @[440px]:text-[15px] @md:text-base">
                {vouchersLeft} Remaining
              </h4>
            </div>
          </div>
        </div>

        <div className="relative h-full rounded-b-md bg-blue-600">
          <div className={cn(sideCylindersCs, "left-0 -translate-x-1/2")} />
          <div className="absolute left-0 top-0 h-[1px] w-full -translate-y-1/2 border-[1.5px] border-dashed border-white bg-transparent" />
          <div className={cn(sideCylindersCs, "right-0 translate-x-1/2")} />

          <div className="flex h-full items-center justify-between px-4 py-2">
            <p className="font-text text-[15px] font-semibold leading-5 text-white @[440px]:text-base">
              Code : {voucher?.voucherCode || " HURRY_UP"}
            </p>

            <div className="flex items-center gap-2">
              {copied && (
                <p className="font-roboto text-sm text-white">Copied</p>
              )}

              <CopyToClipboard
                text={voucher?.voucherCode || "HURRY_UP"}
                onCopy={() => setCopied(true)}
              >
                <Copy className="h-4 w-4 cursor-pointer text-white opacity-90 transition-opacity @[440px]:h-5 @[440px]:w-5 hover:opacity-100" />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
