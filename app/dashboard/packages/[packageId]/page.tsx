import React from "react";
import { Package } from "./_components/Package";

export default async function PackageDetailsPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <div className="flex flex-col gap-8 h-full overflow-y-auto">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Package Details</h1>
      </div>

      <div className="max-h-full p-1 flex-1">
        <Package packageId={packageId} />
      </div>
    </div>
  );
}
