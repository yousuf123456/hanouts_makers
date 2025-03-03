import prisma from "@/app/_libs/prismadb";

import { calculatePaginationInfo } from "@/app/_utils";
import { PROMOS_PER_BUCKET } from "./../../../_config/pagination";
import { FreeShipping, Voucher } from "@prisma/client";

export const getPromos = async ({
  page,
  vendorStoreId,
}: {
  page: number;
  vendorStoreId: string;
}) => {
  const { skip, take } = calculatePaginationInfo({
    page,
    itemsPerPage: PROMOS_PER_BUCKET,
    itemsCountPerBucket: PROMOS_PER_BUCKET,
  });

  const [promosBuckets, totalCountData] = await prisma.$transaction([
    prisma.promoToolsBucket.findMany({ skip }),
    prisma.promoToolsBucket.aggregateRaw({
      pipeline: [
        {
          $group: {
            _id: null, // Group all documents together
            totalVouchersCount: { $sum: "$vouchersCount" }, // Sum the vouchersCount field
            totalFreeShippingsCount: { $sum: "$freeShippingCount" }, // Sum the freeShippingCount field
          },
        },
      ],
    }) as any,
  ]);

  const mergedPromos = promosBuckets.reduce(
    (acc, current) => {
      acc.vouchers = acc.vouchers.concat(
        current.vouchers.map((voucher) => ({
          ...voucher,
          bucketId: current.id,
        }))
      );

      acc.freeShippings = acc.freeShippings.concat(
        current.freeShipping.map((freeShipping) => ({
          ...freeShipping,
          bucketId: current.id,
        }))
      );
      return acc;
    },
    { vouchers: [] as Voucher[], freeShippings: [] as FreeShipping[] }
  );

  return {
    promos: mergedPromos,
    totalCount: {
      vouchers: totalCountData[0].totalVouchersCount,
      freeShippings: totalCountData[0].totalFreeShippingsCount,
    },
  };
};
