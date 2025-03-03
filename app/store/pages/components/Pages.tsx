import React from "react";

import prisma from "@/app/_libs/prismadb";
import { getSSRSession } from "@/app/utils/withSession";
import { StorePageCard } from "./StorePageCard";
import { Button } from "@/components/ui/button";
import { CreatePage } from "./CreatePage";

const getVendorStorePages = async () => {
  const { session } = await getSSRSession();
  if (!session) return null;

  const vendor = await prisma.vendor.findUnique({
    where: {
      superTokensUserId: session.getUserId(),
    },
    select: {
      store: {
        select: {
          storePages: true,
        },
      },
    },
  });

  if (!vendor?.store?.storePages) return null;

  return vendor.store.storePages;
};

export const Pages = async () => {
  const pages = await getVendorStorePages();

  if (!pages) return "Something went wrong!";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-24">
        <div className="flex flex-col gap-6">
          {pages.map((storePage, i) => (
            <StorePageCard key={i} storePage={storePage} />
          ))}
        </div>

        <CreatePage />
      </div>
    </div>
  );
};
