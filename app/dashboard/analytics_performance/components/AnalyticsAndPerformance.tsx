import React from "react";

import { cookies } from "next/headers";
import { SalesChart } from "./SalesChart";
import { RevenueChart } from "./RevenueChart";
import { ClicksEngangementChart } from "./ClicksEngangementChart";
import { SalesByCategoryChart } from "./SalesByCategoryChart";
import { SalesConversionChart } from "./SalesConversionChart";
import { TotalRevenueChart } from "./TotalRevenueChart";
import { TotalSalesChart } from "./TotalSalesChart";

export const AnalyticsAndPerformance = () => {
  const accessToken = cookies().get("sAccessToken")?.value;

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full flex items-center justify-around p-4 bg-blue-100 rounded-md">
        <TotalRevenueChart accessToken={accessToken} />
        <TotalSalesChart accessToken={accessToken} />
      </div>

      <SalesChart accessToken={accessToken} />
      <RevenueChart accessToken={accessToken} />
      <ClicksEngangementChart accessToken={accessToken} />

      <div className="w-full flex justify-around items-center">
        <SalesByCategoryChart accessToken={accessToken} />
        <SalesConversionChart accessToken={accessToken} />
      </div>
    </div>
  );
};
