import { getVendorReviewsCount } from "@/app/actions/counts/getVendorReviewsCount";
import React from "react";
import { ReviewsList } from "./ReviewsList";

export const Reviews = async () => {
  const count = await getVendorReviewsCount();

  if (count === null) {
    return <p>Error loading data</p>;
  }

  return <ReviewsList count={count} />;
};
