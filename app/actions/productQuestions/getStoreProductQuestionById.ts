import prisma from "@/app/_libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";
import { ProductQuestionsType } from "@/app/dashboard/questions/components/UserQuestions";
import {
  QUESTIONS_PRODUCT_PER_PAGE,
  RatingAndReviewBucketCount,
} from "@/app/constants/consts";

export function calculatePaginationInfo(
  pageNumber: number,
  ITEMS_PER_PAGE: number,
  ITEMS_PER_BUCKET_COUNT: number
) {
  const reviewsPerBucketCount = ITEMS_PER_BUCKET_COUNT;

  const bucketsToSkip = Math.floor(
    ((pageNumber - 1) * ITEMS_PER_PAGE) / reviewsPerBucketCount
  );

  const pageIndex = (pageNumber - 1) % (reviewsPerBucketCount / ITEMS_PER_PAGE);
  const startReviewIndex = pageIndex * ITEMS_PER_PAGE;
  const endReviewIndex = startReviewIndex + ITEMS_PER_PAGE;

  return {
    bucketsToSkip,
    splicingIndices: [startReviewIndex, endReviewIndex], // Adjusting end index to match array indices
  };
}

export const getStoreProductQuestionsById = async (
  productId: string,
  page: number
) => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (!currentVendor?.store?.id) return null;

  const { bucketsToSkip, splicingIndices } = calculatePaginationInfo(
    page,
    QUESTIONS_PRODUCT_PER_PAGE,
    RatingAndReviewBucketCount
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
        questions: {
          $slice: ["$questions", splicingIndices[0], splicingIndices[1]],
        },
      },
    },
  ] as any;

  const productQuestions = (await prisma.questionsBucket.aggregateRaw({
    pipeline,
  })) as unknown as ProductQuestionsType[];

  if (!productQuestions[0]) return null;

  const questionsCount = (
    await prisma.product.findUnique({
      where: { id: productId },
      select: { questionsCount: true },
    })
  )?.questionsCount;

  if (questionsCount === undefined) return null;

  productQuestions[0].totalQuestionsCount = questionsCount;

  return productQuestions;
};
