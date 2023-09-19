import { UploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface UploadProps {
  label: string;
}

export const Upload: React.FC<UploadProps> = ({ label }) => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];

    setSelectedImage(file);
  };

  // useEffect(() => {
  //   if (selectedImage) {
  //     console.log("Hello");
  //     Tesseract.recognize(selectedImage, "eng")
  //       .then(({ data }) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error performing OCR:", error);
  //       });
  //   }
  // }, [selectedImage]);

  const onClick = () => {
    const uploader = document.getElementById("Uploader");
    uploader?.click();
  };

  return (
    <div
      onClick={onClick}
      className=" flex h-28 w-full cursor-pointer items-center justify-center rounded-md border-[1px] border-dashed border-themeBlue"
    >
      <input id="Uploader" onChange={handleImageUpload} hidden type="file" />
      <div className="flex flex-col items-center gap-3">
        <UploadIcon className="h-5 w-5 text-themeBlue" />
        <p className="text-sm font-medium text-themeBlue">{label}</p>
      </div>
    </div>
  );
};
