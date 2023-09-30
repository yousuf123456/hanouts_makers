import prisma from "../../libs/prismadb";
import { getCurrentVendor } from "../getCurrentVendor";

export const getCustomerReturnsCount = async () => {
  const currentVendor = await getCurrentVendor({ getStore: true });
  if (!currentVendor) return 0;

  const count = await prisma.returnRequest.count({
    where: {
      storeIds: {
        //@ts-ignore
        has: currentVendor.store.id,
      },
    },
  });

  return count;
};
