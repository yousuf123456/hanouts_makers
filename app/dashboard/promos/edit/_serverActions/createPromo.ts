"use server";

import prisma from "@/app/_libs/prismadb";

import { ActionResult } from "@/app/types";
import { z } from "zod";
import { userAuthentication } from "@/app/_serverFn/userAuthentication";

import {
  voucherFormSchema,
  freeShippingFormSchema,
} from "../_components/schema";
import { PROMOS_PER_BUCKET } from "@/app/_config/pagination";
import ObjectID from "bson-objectid";

type Parameters =
  | {
      type: "voucher";
      bucketId: string | undefined;
      voucherId: string | undefined;
      promo: z.infer<typeof voucherFormSchema>;
    }
  | {
      type: "freeShipping";
      bucketId: string | undefined;
      freeShippingId: string | undefined;
      promo: z.infer<typeof freeShippingFormSchema>;
    };

export const createPromo = async (
  promoData: Parameters
): Promise<ActionResult> => {
  try {
    const { vendorStoreId, isUserAuthenticated } = await userAuthentication();

    if (!isUserAuthenticated)
      return { success: false, message: "Unauthenticated User" };

    const { type, promo } = promoData;

    if (type === "voucher") {
      if (voucherFormSchema.safeParse(promo).success === false) {
        return {
          success: false,
          message: "Invalid Voucher Data",
        };
      }
    }

    if (type === "freeShipping") {
      if (!freeShippingFormSchema.safeParse(promo).success) {
        return {
          success: false,
          message: "Invalid Free Shipping Data",
        };
      }
    }

    const isEditing =
      (type === "voucher" && promoData.voucherId && promoData.bucketId) ||
      (type === "freeShipping" &&
        promoData.bucketId &&
        promoData.freeShippingId);

    if (isEditing) {
      const promoFieldsToUpdate = Object.keys(promo).reduce((acc, key) => {
        if (key === "startingDate" || key === "endingDate") {
          // Date is converted into string as a result of serializing the data when being passed from client to server,
          // So it needs to be put in {$date: value} so it gets stored as DATE not STRING
          acc[
            type === "voucher" ? `vouchers.$.${key}` : `freeShipping.$.${key}`
          ] = {
            $date: promo[key as "endingDate" | "startingDate"].toISOString(),
          };
        } else
          acc[
            type === "voucher" ? `vouchers.$.${key}` : `freeShipping.$.${key}`
          ] = promo[key as keyof typeof promo];

        return acc;
      }, {} as { [key: string]: any });

      await prisma.$runCommandRaw({
        findAndModify: "PromoToolsBucket",
        query: {
          _id: { $oid: promoData.bucketId },
          [type === "voucher" ? "vouchers" : "freeShipping"]: {
            $elemMatch: {
              id:
                type === "voucher"
                  ? promoData.voucherId
                  : promoData.freeShippingId,
            },
          },
        },
        update: {
          $set: promoFieldsToUpdate,
        },
      });

      return {
        success: true,
        message: `${
          type === "voucher" ? "Voucher" : "FreeShipping"
        } edited succesfully.`,
      };
    }

    // Pushing a new voucher/freeShipping into bucket if it exists or creating a new bucket containing a new voucher/freeShipping
    await prisma.$runCommandRaw({
      findAndModify: "PromoToolsBucket",
      query: {
        storeId: { $oid: vendorStoreId },
        [type === "voucher" ? "vouchersCount" : "freeShippingCount"]: {
          $lt: PROMOS_PER_BUCKET,
        },
      },
      update: {
        $push: {
          [type === "voucher" ? "vouchers" : "freeShipping"]: {
            ...promo,
            ...(type === "voucher"
              ? {
                  collectedBy: [], // Voucher only field
                  vouchersUsed: 0, // Voucher only field
                  updatedAt: { $date: new Date().toISOString() }, // Voucher only field
                }
              : {}),
            id: ObjectID().toHexString(),
            storeId: vendorStoreId,
            createdAt: { $date: new Date().toISOString() },
            endingDate: { $date: promo.endingDate.toISOString() },
            startingDate: { $date: promo.startingDate.toISOString() },
          },
        },
        $inc: {
          [type === "voucher" ? "vouchersCount" : "freeShippingCount"]: 1,
        },
        $setOnInsert: {
          ...(type === "voucher"
            ? { freeShipping: [], freeShippingCount: 0 }
            : {
                vouchers: [],
                vouchersCount: 0,
              }),
          storeId: { $oid: vendorStoreId },
          createdAt: { $date: new Date().toISOString() },
        },
      },
      upsert: true,
    });

    return {
      success: true,
      message: `${
        type === "voucher" ? "Voucher" : "FreeShipping"
      } created succesfully.`,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.log("Error: ", e.stack);
    }

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};
