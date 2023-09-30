import React from "react";
import prisma from "../../../libs/prismadb";
import { getCustomerReturnsCount } from "@/app/actions/counts/getCustomerReturnsCount";
import { CustomerReturnsList } from "./CustomerReturnsList";

export const CustomerReturnsData = async () => {
  const count = await getCustomerReturnsCount();

  return <CustomerReturnsList count={count} />;
};
