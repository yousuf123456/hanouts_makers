import { FieldValues, UseFormGetValues } from "react-hook-form";

export function getCombsFormData(
  getValues: UseFormGetValues<FieldValues>,
  combinationStrings: string[]
) {
  const combinationsFormData: {
    price: number;
    quantity: number;
    SKU: string;
    promoPrice: number;
    promoPriceEndingDate: Date;
    promoPriceStartingDate: Date;
  }[] = [];

  combinationStrings.map((combinationString) => {
    const baseName = `comb-${combinationString}-`;
    // Order: price, promoPrice, quantity / stock, SKU, startingDate, endingDate
    const combinationFormValues = getValues([
      `${baseName}price`,
      `${baseName}promoPrice`,
      `${baseName}quantity`,
      `${baseName}SKU`,
      `${baseName}startingDate`,
      `${baseName}endingDate`,
    ]);

    const structuredData = {
      SKU: combinationFormValues[3],
      promoPriceEndingDate: combinationFormValues[5],
      promoPriceStartingDate: combinationFormValues[4],
      price: parseInt(combinationFormValues[0] || undefined),
      quantity: parseInt(combinationFormValues[2] || undefined),
      promoPrice: parseInt(combinationFormValues[1] || undefined),
    };

    combinationsFormData.push(structuredData);
  });

  return combinationsFormData;
}
