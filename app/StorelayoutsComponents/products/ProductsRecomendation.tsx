import React from "react";
import { ProductListLayout } from "./ProductListLayout";
import { TemplateProductCard } from "./TemplateProductCard";

interface ProductsRecomendationProps {
  data: {};
}

export default function ProductsRecomendation({}: ProductsRecomendationProps) {
  const demoProductsList = Array.from({ length: 8 });
  return (
    <ProductListLayout>
      {demoProductsList.map(() => (
        <TemplateProductCard dynamic />
      ))}
    </ProductListLayout>
  );
}
