import React from "react";
import prisma from "@/app/_libs/prismadb";
import { EditorForms } from "./EditorForms";
import {
  FolderStructureType,
  StoreLayoutsType,
  StorePageType,
} from "@/app/types";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

interface EditorProps {
  pageId: string;
}

export const Editor = async ({ pageId }: EditorProps) => {
  const layouts = (await prisma.storeLayouts.findMany()) as any;
  const currentVendor = await getCurrentVendor({
    getStore: true,
    getStoreFields: { storePages: true },
  });

  if (!layouts || !currentVendor || !currentVendor.store)
    return "Something Goes Wrong";

  const storePages = currentVendor.store.storePages as StorePageType[];
  const page = storePages?.filter((page) => page.id.$oid === pageId)[0];

  return (
    <EditorForms
      mediaCenterfolderStructure={
        currentVendor.mediaCenterFolderStructure as FolderStructureType[]
      }
      mediaCenterImages={currentVendor.mediaCenterImages}
      rootFolderId={currentVendor.rootFolderId as string}
      layouts={layouts[0] as StoreLayoutsType}
      initialPageLayoutsList={page.layout}
      isPagePublished={!!page.isPublished}
      pageId={pageId}
    />
  );
};
