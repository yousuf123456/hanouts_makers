import React from "react";
import Image from "next/image";
import { PlacholderImage } from "./StoreBanner";
import clsx from "clsx";

export const MiniPreview = () => {
  return (
    <div className="grid w-64 grid-cols-3 gap-4">
      <div className="col-span-2 flex aspect-4 items-center justify-center rounded-sm bg-neutral-200">
        1
      </div>

      <div className="flex flex-col gap-0">
        <p className="text-sm text-black">......</p>
        <p className="text-sm text-black">...................</p>
      </div>
    </div>
  );
};

interface FeaturedImageBannerProps {
  data: {
    banner?: string;
    heading?: string;
    description?: string;
  };
}

export default function FeaturedImageBanner({
  data,
}: FeaturedImageBannerProps) {
  return (
    <div
      className={clsx(
        "relative grid grid-cols-1 gap-3",

        "@md:grid-cols-6 @md:gap-5 @lg:grid-cols-5",
      )}
    >
      <div
        className={clsx(
          "relative aspect-2 h-auto w-full",

          "@[520px]:aspect-3 @md:col-span-4 @lg:col-span-3",
        )}
      >
        {data.banner ? (
          <Image
            alt="Banner"
            src={data.banner}
            fill
            className=" object-cover"
          />
        ) : (
          <PlacholderImage
            className={clsx("h-auto w-10 sm:w-12 lg:w-14", "@sm:w-12 @lg:w-14")}
          />
        )}
      </div>

      <div className={clsx("flex items-center", "@md:col-span-2")}>
        <div className=" flex flex-col justify-start gap-3">
          <h1
            className={clsx(
              "absolute font-text text-sm font-semibold capitalize text-white",

              "left-3 top-3 bg-black bg-opacity-60 px-1 @[420px]:text-base @md:static @md:bg-transparent @md:bg-opacity-100 @md:px-0 @md:text-lg @md:text-themeSecondary @lg:text-xl",
            )}
          >
            Main Heading Here
          </h1>

          <p
            className={clsx(
              "font-roboto text-[15px] leading-5 text-black",
              "@lg:text-base",
            )}
          >
            Banner Description Here Which Can be Anything Catchy
          </p>
        </div>
      </div>
    </div>
  );
}
