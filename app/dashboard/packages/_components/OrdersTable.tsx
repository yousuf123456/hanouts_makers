"use client";

import React from "react";
import { DataTable } from "../../_components/DataTable";
import { OrdersColumns } from "./OrdersColumns";
import { ORDER_PACKAGES_PER_PAGE } from "@/app/_config/pagination";
import { getOrderPckgs } from "../_serverFn/getOrderPckgs";

export const OrdersTable = ({
  orderPackages,
  totalCount,
}: {
  orderPackages: Awaited<ReturnType<typeof getOrderPckgs>>["packages"];
  totalCount: number;
}) => {
  return (
    <DataTable
      data={orderPackages}
      rowCount={totalCount}
      columns={OrdersColumns}
      pageSize={ORDER_PACKAGES_PER_PAGE}
    />
  );
};
