"use client";
import { ChartsBaseUrl } from "@/app/constants/charts";
import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

interface ChartProps {
  filter?: any;
  width: number;
  height: number;
  chartId: string;
  theme?: "dark" | "light";
}

export const Chart: React.FC<ChartProps> = ({
  width,
  theme,
  height,
  filter,
  chartId,
}) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: ChartsBaseUrl,
  });

  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);

  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      height: height,
      width: width,
      theme: theme || "dark",
    })
  );

  useEffect(() => {
    chart
      .render(chartDiv?.current!)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered && filter) {
      chart.setMaxDataAge;
      chart
        .setFilter(filter)
        .catch((err) => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  return <div ref={chartDiv} />;
};
