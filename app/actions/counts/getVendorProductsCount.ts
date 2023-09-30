import prisma from "../../libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getVendorProductsCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });
  if (!currentVendor) return null;

  const count = await prisma.product.count({
    where: {
      storeId: currentVendor.store?.id,
    },
  });

  return count;
};
