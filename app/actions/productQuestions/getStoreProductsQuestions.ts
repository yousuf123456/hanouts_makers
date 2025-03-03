import prisma from "../../_libs/prismadb";

import { getCurrentVendor } from "../getCurrentVendor";
import {
  PRODUCTS_QUESTIONS_PER_PAGE,
  QUESTIONS_PRODUCT_PREVIEW_LIMIT,
} from "../../constants/consts";
import { ProductQuestionsType } from "../../dashboard/questions/components/UserQuestions";

interface Params {
  page: number;
}

export const getStoreProductsQuestions = async (params: Params) => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (!currentVendor?.store?.id) return null;

  const { page } = params;

  const toSkip = (page - 1) * PRODUCTS_QUESTIONS_PER_PAGE;

  const pipeline = [
    {
      $match: {
        storeId: { $oid: currentVendor.store.id },
      },
    },
    {
      $group: {
        _id: "$productId",
        totalQuestionsCount: {
          $sum: "$count",
        },
        bucketId: { $first: "$$ROOT._id" },
        productId: { $first: "$$ROOT.productId" },
        questions: { $first: "$$ROOT.questions" },
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
            $limit: PRODUCTS_QUESTIONS_PER_PAGE,
          },
          {
            $project: {
              bucketId: 1,
              productId: 1,
              productInformation: 1,
              totalQuestionsCount: 1,
              questions: {
                $slice: ["$questions", 0, QUESTIONS_PRODUCT_PREVIEW_LIMIT],
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

  const questionsProducts = (await prisma.questionsBucket.aggregateRaw({
    pipeline,
  })) as unknown as {
    count: { total: number }[];
    docs: ProductQuestionsType[];
  }[];

  return {
    count: questionsProducts[0].count[0].total,
    storeProductsQuestions: questionsProducts[0].docs,
  };
};
