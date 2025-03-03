import React from "react";
import Image from "next/image";
import { PlacholderImage } from "./StoreBanner";

export const MiniPreview = () => {
  return (
    <div className="grid h-16 w-48 grid-cols-5 items-center gap-2">
      <div className="col-span-1 flex aspect-1 h-auto w-full items-center justify-center bg-neutral-200 text-sm">
        1
      </div>
      <div className=" col-span-3 flex aspect-3 h-auto items-center justify-center bg-neutral-200 text-sm">
        2
      </div>
      <div className=" col-span-1 flex aspect-1 h-auto items-center justify-center bg-neutral-200 text-sm">
        3
      </div>
    </div>
  );
};

interface ThreeImagesBanner_AProps {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
  };
}

export default function ThreeImagesBanner_A({
  data,
}: ThreeImagesBanner_AProps) {
  return (
    <div className="grid grid-cols-5 items-center gap-4">
      <div className="relative col-span-1 aspect-1 h-auto ">
        {data.banner1 ? (
          <Image
            alt="Banner 1"
            src={data.banner1}
            fill
            className=" object-cover"
          />
        ) : (
          <PlacholderImage className="h-auto w-10 @lg:w-14" />
        )}
      </div>

      <div className="relative col-span-3 aspect-2 @md:aspect-3 ">
        {data.banner2 ? (
          <Image
            alt="Banner 2"
            src={data.banner2}
            fill
            className=" object-cover"
          />
        ) : (
          <PlacholderImage className="h-auto w-10 @lg:w-14" />
        )}
      </div>

      <div className="relative col-span-1 aspect-1 h-auto ">
        {data.banner3 ? (
          <Image
            alt="Banner 3"
            src={data.banner3}
            fill
            className=" object-cover"
          />
        ) : (
          <PlacholderImage className="h-auto w-10 @lg:w-14" />
        )}
      </div>
    </div>
  );
}
