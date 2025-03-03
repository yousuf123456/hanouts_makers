import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { NextResponse } from "next/server";
import { getPaginationQueries } from "../getVendorProducts/route";

import prisma from "../../_libs/prismadb";

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
          storeId: currentVendor.store?.id,
        },
      },

      {
        $lookup: {
          from: "User",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
          pipeline: [
            {
              $project: {
                image: 1,
                name: 1,
                email: 1,
                phone: 1,
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
          ammount: 1,
          status: 1,
          customer: 1,
          createdAt: 1,
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

    const vendorOrders = await prisma.package.aggregateRaw({
      pipeline: pipeline,
    });

    return NextResponse.json(vendorOrders);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
