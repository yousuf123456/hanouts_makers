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

export const SalesChart = ({
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
        filter={filter}
        chartId={SalesChartId}
        accessToken={accessToken}
      />
    </ChartContainer>
  );
};
