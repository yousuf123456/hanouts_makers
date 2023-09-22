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
      new Date().getDate()
    ),
  },
  {
    label: "Last 3 years",
    value: new Date(
      new Date().getFullYear() - 3,
      new Date().getMonth(),
      new Date().getDate()
    ),
  },
  {
    label: "Last 6 years",
    value: new Date(
      new Date().getFullYear() - 6,
      new Date().getMonth(),
      new Date().getDate()
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
      new Date().getDate()
    ),
  },
  {
    label: "Last 3 years",
    value: new Date(
      new Date().getFullYear() - 3,
      new Date().getMonth(),
      new Date().getDate()
    ),
  },
  {
    label: "Last 6 years",
    value: new Date(
      new Date().getFullYear() - 6,
      new Date().getMonth(),
      new Date().getDate()
    ),
  },
];
