import prisma from "../../_libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getVendorReviewsCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (!currentVendor?.store) return null;

  const reviewsCountData = (await prisma.ratingAndReviewBucket.aggregateRaw({
    pipeline: [
      {
        $match: {
          storeId: { $oid: currentVendor.store.id },
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: "$count",
          },
        },
      },
    ],
  })) as any;

  return reviewsCountData[0]?.count || 0;
};
