"use client";

import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { freeShippingFormSchema } from "./schema";
import { createPromo } from "../_serverActions/createPromo";
import { FreeShipping } from "@prisma/client";
import { usePending } from "@/app/_hooks";
import { toast } from "sonner";
import DateFormField from "./DateFormField";
import { InputFormField } from "./InputFormField";
import { SelectFormField } from "./SelectFormField";
import { Loader2 } from "lucide-react";

export default function FreeShippingForm({
  freeShippingId,
  freeShipping,
  bucketId,
}: {
  freeShipping: FreeShipping | undefined;
  freeShippingId: string | undefined;
  bucketId: string | undefined;
}) {
  const form = useForm<z.infer<typeof freeShippingFormSchema>>({
    resolver: zodResolver(freeShippingFormSchema),
    defaultValues: {
      productIds: [],
      promotionName: "",
      minOrderValue: 0,
      condition: "NoCondition",
      applicableOn: "EntireStore",
      ...freeShipping,
      ...(freeShipping
        ? {
            startingDate: new Date(freeShipping.startingDate),
            endingDate: new Date(freeShipping.endingDate),
          }
        : {}),
    },
  });

  const { isPending, startAction, endAction } = usePending();

  async function onSubmit(values: z.infer<typeof freeShippingFormSchema>) {
    startAction();

    const res = await createPromo({
      promo: values,
      type: "freeShipping",
      bucketId,
      freeShippingId,
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
          className="space-y-8 w-full max-w-4xl"
        >
          <InputFormField
            name="promotionName"
            label="Promotion Name"
            control={form.control}
            placeholder="Enter promotion name"
          />

          <InputFormField
            type="number"
            placeholder="0"
            name="minOrderValue"
            control={form.control}
            label="Minimum Order Value"
            onChange={(e) => +e.target.value}
          />

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
              name="condition"
              label="Condition"
              control={form.control}
              placeholder="Select condition"
              selectItems={[
                {
                  value: "NoCondition",
                  label: "No Condition",
                },
                {
                  value: "MinOrderValue",
                  label: "Minimum Order Value",
                },
              ]}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full h-11">
            {freeShipping ? "Edit Free Shipping" : "Create Free Shipping"}
            {isPending && <Loader2 className="w-4 ml-1 h-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
