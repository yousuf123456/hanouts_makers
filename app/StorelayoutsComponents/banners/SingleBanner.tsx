import React from "react";
import Image from "next/image";
import { PlacholderImage } from "./StoreBanner";

export const MiniPreview = () => {
  return (
    <div className=" flex aspect-4 h-auto w-52 items-center justify-center rounded-sm bg-neutral-200">
      1
    </div>
  );
};

interface SingleBannerProps {
  data: {
    banner?: string;
  };
}

export default function SingleBanner({ data }: SingleBannerProps) {
  return (
    <div className="relative  aspect-2 h-auto w-full @[540px]:aspect-3 @lg:aspect-4">
      {data.banner ? (
        <Image alt="Banner" src={data.banner} fill className=" object-cover" />
      ) : (
        <PlacholderImage className="h-auto w-10 @sm:w-12 @lg:w-14" />
      )}
    </div>
  );
}
