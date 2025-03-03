import prisma from "../_libs/prismadb";

interface ParamsType {
  bucketId: string;

  voucherId?: string;
  getVoucher?: boolean;

  freeShippingId?: string;
  getFreeShiping?: boolean;

  bundleId?: string;
  getBundle?: boolean;
}

export const getPromoFromBucket = async (params: ParamsType) => {
  const {
    bundleId,
    bucketId,
    voucherId,
    getBundle,
    getVoucher,
    freeShippingId,
    getFreeShiping,
  } = params;

  let projectObject: any;

  if (getVoucher)
    projectObject = {
      voucher: {
        $filter: {
          input: "$vouchers",
          as: "voucher",
          cond: { $eq: ["$$voucher._id", { $oid: voucherId }] },
        },
      },
    };

  if (getFreeShiping)
    projectObject = {
      freeShipping: {
        $filter: {
          input: "$freeShipping",
          as: "freeShipping",
          cond: { $eq: ["$$freeShipping._id", { $oid: freeShippingId }] },
        },
      },
    };

  if (getBundle)
    projectObject = {
      bundle: {
        $filter: {
          input: "$bundles",
          as: "bundle",
          cond: { $eq: ["$$bundle._id", { $oid: bundleId }] },
        },
      },
    };

  const pipeline = [
    {
      $match: {
        _id: { $oid: bucketId },
      },
    },

    {
      $project: projectObject,
    },
  ];

  const data = (await prisma.promoToolsBucket.aggregateRaw({
    pipeline: pipeline,
  })) as any;

  if (!data[0].voucher && !data[0].freeShipping && !data[0].bundle) return null;

  return (data[0].voucher || data[0].freeShipping || data[0].bundle)[0];
};
