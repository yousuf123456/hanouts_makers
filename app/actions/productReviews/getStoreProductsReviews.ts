import prisma from "../../_libs/prismadb";

import { getCurrentVendor } from "../getCurrentVendor";

import {
  PRODUCTS_REVIEWS_PER_PAGE,
  PRODUCT_REVIEWS_PREVIEW_LIMIT,
} from "../../constants/consts";

import { ProductReviewsType } from "@/app/dashboard/reviews/components/CustomerReviews";

interface Params {
  page: number;
}

export const getStoreProductsReviews = async (params: Params) => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (!currentVendor?.store?.id) return null;

  const { page } = params;

  const toSkip = (page - 1) * PRODUCTS_REVIEWS_PER_PAGE;

  const pipeline = [
    {
      $match: {
        storeId: { $oid: currentVendor.store.id },
      },
    },
    {
      $group: {
        _id: "$productId",
        totalReviewsCount: {
          $sum: "$count",
        },
        bucketId: { $first: "$$ROOT._id" },
        productId: { $first: "$$ROOT.productId" },
        ratingAndReviews: { $first: "$$ROOT.ratingAndReviews" },
        productInformation: { $first: "$$ROOT.productInformation" },
      },
    },
    {
      $facet: {
        count: [{ $count: "total" }],
        docs: [
          {
            $sort: {
              bucketId: -1,
            },
          },
          {
            $skip: toSkip,
          },
          {
            $limit: PRODUCTS_REVIEWS_PER_PAGE,
          },
          {
            $project: {
              bucketId: 1,
              productId: 1,
              productInformation: 1,
              totalReviewsCount: 1,
              ratingAndReviews: {
                $slice: ["$ratingAndReviews", 0, PRODUCT_REVIEWS_PREVIEW_LIMIT],
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        count: 1,
        docs: 1,
      },
    },
  ];

  const productsReviewsData = (await prisma.ratingAndReviewBucket.aggregateRaw({
    pipeline,
  })) as unknown as {
    count: { total: number }[];
    docs: ProductReviewsType[];
  }[];

  return {
    count: productsReviewsData[0].count[0]?.total || 0,
    storeProductsReviews: productsReviewsData[0]?.docs || [],
  };
};
