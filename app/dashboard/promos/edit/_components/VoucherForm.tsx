"use client";
import React from "react";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { voucherFormSchema } from "./schema";
import { createPromo } from "../_serverActions/createPromo";
import { Voucher } from "@prisma/client";
import { usePending } from "@/app/_hooks";
import { toast } from "sonner";
import { InputFormField } from "./InputFormField";
import DateFormField from "./DateFormField";
import { SelectFormField } from "./SelectFormField";

export const VoucherForm = ({
  voucherId,
  bucketId,
  voucher,
}: {
  voucherId: string | undefined;
  bucketId: string | undefined;
  voucher: Voucher | undefined;
}) => {
  const form = useForm<z.infer<typeof voucherFormSchema>>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      productIds: [],
      voucherName: "",
      minOrderValue: 0,
      totalVouchers: 1,
      discountOffValue: 0,
      discountType: "MoneyValue",
      applicableOn: "EntireStore",
      maximumDiscountValue: undefined,
      ...voucher,
      ...(voucher
        ? {
            startingDate: new Date(voucher.startingDate),
            endingDate: new Date(voucher.endingDate),
          }
        : {}),
    },
  });

  const { isPending, startAction, endAction } = usePending();

  async function onSubmit(values: z.infer<typeof voucherFormSchema>) {
    startAction();

    const res = await createPromo({
      type: "voucher",
      promo: values,
      bucketId,
      voucherId,
    });

    if (res.success) toast.success(res.message);
    else toast.error(res.message);

    endAction();
    form.reset();
  }

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-4xl rounded-lg"
        >
          <InputFormField
            name="voucherName"
            label="Voucher Name"
            control={form.control}
            placeholder="Enter Voucher Name"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputFormField
              type="number"
              placeholder="0"
              name="minOrderValue"
              control={form.control}
              label="Min Order Value"
              onChange={(e) => +e.target.value}
            />

            <InputFormField
              type="number"
              placeholder="1"
              name="totalVouchers"
              control={form.control}
              label="Total Vouchers"
              onChange={(e) => +e.target.value}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputFormField
              type="number"
              placeholder="0"
              name="discountOffValue"
              control={form.control}
              label="Discount Off Value"
              onChange={(e) => +e.target.value}
            />

            <InputFormField
              type="number"
              placeholder="0"
              control={form.control}
              name="maximumDiscountValue"
              label="Maximum Discount Value (Optional)"
              onChange={(e) => (e.target.value ? +e.target.value : undefined)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DateFormField
              control={form.control}
              name="startingDate"
              label="Starting Date"
            />

            <DateFormField
              control={form.control}
              name="endingDate"
              label="Ending Date"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectFormField
              name="applicableOn"
              label="Applicable On"
              control={form.control}
              placeholder="Select where voucher is applicable"
              selectItems={[
                {
                  value: "EntireStore",
                  label: "Entire Store",
                },
                {
                  value: "SpecificProducts",
                  label: "Specific Products",
                },
              ]}
            />

            <SelectFormField
              name="discountType"
              label="Discount Type"
              control={form.control}
              placeholder="Select discount type"
              selectItems={[
                {
                  value: "MoneyValue",
                  label: "Money Value",
                },
                {
                  value: "PercentageValue",
                  label: "Percentage Value",
                },
              ]}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full h-11">
            {voucher ? "Edit Voucher" : "Create Voucher"}{" "}
            {isPending && <Loader2 className="w-4 ml-1 h-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};
