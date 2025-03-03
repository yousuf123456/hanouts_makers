"use client";
import Backdrop from "@mui/material/Backdrop/Backdrop";
import Image from "next/image";
import React from "react";

interface ImagePreviewProps {
  open: boolean;
  imageUrl: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  setOpen,
  open,
}) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 10000 }}
      onClick={() => setOpen(false)}
      open={open}
    >
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={imageUrl}
          alt="Picture"
          width={"0"}
          height={"0"}
          sizes="100vw"
          className="object-cover w-[60%] max-h-[80%] h-auto"
        />
      </div>
    </Backdrop>
  );
};
