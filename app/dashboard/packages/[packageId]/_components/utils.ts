import {
  OrderStatus,
  ReturnRequestStatus,
  CancellationRequestStatus,
} from "@prisma/client";

// Return progress percentage for products status that has not been returned or cancelled
const getOngoingOrderStatusPercentage = (status: OrderStatus) => {
  switch (status) {
    case "Processing":
      return 33;
    case "Shipped":
      return 66;
    case "Delievered":
      return 100;
    default:
      return 0;
  }
};

// Return progress percentage for products status that has been cancelled
const getCancellationStatusPercentage = (status: CancellationRequestStatus) => {
  switch (status) {
    case "CancellationApproved":
      return 50;
    case "CancellationRefundPending":
      return 65;
    case "CancellationRefunded":
      return 80;
    case "CancellationRejected":
      return 100;
    case "Cancelled":
      return 100;
    default:
      return 0;
  }
};

// Return progress percentage for products status that has been returned
const getReturnStatusPercentage = (status: ReturnRequestStatus) => {
  switch (status) {
    case "ReturnApproved":
      return 50;
    case "ReturnRefundPending":
      return 65;
    case "ReturnRefunded":
      return 80;
    case "ReturnRejected":
      return 100;
    case "Returned":
      return 100;
    default:
      return 0;
  }
};

// Return progress percentage for products with any possible status
export const getStatusPercentage = (
  status: OrderStatus | CancellationRequestStatus | ReturnRequestStatus
) => {
  if (Object.values(CancellationRequestStatus).includes(status as any))
    return getCancellationStatusPercentage(status as any);

  if (Object.values(ReturnRequestStatus).includes(status as any))
    return getReturnStatusPercentage(status as any);

  return getOngoingOrderStatusPercentage(status as any);
};
