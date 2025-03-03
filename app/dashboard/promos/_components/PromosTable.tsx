"use client";

import React, { useState } from "react";

import { FreeShipping, Voucher } from "@prisma/client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "../../_components/DataTable";
import { PROMOS_PER_PAGE } from "@/app/_config/pagination";
import { VouchersColumns } from "./VoucherColumns";
import { FreeShippingsColumns } from "./FreeShippingsColumns";

export const PromosTable = ({
  promos,
  totalCount,
}: {
  promos: { vouchers: Voucher[]; freeShippings: FreeShipping[] };
  totalCount: { vouchers: number; freeShippings: number };
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Tabs defaultValue="vouchers">
        <TabsList className="grid w-full mb-12 grid-cols-2 max-w-[400px] mx-auto">
          <TabsTrigger value="vouchers">Vouchers</TabsTrigger>

          <TabsTrigger value="freeShippings">Free Shippings</TabsTrigger>
        </TabsList>

        <TabsContent value="vouchers">
          <DataTable
            data={promos.vouchers}
            columns={VouchersColumns}
            rowCount={totalCount.vouchers}
            pageSize={PROMOS_PER_PAGE}
          />
        </TabsContent>

        <TabsContent value="freeShippings">
          <DataTable
            data={promos.freeShippings}
            columns={FreeShippingsColumns}
            rowCount={totalCount.freeShippings}
            pageSize={PROMOS_PER_PAGE}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
