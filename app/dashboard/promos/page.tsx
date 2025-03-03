import React from "react";

import Link from "next/link";
import { routes } from "@/app/_config/routes";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { PaginationSearchParams } from "@/app/types";
import { Promos } from "./_components/Promos";

type SearchParams = Promise<PaginationSearchParams>;

export default async function PromosPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;

  return (
    <div className="flex flex-col gap-16 h-full overflow-y-auto">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Listed Promos</h1>

        <div className="flex gap-3">
          <Link
            href={routes.addVoucher}
            className={buttonVariants({
              variant: "outline",
              className: "justify-between py-5",
            })}
          >
            Add Voucher
            <PlusCircle className="ml-1 w-[18px] h-[18px]" />
          </Link>

          <Link
            href={routes.addFreeShipping}
            className={buttonVariants({
              variant: "outline",
              className: "justify-between py-5",
            })}
          >
            Add Free Shipping
            <PlusCircle className="ml-1 w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>

      <div className="max-h-full flex-1 p-1">
        <Promos page={parseInt(page || "1")} />
      </div>
    </div>
  );
}
