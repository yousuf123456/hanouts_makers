import React from "react";
import { SalesChart } from "./SalesChart";
import { RevenueChart } from "./RevenueChart";
import { ClicksEngangementChart } from "./ClicksEngangementChart";
import { SalesByCategoryChart } from "./SalesByCategoryChart";
import { SalesConversionChart } from "./SalesConversionChart";
import { TotalRevenueChart } from "./TotalRevenueChart";
import { TotalSalesChart } from "./TotalSalesChart";

export const AnalyticsAndPerformance = ({ storeId }: { storeId: string }) => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full flex items-center justify-around p-4 bg-blue-100 rounded-md">
        <TotalRevenueChart storeId={storeId} />
        <TotalSalesChart storeId={storeId} />
      </div>

      <SalesChart storeId={storeId} />
      <RevenueChart storeId={storeId} />
      <ClicksEngangementChart storeId={storeId} />

      <div className="w-full flex justify-around items-center">
        <SalesByCategoryChart storeId={storeId} />
        <SalesConversionChart storeId={storeId} />
      </div>
    </div>
  );
};
