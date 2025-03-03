import { ReadonlyURLSearchParams } from "next/navigation";

// Returns an array of search params as string array. i.e 'query=hello world'
export const getSearchParamsStringsArray = (
  searchParams: ReadonlyURLSearchParams,
  paramsToRemove: string[],
  getOnlyValues?: boolean
) => {
  let paramsArray = [];
  //@ts-ignore
  for (const [key, value] of searchParams.entries()) {
    if (paramsToRemove.includes(key)) continue;
    if (getOnlyValues) paramsArray.push(value);

    if (getOnlyValues) continue;
    paramsArray.push(`${key}=${value}`);
  }

  return paramsArray;
};

export const calculatePaginationInfo = ({
  page,
  itemsPerPage,
  itemsCountPerBucket,
}: {
  page: number;
  itemsPerPage: number;
  itemsCountPerBucket?: number;
}) => {
  const skip = (page - 1) * itemsPerPage;

  if (itemsCountPerBucket) {
    return {
      skip: Math.floor(skip / itemsCountPerBucket),
      take: Math.floor(itemsPerPage / itemsCountPerBucket),
    };
  }

  return { skip, take: itemsPerPage };
};

// Return an array of objects with mongodb fields mapped to prisma type fields
export const mapMongoToPrisma = <T>(data: T[]): T[] => {
  const specialMongoKeys = ["$oid", "$date"];

  function transformItem<T>(item: any): T {
    if (Array.isArray(item)) {
      return item.map(transformItem) as T; // Recursively transform an array
    }

    if (typeof item === "object") {
      Object.keys(item).map((key) => {
        if (
          item[key] &&
          typeof item[key] === "object" &&
          !Object.keys(item[key]).some((key) => specialMongoKeys.includes(key))
        ) {
          return transformItem(item[key]);
        }

        if (key === "_id") {
          item["id"] = item[key]["$oid"];
          delete item[key];
          return;
        }

        if (item[key] && item[key]["$oid"]) item[key] = item[key]["$oid"];

        if (item[key] && item[key]["$date"]) item[key] = item[key]["$date"];
      });
    }

    return item;
  }

  return data.map((item) => transformItem(item));
};
