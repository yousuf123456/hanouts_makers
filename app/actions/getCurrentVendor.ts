import { getServerSession } from "./getServerSession";
import prisma from "../libs/prismadb";
import { VendorType } from "../types";

export const getCurrentVendor = async () => {
  const session = await getServerSession();
  if (!session) return null;

  const currentVendorIdST = session.getUserId();
  const currentVendor = (await prisma.vendor.findUnique({
    where: {
      superTokensUserId: currentVendorIdST,
    },
  })) as VendorType;

  return currentVendor;
};
