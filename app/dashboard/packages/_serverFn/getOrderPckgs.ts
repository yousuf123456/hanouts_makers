import prisma from "@/app/_libs/prismadb";
import { calculatePaginationInfo } from "@/app/_utils";
import { ORDER_PACKAGES_PER_PAGE } from "@/app/_config/pagination";

export const getOrderPckgs = async ({
  page,
  vendorStoreId,
}: {
  page: number;
  vendorStoreId: string;
}) => {
  const { skip, take } = calculatePaginationInfo({
    page,
    itemsPerPage: ORDER_PACKAGES_PER_PAGE,
  });

  const [packages, totalCount] = await prisma.$transaction([
    prisma.package.findMany({
      // where: {associatedStoreIds: {
      //     has: vendorStoreId
      // }},
      skip,
      take,
    }),
    prisma.package.count(),
  ]);

  return { packages, totalCount };
};
