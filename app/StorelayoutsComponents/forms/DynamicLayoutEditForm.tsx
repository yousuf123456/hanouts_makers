import React from "react";
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FieldValues } from "react-hook-form";
import { EditingLayoutData } from "@/app/store/editor/components/EditorForms";

const loadingComponent = (isLoading: DynamicOptionsLoadingProps) => (
  <p>Loading</p>
);

const BannersForm = dynamic(() => import("./banners/BannersForm"), {
  loading: loadingComponent,
});

const ProductsForm = dynamic(() => import("./products/ProductsForm"), {
  loading: loadingComponent,
});

const PromotionsForm = dynamic(() => import("./promotions/PromotionsForm"), {
  loading: loadingComponent,
});

const formMap: any = {
  BannersForm,
  ProductsForm,
  PromotionsForm,
};

interface DynamicLayoutEditFormProps {
  open: boolean;
  onEditLayoutFormSubmit: (componentName: string, data: FieldValues) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editingLayoutData: EditingLayoutData | undefined;
}

export const DynamicLayoutEditForm: React.FC<DynamicLayoutEditFormProps> = ({
  open,
  setOpen,
  editingLayoutData,
  onEditLayoutFormSubmit,
}) => {
  if (!editingLayoutData) return null;

  const FormToRender = formMap[editingLayoutData.formComponentName];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>{editingLayoutData?.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-8 w-full">
          <FormToRender
            initialData={editingLayoutData.data}
            onEditLayoutFormSubmit={onEditLayoutFormSubmit}
            componentName={editingLayoutData.componentName}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
