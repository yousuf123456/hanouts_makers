import React from "react";
import { Header } from "./Header";
import { cn } from "@/app/utils/cn";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="flex flex-col gap-12 max-h-screen overflow-y-auto ">
      <Header />

      <div className={cn("px-20", className)}>{children}</div>
    </div>
  );
};
