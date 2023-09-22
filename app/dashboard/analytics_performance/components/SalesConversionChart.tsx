"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { SalesPerClickChartId } from "@/app/constants/charts";

export const SalesConversionChart = ({ storeId }: { storeId: string }) => {
  const [filter, setFilter] = useState<{}>();

  useEffect(() => {
    if (storeId) {
      setFilter({
        storeId: { $oid: storeId },
      });
    }
  }, [storeId]);

  return (
    <Chart
      height={400}
      width={400}
      chartId={SalesPerClickChartId}
      filter={filter}
    />
  );
};
