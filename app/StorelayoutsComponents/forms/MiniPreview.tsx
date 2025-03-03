import React from "react";
import dynamic from "next/dynamic";

const FeaturedImageBanner = dynamic(() =>
  import("../banners/FeaturedImageBanner").then((mod) => mod.MiniPreview)
);

const ThreeImagesBanner_A = dynamic(() =>
  import("../banners/ThreeImagesBanner_A").then((mod) => mod.MiniPreview)
);

const ThreeImagesBanner_B = dynamic(() =>
  import("../banners/ThreeImagesBanner_B").then((mod) => mod.MiniPreview)
);
// const ThreeImagesBanner_C = dynamic(
//   () => import("../banners/ThreeImagesBanner_C")
// );
const FourImagesBanner_A = dynamic(() =>
  import("../banners/FourImagesBanner_A").then((mod) => mod.MiniPreview)
);
const FourImagesBanner_B = dynamic(() =>
  import("../banners/FourImagesBanner_B").then((mod) => mod.MiniPreview)
);
const CarouselBanner = dynamic(() =>
  import("../banners/CarouselBanner").then((mod) => mod.MiniPreview)
);
const SingleBanner = dynamic(() =>
  import("../banners/SingleBanner").then((mod) => mod.MiniPreview)
);

const MiniPreviewsMap: any = {
  ThreeImagesBanner_A,
  ThreeImagesBanner_B,
  FeaturedImageBanner,
  FourImagesBanner_A,
  FourImagesBanner_B,
  CarouselBanner,
  SingleBanner,
};

interface MiniPreviewProps {
  componentName: string;
}

export const MiniPreview: React.FC<MiniPreviewProps> = ({ componentName }) => {
  const MiniPreviewToShow = MiniPreviewsMap[componentName];
  return MiniPreviewToShow && <MiniPreviewToShow />;
};
