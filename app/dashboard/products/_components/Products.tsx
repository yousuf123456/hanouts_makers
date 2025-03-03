import React from "react";
import { getProducts } from "../_serverFn/getProducts";
import { ProductsTable } from "./ProductsTable";
import { PaginationParams } from "@/app/types";
import { userAuthentication } from "@/app/_serverFn/userAuthentication";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";
import { getSignInUrl, routes } from "@/app/_config/routes";

export const Products = async ({ page }: PaginationParams) => {
  const { isUserAuthenticated, vendorStoreId } = await userAuthentication();

  if (!isUserAuthenticated || !vendorStoreId) {
    redirect(
      getSignInUrl(
        routes.products,
        new URLSearchParams() as ReadonlyURLSearchParams
      )
    );
  }

  const data = await getProducts({ page, vendorStoreId });

  return <ProductsTable {...data} />;
};
