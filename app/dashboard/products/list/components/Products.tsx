import { getVendorProductsCount } from "@/app/actions/counts/getVendorProductsCount";
import React from "react";
import { ProductsList } from "./ProductsList";

export const Products = async () => {
  const count = await getVendorProductsCount();

  if (count === null) {
    return <p>Error getting the data</p>;
  }

  return <ProductsList count={count} />;
};
