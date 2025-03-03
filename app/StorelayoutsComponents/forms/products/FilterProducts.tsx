import React, { createContext, useEffect, useState } from "react";

import { Facets } from "./Facets";
import { ProductRow } from "./ProductRow";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/app/sharedComponents/Button";
import { Button as ShadButton } from "@/components/ui/button";
import { IParams } from "@/app/api/searchVendorProducts/route";
import { DialogModel } from "@/app/sharedComponents/DialogModel";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function fetchFilteredProducts(filters: IParams, noOfProductsToShow: number) {
  return fetch("../../api/searchVendorProducts", {
    method: "POST",
    body: JSON.stringify({ filters, limit: noOfProductsToShow }),
  }).then(async (res) => await res.json());
}

interface FilterProductsProps {
  noOfProductsToShow: number;
  onConfirm: (ids: string[]) => void;
}

export const FiltersContext = createContext<{
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<{}>>;
}>({} as any);

export const FilterProducts: React.FC<FilterProductsProps> = ({
  noOfProductsToShow,
  onConfirm,
}) => {
  const [tabs, setTabs] = useState("filters");

  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<IParams>({});

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["filteredVendorProducts"],
    queryFn: () => fetchFilteredProducts(filters, noOfProductsToShow),
    enabled: false,
  });

  const onFilterProducts = () => {
    setTabs("filteredProducts");
    refetch();
  };

  const onConfirmClick = () => {
    const ids = data.map((product: any) => product._id.$oid);
    onConfirm(ids);
  };

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} className="w-full">
        Filter Products
      </Button>

      <DialogModel
        open={open}
        setOpen={setOpen}
        className="flex max-h-[90%] min-h-[90%] max-w-[80%] flex-col overflow-y-auto scrollbar-none"
      >
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-6">
          <Tabs
            defaultValue="filters"
            value={tabs}
            onValueChange={(tabs) => setTabs(tabs)}
          >
            <div className="flex w-full justify-center">
              <TabsList className="w-72">
                <TabsTrigger value="filters" className="w-full">
                  Filters
                </TabsTrigger>
                <TabsTrigger value="filteredProducts">
                  Filtered Products
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="filteredProducts">
              <div className="mt-4 flex w-full flex-col gap-3">
                {isLoading && (
                  <p className="font-roboto font-semibold text-themeSecondary">
                    Filtering The Products..
                  </p>
                )}
                {data?.length > 0 && (
                  <div className="my-4 flex gap-0">
                    <p className="line-clamp-1 w-24 font-roboto text-sm font-semibold text-black">
                      Image
                    </p>

                    <p className="line-clamp-1 w-80 font-roboto text-sm font-semibold text-black">
                      Product Name
                    </p>

                    <p className="line-clamp-1 w-36 font-roboto text-sm font-semibold text-black">
                      SKU
                    </p>

                    <p className="line-clamp-1 w-24 font-roboto text-sm font-semibold text-black">
                      Price
                    </p>

                    <p className="line-clamp-1 w-28 font-roboto text-sm font-semibold text-black">
                      Promo Price
                    </p>

                    <p className="line-clamp-1 w-28 font-roboto text-sm font-semibold text-black">
                      Stock
                    </p>
                  </div>
                )}
                {data?.map((product: any) => <ProductRow product={product} />)}
              </div>
            </TabsContent>

            <TabsContent value="filters">
              <div className="mt-6 flex w-96 flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <Button onClick={onFilterProducts}>Filter Products</Button>
                    <p className="font-semiboldfont-roboto text-sm text-themeBlue">
                      {!data
                        ? "No Products Filtered"
                        : `${data.length} Products Filtered`}
                    </p>
                  </div>

                  <ShadButton
                    size={"sm"}
                    onClick={onConfirmClick}
                    disabled={!data || data?.length === 0}
                  >
                    Confirm
                  </ShadButton>
                </div>

                <FiltersContext.Provider value={{ filters, setFilters }}>
                  <Facets />
                </FiltersContext.Provider>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogModel>
    </>
  );
};
