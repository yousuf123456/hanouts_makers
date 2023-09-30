"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { TotalSalesChartId } from "@/app/constants/charts";
import { ChartsDateRanges } from "./ChartsDateRanges";
import {
  TotalChartsDateRanges,
  TotalChartsDateRangesDefault,
} from "@/app/constants/selectOptions";

export const TotalSalesChart = ({
  accessToken,
}: {
  accessToken: string | undefined;
}) => {
  const [filter, setFilter] = useState<{}>({});

  return (
    <div className="flex flex-col gap-4 items-center">
      <div>
        <ChartsDateRanges
          setFilter={setFilter}
          dateRanges={TotalChartsDateRanges}
          dateRangesDefault={TotalChartsDateRangesDefault}
        />
      </div>

      <Chart
        width={350}
        height={200}
        theme="light"
        filter={filter}
        accessToken={accessToken}
        chartId={TotalSalesChartId}
      />
    </div>
  );
};
