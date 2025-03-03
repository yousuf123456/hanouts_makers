import React, { useState } from "react";
import { LayoutPreview } from "./LayoutPreview";
import { StrictModeDroppable } from "./Droppable";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { StoreLayoutsType } from "@/app/types";

interface LayoutsListSheetProps {
  open: boolean;
  initialLayouts: StoreLayoutsType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLayoutCat: "banner" | "product" | "promotion" | undefined;
}

export const LayoutsListSheet: React.FC<LayoutsListSheetProps> = ({
  open,
  setOpen,
  initialLayouts,
  selectedLayoutCat,
}) => {
  const [layouts, setLayouts] = useState(initialLayouts);
  console.log(layouts);

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetContent side={"left"} className="overflow-y-auto scrollbar-none">
        <SheetHeader>
          <SheetTitle className=" capitalize">
            {selectedLayoutCat} Layouts
          </SheetTitle>
          <SheetDescription>
            Drag And Drop Any Layout From The Following
          </SheetDescription>
        </SheetHeader>

        <StrictModeDroppable droppableId="layoutsList">
          {(provided) => (
            <div
              className="mt-8 flex flex-col gap-5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {Object.keys(layouts[selectedLayoutCat || "banner"]).map(
                (layoutKey, i) => (
                  <LayoutPreview
                    key={i}
                    index={i}
                    mobileOnly={
                      !!layouts[selectedLayoutCat || "banner"][layoutKey]
                        .mobileOnly
                    }
                    pcOnly={
                      !!layouts[selectedLayoutCat || "banner"][layoutKey].pcOnly
                    }
                    previewImage=""
                    layoutName={
                      layouts[selectedLayoutCat || "banner"][layoutKey].name
                    }
                  />
                ),
              )}

              {
                //@ts-ignore
                provided.placeholder
              }
            </div>
          )}
        </StrictModeDroppable>
      </SheetContent>
    </Sheet>
  );
};
