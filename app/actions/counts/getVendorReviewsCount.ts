import prisma from "../../libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getVendorReviewsCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (!currentVendor) return null;

  const reviewsCount = await prisma.ratingAndReview.count({
    where: {
      storeId: currentVendor.store?.id,
    },
  });

  return reviewsCount;
};
