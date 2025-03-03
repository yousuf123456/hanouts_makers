import prisma from "@/app/_libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

import {
  PRODUCTS_REVIEWS_PER_PAGE,
  QuestionsBucketCount,
} from "@/app/constants/consts";

import { ProductReviewsType } from "@/app/dashboard/reviews/components/CustomerReviews";
import { calculatePaginationInfo } from "../productQuestions/getStoreProductQuestionById";

interface Params {
  page: number;
  productId: string;
}

export const getStoreProductReviewsById = async (params: Params) => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (!currentVendor?.store?.id) return null;

  const { page, productId } = params;

  const { bucketsToSkip, splicingIndices } = calculatePaginationInfo(
    page,
    PRODUCTS_REVIEWS_PER_PAGE,
    QuestionsBucketCount
  );

  let pipeline = [
    {
      $match: {
        storeId: { $oid: currentVendor.store.id },
        productId: { $oid: productId },
      },
    },
    {
      $skip: bucketsToSkip,
    },
    {
      $limit: 1,
    },
    {
      $project: {
        productId: 1,
        bucketId: "$_id",
        productInformation: 1,
        ratingAndReviews: {
          $slice: ["$ratingAndReviews", splicingIndices[0], splicingIndices[1]],
        },
      },
    },
  ] as any;

  const productReviewsData = (await prisma.ratingAndReviewBucket.aggregateRaw({
    pipeline,
  })) as unknown as ProductReviewsType[];

  if (!productReviewsData[0]) return null;

  const reviewsCount = (
    await prisma.product.findUnique({
      where: { id: productId },
      select: { ratingsCount: true },
    })
  )?.ratingsCount;

  if (reviewsCount === undefined) return null;

  productReviewsData[0].totalReviewsCount = reviewsCount;

  return productReviewsData;
};
