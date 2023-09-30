"use client";
import { dashboardSideBarLinks } from "@/app/constants/seller";
import Image from "next/image";
import React, { useState } from "react";
import { RootSidebarLink } from "./RootSidebarLink";
import { HiChevronLeft } from "react-icons/hi";
import { cn } from "@/app/utils/cn";

export const SideBar = () => {
  const [close, setClose] = useState(false);
  const routes = dashboardSideBarLinks;

  return (
    <>
      <div
        className={cn("w-72 transition-all flex-shrink-0", close && "w-20")}
      />
      <div
        className={cn(
          "w-72 z-[999] fixed left-0 top-0 flex-shrink-0 min-h-screen shadow-xl transition-all duration-300",
          close && "w-20"
        )}
      >
        <div className="flex flex-col gap-10">
          <div
            className={cn(
              "relative flex gap-4 justify-center items-center px-4 pt-6 pb-10 shadow-md"
            )}
          >
            <div className={cn("relative w-11 h-11")}>
              <Image src={"/logos/HandoutsLOGO.png"} alt="Handouts Logo" fill />
            </div>

            {!close && (
              <h1 className="text-xl leading-6 font-text font-extrabold text-themeSecondary">
                Handouts <br /> Makers
              </h1>
            )}

            <div className=" absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-8 h-8 rounded-full bg-themeBlue transition-all hover:bg-blue-600 cursor-pointer flex justify-center items-center">
              <HiChevronLeft
                onClick={() => setClose((prev) => !prev)}
                className={cn(
                  "w-5 h-5 text-white transition-all",
                  close && " rotate-180"
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {routes.map((route, i) => {
              if (route.root)
                return (
                  <RootSidebarLink
                    key={i}
                    collapsed={close}
                    Icon={route.Icon}
                    label={route.label}
                    childs={route.childs!}
                  />
                );
              else return null;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
