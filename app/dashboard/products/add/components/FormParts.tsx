import React, { useEffect } from "react";
import { FormPart } from "./FormPart";
import { FaDollarSign, FaInfo, FaServicestack } from "react-icons/fa";
import { HiMiniBookmark } from "react-icons/hi2";

interface FormPartsProps {
  currentPartOn: number;
}

export const FormParts: React.FC<FormPartsProps> = ({ currentPartOn }) => {
  return (
    <div className="flex gap-0 items-center justify-center">
      <FormPart
        value={1}
        Icon={FaInfo}
        firstPart={true}
        label="Basic Info"
        sectionId="basicInfo"
        currentPartOn={currentPartOn}
      />

      <FormPart
        value={2}
        label="Description"
        sectionId="description"
        Icon={HiMiniBookmark}
        currentPartOn={currentPartOn}
      />

      <FormPart
        value={3}
        Icon={FaDollarSign}
        sectionId="variants_stocks"
        label="Variants and Stocks"
        currentPartOn={currentPartOn}
      />

      <FormPart
        value={4}
        label="Services"
        sectionId="services"
        Icon={FaServicestack}
        currentPartOn={currentPartOn}
      />
    </div>
  );
};
