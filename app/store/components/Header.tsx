import Image from "next/image";
import React from "react";
import { NavigationMenu } from "./NavigationMenu";
import { Store } from "lucide-react";

export const Header = () => {
  return (
    <div className="px-12 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src={"/logos/HandoutsLOGO.png"}
            alt="Handouts Logo"
            height={44}
            width={44}
          />

          <h1 className="text-lg leading-5 font-text font-extrabold text-themeBlue">
            Handouts <br /> <span className="text-themeSecondary">Makers</span>
          </h1>
        </div>

        <NavigationMenu />

        <div className="px-4 py-2 rounded-lg bg-themeBlue flex items-center gap-5">
          <Store className="text-white w-5 h-5" />

          <h2 className="text-white font-text text-base ">Store Builder</h2>
        </div>
      </div>
    </div>
  );
};
