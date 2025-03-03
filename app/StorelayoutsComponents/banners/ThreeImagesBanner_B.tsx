import React from "react";
import Image from "next/image";
import { PlacholderImage } from "./StoreBanner";

export const MiniPreview = () => {
  return (
    <div className="grid w-24 grid-cols-1 gap-1">
      <div className="grid grid-cols-4 items-center gap-1">
        <div className="col-span-3 flex aspect-4 h-auto items-center justify-center bg-neutral-200">
          1
        </div>
        <div className="col-span-1 flex aspect-1 h-auto items-center justify-center bg-neutral-200">
          2
        </div>
      </div>

      <div className="flex aspect-1 h-auto items-center justify-center bg-neutral-200">
        3
      </div>
    </div>
  );
};

interface ThreeImagesBanner_B {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
  };
}

export default function ThreeImagesBanner_B({ data }: ThreeImagesBanner_B) {
  return (
    <div className="grid grid-cols-5 items-center gap-4">
      <div className="relative col-span-3 aspect-2 @md:aspect-3 ">
        {data.banner2 ? (
          <Image
            alt="Banner 1"
            src={data.banner2}
            fill
            className=" object-cover"
          />
        ) : (
          <PlacholderImage className="h-auto w-10 @lg:w-14" />
        )}
      </div>

      <div className="relative col-span-1 aspect-1 h-auto ">
        {data.banner1 ? (
          <Image
            alt="Banner 2"
            src={data.banner1}
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
