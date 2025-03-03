import React from "react";
import Image from "next/image";

interface ProductRowProps {
  product: any;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <div className="flex items-center gap-0">
      <div className="w-24">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            alt="Product Picture"
            src={product.image}
            className=" object-cover"
            fill
          />
        </div>
      </div>

      <p className="line-clamp-1 w-80 font-roboto text-sm text-black">
        {product.name}
      </p>

      <p className="line-clamp-1 w-36 font-roboto text-sm text-black">
        {product.SKU}
      </p>

      <p className="line-clamp-1 w-24 font-roboto text-sm text-black">
        {product.price}
      </p>

      <p className="line-clamp-1 w-28 font-roboto text-sm text-black">250</p>

      <p className="line-clamp-1 w-28 font-roboto text-sm text-black">
        {product.quantity}
      </p>
    </div>
  );
};
