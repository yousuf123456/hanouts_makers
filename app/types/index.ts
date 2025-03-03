import { PromoToolsBucket } from "@prisma/client";

export type PaginationSearchParams = {
  page: string | undefined;
};

export type PaginationParams = {
  page: number;
};

export type SellerAccountVerificationStepsType =
  | "Add Profile"
  | "Add Address"
  | "Verify Id & Bank";

export type CategoryType = {
  id: string;
  name: string;
  hasChilds: boolean;
  parentId: string | null;
};

export type ActionResult<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};

// export type HistoryReviewType = ratingAndReview & {
//   _id: ObjectId;
//   bucketId: string;
//   userId: ObjectId;
//   storeId: ObjectId;
//   productId: ObjectId;
//   createdAt: MongoDate;
//   answeredAt: MongoDate;
//   orderedProductId: ObjectId;
//   userInformation: {
//     name: string;
//     image: string;
//   };
// };

// export type AttributeType = Attribute;

// export type AvailaibleVariantType = AvailaibleVariant;

export type StorePageType = {
  name: string;
  createdAt: Date;
  publishedAT?: Date;
  id: { $oid: string };
  isPublished?: boolean;
  layout: LayoutComponentType[];
};

// export type VendorType = Vendor & {
//   profile: {
//     storeName: string | undefined;
//     email: string | undefined;
//     phone: string | undefined;
//   } | null;

//   address: {
//     detailedAddress: string;
//     province: string;
//     city: string;
//     area: string;
//   } | null;

//   Id_BankInfo: {
//     accountHolderName: string;
//     accountNumber: string;
//     idCardNumber: string;
//     idCardName: string;
//     branchName: string;
//     bankName: string;
//     bankCode: string;
//     IBAN: string;
//   } | null;

//   geoChartInfo: {
//     refreshedAt: Date;
//     customersCountData: {
//       [key: string]: number;
//     };
//     customersPerData: {
//       [key: string]: number;
//     };
//   };

//   mediaCenterImages: MediaCenterImagesType;
//   paymentOptions?: PaymentOption[];
//   transactions?: Transaction[];
//   store?:
//     | (Store & {
//         storePages: StorePageType[];
//       })
//     | null;
// };

export type MediaCenterImagesType = {
  [key: string]: MediaCenterImageType[];
};

export type MediaCenterImageType = {
  id: string;
  downloadLink: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  height: number;
  width: number;
  name: string;
  size: number;
};

export type FolderStructureType = {
  id: string;
  name: string;
  images: MediaCenterImagesType;
  subfolders?: FolderStructureType[];
};

export type VariantsType = {
  [key: string]: {
    title: string;
    withImages: string;
    [key: string]: any;
  };
};

export type CombinationType = {
  id: string;
  SKU: string;
  price: number;
  combination: any;
  quantity: number;
  promoPrice: number;
  promoPriceEndingDate: Date;
  promoPriceStartingDate: Date;
};

// export type DraftProductType = DraftProduct & {
//   services: {
//     warrantyPolicy?: string;
//     warrantyPeriod?: string;
//     warrantyType?: string;
//   };

//   delieveryInfo: {
//     packageWeight?: string;
//     packageLength?: string;
//     packageWidth?: string;
//     packageHeight?: string;
//     dangerousGoods: {
//       flammable?: boolean;
//       battery?: boolean;
//       liquid?: boolean;
//     };
//   };

//   categoryTreeData: CategoryType[];

//   variants: VariantsType;

//   combinations: CombinationType[];
// };

export type VoucherType = {
  _id: { $oid: string };
  usedBy: string[];
  voucherName: string;
  voucherCode?: string;
  productIds: string[];
  minOrderValue: number;
  totalVouchers: number;
  vouchersUsed: number;
  discountOffValue: number;
  createdAt: { $date: string };
  endingDate: { $date: string };
  usageLimitPerCustomer: number;
  startingDate: { $date: string };
  maxDiscountValue: number | null;
  collectStartDate: { $date: string };
  voucherType: "Collectible Voucher" | "Voucher Code";
  discountType: "Money Value" | "Percentage Value";
  applicableOn: "Entire Store" | "Specific Products";
};

export type BundleType = {
  _id: { $oid: string };
  endingDate: Date;
  createdAt: Date;
  promoName: string;
  startingDate: Date;
  productIds: string[];
  giftProductIds: string[];
  comboProductIds: string[];
  discountType: "Percentage Value" | "Money Value";
  promoType: "Quantity" | "Buy 1 Get 1 Free" | "Free Gift" | "Combo";
  quantityBundleConditions: { quantity: number; discountOffValue: number }[];
};

// export type QuestionType = question & {
//   _id: ObjectId;
//   userId: ObjectId;
//   createdAt: MongoDate;
//   answeredAt?: MongoDate;
// };

export type ObjectId = {
  $oid: string;
};

type MongoDate = {
  $date: string;
};

export type FreeShippingType = {
  _id: { $oid: string };
  budget: number;
  createdAt: Date;
  endingDate: Date;
  startingDate: Date;
  productIds: string[];
  promotionName: string;
  minOrderValue?: number;
  condition: "No Condition" | "Min Order Value";
  applicableOn: "Entire Store" | "Specific Products";
};

export type PromoToolsBucketType = PromoToolsBucket & {
  _id: { $oid: string };
  bundles: BundleType[];
  vouchers: VoucherType[];
  freeShipping: FreeShippingType[];
};

export type StatusType =
  | "Payment Pending"
  | "Processing"
  | "Shipped"
  | "Delievered"
  | "Cancelled"
  | "Cancellation in Process";

export type ReturnStatusType =
  | "Return in Process"
  | "Approved"
  | "Rejected"
  | "Refund Pending"
  | "Refunded";

export type FormImageType = {
  file?: any;
  id: string;
  imageUrl: string;
  fromMediaCenter: boolean;
};

export interface SelectedImageType {
  id: string;
  imageUrl: string;
  isUploading: boolean;
}

export type LayoutComponentType = {
  data: any;
  name: string;
  pcOnly: boolean;
  movable: boolean;
  mobileOnly: boolean;
  componentName: string;
  dataFormComponentName: string;
  withoutModuleHeading?: boolean;
};

export type StoreLayoutsType = {
  banner: {
    [key: string]: LayoutComponentType;
  };

  product: {
    [key: string]: LayoutComponentType;
  };

  promotion: {
    [key: string]: LayoutComponentType;
  };
};
