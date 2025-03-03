import { PaginationSearchParams } from "@/app/types";
import React from "react";
import { Orders } from "./_components/Orders";

type SearchParams = Promise<PaginationSearchParams>;

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Orders</h1>
      </div>

      <div className="max-h-full p-1 flex-1">
        <Orders page={parseInt(page || "1")} />
      </div>
    </div>
  );
}
