import prisma from "@/app/_libs/prismadb";

import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { GetDataProps, getPaginationQueries } from "./getVendorProducts";
import { PromoBucketSize } from "@/app/constants/consts";

export const getVendorVouchers = async (params: GetDataProps) => {
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
          storeId: { $oid: currentVendor.store?.id },
        },
      },

      {
        $limit: pageSize / PromoBucketSize,
      },

      {
        $project: {
          vouchers: 1,
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

    return vendorVouchers;
  } catch (e) {
    console.log(e);
    return "Internal Server Error";
  }
};
