import React from "react";
import { TemplateProductCard } from "./TemplateProductCard";

export default function UnderBudgetProducts() {
  const demoProductsArray = Array.from({ length: 10 });

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none">
      {demoProductsArray.map(() => (
        <TemplateProductCard />
      ))}
    </div>
  );
}
