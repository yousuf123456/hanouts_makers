import prisma from "@/app/_libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getVouchersCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });

  if (currentVendor === null) {
    return 0;
  }

  const count = await prisma.voucher.count({
    where: { storeId: currentVendor.store?.id },
  });

  return count;
};
