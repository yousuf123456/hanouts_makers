import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";

export const FormActions = () => {
  return (
    <div className="absolute bottom-5 right-5">
      <div className="flex items-center gap-6">
        <SheetClose type="button">Cancel</SheetClose>

        <Button type="submit" className="bg-themeBlue hover:bg-blue-500">
          Confirm
        </Button>
      </div>
    </div>
  );
};
