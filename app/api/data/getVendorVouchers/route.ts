import prisma from "../../../_libs/prismadb";

import { NextRequest, NextResponse } from "next/server";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { getPaginationQueries } from "../../getVendorProducts/route";
import { PromoBucketSize } from "@/app/constants/consts";

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
      return new NextResponse("Vendor Data Not Found", { status: 404 });
    }

    const { pageSize, cursor, goingNext, serverSort, tieBreaker, fieldsToGet } =
      await req.json();

    console.log("Request Recieved");
    const pipeline = [
      {
        $match: {
          storeId: { $oid: currentVendor.store?.id },
        },
      },

      {
        $limit: pageSize / PromoBucketSize,
      },

      {
        $project: {
          ...(fieldsToGet ? fieldsToGet : { vouchers: 1 }),
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

    const vendorVouchers = await prisma.promoToolsBucket.aggregateRaw({
      pipeline: pipeline,
    });

    console.log(vendorVouchers);

    return NextResponse.json(vendorVouchers);
  } catch (e) {
    console.log(e);
    return new NextResponse("Error", { status: 500 });
  }
}
