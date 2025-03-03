import React from "react";
import Image from "next/image";

export const Error = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image alt="Error Picture" src={"/error.jpg"} width={350} height={350} />
    </div>
  );
};
