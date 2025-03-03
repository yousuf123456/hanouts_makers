import prisma from "@/app/_libs/prismadb";

import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { GetDataProps, getPaginationQueries } from "./getVendorProducts";

export const getReturnedOrders = async (params: GetDataProps) => {
  try {
    const currentVendor = await getCurrentVendor({
      getStore: true,
    });

    if (!currentVendor) {
      return "Vendor Data Not Found";
    }

    const { pageSize, cursor, goingNext, serverSort, tieBreaker } = params;

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

    return returnRequests;
  } catch (e) {
    console.log(e);
    return "Internal Server Error";
  }
};
