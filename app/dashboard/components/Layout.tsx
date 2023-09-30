import React from "react";
import { SideBar } from "./SideBar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("flex overflow-x-hidden", className)}>
      <SideBar />

      {children}
    </div>
  );
};
