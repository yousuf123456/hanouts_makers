"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { SalesByCategoryChartId } from "@/app/constants/charts";

export const SalesByCategoryChart = ({ storeId }: { storeId: string }) => {
  const [filter, setFilter] = useState<{}>();

  useEffect(() => {
    if (storeId) {
      setFilter({
        "product.storeId": storeId,
      });
    }
  }, [storeId]);

  return (
    <Chart
      width={400}
      height={400}
      chartId={SalesByCategoryChartId}
      //Enable it
      // filter={filter}
    />
  );
};
