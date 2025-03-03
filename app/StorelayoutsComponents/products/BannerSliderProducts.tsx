import React from "react";
import { TemplateProductCard } from "./TemplateProductCard";
import SingleBanner from "../banners/SingleBanner";

export default function BannerSliderProducts() {
  const demoProductsList = Array.from({ length: 8 });
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-4 h-auto w-full">
        <SingleBanner data={{}} />
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-none">
        {demoProductsList.map(() => (
          <TemplateProductCard />
        ))}
      </div>
    </div>
  );
}
