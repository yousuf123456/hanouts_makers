"use server";

import ObjectID from "bson-objectid";
import prisma from "../../_libs/prismadb";
import { getSSRSession } from "../../utils/withSession";
import { StorePageType } from "./../../types/index";
import { revalidatePath } from "next/cache";
import { defaultStorePageLayout } from "@/app/constants/default";

interface Params {
  pageId?: string;
  newName?: string;
  editName?: boolean;
  pageName?: string;
  deletePage?: boolean;
  createPage?: boolean;
  duplicatePage?: boolean;
}

export const editStorePageConfig = async (params: Params) => {
  try {
    const { session } = await getSSRSession();
    if (!session) return "Unauthorized";

    const currentVendor = await prisma.vendor.findUnique({
      where: {
        superTokensUserId: session.getUserId(),
      },
      select: {
        store: {
          select: {
            id: true,
            storePages: true,
          },
        },
      },
    });

    if (!currentVendor || !currentVendor.store) return "Vendor Data Not Found";

    const {
      pageId,
      editName,
      newName,
      duplicatePage,
      deletePage,
      createPage,
      pageName,
    } = params;

    if (createPage && pageName) {
      const newStorePages = currentVendor.store
        .storePages as unknown as StorePageType[];

      const newPageData = {
        id: { $oid: ObjectID().toHexString() },
        createdAt: new Date(),
        name: pageName,
        layout: defaultStorePageLayout,
      };

      newStorePages.push(newPageData);

      await prisma.store.update({
        where: {
          id: currentVendor.store.id,
        },
        data: {
          storePages: newStorePages,
        },
      });

      revalidatePath("/store/pages");
      return "Succesfully Created The Page";
    }

    if (editName) {
      const newStorePages = currentVendor.store?.storePages.map(
        (storePage: any) => {
          if (storePage.id.$oid === pageId) {
            const updatedPage = { ...storePage };
            updatedPage.name = newName;

            return updatedPage;
          }

          return storePage;
        }
      );

      await prisma.store.update({
        where: { id: currentVendor.store?.id },
        data: { storePages: newStorePages },
      });

      revalidatePath("/store/pages");
      return "Edited Page Name Succesfully";
    }

    if (duplicatePage) {
      const pageToDuplicate = currentVendor.store?.storePages.filter(
        (storePage: any) => storePage.id.$oid === pageId
      )[0] as any;

      const duplicatedPage = {
        ...pageToDuplicate,
        id: ObjectID(),
        createdAt: new Date(),
      };
      duplicatedPage.isPublished = false;
      duplicatedPage.publishedAt = undefined;

      const newStorePages = [
        ...currentVendor.store?.storePages,
        duplicatedPage,
      ] as any;

      await prisma.store.update({
        where: { id: currentVendor.store?.id },
        data: { storePages: newStorePages },
      });

      revalidatePath("/store/pages");
      return "Duplicated The Page Succesfully";
    }

    if (deletePage) {
      const newStorePages = currentVendor.store.storePages.filter(
        (storePage: any) => storePage.id.$oid !== pageId
      ) as any;

      await prisma.store.update({
        where: { id: currentVendor.store?.id },
        data: { storePages: newStorePages },
      });

      revalidatePath("/store/pages");
      return "Deleted The Page Succesfully";
    }

    return "No Action To Do";
  } catch (e) {
    console.log(e);
    return "Something goes wrong";
  }
};
