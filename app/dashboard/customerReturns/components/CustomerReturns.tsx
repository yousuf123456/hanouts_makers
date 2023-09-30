import React from "react";
import { KeySummaryCharts } from "./KeySummaryCharts";
import { getAccessTokenFromCookies } from "@/app/utils/getAccessToken";
import { CustomerReturnsData } from "./CustomerReturnsData";

export const CustomerReturns = () => {
  const accessToken = getAccessTokenFromCookies();

  return (
    <div className="flex flex-col gap-6">
      <KeySummaryCharts accessToken={accessToken} />

      <CustomerReturnsData />
    </div>
  );
};
