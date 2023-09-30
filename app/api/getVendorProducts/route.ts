import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

interface getPaginationQueriesProps {
  serverSort: null | { [key: string]: -1 | 1 };
  tieBreaker: null | string;
  cursor: string | null;
  goingNext: boolean;
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
          name: 1,
          id: 1,
          SKU: 1,
          price: 1,
          createdAt: 1,
          quantity: 1,
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

    const vendorProducts = await prisma.product.aggregateRaw({
      pipeline: pipeline,
    });

    return NextResponse.json(vendorProducts);
  } catch (e) {
    console.log(e);
    return new NextResponse("Error", { status: 500 });
  }
}
