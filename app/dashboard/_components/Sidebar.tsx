import React from "react";

import Link from "next/link";
import Image from "next/image";
import { routes } from "@/app/_config/routes";

import {
  ChartNoAxesCombined,
  ChevronsUpDown,
  Container,
  Image as ImageIcon,
  LogOut,
  Package,
  PackagePlus,
  Store,
  TicketPercent,
  Truck,
  Undo2,
  User,
  X,
  XCircle,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarHeader } from "./SidebarHeader";

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dashboardLinks = [
    {
      Icon: Package,
      label: "Listed Products",
      href: routes.products,
    },
    {
      Icon: PackagePlus,
      label: "Add Product",
      href: routes.addProduct,
    },
    {
      Icon: ImageIcon,
      label: "Media Center",
      href: routes.mediaCenter,
    },
    {
      Icon: Truck,
      label: "View Packages",
      href: routes.packages,
    },
    {
      Icon: Undo2,
      label: "View Return Orders",
      href: routes.returnOrders,
    },
    {
      Icon: XCircle,
      label: "View Vancelled Orders",
      href: routes.cancelledOrders,
    },
    {
      label: "Analytics",
      href: routes.analytics,
      Icon: ChartNoAxesCombined,
    },
    {
      Icon: TicketPercent,
      label: "Manage Promos",
      href: routes.promos,
    },
    {
      Icon: Store,
      label: "Manage Store",
      href: routes.storeManagement,
    },
  ];

  const pathname = usePathname();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black bg-opacity-[0.85] transition-opacity lg:hidden"
          onClick={() => setSidebarOpen((prev) => !prev)}
        ></div>
      )}

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col fixed inset-y-0 left-0 z-50 w-80 lg:w-64 max-lg:bg-white transform transition-transform duration-300 ease-in-out max-lg:z-[9999] lg:static lg:inset-auto lg:translate-x-0 lg:transform-none`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-lg font-semibold">Menu</span>

          <X
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="h-4 w-4 text-gray-600"
          />
        </div>

        <SidebarHeader />

        <nav className="flex-1 space-y-2 py-8 flex-grow overflow-y-auto scrollbar-none max-lg:px-3">
          {dashboardLinks.map(({ href, Icon, label }, i) => (
            <Link
              key={i}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-full justify-start hover:bg-zinc-200/30 group h-11",
                href === pathname && "bg-zinc-200/30"
              )}
            >
              <Icon
                className={cn(
                  "mr-0.5 h-[18px] w-[18px] text-gray-500 group-hover:text-gray-700",
                  href === pathname && "text-gray-700"
                )}
              />

              <p
                className={cn(
                  "text-sm font-medium text-gray-500 group-hover:text-gray-700",
                  href === pathname && "text-gray-700"
                )}
              >
                {label}
              </p>
            </Link>
          ))}
        </nav>

        <SidebarFooter />
      </aside>
    </>
  );
};
