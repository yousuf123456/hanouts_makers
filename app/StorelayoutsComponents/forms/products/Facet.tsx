"use client";

import clsx from "clsx";
import { Bucket } from "./Bucket";
import React, { useContext, useState } from "react";
import { FacetHeader } from "./FacetHeader";
import { FiltersContext } from "./FilterProducts";

interface FacetProps {
  facetName: string;
  hideHeader?: boolean;
  facetBuckets: { _id: string; count?: number }[];
}

export const Facet: React.FC<FacetProps> = ({
  facetName,
  hideHeader,
  facetBuckets,
}) => {
  const { filters } = useContext(FiltersContext);

  const [collapsed, setIsCollapsed] = useState(
    !(filters[facetName]?.length > 0),
  );
  const [isShowingMore, setIsShowingMore] = useState(false);

  return (
    <div className="flex flex-col gap-2 lg:gap-0">
      {!hideHeader && (
        <FacetHeader
          facetName={facetName}
          collapsed={collapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}

      <div
        className={clsx(
          "flex flex-wrap gap-2",
          collapsed && "h-0 overflow-hidden",
        )}
      >
        {facetBuckets.map((bucket, i) => {
          if (!isShowingMore && i > 4) return null;
          return <Bucket key={i} bucket={bucket} queryName={facetName} />;
        })}
      </div>

      <div>
        {facetBuckets.length > 5 && !collapsed && (
          <div
            className="relative left-2.5 mt-2 flex w-fit flex-col gap-0"
            onClick={() => setIsShowingMore((prev) => !prev)}
          >
            <p className="peer cursor-pointer font-text text-sm font-semibold tracking-wide text-themeBlue">
              {isShowingMore ? "Show less" : "Show more"}
            </p>

            <div className="h-0.5 w-full bg-themeSecondary opacity-0 peer-hover:opacity-100" />
          </div>
        )}
      </div>
    </div>
  );
};
