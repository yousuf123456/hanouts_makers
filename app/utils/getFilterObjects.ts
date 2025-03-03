import { IParams } from "../api/searchVendorProducts/route";

export const getFilterObjects = (params: IParams) => {
  const priceData = params.price?.split("-");

  const categoryObject = {
    text: {
      query: params.category,
      path: "categoryTreeData.name",
    },
  };

  const colorsObject = {
    text: {
      query: params.colors,
      path: "attributes.colors",
    },
  };

  const sizesObject = {
    text: {
      query: params.sizes,
      path: "attributes.sizes",
    },
  };

  const brandObject = {
    text: {
      query: params.brand,
      path: "attributes.brand",
    },
  };

  const priceObject = {
    range: {
      gte: parseInt((params.price && priceData![0]) || ""),
      lte: parseInt((params.price && priceData![1]) || ""),
      path: "price",
    },
  };

  return {
    categoryObject,
    colorsObject,
    sizesObject,
    brandObject,
    priceObject,
  };
};
