import { UploadImage } from "@/app/components/UploadImage";
import React from "react";

interface UploadProductImagesProps {}

export const UploadProductImages: React.FC<UploadProductImagesProps> = ({}) => {
  const noOfImages = 8;
  const imagesArray = Array.from({ length: noOfImages });

  return (
    <div className="flex gap-6 justify-between items-start flex-wrap mt-4">
      {imagesArray.map((_, index) => (
        <UploadImage
          key={index}
          label={index === 0 ? "Cover Photo" : `Image ${index + 1}`}
        />
      ))}
    </div>
  );
};
