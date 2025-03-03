import prisma from "@/app/_libs/prismadb";

import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { getPaginationQueries } from "./getVendorProducts";
import { PromoBucketSize } from "@/app/constants/consts";
import { GetDataProps } from "./getVendorProducts";

export const getVendorBundles = async (params: GetDataProps) => {
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
          bundles: 1,
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

    const promoToolsBuckets = await prisma.promoToolsBucket.aggregateRaw({
      pipeline: pipeline,
    });

    return promoToolsBuckets;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
