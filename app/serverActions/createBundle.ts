"use server";

import prisma from "../_libs/prismadb";
import { FieldValues } from "react-hook-form";
import { getSSRSession } from "../utils/withSession";
import { getCurrentVendor } from "../actions/getCurrentVendor";

export const createBundle = async (params: {
  data: FieldValues;
  isEditing: boolean;
  bundleId: string;
}) => {
  try {
    const { isEditing, bundleId, data } = params;

    const session = await getSSRSession();
    if (!session.session) return "Unauthorized";

    const currentVendor = await getCurrentVendor({
      userSTId: session.session.getUserId(),
      getStore: true,
    });

    if (!currentVendor) return "Could Not Find Vendors Data";

    data.startingDate = { $date: data.startingDate as any };
    data.endingDate = { $date: data.endingDate as any };
    data.createdAt = { $date: data.createdAt as any };

    if (isEditing) {
      await prisma.$runCommandRaw({
        findAndModify: "PromoToolsBucket",
        query: {
          bundles: { $elemMatch: { _id: { $oid: bundleId } } },
        },
        update: {
          $set: { "bundles.$": data },
        },
      });

      return "Succesfully updated bundle data";
    }

    const createdBundle = await prisma.$runCommandRaw({
      findAndModify: "PromoToolsBucket",
      query: {
        storeId: { $oid: currentVendor?.store?.id },
        bundlesCount: { $lt: 50 },
      },
      update: {
        $push: {
          bundles: data,
        },

        $inc: {
          bundlesCount: 1,
        },

        $setOnInsert: {
          vouchers: [],

          vouchersCount: 0,
          freeShipping: [],
          freeShippingCount: 0,
          storeId: { $oid: currentVendor?.store?.id },
        },
      },
      upsert: true,
    });

    return createdBundle;
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
