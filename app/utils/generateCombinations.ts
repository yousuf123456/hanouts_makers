import { getCombinationString } from "../dashboard/products/add/components/ProductCombinationsPrice_Stock";

function isSingleVariant(variants: any) {
  const variantNames = Object.keys(variants);

  let noOfVariants = 0;
  let singleVariantName = "";

  variantNames.map((variantName) => {
    const variantOptions = Object.keys(variants[variantName]).filter(
      (Key) => Key !== "title" && Key !== "withImages"
    );

    if (variantOptions.length > 0) {
      noOfVariants += 1;
      singleVariantName = variantName;
    }
  });

  return { isSingleVariantBoolean: noOfVariants === 1, singleVariantName };
}

export function generateCombinations(
  variants: any,
  currentVariantIndex: any,
  currentCombination: any,
  combinations: any,
  oldCombinations?: any
) {
  console.log(variants);
  const variantNames = Object.keys(variants);

  const { isSingleVariantBoolean, singleVariantName } =
    isSingleVariant(variants);

  if (isSingleVariantBoolean) {
    const singleVariantOptions = Object.keys(
      variants[singleVariantName]
    ).filter((Key) => Key !== "title" && Key !== "withImages");

    for (const option of singleVariantOptions) {
      const id = combinations.length + 1;
      const combination = { [singleVariantName]: option };

      const oldCombination = oldCombinations?.filter(
        (oldCombination: any) =>
          JSON.stringify(oldCombination.combination) ===
          JSON.stringify(combination)
      );

      const combinationObject = {
        id,
        combination,
        price: undefined,
        quantity: undefined,
        default: id === 1,
        promoPrice: null,
        promoPriceEndingDate: null,
        promoPriceStartingDate: null,
        SKU: getCombinationString(combination),
      };

      combinations.push(
        oldCombination?.length > 0
          ? { ...oldCombination[0] }
          : { ...combinationObject }
      );
    }

    return;
  }

  if (currentVariantIndex === variantNames.length) {
    const id = combinations.length + 1;
    const combination = { ...currentCombination };

    if (Object.keys(combination).length === 0) return;

    const oldCombination = oldCombinations?.filter(
      (oldCombination: any) =>
        JSON.stringify(oldCombination.combination) ===
        JSON.stringify(combination)
    );

    const combinationObject = {
      id,
      combination,
      price: 0,
      quantity: 0,
      default: id === 1,
      promoPrice: null,
      promoPriceEndingDate: null,
      promoPriceStartingDate: null,
      SKU: getCombinationString(combination),
    };

    combinations.push(
      oldCombination?.length > 0
        ? { ...oldCombination[0] }
        : { ...combinationObject }
    );

    return;
  }

  const currentVariantName = variantNames[currentVariantIndex];
  const variantOptions = Object.keys(variants[currentVariantName]);

  for (const option of variantOptions) {
    if (option === "title" || option === "withImages") continue;

    currentCombination[currentVariantName] = option;
    generateCombinations(
      variants,
      currentVariantIndex + 1,
      currentCombination,
      combinations,
      oldCombinations
    );
  }
}
