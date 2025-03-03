"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export const MobileOrPCContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tabs, setTabs] = useState("pc");

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <Tabs value={tabs} onValueChange={(value) => setTabs(value)}>
        <TabsList>
          <TabsTrigger value="pc" className="w-36">
            PC
          </TabsTrigger>
          <TabsTrigger value="mobile" className="w-36">
            Mobile
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className={cn("@container", tabs === "pc" ? "w-full" : "w-[444px]")}>
        {children}
      </div>
    </div>
  );
};
