import prisma from "../../libs/prismadb";

import { NextRequest, NextResponse } from "next/server";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { getPaginationQueries } from "../getVendorProducts/route";

export async function POST(req: NextRequest) {
  try {
    const currentVendor = await getCurrentVendor({ getStore: true });

    if (!currentVendor) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { pageSize, pageNumber, cursor, goingNext, serverSort, tieBreaker } =
      await req.json();

    const pipeline = [
      {
        $match: {
          storeId: { $oid: currentVendor.store?.id },
        },
      },

      {
        $limit: pageSize,
      },

      {
        $project: {
          review: 1,
          rating: 1,
          productId: 1,
          createdAt: 1,
          orderedProductId: 1,
          sellerResponse: 1,
          sellerReview: 1,
        },
      },
    ] as any;

    const paginationQueries = getPaginationQueries({
      cursor,
      goingNext,
      serverSort,
      tieBreaker,
    });

    pipeline[0] = {
      $match: {
        ...pipeline[0].$match,
        ...(paginationQueries.matchQueries
          ? { ...paginationQueries.matchQueries }
          : {}),
      },
    };

    if (paginationQueries.initialSortStage)
      pipeline.unshift(paginationQueries.initialSortStage);
    if (paginationQueries.finalSortStage)
      pipeline.push(paginationQueries.finalSortStage);

    const vendorReviews = await prisma.ratingAndReview.aggregateRaw({
      pipeline: pipeline,
    });

    return NextResponse.json(vendorReviews);
  } catch (e) {
    console.log(e);
    return new NextResponse("Error", { status: 500 });
  }
}
