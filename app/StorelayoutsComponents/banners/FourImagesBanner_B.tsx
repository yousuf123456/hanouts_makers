import React from "react";
import Image from "next/image";
import { PlacholderImage } from "./StoreBanner";

export const MiniPreview = () => {
  return (
    <div className="grid w-64 grid-cols-1 gap-2">
      <div className="grid grid-cols-5 items-center gap-2">
        <div className="col-span-4 flex aspect-4 items-center justify-center bg-neutral-200">
          1
        </div>
        <div className="col-span-1 flex aspect-1 items-center justify-center bg-neutral-200">
          2
        </div>
      </div>

      <div className="grid grid-cols-5 items-center gap-2">
        <div className="col-span-1 flex aspect-1 items-center justify-center bg-neutral-200">
          3
        </div>
        <div className="col-span-4 flex aspect-4 items-center justify-center bg-neutral-200">
          4
        </div>
      </div>
    </div>
  );
};

interface FourImagesBanner_BProps {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
    banner4?: string;
  };
}

export default function FourImagesBanner_B({ data }: FourImagesBanner_BProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-8 items-center gap-4 @lg:grid-cols-10">
        <div className="relative col-span-6 aspect-3 @lg:col-span-8 @lg:aspect-4 ">
          {data.banner1 ? (
            <Image
              alt="Banner 1"
              src={data.banner1}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-9" />
          )}
        </div>
        <div className="relative col-span-2 aspect-1 ">
          {data.banner2 ? (
            <Image
              alt="Banner 2"
              src={data.banner2}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-9" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-8 items-center gap-4 @lg:grid-cols-10">
        <div className="relative col-span-2 aspect-1 ">
          {data.banner3 ? (
            <Image
              alt="Banner 3"
              src={data.banner3}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-9" />
          )}
        </div>
        <div className="relative col-span-6 aspect-3 @lg:col-span-8 @lg:aspect-4 ">
          {data.banner4 ? (
            <Image
              alt="Banner 4"
              src={data.banner4}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="h-auto w-9" />
          )}
        </div>
      </div>
    </div>
  );
}
