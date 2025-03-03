import prisma from "../../_libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getVendorOrdersCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (!currentVendor) return 0;

  const count = await prisma.package.count({
    where: {
      storeId: currentVendor.store?.id,
    },
  });

  return count;
};
