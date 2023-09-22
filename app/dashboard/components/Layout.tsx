import React from "react";
import { SideBar } from "./SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex gap-8 bg-white">
      <SideBar />

      {children}
    </div>
  );
};
