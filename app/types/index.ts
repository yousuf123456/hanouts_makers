import {
  Attribute,
  Category,
  PaymentOption,
  Store,
  Transaction,
} from "@prisma/client";

export type SellerAccountVerificationStepsType =
  | "Add Profile"
  | "Add Address"
  | "Verify Id & Bank";

export type CategoryType = {
  name: string;
  hasChilds: boolean;
  _id: { $oid: string };
  parentId: { $oid: string };
};

export type AttributeType = Attribute;

export type VendorType = {
  id: String;
  phone: string | null;

  profile: {
    storeName: string | undefined;
    email: string | undefined;
    phone: string | undefined;
  } | null;

  address: {
    detailedAddress: string;
    province: string;
    city: string;
    area: string;
  } | null;

  Id_BankInfo: {
    accountHolderName: string;
    accountNumber: string;
    idCardNumber: string;
    idCardName: string;
    branchName: string;
    bankName: string;
    bankCode: string;
    IBAN: string;
  } | null;

  superTokensUserId: String;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;

  allInfoProvided: boolean | null;

  transactions?: Transaction[];
  paymentOptions?: PaymentOption[];
  store?: Store | null;
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
