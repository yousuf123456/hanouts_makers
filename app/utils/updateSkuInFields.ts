import { FieldValues, UseFormSetValue } from "react-hook-form";
import { getCombinationString } from "../dashboard/products/add/components/ProductCombinationsPrice_Stock";

export const updateSkuInFields = (
  combinationObjects: any,
  setValue: UseFormSetValue<FieldValues>
) => {
  const combinationsData: string[] = combinationObjects.map(
    (combinationObject: any) => {
      return {
        string: getCombinationString(combinationObject.combination),
        SKU: combinationObject.SKU,
      };
    }
  );

  combinationsData.map((combData) => {
    //@ts-ignore
    setValue(`comb-${combData.string}-SKU`, combData.SKU);
  });
};
