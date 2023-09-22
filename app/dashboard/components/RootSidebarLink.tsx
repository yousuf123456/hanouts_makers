"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { HiChevronDown } from "react-icons/hi2";
import { SidebarLink } from "./SidebarLink";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RootSidebarLinkProps {
  label: string;
  childs: any[];
  Icon: IconType;
  collapsed: boolean;
}

export const RootSidebarLink: React.FC<RootSidebarLinkProps> = ({
  Icon,
  label,
  childs,
  collapsed,
}) => {
  const pathname = usePathname();

  const isSelectedFromThisRoot = () => {
    let yes = false;
    childs.map((childRoute) => {
      if (pathname === childRoute.href) yes = true;
    });
    return yes;
  };

  const [open, setOpen] = useState(isSelectedFromThisRoot);

  const toolTipContent = (
    <div className="flex flex-col gap-4 p-3 rounded-md shadow-md">
      {childs.map((childRoute, i) => (
        <Link href={childRoute.href} key={i}>
          <p className="text-sm cursor-pointer hover:text-themeBlue text-slate-600 font-text">
            {childRoute.label}
          </p>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <Tooltip placement="right" content={collapsed && toolTipContent}>
        <div className="px-2">
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={cn(
              "p-2 group rounded-md transition-all cursor-pointer hover:bg-blue-50",
              open && " bg-blue-50",
              collapsed && "hover:bg-blue-50",
              collapsed && open && "bg-blue-50"
            )}
          >
            <div
              className={cn(
                "flex justify-between items-center gap-3",
                collapsed && "justify-center"
              )}
            >
              <div className="flex gap-3 items-center">
                <Icon
                  className={cn(
                    "w-5 h-5 text-slate-500 group-hover:text-themeBlue transition-all",
                    open && "text-themeBlue",
                    collapsed && "w-6 h-6"
                  )}
                />

                {!collapsed && (
                  <p
                    className={cn(
                      " text-slate-600 line-clamp-1 group-hover:text-themeBlue transition-all text-base font-text",
                      open && "text-themeBlue"
                    )}
                  >
                    {label}
                  </p>
                )}
              </div>

              {!collapsed && (
                <HiChevronDown
                  className={cn(
                    "w-3 h-3 text-slate-500 transition-all group-hover:text-themeBlue",
                    open && "rotate-180 text-themeBlue"
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </Tooltip>

      {open && !collapsed && (
        <div className="flex flex-col gap-0">
          {childs.map((childRoute) => (
            <SidebarLink label={childRoute.label} href={childRoute.href} />
          ))}
        </div>
      )}
    </div>
  );
};
