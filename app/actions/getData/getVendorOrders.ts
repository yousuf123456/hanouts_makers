import { getSSRSession } from "@/app/utils/withSession";
import prisma from "../../_libs/prismadb";
import { GetDataProps, getPaginationQueries } from "./getVendorProducts";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

export const getVendorOrders = async (params: GetDataProps) => {
  try {
    const currentVendor = await getCurrentVendor({
      getStore: true,
    });

    if (!currentVendor) {
      return "Vendor Data Not Found";
    }

    const { pageSize, cursor, goingNext, serverSort, tieBreaker } = params;

    console.log("I am called");
    console.log(cursor, pageSize, goingNext);
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

    return vendorOrders;
  } catch (e) {
    console.log(e);
    return "Internal Server Error";
  }
};
