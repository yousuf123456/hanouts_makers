"use client";

import { cn } from "@/app/utils/cn";
import Checkbox from "@mui/material/Checkbox";
import clsx from "clsx";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import React, { useContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { FiltersContext } from "./FilterProducts";

interface BucketProps {
  bucket: { _id: string; count?: number };
  queryName: string;
}

export const Bucket: React.FC<BucketProps> = ({ bucket, queryName }) => {
  const { filters, setFilters } = useContext(FiltersContext);

  const handleOnChange = (e: any) => {
    const isChecked = e.target.checked;
    const newFilters = { ...filters };

    if (isChecked) {
      if (!newFilters[queryName]) newFilters[queryName] = [bucket._id];
      else newFilters[queryName].push(bucket._id);
    } else
      newFilters[queryName] = newFilters[queryName].filter(
        (value: string) => value !== bucket._id,
      );

    if (newFilters[queryName].length === 0) newFilters[queryName] = undefined;

    setFilters(newFilters);
  };

  return (
    <>
      <div className="flex items-center gap-0">
        <div className="block">
          <Checkbox
            size="small"
            id={bucket._id}
            onChange={handleOnChange}
            inputProps={{ "aria-label": "controlled" }}
            checked={
              filters[queryName] && filters[queryName].includes(bucket._id)
            }
          />
        </div>

        <p className={cn("line-clamp-1 font-sans text-sm text-slate-600")}>
          {bucket._id}
        </p>
      </div>
    </>
  );
};
