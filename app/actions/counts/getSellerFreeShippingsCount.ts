import prisma from "@/app/_libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getSellerFreeShippingsCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });
  if (!currentVendor) return 0;

  const pipeline = [
    {
      $match: {
        storeId: { $oid: currentVendor.store?.id },
      },
    },

    {
      $group: {
        _id: null,
        total: {
          $sum: "$freeShippingCount",
        },
      },
    },
  ];

  const countData = await prisma.promoToolsBucket.aggregateRaw({
    pipeline: pipeline,
  });

  if (!countData) return 0;

  return countData.total;
};
