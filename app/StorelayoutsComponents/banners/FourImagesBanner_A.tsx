import React from "react";
import Image from "next/image";
import { PlacholderImage } from "./StoreBanner";

export const MiniPreview = () => {
  return (
    <div className="w-28 grid grid-cols-2 gap-1">
      <div className="flex items-center justify-center h-auto aspect-1 bg-slate-200">
        1
      </div>
      <div className="flex items-center justify-center h-auto aspect-1 bg-slate-200">
        2
      </div>
      <div className="flex items-center justify-center h-auto aspect-1 bg-slate-200">
        3
      </div>
      <div className="flex items-center justify-center h-auto aspect-1 bg-slate-200">
        4
      </div>
    </div>
  );
};

interface FourImagesBanner_AProps {
  data: {
    banner1?: string;
    banner2?: string;
    banner3?: string;
    banner4?: string;
  };
}

export default function FourImagesBanner_A({ data }: FourImagesBanner_AProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid-cols-2 grid gap-3">
        <div className="aspect-1 w-full h-auto relative ">
          {data.banner1 ? (
            <Image
              alt="Banner 1"
              src={data.banner1}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="w-9 h-auto" />
          )}
        </div>
        <div className="aspect-1 w-full h-auto relative ">
          {data.banner2 ? (
            <Image
              alt="Banner 2"
              src={data.banner2}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="w-9 h-auto" />
          )}
        </div>
      </div>

      <div className="grid-cols-2 grid gap-3">
        <div className="aspect-1 w-full h-auto relative ">
          {data.banner3 ? (
            <Image
              alt="Banner 3"
              src={data.banner3}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="w-9 h-auto" />
          )}
        </div>
        <div className="aspect-1 w-full h-auto relative">
          {data.banner4 ? (
            <Image
              alt="Banner 4"
              src={data.banner4}
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage className="w-9 h-auto" />
          )}
        </div>
      </div>
    </div>
  );
}
