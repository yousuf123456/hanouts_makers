import prisma from "../../_libs/prismadb";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

interface getPaginationQueriesProps {
  serverSort: null | { [key: string]: -1 | 1 };
  goingNext: null | boolean;
  tieBreaker: null | string;
  cursor: string | null;
}

export const getPaginationQueries = ({
  cursor,
  goingNext,
  serverSort,
  tieBreaker,
}: getPaginationQueriesProps) => {
  const serverSortField = serverSort ? Object.keys(serverSort)[0] : null;
  const serverSortValue = serverSort
    ? serverSort[Object.keys(serverSort)[0]]
    : null;

  const initialSortStage =
    serverSort !== null
      ? {
          $sort: {
            [serverSortField!]:
              serverSortValue! * (goingNext === null ? 1 : !goingNext ? -1 : 1),
            _id:
              serverSortValue! * (goingNext === null ? 1 : !goingNext ? -1 : 1),
          },
        }
      : goingNext === null || goingNext
      ? null
      : {
          $sort: {
            _id: -1,
          },
        };

  const finalSortStage =
    goingNext === null || goingNext
      ? null
      : serverSort !== null
      ? {
          $sort: {
            [Object.keys(serverSort)[0]]:
              serverSort[Object.keys(serverSort)[0]],
          },
        }
      : {
          $sort: {
            _id: 1,
          },
        };

  let greaterOrLess = goingNext ? "$gt" : "$lt";
  if (serverSortValue === -1)
    greaterOrLess === "$gt" ? (greaterOrLess = "$lt") : (greaterOrLess = "$gt");

  const matchQueries =
    cursor && goingNext !== null
      ? serverSort !== null
        ? {
            $or: [
              { [serverSortField!]: { [greaterOrLess]: cursor } },
              {
                [serverSortField!]: cursor,
                _id: { [greaterOrLess]: { $oid: tieBreaker } },
              },
            ],
          }
        : {
            _id: { [goingNext ? "$gt" : "$lt"]: { $oid: cursor } },
          }
      : null;
  try {
    //@ts-ignore
    console.log(matchQueries.$or);
  } catch {
    console.log("Not Now");
  }
  return {
    matchQueries,
    finalSortStage,
    initialSortStage,
  };
};

export interface GetDataProps {
  serverSort: null | { [key: string]: -1 | 1 };
  tieBreaker: null | string;
  goingNext: null | boolean;
  cursor: string | null;
  pageSize: number;
}

export const getVendorProducts = async (
  params: GetDataProps & { getDraftProducts?: boolean }
) => {
  try {
    const currentVendor = await getCurrentVendor({
      getStore: true,
    });

    if (!currentVendor) {
      return "Unauthorized";
    }

    const {
      cursor,
      pageSize,
      goingNext,
      serverSort,
      tieBreaker,
      getDraftProducts,
    } = params;

    const projectObject = getDraftProducts
      ? {
          name: 1,
          image: 1,
          createdAt: 1,
          updatedAt: 1,
        }
      : {
          name: 1,
          id: 1,
          SKU: 1,
          price: 1,
          image: 1,
          createdAt: 1,
          quantity: 1,
        };

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
        $project: projectObject,
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

    const vendorProducts = getDraftProducts
      ? await prisma.draftProduct.aggregateRaw({ pipeline: pipeline })
      : await prisma.product.aggregateRaw({
          pipeline: pipeline,
        });

    return vendorProducts;
  } catch (e) {
    console.log(e);
    return "Internal Server Error";
  }
};
