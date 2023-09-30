"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { SalesPerClickChartId } from "@/app/constants/charts";

export const SalesConversionChart = ({
  accessToken,
}: {
  accessToken: string | undefined;
}) => {
  return (
    <Chart
      width={400}
      height={400}
      accessToken={accessToken}
      chartId={SalesPerClickChartId}
    />
  );
};
