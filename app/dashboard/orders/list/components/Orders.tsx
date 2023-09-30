import { getVendorOrdersCount } from "@/app/actions/counts/getVendorOrdersCount";
import React from "react";
import { OrdersList } from "./OrdersList";

export const Orders = async () => {
  const count = await getVendorOrdersCount();
  return <OrdersList count={count} />;
};
