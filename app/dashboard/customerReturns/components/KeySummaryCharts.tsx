"use client";
import React from "react";

import { Chart } from "../../analytics_performance/components/Chart";
import {
  AmmountUnderReviewChartId,
  OrdersUnderReviewChartId,
} from "@/app/constants/charts";

export const KeySummaryCharts = ({
  accessToken,
}: {
  accessToken: string | undefined;
}) => {
  return (
    <div className="p-4 rounded-md bg-blue-50 w-full flex justify-between items-center">
      <Chart
        width={350}
        height={200}
        dynamicWidth
        accessToken={accessToken}
        chartId={OrdersUnderReviewChartId}
      />

      <Chart
        width={350}
        height={200}
        dynamicWidth
        accessToken={accessToken}
        chartId={AmmountUnderReviewChartId}
      />
    </div>
  );
};
