import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { getCombinationString } from "../dashboard/products/add/components/ProductCombinationsPrice_Stock";

export const applyToAll = (
  getValues: UseFormGetValues<FieldValues>,
  setValue: UseFormSetValue<FieldValues>
) => {
  const [price, stock, SKU, promoPrice, startingDate, endingDate] = getValues([
    "price",
    "quantity",
    "SKU",
    "promoPrice",
    "startingDate",
    "endingDate",
  ]);

  const data = {
    price,
    stock,
    SKU,
    promoPrice,
    startingDate,
    endingDate,
  };

  const combinationObjects = getValues("combinations");
  const combinationStrings: string[] = combinationObjects.map(
    (combinationObject: any) =>
      getCombinationString(combinationObject.combination)
  );

  combinationStrings.map((combString, i) => {
    const newSKU = data.SKU + "-" + combString;
    setValue(`combinations.${i}.SKU`, newSKU);
    setValue(`combinations.${i}.price`, data.price);
    setValue(`combinations.${i}.quantity`, data.stock);
    setValue(`combinations.${i}.promoPrice`, data.promoPrice);
    setValue(`combinations.${i}.endingDate`, data.endingDate);
    setValue(`combinations.${i}.startingDate`, data.startingDate);
  });
};
