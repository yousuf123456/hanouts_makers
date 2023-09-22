"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { RevenueChartId } from "@/app/constants/charts";
import { ChartContainer } from "./ChartContainer";
import { ChartsDateRanges } from "./ChartsDateRanges";
import {
  GraphChartsDateRanges,
  GraphChartsDateRangesDefault,
} from "@/app/constants/selectOptions";

export const RevenueChart = ({ storeId }: { storeId: string }) => {
  const [filter, setFilter] = useState<{}>();

  useEffect(() => {
    if (storeId) {
      setFilter({
        storeId: storeId,
        status: { $nin: ["Cancelled"] },
      });
    }
  }, [storeId]);

  return (
    <ChartContainer>
      <ChartsDateRanges
        setFilter={setFilter}
        dateRanges={GraphChartsDateRanges}
        dateRangesDefault={GraphChartsDateRangesDefault}
      />

      <Chart
        width={900}
        height={500}
        chartId={RevenueChartId}
        filter={filter}
      />
    </ChartContainer>
  );
};
