import { ReadonlyURLSearchParams } from "next/navigation";

export const getSearchParamsArray = (
  searchParams: ReadonlyURLSearchParams,
  paramsToRemove: string[],
  onlyValue?: boolean
) => {
  let paramsArray = [];
  //@ts-ignore
  for (const [key, value] of searchParams.entries()) {
    if (paramsToRemove.includes(key)) continue;
    if (onlyValue) paramsArray.push(value);

    if (onlyValue) continue;
    paramsArray.push(`${key}=${value}`);
  }

  return paramsArray;
};
