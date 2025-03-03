import React from "react";

import Link from "next/link";
import Image from "next/image";
import { routes } from "@/app/_config/routes";

export const SidebarHeader = () => {
  return (
    <header className="hidden lg:block">
      <Link className="flex flex-col items-center gap-1 " href={routes.home}>
        <div className="relative h-9 w-14">
          <Image
            src="/logos/HandoutsLOGO.png"
            className=" object-contain"
            alt="Logo"
            fill
          />
        </div>

        <p
          className={
            "bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-clip-text font-semibold tracking-tight uppercase text-transparent sm:block text-base"
          }
        >
          Handouts Makers
        </p>
      </Link>
    </header>
  );
};
