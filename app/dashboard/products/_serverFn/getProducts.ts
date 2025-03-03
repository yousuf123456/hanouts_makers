import prisma from "@/app/_libs/prismadb";
import { calculatePaginationInfo } from "@/app/_utils";
import { PRODUCTS_PER_PAGE } from "@/app/_config/pagination";

export const getProducts = async ({
  page,
  vendorStoreId,
}: {
  page: number;
  vendorStoreId: string;
}) => {
  const { skip, take } = calculatePaginationInfo({
    page,
    itemsPerPage: PRODUCTS_PER_PAGE,
  });

  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      // where: {
      //   storeId: vendorStoreId,
      // },
      take,
      skip,
      select: {
        id: true,
        SKU: true,
        name: true,
        price: true,
        clicks: true,
        quantity: true,
        category: true,
        createdAt: true,
        avgRating: true,
        promoPrice: true,
        numOfSales: true,
      },
    }),
    prisma.product.count(),
  ]);

  return { products, totalCount };
};
