import React from "react";

import { PaginationParams } from "@/app/types";
import { getSignInUrl, routes } from "@/app/_config/routes";
import { userAuthentication } from "@/app/_serverFn/userAuthentication";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";
import { getPromos } from "../_serverFn/getPromos";
import { PromosTable } from "./PromosTable";

export const Promos = async ({ page }: PaginationParams) => {
  const { isUserAuthenticated, vendorStoreId } = await userAuthentication();

  if (!isUserAuthenticated || !vendorStoreId) {
    redirect(
      getSignInUrl(
        routes.products,
        new URLSearchParams() as ReadonlyURLSearchParams
      )
    );
  }

  const data = await getPromos({ page, vendorStoreId });

  return <PromosTable promos={data.promos} totalCount={data.totalCount} />;
};
