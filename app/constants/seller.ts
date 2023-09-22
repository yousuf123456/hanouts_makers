import {
  BoxIcon,
  CogIcon,
  CurrencyIcon,
  DollarSignIcon,
  FileBarChart,
  PhoneCallIcon,
  Settings,
} from "lucide-react";
import { routes } from "./routes";
import { HiLightBulb, HiSupport, HiTruck } from "react-icons/hi";

export const handoutsFeatures = [
  {
    heading: "Reach",
    label:
      "Millions of customers on Handouts. Pakistan biggest decor ecommerce platform",
  },
  {
    heading: "Free Registration",
    label: "Account registration & listing items for sale is free",
  },
  {
    heading: "Reliable Shipping",
    label:
      "Fast, reliable and hassle free delivery through Handouts logistic network",
  },
  {
    heading: "Timely Payments",
    label:
      "Funds are safely deposited directly to your bank account on a weekly basis",
  },
  {
    heading: "Marketing Tools",
    label:
      "Find new customers & grow more with advertising and our whole range of marketing tools",
  },
  {
    heading: "Support & Training",
    label:
      "Learn all about ecommerce for free and get help with seller support and Handouts University",
  },
];

export const stepsToStartSelling = [
  {
    heading: "Signup for Free",
    label:
      "Create your account through our website or mobile app with just your phone number",
  },
  {
    heading: "Add Profile Information",
    label:
      "Complete your profile by providing your email and store name so that we can identify you",
  },
  {
    heading: "Add Address Information",
    label: "Provide all address details of your business",
  },
  {
    heading: "Add ID & Bank Information",
    label:
      "Add in your ID & Business related details. Include necessary bank information for payments",
  },
  {
    heading: "List Products",
    label:
      "Add products to your store through seller center. Start selling as soon as your products go live after going through quality control",
  },
];

export const sellerAccountVerificationSteps = [
  "Add Profile",
  "Add Address",
  "Verify Id & Bank",
];

const dashboardRoutes = routes;
export const dashboardSideBarLinks = [
  {
    label: "Product",
    Icon: BoxIcon,
    root: true,
    childs: [
      {
        label: "Manage Products",
        href: dashboardRoutes.manageProducts,
      },
      {
        label: "Media Center",
        href: dashboardRoutes.mediaCenter,
      },
      {
        label: "Add Product",
        href: dashboardRoutes.addProduct,
      },
      {
        label: "Bulk Add/Edit Products",
        href: dashboardRoutes.bulkAddEditProducts,
      },
    ],
  },

  {
    label: "Orders & Reviews",
    Icon: HiTruck,
    root: true,
    childs: [
      {
        label: "Manage Orders",
        href: dashboardRoutes.manageOrders,
      },
      {
        label: "Manage Reviews",
        href: dashboardRoutes.manageReviews,
      },
      {
        label: "Customer Returns",
        href: dashboardRoutes.customerReturs,
      },
    ],
  },

  {
    label: "Analytics & Performance",
    Icon: FileBarChart,
    root: true,
    childs: [
      {
        label: "Performance & Analytics",
        href: dashboardRoutes.analytics_performance,
      },
      {
        label: "Geo Analytics",
        href: dashboardRoutes.geoAnalytics,
      },
    ],
  },

  {
    label: "Marketing Solutions",
    Icon: HiLightBulb,
    root: true,
    childs: [
      {
        label: "Product Ads",
        href: dashboardRoutes.productAd,
      },
      {
        label: "Display Ads",
        href: dashboardRoutes.displayAd,
      },
      {
        label: "Ad Groups",
        href: dashboardRoutes.adGroups,
      },
      {
        label: "Ad Performance",
        href: dashboardRoutes.adPerformance,
      },
      {
        label: "Private Traffic",
        href: dashboardRoutes.privateTraffic,
      },
      {
        label: "PT Performance",
        href: dashboardRoutes.PT_performance,
      },
    ],
  },

  {
    label: "Finance",
    Icon: DollarSignIcon,
    root: true,
    childs: [
      {
        label: "Account Statements",
        href: dashboardRoutes.accountStatements,
      },
      {
        label: "Orders Overview",
        href: dashboardRoutes.ordersOverview,
      },
      {
        label: "Transaction Overview",
        href: dashboardRoutes.transactionsOverview,
      },
    ],
  },

  {
    label: "Support",
    Icon: PhoneCallIcon,
    root: true,
    childs: [
      {
        label: "Help Center",
        href: dashboardRoutes.helpCenter,
      },
      {
        label: "Contact us",
        href: dashboardRoutes.contactUs,
      },
    ],
  },

  {
    label: "Account & Settings",
    Icon: Settings,
    root: true,
    childs: [
      {
        label: "Profile",
        href: dashboardRoutes.profile,
      },
      {
        label: "Account Settings",
        href: dashboardRoutes.accountSettings,
      },
      {
        label: "Chat Settings",
        href: dashboardRoutes.chatSettings,
      },
    ],
  },
];
