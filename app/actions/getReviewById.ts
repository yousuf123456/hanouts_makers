import prisma from "../_libs/prismadb";

export const getReviewById = async (bucketId: string, reviewId: string) => {
  const pipeline: any = [
    {
      $match: {
        _id: { $oid: bucketId },
      },
    },
    {
      $project: {
        ratingAndReviews: {
          $filter: {
            input: "$ratingAndReviews",
            as: "ratingAndReview",
            cond: {
              $eq: ["$$ratingAndReview._id", { $oid: reviewId }],
            },
          },
        },
      },
    },
  ];

  const review = (await prisma.ratingAndReviewBucket.aggregateRaw({
    pipeline: pipeline,
  })) as any;

  const productReview = review[0]?.ratingAndReviews[0];

  if (!productReview) return null;

  productReview.bucketId = review[0]._id.$oid;

  return productReview;
};
