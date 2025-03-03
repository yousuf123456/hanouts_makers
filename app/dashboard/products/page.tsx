import React from "react";

import Link from "next/link";
import { routes } from "@/app/_config/routes";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Products } from "./_components/Products";
import { PaginationSearchParams } from "@/app/types";

type SearchParams = Promise<PaginationSearchParams>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Listed Products</h1>

        <Link
          href={routes.addProduct}
          className={buttonVariants({
            variant: "outline",
            className: "justify-between py-5",
          })}
        >
          Add New Product
          <PlusCircle className="ml-1 w-[18px] h-[18px]" />
        </Link>
      </div>

      <div className="max-h-full p-1 flex-1">
        <Products page={parseInt(page || "1")} />
      </div>
    </div>
  );
}
