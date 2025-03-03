import { createImageUrlFromWebViewLink } from "@/app/dashboard/mediaCenter/components/Image";
import { FieldValues } from "react-hook-form";
import { FormImageType, SelectedImageType } from "../types";

// To exclude the varianst with no options but just title and withImages key
function getUpdatedVariants(variants: any) {
  if (!variants) return null;
  let thereAreVariants = false;
  let updatedVariants: any = {};

  const variantImages: { [key: string]: SelectedImageType[] } = {};
  const variantNames = Object.keys(variants);

  variantNames.map((name) => {
    if (Object.keys(variants[name]).length > 2) {
      thereAreVariants = true;
      updatedVariants[name] = { ...variants[name] };

      if (!variants[name].withImages) return;

      Object.keys(variants[name]).map((variantOption) => {
        if (variantOption === "title") return;
        if (!(variants[name][variantOption]?.images?.length > 0)) return;

        variantImages[variantOption] = variants[name][variantOption].images;
      });

      //Updating the variant images data to only contain an array of urls
      Object.keys(updatedVariants[name])?.map((variantOption) => {
        if (variantOption === "title") return;
        if (!(variants[name][variantOption]?.images?.length > 0)) return;

        const imageUrls = updatedVariants[name][variantOption].images?.map(
          (img: SelectedImageType) => img.imageUrl
        );
        updatedVariants[name][variantOption].images = imageUrls;
      });
    }
  });

  if (!thereAreVariants) return null;
  return { updatedVariants, variantImages };
}

type Params = {
  formData: FieldValues;
  withoutValidation: boolean;
  additionalDataToSpread?: any;
  selectedImages: SelectedImageType[];
};

export const structureProductFormData = (params: Params) => {
  const {
    formData,
    selectedImages,
    withoutValidation,
    additionalDataToSpread,
  } = params;

  let detailedImages: string[] = [];

  let isAnyImageUploading = false;

  selectedImages.map((image, i) => {
    if (image.isUploading) isAnyImageUploading = true;
    if (i !== 0) detailedImages.push(image.imageUrl);
  });

  const variantsData = getUpdatedVariants(formData.variants);

  Object.keys(variantsData?.variantImages || {}).map((variantOption, i) => {
    variantsData?.variantImages[variantOption].map((image, j) => {
      if (image.isUploading) isAnyImageUploading = true;
    });
  });

  const isCoverImageUploaded = !!(selectedImages[0].imageUrl.length > 0);

  const coverImage = !selectedImages[0].isUploading
    ? selectedImages[0].imageUrl
    : undefined;

  const mainCategory =
    formData.categoryString.split(" ").length > 0
      ? formData.categoryString.split(" ")[0]
      : "";

  const generalData = {
    image: createImageUrlFromWebViewLink(coverImage || ""),
    promoPriceStartingDate: formData.startingDate || null,
    promoPriceEndingDate: formData.endingDate || null,
    promoPrice: parseInt(formData.promoPrice || ""),
    quantity: parseInt(formData.quantity || ""),
    descriptionQuillData: formData.description,
    highlightsQuillData: formData.highlights,
    categoryString: formData.categoryString,
    whatIsInTheBox: formData.whatIsInTheBox,
    variants: variantsData?.updatedVariants,
    price: parseInt(formData.price || ""),
    delieveryInfo: formData.delieveryInfo,
    combinations: formData.combinations,
    attributes: formData.attributes,
    detailedImages: detailedImages,
    services: formData.services,
    category: mainCategory,
    name: formData.name,
    SKU: formData.SKU,
  };

  return {
    structuredDraftData: {
      ...generalData,
      ...additionalDataToSpread,
    },
    isAnyImageUploading,
    isCoverImageUploaded,
  };
};
