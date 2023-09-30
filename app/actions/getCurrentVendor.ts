import { getServerSession } from "./getServerSession";
import prisma from "../libs/prismadb";
import { VendorType } from "../types";

interface Params {
  getStore?: boolean;
}

export const getCurrentVendor = async (params: Params = {}) => {
  const session = await getServerSession();
  if (!session) return null;

  const { getStore } = params;

  const currentVendorIdST = session.getUserId();

  const currentVendor = (await prisma.vendor.findUnique({
    where: {
      superTokensUserId: currentVendorIdST,
    },

    include: {
      ...(getStore ? { store: { select: { id: true } } } : {}),
    },
  })) as unknown as VendorType;

  return currentVendor;
};
