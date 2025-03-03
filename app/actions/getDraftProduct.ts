import prisma from "../_libs/prismadb";
import { DraftProductType } from "../types";

export const getDraftProduct = async (draftId: string) => {
  const draftProduct = (await prisma.draftProduct.findUnique({
    where: {
      id: draftId,
    },
  })) as unknown as DraftProductType;

  return draftProduct;
};
