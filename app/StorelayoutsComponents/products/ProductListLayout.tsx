import { cn } from "@/app/utils/cn";
import React from "react";

interface ProductListLayoutProps {
  customLayout?: string;
  className?: string;
  children: React.ReactNode;
}

export const ProductListLayout: React.FC<ProductListLayoutProps> = ({
  customLayout,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        customLayout ||
          "grid grid-cols-2 @[540px]:grid-cols-3 @md:grid-cols-4 @lg:grid-cols-5 @xl:grid-cols-6",
        "gap-x-2 gap-y-2 @sm:gap-x-3 @sm:gap-y-3",
        className,
      )}
    >
      {children}
    </div>
  );
};
