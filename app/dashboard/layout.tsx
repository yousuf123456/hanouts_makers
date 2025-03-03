"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { PanelRight, X } from "lucide-react";

import Image from "next/image";

import { Sidebar } from "./_components/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex gap-3 flex-1 overflow-hidden bg-muted/50 p-2 sm:p-3 h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-1 overflow-y-hidden">
        {/* Dashboard Title and Toggle */}
        <div className="flex items-center justify-between lg:hidden px-2">
          <div className="relative h-9 w-14">
            <Image
              src="/logos/HandoutsLOGO.png"
              className=" object-contain"
              alt="Logo"
              fill
            />
          </div>

          <Button size="icon" variant="ghost" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <PanelRight className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        <div className="rounded-lg p-6 bg-white shadow border border-gray-100 flex-1 max-h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
