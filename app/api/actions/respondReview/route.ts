import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import prisma from "../../../_libs/prismadb";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { response, isAlreadyResponded, reviewId, bucketId } =
      await req.json();

    if (!response || !reviewId || !bucketId) {
      return new NextResponse("Invalid Data", { status: 403 });
    }

    const currentTime = new Date();

    const updatedReview = await prisma.$runCommandRaw({
      findAndModify: "RatingAndReviewBucket",
      query: {
        _id: { $oid: bucketId },
        ratingAndReviews: { $elemMatch: { _id: { $oid: reviewId } } },
      },
      update: {
        $set: {
          "ratingAndReviews.$.answer": response,
          ...(isAlreadyResponded
            ? {}
            : { "ratingAndReviews.$.isAnswered": true }),
          ...(isAlreadyResponded
            ? { "ratingAndReviews.$.answeredUpdatedAt": currentTime }
            : { "ratingAndReviews.$.answeredAt": currentTime }),
        },
      },
    });

    return NextResponse.json("Responded Successfully");
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
