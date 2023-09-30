import React, { useEffect, useState } from "react";

import {
  Control,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { InputContainer } from "./InputContainer";
import { UploadProductImages } from "./UploadProductImages";
import { TextInput } from "./TextInput";
import { CategorySelector } from "./CategorySelector";
import { AttributeType, CategoryType } from "@/app/types";
import axios from "axios";
import { Attributes } from "./Attributes";
import { Loading } from "./Loading";
import { ProductHighlights } from "./ProductHighlights";

interface BasicInfoInputsProps {
  images: string[];
  watch: UseFormWatch<FieldValues>;
  control: Control<FieldValues, any>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const BasicInfoInputs: React.FC<BasicInfoInputsProps> = ({
  images,
  watch,
  setImages,
  setValue,
  register,
  control,
}) => {
  const [selectedCategoryData, setSelectedCategoryData] = useState<
    CategoryType[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState<AttributeType[]>([]);

  const categoryString = watch("categoryString");

  useEffect(() => {
    if (!(categoryString.length > 0) || !(selectedCategoryData.length > 0))
      return;

    const categoryId =
      selectedCategoryData[selectedCategoryData.length - 1]._id.$oid;

    setIsLoading(true);
    axios
      .post("../../../../api/getAttributes", { categoryId })
      .then((res) => {
        console.log("Attributes: ", res.data);
        setAttributes(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [categoryString]);

  return (
    <div className="flex flex-col gap-8">
      <InputContainer
        heading="Product Images"
        subHeading="Upload 3 to 8 images"
      >
        <UploadProductImages />
      </InputContainer>

      <TextInput
        id="name"
        required
        type="text"
        register={register}
        heading="Product Name"
      />

      <CategorySelector
        setValue={setValue}
        register={register}
        selectedCategoryData={selectedCategoryData}
        setSelectedCategoryData={setSelectedCategoryData}
      />

      {isLoading && (
        <div className="w-full flex justify-center">
          <Loading />
        </div>
      )}

      {attributes.length > 0 && !isLoading && (
        <Attributes
          control={control}
          register={register}
          attributes={attributes}
        />
      )}

      <ProductHighlights control={control} />

      <TextInput
        required
        type="text"
        register={register}
        id="whatIsInTheBox"
        heading="What Is In The Box ?"
        placeholder="1 IPhone 15 and charger with cable"
      />
    </div>
  );
};
