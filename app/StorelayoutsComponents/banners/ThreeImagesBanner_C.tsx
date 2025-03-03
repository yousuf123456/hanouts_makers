import React from "react";
import Image from "next/image";
import { PlacholderImage } from "./StoreBanner";

export const MiniPreview = () => {
  return (
    <div className="grid w-28 grid-cols-1 gap-1">
      <div className="flex aspect-4 h-auto items-center justify-center bg-neutral-200">
        1
      </div>

      <div className="grid grid-cols-2 gap-1">
        <div className="flex aspect-1 h-auto items-center justify-center bg-neutral-200">
          2
        </div>
        <div className="flex aspect-1 h-auto items-center justify-center bg-neutral-200">
          3
        </div>
      </div>
    </div>
  );
};

interface ThreeImagesBanner_CProps {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
  };
}

export default function ThreeImagesBanner_C({
  data,
}: ThreeImagesBanner_CProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="relative aspect-3 h-auto w-full ">
        {data.banner1 ? (
          <Image
            alt="Banner 1"
            src={data.banner1}
            fill
            className=" object-cover"
          />
        ) : (
          <PlacholderImage className="h-auto w-8" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 @[520px]:mx-8 @[520px]:gap-8">
        <div className="relative aspect-1 h-auto w-full ">
          {data.banner2 ? (
            <Image
              alt="Banner 2"
              src={data.banner2}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-8" />
          )}
        </div>
        <div className="relative aspect-1 h-auto w-full ">
          {data.banner3 ? (
            <Image
              alt="Banner 3"
              src={data.banner3}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-8" />
          )}
        </div>
      </div>
    </div>
  );
}
