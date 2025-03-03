export const provinces = [
  "Azad Kashmir",
  "Balochistān",
  "Gilgit-Baltistan",
  "Islamabad",
  "Khyber Pakhtunkhwa",
  "Punjab",
  "Sindh",
];

export const areas = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Hunza",
  "Quetta",
  "Peshawar",
];

export const TotalChartsDateRangesDefault = {
  label: "Last 6 Months",
  value: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
  default: true,
};
export const TotalChartsDateRanges = [
  { ...TotalChartsDateRangesDefault },
  {
    label: "Last 1 year",
    value: new Date(
      new Date().getFullYear() - 1,
      new Date().getMonth(),
      new Date().getDate(),
    ),
  },
  {
    label: "Last 3 years",
    value: new Date(
      new Date().getFullYear() - 3,
      new Date().getMonth(),
      new Date().getDate(),
    ),
  },
  {
    label: "Last 6 years",
    value: new Date(
      new Date().getFullYear() - 6,
      new Date().getMonth(),
      new Date().getDate(),
    ),
  },
];

export const GraphChartsDateRangesDefault = {
  label: "Last Month",
  value: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
  default: true,
};

export const GraphChartsDateRanges = [
  { ...GraphChartsDateRangesDefault },

  {
    label: "Last 3 Months",
    value: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
  },
  {
    label: "Last 6 Months",
    value: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
  },

  {
    label: "Last 1 year",
    value: new Date(
      new Date().getFullYear() - 1,
      new Date().getMonth(),
      new Date().getDate(),
    ),
  },
  {
    label: "Last 3 years",
    value: new Date(
      new Date().getFullYear() - 3,
      new Date().getMonth(),
      new Date().getDate(),
    ),
  },
  {
    label: "Last 6 years",
    value: new Date(
      new Date().getFullYear() - 6,
      new Date().getMonth(),
      new Date().getDate(),
    ),
  },
];

export const warrantyTypeOptions = [
  "No Warranty",
  "Brand Warranty",
  "Seller Warranty",
];

export const warrantyPeriodOptions: string[] = [];

for (let i = 1; i <= 18; i++) {
  warrantyPeriodOptions.push(`${i} Month`);
}

for (let i = 1; i <= 30; i++) {
  warrantyPeriodOptions.push(`${i} Year`);
}

warrantyPeriodOptions.push("Lifetime");

export const FilesSortOptions = [
  "No Sort",
  "Big First",
  "Small First",
  "A to Z",
  "Z to A",
];

export const VoucherTypeOptions = ["Collectible Voucher", "Voucher Code"];

export const DiscountTypeOptions = ["Money Value", "Percentage Value"];

export const ApplicableOnOptions = ["Entire Store", "Specific Products"];

export const FreeShippingPromoCondtionOptions = [
  "No Condition",
  "Min Order Value",
];

export const bundlePromoTypeOptions = [
  "Quantity",
  "Buy 1 Get 1 Free",
  "Free Gift",
  "Combo",
];

export const numberOfProductsToShowOptions = [
  "7",
  "10",
  "13",
  "16",
  " 19",
  "22",
  "25",
  "28",
  "31",
  "34",
  "37",
  "40",
];
