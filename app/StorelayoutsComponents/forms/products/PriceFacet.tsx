"use client";
import React, { useContext, useState } from "react";
import { FacetHeader } from "./FacetHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiltersContext } from "./FilterProducts";

export const PriceFacet = () => {
  const { setFilters, filters } = useContext(FiltersContext);

  const [collapsed, setIsCollapsed] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fromError = parseInt(from) < 0;
  const toError =
    parseInt(to) < parseInt(from) || parseInt(to) === parseInt(from);

  const onApply = () => {
    if (!from && !to)
      return setFilters((prev) => ({ ...prev, price: undefined }));
    setFilters((prev) => ({
      ...prev,
      price: String(from) + "-" + String(to),
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <FacetHeader
        facetName={"Price"}
        collapsed={collapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {!collapsed && (
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <Input
              type="number"
              id="minPrice"
              placeholder="From"
              onChange={(e) => setFrom(e.target.value)}
              value={
                from || (filters["price"] && filters["price"].split("-")[0])
              }
            />

            <Input
              type="number"
              placeholder="To"
              autoFocus={false}
              onChange={(e) => setTo(e.target.value)}
              value={to || (filters["price"] && filters["price"].split("-")[1])}
            />
          </div>

          <Button
            onClick={onApply}
            className="text-xs"
            disabled={(from && !to) || (to && !from) || toError || fromError}
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
