import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiPlus } from "react-icons/hi";

interface SidebarLinkProps {
  label: string;
  href: string;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ label, href }) => {
  const onThisPage = usePathname() === href;

  return (
    <Link href={href}>
      <div
        className={cn(
          "py-1.5 pl-8 pr-2 group transition-all hover:bg-gray-100 flex gap-3 items-center",
          onThisPage && "bg-gray-100"
        )}
      >
        <HiPlus
          className={cn(
            "w-3 h-3 text-themeSecondary opacity-60 transition-all group-hover:opacity-100",
            onThisPage && "opacity-100"
          )}
        />

        <p
          className={cn(
            "text-base font-sans font-[500] line-clamp-1 text-themeSecondary opacity-60 transition-all group-hover:opacity-100",
            onThisPage && "opacity-100"
          )}
        >
          {label}
        </p>
      </div>
    </Link>
  );
};
