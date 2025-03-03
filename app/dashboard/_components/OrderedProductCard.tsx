import React from "react";

import { Badge } from "@/components/ui/badge";
import { OrderedProduct } from "@prisma/client";
import Image from "next/image";

export const OrderedProductCard = ({
  orderedProduct,
  hideStatus,
}: {
  orderedProduct: OrderedProduct;
  hideStatus?: boolean;
}) => {
  return (
    <div
      key={orderedProduct.id}
      className="flex flex-col gap-4 sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative h-[68px] w-[68px] overflow-hidden rounded sm:h-20 sm:w-20">
          <Image
            fill
            alt={"Product Image"}
            className={"object-cover"}
            src={orderedProduct.product.image || ""}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-medium uppercase">
            {orderedProduct.product.name}
          </p>
          <div className="flex gap-2">
            <p className="text-sm text-muted-foreground">
              Qty: {orderedProduct.quantity}
            </p>
            <p className="text-sm text-muted-foreground">
              {Object.values(
                orderedProduct.selectedCombination?.combination || {}
              ).join(", ")}
            </p>
          </div>
          <p className="text-sm font-medium">
            Rs. {orderedProduct.priceAtOrderTime}
          </p>
        </div>
      </div>

      {!hideStatus && (
        <Badge
          className="w-fit"
          variant={
            orderedProduct.status === "Delievered" ? "secondary" : "outline"
          }
        >
          {orderedProduct.status}
        </Badge>
      )}
    </div>
  );
};
