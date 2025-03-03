import prisma from "@/app/_libs/prismadb";
import { mapMongoToPrisma } from "@/app/_utils";
import { FreeShipping, Voucher } from "@prisma/client";

interface Params {
  bucketId: string;
  voucherId: string | undefined;
  freeShippingId: string | undefined;
}

export const getBucketWithPromo = async ({
  bucketId,
  voucherId,
  freeShippingId,
}: Params) => {
  const pipeline = [
    {
      $match: {
        _id: { $oid: bucketId },
      },
    },
    {
      $project: {
        _id: 1,
        voucher: {
          $first: {
            $filter: {
              as: "voucher",
              input: "$vouchers",
              cond: { $eq: ["$$voucher.id", voucherId || ""] },
            },
          },
        },
        freeShipping: {
          $first: {
            $filter: {
              as: "singleFreeShipping",
              input: "$freeShipping",
              cond: { $eq: ["$$singleFreeShipping.id", freeShippingId || ""] },
            },
          },
        },
      },
    },
  ] as any;

  const promoBuckets = (await prisma.promoToolsBucket.aggregateRaw({
    pipeline,
  })) as unknown as {
    _id: { $oid: string };
    voucher?: Voucher;
    freeShipping?: FreeShipping;
  }[];

  const promoBucket = mapMongoToPrisma(promoBuckets)[0];

  if (!promoBucket) return null;

  return promoBucket;
};
