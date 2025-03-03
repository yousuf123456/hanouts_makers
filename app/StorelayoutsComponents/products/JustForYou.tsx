import React from "react";
import { ProductListLayout } from "./ProductListLayout";
import { TemplateProductCard } from "./TemplateProductCard";

export default function JustForYou() {
  return (
    <ProductListLayout>
      {Array.from({ length: 8 }).map(() => (
        <TemplateProductCard dynamic />
      ))}
    </ProductListLayout>
  );
}
