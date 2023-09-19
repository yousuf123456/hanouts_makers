import Image from "next/image";
import React from "react";

export const Handouts = () => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className=" relative h-16 w-16">
        <Image src={"/logos/HandoutsLOGO.png"} alt="Handouts Logo" fill />
      </div>

      <h1 className="font-heading text-xl font-semibold text-themeBlue">
        Handouts Seller <br /> Center
      </h1>
    </div>
  );
};
