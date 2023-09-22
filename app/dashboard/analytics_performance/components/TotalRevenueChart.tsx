"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { TotalRevenueChartId } from "@/app/constants/charts";
import { ChartsDateRanges } from "./ChartsDateRanges";
import {
  TotalChartsDateRanges,
  TotalChartsDateRangesDefault,
} from "@/app/constants/selectOptions";

export const TotalRevenueChart = ({ storeId }: { storeId: string }) => {
  const [filter, setFilter] = useState<{}>({});

  useEffect(() => {
    if (storeId) {
      setFilter({
        storeId: storeId,
        status: { $nin: ["Cancelled"] },
      });
    }
  }, [storeId]);

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
        chartId={TotalRevenueChartId}
      />
    </div>
  );
};
