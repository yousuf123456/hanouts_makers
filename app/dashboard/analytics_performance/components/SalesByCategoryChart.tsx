"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { SalesByCategoryChartId } from "@/app/constants/charts";

export const SalesByCategoryChart = ({
  accessToken,
}: {
  accessToken: string | undefined;
}) => {
  const [filter, setFilter] = useState<{}>();

  return (
    <Chart
      width={400}
      height={400}
      accessToken={accessToken}
      chartId={SalesByCategoryChartId}
      //Enable it
      // filter={filter}
    />
  );
};
