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

export const RevenueChart = ({
  accessToken,
}: {
  accessToken: string | undefined;
}) => {
  const [filter, setFilter] = useState<{}>();

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
        dynamicWidth
        filter={filter}
        chartId={RevenueChartId}
        accessToken={accessToken}
      />
    </ChartContainer>
  );
};
