import prisma from "../../_libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getVendorProductsCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });
  if (!currentVendor) return null;

  const [allProductsCount, draftCount] = await prisma.$transaction([
    prisma.product.count({
      where: {
        storeId: currentVendor.store?.id,
      },
    }),
    prisma.draftProduct.count({
      where: {
        storeId: currentVendor.store?.id,
      },
    }),
  ]);

  return {
    allProductsCount,
    draftCount,
  };
};
