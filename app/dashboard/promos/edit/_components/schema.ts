import { z } from "zod";
export const voucherFormSchema = z.object({
  voucherName: z.string().min(2, {
    message: "Voucher name must be at least 2 characters.",
  }),
  minOrderValue: z.number().min(0, {
    message: "Minimum order value must be a positive number.",
  }),
  totalVouchers: z.number().int().min(1, {
    message: "Total vouchers must be at least 1.",
  }),
  discountOffValue: z.number().min(0, {
    message: "Discount off value must be a positive number.",
  }),
  endingDate: z.date(),
  startingDate: z.date(),
  maximumDiscountValue: z
    .number()
    .min(0, {
      message: "Maximum discount value must be a positive number.",
    })
    .optional(),
  applicableOn: z.enum(["EntireStore", "SpecificProducts"]),
  discountType: z.enum(["MoneyValue", "PercentageValue"]),
  productIds: z.array(z.string()).default([]),
});

export const freeShippingFormSchema = z.object({
  promotionName: z.string().min(2, {
    message: "Promotion name must be at least 2 characters.",
  }),
  minOrderValue: z.number().min(0, {
    message: "Minimum order value must be a positive number.",
  }),
  startingDate: z.date(),
  endingDate: z.date(),
  applicableOn: z.enum(["EntireStore", "SpecificProducts"]),
  condition: z.enum(["NoCondition", "MinOrderValue"]),
  productIds: z.array(z.string()).default([]),
});
