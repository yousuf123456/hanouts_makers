import { DynamicComponent } from "@/app/StorelayoutsComponents/DynamicComponent";
import { StorePageType } from "@/app/types";
import { cn } from "@/lib/utils";
import React from "react";
import { MobileOrPCContainer } from "./MobileOrPCContainer";

interface PagePreviewProps {
  page: StorePageType;
}

export const PagePreview: React.FC<PagePreviewProps> = ({ page }) => {
  const layoutComponents = page.layout;
  return (
    <MobileOrPCContainer>
      <div className="flex flex-col gap-6 px-0 @sm:gap-10 @md:gap-14 @lg:gap-16">
        {layoutComponents.map((layoutComponent, i) => {
          return (
            <div
              className={cn(
                i !== 0 && "px-4 @sm:px-8 @md:px-12 @lg:px-16",
                layoutComponent.pcOnly && "hidden @sm:block ",
                layoutComponent.mobileOnly && "@sm:hidden",
              )}
            >
              <DynamicComponent
                key={i}
                withoutActions
                {...layoutComponent}
                componentName={layoutComponent.componentName}
              />
            </div>
          );
        })}
      </div>
    </MobileOrPCContainer>
  );
};
