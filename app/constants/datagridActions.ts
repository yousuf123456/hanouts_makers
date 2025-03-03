import { Edit } from "lucide-react";
import { FaEye, FaSync } from "react-icons/fa";
import { routes } from "./routes";

export const productListActions = (productId: string) => {
  return [
    {
      Icon: FaEye,
      label: "View Details",
      href: `${routes.addProduct}?productId=${productId}`,
    },
  ];
};

export const getOrdersListActions = (orderId: string) => {
  return [
    {
      Icon: FaSync,
      label: "Update Status",
      href: `/dashboard/orders/${orderId}`,
    },
  ];
};

export const getReviewListActions = (params?: any) => {
  return [
    {
      Icon: Edit,
      label: "Manage Review",
      href: `/dashboard/reviews/${params?.reviewId}?bucketId=${params?.bucketId}`,
    },
  ];
};

export const getVoucherListActions = (bucketId: string, voucherId?: any) => {
  return [
    {
      Icon: Edit,
      label: "Manage Voucher",
      href: `${routes.createVoucher}?bucketId=${bucketId}&voucherId=${voucherId}`,
    },
  ];
};

export const getBundleListActions = (bucketId?: string, bundleId?: string) => {
  return [
    {
      Icon: Edit,
      label: "Manage Bundle",
      href: `${routes.createBundles}?bucketId=${bucketId}&bundleId=${bundleId}`,
    },
  ];
};

export const getFreeShippingPromosListActions = (
  bucketId?: string,
  freeShippingId?: string
) => {
  return [
    {
      Icon: Edit,
      label: "Manage Bundle",
      href: `${routes.createFreeShipping}?bucketId=${bucketId}&freeShippingId=${freeShippingId}`,
    },
  ];
};
