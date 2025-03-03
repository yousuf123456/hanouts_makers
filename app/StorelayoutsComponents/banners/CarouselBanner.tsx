"use client";

import React from "react";
import Image from "next/image";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import clsx from "clsx";

export const MiniPreview = () => {
  return (
    <div className="flex aspect-4 h-auto w-56 items-center justify-between rounded-sm bg-slate-200 px-3">
      <HiChevronLeft />
      <HiChevronRight />
    </div>
  );
};

interface CarouselBannerProps {
  data: {
    [key: string]: string;
  };
}

export default function CarouselBanner({ data }: CarouselBannerProps) {
  const images = Object.values(data);
  const imagesToMapOver: string[] | undefined[] = [
    data.banner1,
    data.banner2,
    data.banner3,
    data.banner4,
  ];

  const CarouselButtonsCs = cn(
    "flex items-center bg-black p-0 opacity-30 cursor-pointer z-50",
    "h-full top-0 bottom-0 @sm:bottom-auto @sm:rounded-full @sm:h-auto @sm:top-1/2 @sm:-translate-y-1/2 @sm:p-1.5 @md:p-2 @sm:hover:opacity-70 @sm:transition-opacity",
  );

  return (
    <div className="relative w-full">
      <Carousel
        autoPlay
        showArrows
        infiniteLoop
        interval={5000}
        showStatus={false}
        showIndicators={false}
        renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={cn(
                CarouselButtonsCs,
                "left-0 @sm:left-4",

                hasPrev ? "absolute" : "hidden",
              )}
              onClick={clickHandler}
            >
              <HiChevronLeft className="h-6 w-6 text-white" />
            </div>
          );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
          return (
            <div
              className={cn(
                CarouselButtonsCs,
                hasNext ? "absolute" : "hidden",

                "right-0 @sm:right-4",
              )}
              onClick={clickHandler}
            >
              <HiChevronRight className="h-6 w-6 text-white" />
            </div>
          );
        }}
      >
        {imagesToMapOver.map((image) => (
          <div
            className={cn(
              "relative flex aspect-2 h-auto w-full items-center justify-center bg-neutral-100",

              "@[540px]:aspect-3 @lg:aspect-4",
            )}
          >
            {image ? (
              <Image fill src={image} alt="Banner" className="object-cover" />
            ) : (
              <div className={clsx("relative h-9 w-12", "@md:h-10 @md:w-14")}>
                <Image
                  fill
                  src={"/imagePlaceholder.jpg"}
                  alt="Image Placeholder"
                />
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
