"use server";
import prisma from "../../_libs/prismadb";

import { getCurrentVendor } from "../../actions/getCurrentVendor";
import { LayoutComponentType, StoreLayoutsType } from "../../types";
import { getSSRSession } from "../../utils/withSession";

interface Params {
  pageId: string;
  publishIt?: boolean;
  newPageLayouts?: LayoutComponentType[];
}

export const EditStorePage = async ({
  pageId,
  publishIt,
  newPageLayouts,
}: Params) => {
  try {
    const { session } = await getSSRSession();

    if (!session) return "Unauthorised";

    const currentVendor = await getCurrentVendor({
      getStoreFields: { storePages: true },
      userSTId: session.getUserId(),
      getStore: true,
    });

    if (!currentVendor || !currentVendor.store) return "Vendor Data Not Found";

    if (!newPageLayouts && publishIt) {
      const updatedStorePages = currentVendor.store.storePages.map(
        (page: any) => {
          if (page.id.$oid === pageId) {
            return { ...page, isPublished: true, publishedAt: new Date() };
          }
          return { ...page, isPublished: false, publishedAt: undefined };
        }
      );

      await prisma.store.update({
        where: {
          id: currentVendor.store.id,
        },
        data: {
          storePages: updatedStorePages,
        },
      });
      return "Succesfully Published It";
    }

    const newStorePages = [...currentVendor.store.storePages];
    const pageToEdit = newStorePages.filter(
      (page) => page.id.$oid === pageId
    )[0];

    pageToEdit.layout = newPageLayouts!;

    await prisma.store.update({
      where: {
        id: currentVendor.store.id,
      },
      data: {
        storePages: newStorePages,
      },
    });

    return "Succesfully Updated The Data";
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
