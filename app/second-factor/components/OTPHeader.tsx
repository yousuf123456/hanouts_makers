import Image from "next/image";
import React from "react";

export const OTPHeader = () => {
  return (
    <div className="flex flex-col items-center gap-16">
      <Image
        src={"/logos/HandoutsLOGO.png"}
        alt="Handouts Logo"
        height={64}
        width={64}
      />

      <h1 className="font-roboto text-3xl font-semibold text-themeBlue">
        OTP Verification
      </h1>
    </div>
  );
};
