import ObjectID from "bson-objectid";

export const defaultStorePageLayout = [
  {
    dataFormComponentName: "BannersForm",
    componentName: "StoreBanner",
    name: "Store Banner",
    mobileOnly: false,
    movable: false,
    pcOnly: false,
    data: {
      storeName: "My Store",
      withoutModuleHeading: true,
    },
  },
  {
    dataFormComponentName: "BannersForm",
    componentName: "ThreeImagesBanner_A",
    name: "Three Images Banner (A)",
    mobileOnly: false,
    movable: true,
    pcOnly: true,
    data: {
      withoutModuleHeading: false,
    },
  },
  {
    dataFormComponentName: "BannersForm",
    componentName: "ThreeImagesBanner_C",
    name: "Three Images Banner (C)",
    mobileOnly: true,
    movable: true,
    pcOnly: false,
    data: {
      withoutModuleHeading: false,
    },
  },
  {
    dataFormComponentName: "BannersForm",
    componentName: "FeaturedImageBanner",
    name: "Featured Image Banner",
    mobileOnly: false,
    movable: true,
    pcOnly: false,
    data: {
      withoutModuleHeading: true,
    },
  },
  {
    dataFormComponentName: "ProductsForm",
    componentName: "SliderProductsRecomendation",
    name: "Slider Products Recomendation",
    mobileOnly: false,
    movable: true,
    pcOnly: false,
    data: {
      moduleHeading: "Recomended Products",
      withoutModuleHeading: false,
    },
  },
  {
    dataFormComponentName: "ProductsForm",
    componentName: "JustForYou",
    name: "Just For You",
    mobileOnly: false,
    movable: false,
    pcOnly: false,
    data: {
      withoutModuleHeading: false,
    },
  },
];

export const defaultStorePage = {
  name: "Page 1",
  isPublished: true,
  id: ObjectID as any,
  createdAT: new Date(),
  publishedAt: new Date(),
  layout: defaultStorePageLayout,
};

export const defaultVendorDocFields = {
  profile: {},
  address: {},
  Id_BankInfo: {},
  mediaCenterCreated: false,
  mediaCenterImages: {
    rootFolder: [],
  },
};

export const defaultStoreDocFields = {
  storePages: [defaultStorePage],
};
