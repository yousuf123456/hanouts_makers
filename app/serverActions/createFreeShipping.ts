"use server";
import prisma from "../_libs/prismadb";
import { FieldValues } from "react-hook-form";
import { getSSRSession } from "../utils/withSession";
import { getCurrentVendor } from "../actions/getCurrentVendor";

export const createFreeShipping = async (params: {
  data: FieldValues;
  isEditing: boolean;
  freeShippingId: string;
}) => {
  try {
    const { data, isEditing, freeShippingId } = params;

    const { session } = await getSSRSession();
    if (!session) return "Unauthorized";

    const currentVendor = await getCurrentVendor({
      getStore: true,
      userSTId: session.getUserId(),
    });

    if (!currentVendor) return "Vendor Data Not Found";

    data.startingDate = { $date: data.startingDate as any };
    data.endingDate = { $date: data.endingDate as any };
    data.createdAt = { $date: data.createdAt as any };

    if (isEditing) {
      await prisma.$runCommandRaw({
        findAndModify: "PromoToolsBucket",
        query: {
          freeShipping: { $elemMatch: { _id: { $oid: freeShippingId } } },
        },
        update: {
          $set: { "freeShipping.$": data },
        },
      });

      return "Succesfully updated free shipping data";
    }

    const createdFreeShipping = await prisma.$runCommandRaw({
      findAndModify: "PromoToolsBucket",
      query: {
        storeId: { $oid: currentVendor?.store?.id },
        freeShippingCount: { $lt: 50 },
      },
      update: {
        $push: {
          freeShipping: data,
        },

        $inc: {
          freeShippingCount: 1,
        },

        $setOnInsert: {
          bundles: [],
          vouchers: [],
          bundlesCount: 0,
          vouchersCount: 0,
          storeId: { $oid: currentVendor?.store?.id },
        },
      },
      upsert: true,
    });

    return createFreeShipping;
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
