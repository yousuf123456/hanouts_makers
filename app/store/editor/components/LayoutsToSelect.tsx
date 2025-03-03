import React from "react";
import { StoreLayoutsType } from "@/app/types";
import { Flag, Gift, Tag } from "lucide-react";

interface LayoutsToSelectProps {
  setSelectedLayoutCat: React.Dispatch<
    React.SetStateAction<"banner" | "product" | "promotion" | undefined>
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutsToSelect: React.FC<LayoutsToSelectProps> = ({
  setOpen,
  setSelectedLayoutCat,
}) => {
  const className =
    "p-3 flex flex-col gap-3 items-center rounded-sm border-[1px] border-dashed border-sky-500 opacity-70 hover:opacity-100 cursor-pointer transition-opacity";

  const onClick = (layoutCategory: "banner" | "product" | "promotion") => {
    setSelectedLayoutCat(layoutCategory);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className={className} onClick={() => onClick("banner")}>
        <Flag />
        <p className="text-black font-roboto">Banners</p>
      </div>

      <div className={className} onClick={() => onClick("product")}>
        <Gift />
        <p className="text-black font-roboto">Products</p>
      </div>

      <div className={className} onClick={() => onClick("promotion")}>
        <Tag />
        <p className="text-black font-roboto ">Promotions</p>
      </div>
    </div>
  );
};
