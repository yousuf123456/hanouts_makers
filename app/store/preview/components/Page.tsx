import React from "react";

import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { StorePageType } from "@/app/types";
import { PagePreview } from "./PagePreview";

export const Page = async ({ pageId }: { pageId: string }) => {
  const currentVendor = await getCurrentVendor({
    getStore: true,
    getStoreFields: { storePages: true },
  });
  if (!currentVendor || !currentVendor.store) return "Vendor Data Not Found";

  const storePages = currentVendor.store
    .storePages as unknown as StorePageType[];
  const storePage = storePages.filter((page) => page.id.$oid === pageId)[0];

  if (!storePage) return "Invalid Page ID";

  return <PagePreview page={storePage} />;
};
