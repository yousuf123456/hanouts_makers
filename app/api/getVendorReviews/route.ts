import prisma from "../../_libs/prismadb";

import { NextRequest, NextResponse } from "next/server";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { RatingAndReviewBucketCount } from "@/app/constants/consts";

function calculatePaginationInfo(pageNumber: number, reviewsPerPage: number) {
  const reviewsPerBucketCount = RatingAndReviewBucketCount;

  const bucketsToSkip = Math.floor(
    ((pageNumber - 1) * reviewsPerPage) / reviewsPerBucketCount
  );

  const pageIndex = (pageNumber - 1) % (reviewsPerBucketCount / reviewsPerPage);
  const startReviewIndex = pageIndex * reviewsPerPage;
  const endReviewIndex = startReviewIndex + reviewsPerPage;

  return {
    bucketsToSkip,
    splicingIndices: [startReviewIndex, endReviewIndex], // Adjusting end index to match array indices
  };
}

interface getPaginationPipelineParams {
  pipeline: any;
  isSorting: boolean;
  ITEMS_PER_PAGE: number;
  page: number | undefined;
  serverSort: null | { [key: string]: -1 | 1 };
}

export function getPaginationPipeline(params: getPaginationPipelineParams) {
  const { page, pipeline, isSorting, serverSort, ITEMS_PER_PAGE } = params;

  const { bucketsToSkip, splicingIndices } = calculatePaginationInfo(
    page || 1,
    ITEMS_PER_PAGE
  );

  const serverSortField = serverSort ? Object.keys(serverSort)[0] : null;
  const serverSortValue = serverSort
    ? serverSort[Object.keys(serverSort)[0]]
    : null;

  const unwindedDocsToSkip = ((page || 1) - 1) * ITEMS_PER_PAGE;

  if (isSorting) {
    pipeline.push({ $unwind: "$ratingAndReviews" });
  }

  if (isSorting) {
    pipeline.push({
      $sort: {
        [`ratingAndReviews.${serverSortField}`]: serverSortValue,
      },
    });
  }

  if (bucketsToSkip !== 0 || unwindedDocsToSkip !== 0) {
    if (isSorting) {
      pipeline.push({
        $skip: unwindedDocsToSkip,
      });
    } else {
      pipeline.push({
        $skip: bucketsToSkip,
      });
    }
  }

  if (isSorting) {
    pipeline.push({
      $limit: ITEMS_PER_PAGE,
    });
  } else pipeline.push({ $limit: 1 });

  if (!isSorting) {
    pipeline.push({
      $project: {
        ratingAndReviews: {
          $slice: ["$ratingAndReviews", splicingIndices[0], splicingIndices[1]],
        },
      },
    });
  }

  return pipeline;
}

export async function POST(req: NextRequest) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentVendor = await getCurrentVendor({
      getStore: true,
      userSTId: userSTId,
    });

    if (!currentVendor) {
      return new NextResponse("Vendor Data Not Found", { status: 401 });
    }

    const { pageSize, pageNumber, serverSort } = await req.json();

    console.log(pageNumber, serverSort);
    const pipeline = [
      // {
      //   $match: {
      //     storeId: { $oid: currentVendor.store?.id },
      //   },
      // },
    ] as any;

    const paginatedPipeline = getPaginationPipeline({
      pipeline,
      serverSort,
      // As page number starts from 0
      page: pageNumber + 1,
      isSorting: !!serverSort,
      ITEMS_PER_PAGE: pageSize,
    });

    const vendorReviewsData = (await prisma.ratingAndReviewBucket.aggregateRaw({
      pipeline: paginatedPipeline,
    })) as any;

    const vendorReviews = vendorReviewsData?.flatMap((vendorReviewData: any) =>
      Array.isArray(vendorReviewData.ratingAndReviews)
        ? vendorReviewData.ratingAndReviews
        : [vendorReviewData.ratingAndReviews]
    );

    return NextResponse.json(vendorReviews || []);
  } catch (e) {
    console.log(e);
    return new NextResponse("Error", { status: 500 });
  }
}
