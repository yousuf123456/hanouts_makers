import React from "react";
import {
  Popover as ShadPopover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PopoverProps {
  open: boolean;
  setOpen: any;
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({
  open,
  setOpen,
  children,
}) => {
  return (
    <ShadPopover open={open} onOpenChange={setOpen}>
      {/* <PopoverTrigger>Open</PopoverTrigger> */}
      <PopoverContent>{children}</PopoverContent>
    </ShadPopover>
  );
};
