import React from "react";
import { PromoForm } from "./_components/PromoForm";
import { VoucherForm } from "./_components/VoucherForm";
import FreeShippingForm from "./_components/FreeShippingForm";
import { getBucketWithPromo } from "./_serverFn/getBucketWithPromo";
import { notFound } from "next/navigation";

type SearchParams = Promise<{
  bucketId?: string;
  voucherId?: string;
  freeShippingId?: string;
  type: "voucher" | "freeShipping";
}>;

export default async function PromosEditPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { type, bucketId, voucherId, freeShippingId } = await searchParams;

  const isEditing = bucketId && (freeShippingId || voucherId);

  const promoBucket = isEditing
    ? await getBucketWithPromo({ bucketId, voucherId, freeShippingId })
    : undefined;

  if (
    (isEditing && !promoBucket) ||
    (bucketId && voucherId && !promoBucket?.voucher) ||
    (bucketId && freeShippingId && !promoBucket?.freeShipping)
  )
    notFound();

  return (
    <div className="flex flex-col gap-12 h-full overflow-y-auto">
      <h1 className="text-2xl w-full text-center font-bold text-gray-800">
        {type === "voucher"
          ? isEditing
            ? "Edit Voucher"
            : "Add Voucher"
          : isEditing
          ? "Edit Free Shipping"
          : "Add Free Shipping"}
      </h1>

      <div className="max-h-full p-1 flex-1">
        {type === "voucher" ? (
          <VoucherForm
            bucketId={bucketId}
            voucherId={voucherId}
            voucher={promoBucket?.voucher}
          />
        ) : (
          <FreeShippingForm
            bucketId={bucketId}
            freeShippingId={freeShippingId}
            freeShipping={promoBucket?.freeShipping}
          />
        )}
      </div>
    </div>
  );
}
