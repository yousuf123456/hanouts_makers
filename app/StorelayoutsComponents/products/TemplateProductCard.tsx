import { cn } from "@/app/utils/cn";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface TemplateProductCardProps {
  dynamic?: boolean;
}

export const TemplateProductCard: React.FC<TemplateProductCardProps> = ({
  dynamic,
}) => {
  return (
    <div>
      <div
        className={cn(
          "group relative flex flex-col gap-2 overflow-hidden rounded-sm bg-neutral-200 pb-2",
          dynamic ? "w-full" : "w-[152px] @sm:w-40 @lg:w-48",
        )}
      >
        <div
          className={clsx(
            "relative flex items-center justify-center overflow-hidden",
            dynamic ? " aspect-1 h-auto w-auto" : "@:h-40 @:h-48 h-[152px]",
          )}
        >
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-[40%]"
            alt="Product Image Placeholder"
            src={"/productPlaceholder.webp"}
          />
        </div>

        <div className="flex w-full flex-col gap-3 px-4">
          <div className="h-[6px] w-[80%] rounded-3xl bg-white" />
          <div className="h-[6px] w-[60%] rounded-3xl bg-white" />
        </div>
      </div>
    </div>
  );
};
