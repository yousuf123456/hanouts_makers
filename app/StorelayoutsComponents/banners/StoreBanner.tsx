import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface StoreBannerProps {
  data: {
    logo?: string;
    banner?: string;
    storeName?: string;
    bannerColor?: string;
    isColorBanner?: boolean;
  };
}

export const PlacholderImage = ({
  className,
  ContainerCs,
}: {
  className: string;
  ContainerCs?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-sm bg-neutral-100",
        ContainerCs
      )}
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        className={className}
        alt="Placeholder Image"
        src={"/imagePlaceholder.jpg"}
      />
    </div>
  );
};

export default function StoreBanner({ data }: StoreBannerProps) {
  const aspectRatio = [21, 9];
  const paddingBottom = `${(aspectRatio[1] / aspectRatio[0]) * 100}%`;

  const bannerColor = "#000000";
  return (
    <div className="relative flex w-full flex-col gap-5 ">
      <div
        className={"relative aspect-3 h-auto w-full @lg:aspect-4"}
        style={
          data.isColorBanner ? { backgroundColor: data.bannerColor } : undefined
        }
      >
        {!data.isColorBanner &&
          (data.banner ? (
            <Image
              alt="Store Banner"
              fill={!!data.banner}
              className={cn("object-cover", !data.banner && "h-auto w-16")}
              src={data.banner || "/imagePlaceholder.jpg"}
            />
          ) : (
            <PlacholderImage className="h-auto w-10 @sm:w-14 @lg:w-16" />
          ))}
      </div>

      <div className="absolute left-5 top-5 flex gap-4 px-5 @sm:static @md:px-10 @lg:px-16">
        <div className="relative h-16 w-16 overflow-hidden @sm:h-20 @sm:w-20 @lg:h-24 @lg:w-24">
          {data.logo ? (
            <Image
              src={data.logo}
              alt="Store Logo"
              fill
              className=" object-cover"
            />
          ) : (
            <PlacholderImage
              className="h-auto w-6 @sm:w-7 @lg:w-9"
              ContainerCs="bg-neutral-200 @sm:bg-neutral-100"
            />
          )}
        </div>

        <div className="flex flex-col gap-0">
          <p className="font-text text-sm font-semibold text-black @sm:text-base @sm:text-themeBlue @lg:text-lg">
            {data.storeName || "Store Name Here"}
          </p>
        </div>
      </div>
    </div>
  );
}
