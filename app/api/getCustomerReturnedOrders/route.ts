import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import prisma from "../../_libs/prismadb";
import { NextResponse } from "next/server";
import { getPaginationQueries } from "../getVendorProducts/route";

export async function POST(req: Request) {
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

    const { pageSize, pageNumber, cursor, goingNext, serverSort, tieBreaker } =
      await req.json();

    const pipeline = [
      {
        $match: {
          //@ts-ignore
          $expr: { $in: [{ $oid: currentVendor.store.id }, "$storeIds"] },
        },
      },

      {
        $lookup: {
          from: "OrderedProduct",
          localField: "_id",
          foreignField: "returnRequestId",
          as: "orderedProducts",
          pipeline: [
            {
              $match: {
                //@ts-ignore
                storeId: { $oid: currentVendor.store.id },
              },
            },
          ],
        },
      },

      {
        $limit: pageSize,
      },

      {
        $project: {
          _id: 1,
          status: 1,
          orderFeedback: 1,
          orderedProducts: 1,
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

    const returnRequests = await prisma.returnRequest.aggregateRaw({
      pipeline: pipeline,
    });

    return NextResponse.json(returnRequests);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
