import React from "react";

import { getSignInUrl, routes } from "@/app/_config/routes";
import { userAuthentication } from "@/app/_serverFn/userAuthentication";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";
import { PaginationParams } from "@/app/types";
import { OrdersTable } from "./OrdersTable";
import { getOrderPckgs } from "../_serverFn/getOrderPckgs";

export const Orders = async ({ page }: PaginationParams) => {
  const { isUserAuthenticated, vendorStoreId } = await userAuthentication();

  if (!isUserAuthenticated || !vendorStoreId) {
    redirect(
      getSignInUrl(
        routes.products,
        new URLSearchParams() as ReadonlyURLSearchParams
      )
    );
  }

  const { packages, totalCount } = await getOrderPckgs({ page, vendorStoreId });

  return <OrdersTable orderPackages={packages} totalCount={totalCount} />;
};
