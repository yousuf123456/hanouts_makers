"use client";
import React from "react";

import { routes } from "@/app/constants/routes";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavigationMenu = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "My Pages",
      href: routes.storeDecoration,
    },
    {
      name: "Pages Preview",
      href: routes.storePagesPreview,
    },
    {
      name: "Pages Editor",
      href: routes.storePagesEditor,
    },
  ];

  return (
    <nav className="flex items-center gap-24">
      {links.map((link) => (
        <Link href={link.href}>
          <li className="list-none font-roboto text-black tracking-tight font-medium relative group">
            {link.name}

            <div
              className={cn(
                "absolute left-0 -bottom-1 w-0 group-hover:w-full transition-all h-[3px] rounded-full bg-themeBlue",
                pathname.includes(link.href) && "w-full"
              )}
            />
          </li>
        </Link>
      ))}
    </nav>
  );
};
