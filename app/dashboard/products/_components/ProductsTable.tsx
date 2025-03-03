"use client";
import React from "react";

import { getProducts } from "../_serverFn/getProducts";
import { DataTable } from "../../_components/DataTable";
import { ProductColumns } from "./ProductsColumns";
import { PRODUCTS_PER_PAGE } from "@/app/_config/pagination";

export const ProductsTable = ({
  products,
  totalCount,
}: {
  products: Awaited<ReturnType<typeof getProducts>>["products"];
  totalCount: number;
}) => {
  return (
    <DataTable
      data={products}
      rowCount={totalCount}
      columns={ProductColumns}
      pageSize={PRODUCTS_PER_PAGE}
    />
  );
};
