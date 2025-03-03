import { getCurrentVendor } from "../../actions/getCurrentVendor";
import prisma from "../../_libs/prismadb";
import { LayoutComponentType } from "../../types";
import { getSSRSession } from "../../utils/withSession";

interface Params {
  pageId: string;
  layout: LayoutComponentType[];
  publishIt?: boolean;
}

export const editStorePageLayout = async (
  pageId: string,
  layout: LayoutComponentType[]
) => {
  const { session } = await getSSRSession();
  if (!session) return "Unauthorized";

  const currentVendor = await getCurrentVendor({
    userSTId: session.getUserId(),
    getStore: true,
  });

  if (!currentVendor || !currentVendor.store) return "Vendor Data Not Found";

  const updatedStorePages = currentVendor.store.storePages.map((page: any) => {
    if (page.id.$oid === pageId) {
      return { ...page, updatedAt: new Date(), layout };
    }
    return page;
  });

  await prisma.store.update({
    where: {
      id: currentVendor.store.id,
    },
    data: {
      storePages: updatedStorePages,
    },
  });

  return "Updated Succesfully";
};
