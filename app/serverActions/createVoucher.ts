"use server";

import prisma from "../_libs/prismadb";
import { VoucherType } from "../types";
import { getCurrentVendor } from "../actions/getCurrentVendor";
import { getSSRSession } from "../utils/withSession";

export const CreateVoucher = async (params: {
  data: VoucherType;
  voucherId?: string;
  isEditingVoucher: boolean;
}) => {
  try {
    const { data, isEditingVoucher, voucherId } = params;

    const { session } = await getSSRSession();
    if (!session) return "Unauthorized";

    const currentVendor = await getCurrentVendor({
      getStore: true,
      userSTId: session.getUserId(),
    });

    if (!currentVendor) return "Vendor Data Not Found";

    data.collectStartDate = { $date: data.collectStartDate as any };
    data.startingDate = { $date: data.startingDate as any };
    data.endingDate = { $date: data.endingDate as any };
    data.createdAt = { $date: data.createdAt as any };

    if (isEditingVoucher) {
      await prisma.$runCommandRaw({
        findAndModify: "PromoToolsBucket",
        query: {
          vouchers: { $elemMatch: { _id: { $oid: voucherId } } },
        },
        update: {
          $set: { "vouchers.$": data },
        },
      });

      return "Updated voucher's data succesfully";
    }

    const createdVoucher = await prisma.$runCommandRaw({
      findAndModify: "PromoToolsBucket",
      query: {
        storeId: { $oid: currentVendor?.store?.id },
        vouchersCount: { $lt: 50 },
      },
      update: {
        $push: {
          vouchers: { ...data, storeId: currentVendor?.store?.id },
        },

        $inc: {
          vouchersCount: 1,
        },

        $setOnInsert: {
          bundles: [],
          bundlesCount: 0,
          freeShipping: [],
          freeShippingCount: 0,
          storeId: { $oid: currentVendor?.store?.id },
        },
      },
      upsert: true,
    });

    return "Succesfully Created";
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
