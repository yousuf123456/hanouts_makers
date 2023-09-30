"use client";
import React, { useEffect, useState } from "react";
import Session from "supertokens-web-js/recipe/session";
import { Chart } from "./Chart";
import { EngagementChartId } from "@/app/constants/charts";
import { ChartContainer } from "./ChartContainer";
import { ChartsDateRanges } from "./ChartsDateRanges";
import {
  GraphChartsDateRanges,
  GraphChartsDateRangesDefault,
} from "@/app/constants/selectOptions";

export const ClicksEngangementChart = ({
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
        accessToken={accessToken}
        chartId={EngagementChartId}
      />
    </ChartContainer>
  );
};
