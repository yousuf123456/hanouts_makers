import React from "react";
import { FaPlus } from "react-icons/fa";

interface UploadImageProps {
  label?: string;
}

export const UploadImage: React.FC<UploadImageProps> = ({ label }) => {
  return (
    <div className="flex flex-col gap-2 items-center cursor-pointer">
      <div className="w-20 h-20 rounded-md border-themeBlue border-2 border-dashed flex justify-center items-center">
        <div>
          <FaPlus className="text-themeSecondary opacity-70 w-5 h-5" />
        </div>
      </div>

      <p className="text-sm text-neutral-700">{label}</p>
    </div>
  );
};
