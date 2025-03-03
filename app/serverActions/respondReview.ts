"use server";

import prisma from "../_libs/prismadb";
import { getServerSession } from "../actions/getServerSession";
import { revalidatePath } from "next/cache";
import { routes } from "../constants/routes";

interface Params {
  answer: string;
  bucketId: string;
  reviewId: string;
}

export const respondReview = async (params: Params) => {
  try {
    const session = await getServerSession();

    if (!session) return "Unauthorized";

    const { reviewId, bucketId, answer } = params;

    const updatedReviewBucket = await prisma.$runCommandRaw({
      findAndModify: "RatingAndReviewBucket",
      query: {
        _id: { $oid: bucketId },
        ratingAndReviews: { $elemMatch: { _id: { $oid: reviewId } } },
      },
      update: {
        $set: {
          "ratingAndReviews.$.answer": answer,
          "ratingAndReviews.$.answeredAt": { $date: new Date().toISOString() },
        },
      },
    });

    revalidatePath(routes.manageReviews);

    return "Succesfully Responded To Review";
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
