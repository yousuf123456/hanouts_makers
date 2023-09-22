"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { SalesChartId } from "@/app/constants/charts";
import { ChartContainer } from "./ChartContainer";
import { ChartsDateRanges } from "./ChartsDateRanges";
import {
  GraphChartsDateRanges,
  GraphChartsDateRangesDefault,
} from "@/app/constants/selectOptions";

export const SalesChart = ({ storeId }: { storeId: string }) => {
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
      <Chart width={900} height={500} filter={filter} chartId={SalesChartId} />
    </ChartContainer>
  );
};
