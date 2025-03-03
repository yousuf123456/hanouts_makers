import { ReadonlyURLSearchParams } from "next/navigation";

export const routes = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  promos: "/dashboard/promos",
  packages: "/dashboard/packages",
  products: "/dashboard/products",
  analytics: "/dashboard/analytics",
  addProduct: "/dashboard/addProduct",
  mediaCenter: "/dashboard/mediaCenter",
  returnOrders: "/dashboard/returnOrders",
  cancelledOrders: "/dashboard/cancelledOrders",
  storeManagement: "/dashboard/storeManagement",
  addVoucher: "/dashboard/promos/edit?type=voucher",
  addFreeShipping: "/dashboard/promos/edit?type=freeShipping",
  editProduct: (pId: string) => `/dashboard/products/edit?pId=${pId}`,
  productReviews: (pId: string) => `/dashboard/products/${pId}/reviews`,
  packageDetails: (packageId: string) => `/dashboard/packages/${packageId}`,
  productQuestions: (pId: string) => `/dashboard/products/${pId}/questions`,
  editVoucher: (bId: string, vId: string) =>
    `/dashboard/promos/edit?type=voucher&bucketId=${bId}&voucherId=${vId}`,
  editFreeShipping: (bId: string, fId: string) =>
    `/dashboard/promos/edit?type=freeShipping&bucketId=${bId}&freeShippingId=${fId}`,
};

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.API_URL
    : "http://localhost:3000/";

export const getSignInUrl = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) => {
  return `${routes.signIn}?redirect_url=${encodeURIComponent(
    absoluteUrl(`${pathname}?${searchParams}`)
  )}`;
};

export const getSignUpUrl = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams
) => {
  return `${routes.signUp}?redirect_url=${encodeURIComponent(
    absoluteUrl(`${pathname}?${searchParams}`)
  )}`;
};

export const absoluteUrl = (pathname: string) => {
  if (process.env.NODE_ENV === "production")
    return `https://handouts-revamped.vercel.app${pathname}`;
  return `http://localhost:${process.env.PORT ?? 3000}${pathname}`;
};
