import { getServerSession } from "./getServerSession";
import prisma from "../_libs/prismadb";
import { VendorType } from "../types";
import { getSSRSession } from "../utils/withSession";

interface Params {
  userSTId?: string;
  getStore?: boolean;
  getMediaCenter?: boolean;
  getStoreFields?: { [key: string]: any };
}

export const getCurrentVendor = async (params: Params = {}) => {
  const { getStore, getStoreFields, userSTId } = params;
  let session;

  if (!userSTId) {
    session = (await getSSRSession()).session;
    if (!session) return null;
  }

  const currentVendorIdST = session?.getUserId();

  const currentVendor = (await prisma.vendor.findUnique({
    where: {
      superTokensUserId: userSTId || currentVendorIdST,
    },

    include: {
      ...(getStore
        ? { store: { select: { id: true, ...(getStoreFields || {}) } } }
        : {}),
    },
  })) as unknown as VendorType;

  return currentVendor;
};
