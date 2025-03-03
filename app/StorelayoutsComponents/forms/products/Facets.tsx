import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Facet } from "./Facet";
import { InputHeading } from "@/app/_components/InputHeading";
import { TextInput } from "@/app/_components/TextInput";
import { Input } from "@/components/ui/input";
import { FiltersContext } from "./FilterProducts";
import { PriceFacet } from "./PriceFacet";

function fetchFacetsData() {
  return fetch("../../api/getFacets", {
    method: "POST",
    body: JSON.stringify({}),
  }).then(async (res) => await res.json());
}

export const Facets = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["facets"],
    queryFn: fetchFacetsData,
  });

  if (isLoading) return "Loading";

  const { setFilters, filters } = useContext(FiltersContext);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-72 flex-col gap-0">
        <InputHeading>Product Name</InputHeading>
        <Input
          value={filters["name"]}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Enter Name"
        />
      </div>

      <PriceFacet />

      <div className="flex flex-col gap-4">
        {Object.keys(data[0].facet).map((facetKey) => (
          <Facet
            key={facetKey}
            facetName={facetKey}
            facetBuckets={data[0].facet[facetKey].buckets}
          />
        ))}
      </div>
    </div>
  );
};
