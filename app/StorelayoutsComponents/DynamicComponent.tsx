import React, { Suspense } from "react";
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";
import { Edit, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModuleHeading } from "./ModuleHeading";
import BackdropLoader from "../sharedComponents/BackdropLoader";

const loadingComponent = (isLoading: DynamicOptionsLoadingProps) => (
  <div className="flex h-48 w-full">
    <BackdropLoader backgroundColor="rgba(0, 0, 0, 0.2)" open={!!isLoading} />
  </div>
);

const StoreBanner = dynamic(() => import("./banners/StoreBanner"), {
  loading: loadingComponent,
});

const FeaturedImageBanner = dynamic(
  () => import("./banners/FeaturedImageBanner"),
  { loading: loadingComponent },
);

const ThreeImagesBanner_A = dynamic(
  () => import("./banners/ThreeImagesBanner_A"),
  { loading: loadingComponent },
);

const ThreeImagesBanner_B = dynamic(
  () => import("./banners/ThreeImagesBanner_B"),
  { loading: loadingComponent },
);

const ThreeImagesBanner_C = dynamic(
  () => import("./banners/ThreeImagesBanner_C"),
  { loading: loadingComponent },
);

const FourImagesBanner_A = dynamic(
  () => import("./banners/FourImagesBanner_A"),
  { loading: loadingComponent },
);

const FourImagesBanner_B = dynamic(
  () => import("./banners/FourImagesBanner_B"),
  { loading: loadingComponent },
);

const CarouselBanner = dynamic(() => import("./banners/CarouselBanner"), {
  loading: loadingComponent,
});

const SingleBanner = dynamic(() => import("./banners/SingleBanner"), {
  loading: loadingComponent,
});

const UnderBudgetProducts = dynamic(
  () => import("./products/UnderBudgetProducts"),
  { loading: loadingComponent },
);

const ProductsRecomendation = dynamic(
  () => import("./products/ProductsRecomendation"),
  { loading: loadingComponent },
);

const SliderProductsRecomendation = dynamic(
  () => import("./products/SliderProductsRecomendation"),
  { loading: loadingComponent },
);

const BannerSliderProducts = dynamic(
  () => import("./products/BannerSliderProducts"),
  { loading: loadingComponent },
);

const JustForYou = dynamic(() => import("./products/JustForYou"), {
  loading: loadingComponent,
});

const Voucher = dynamic(() => import("./promotions/Voucher"), {
  loading: loadingComponent,
});

const componentsMap: any = {
  StoreBanner,
  SingleBanner,
  CarouselBanner,
  FourImagesBanner_A,
  FourImagesBanner_B,
  FeaturedImageBanner,
  ThreeImagesBanner_A,
  ThreeImagesBanner_B,
  ThreeImagesBanner_C,

  SliderProductsRecomendation,
  ProductsRecomendation,
  BannerSliderProducts,
  UnderBudgetProducts,
  JustForYou,

  Voucher,
};

export const DynamicComponent = ({
  data,
  onEdit,
  pcOnly,
  movable,
  onDelete,
  mobileOnly,
  withoutActions,
  componentName,
  useContainerQueries,
  ...props
}: any) => {
  const DynamicComponentToShow = componentsMap[componentName];

  const IconCs =
    "absolute right-3 opacity-0 group-hover:opacity-100 w-5 h-5 z-50 cursor-pointer ";

  return (
    <div
      className={cn(
        "h-full w-full",
        !withoutActions &&
          "group relative flex  flex-col border-[1px] border-sky-200 p-[2px] hover:border-sky-400",
      )}
    >
      {!data.withoutModuleHeading && (
        <ModuleHeading>{data.moduleHeading || "Module Heading"}</ModuleHeading>
      )}

      {!withoutActions && (
        <>
          <div className="absolute inset-0 z-50 bg-sky-400 bg-opacity-0 transition-opacity group-hover:bg-opacity-5" />

          <p className="absolute bottom-2 left-2 z-50 bg-black px-1 font-roboto text-white opacity-60 group-hover:opacity-80">
            {props.name}
          </p>

          <Trash
            onClick={onDelete}
            className={cn(
              IconCs,
              "top-3 text-red-600",
              !movable &&
                "pointer-events-none cursor-not-allowed group-hover:opacity-50",
            )}
          />

          <Edit onClick={onEdit} className={cn(IconCs, "top-12 text-black")} />
        </>
      )}

      <DynamicComponentToShow data={data} />
    </div>
  );
};
