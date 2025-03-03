import React from "react";
import { TemplateProductCard } from "./TemplateProductCard";

export default function SliderProductsRecomendation() {
  const demoProductsList = Array.from({ length: 8 });
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none">
      {demoProductsList.map(() => (
        <TemplateProductCard />
      ))}
    </div>
  );
}
