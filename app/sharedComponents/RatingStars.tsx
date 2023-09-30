import { HiStar } from "react-icons/hi";
import Rating from "@mui/material/Rating";

import React from "react";
import clsx from "clsx";

interface RatingStarsProps {
  size?: "small" | "medium" | "large";
  onlyOneStar?: boolean;
  defaultValue: number;
  iconSize?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  defaultValue,
  onlyOneStar,
  iconSize,
  size,
}) => {
  return (
    <Rating
      max={onlyOneStar ? 1 : 5}
      name="half-rating-read"
      value={onlyOneStar ? 1 : defaultValue}
      precision={0.5}
      size={size}
      icon={
        <div>
          <HiStar
            className={clsx(
              iconSize || "text-[16px] sm:text-[16px] md:text-inherit"
            )}
          />
        </div>
      }
      emptyIcon={
        <HiStar
          className={clsx(
            iconSize || "text-[16px] sm:text-[16px] md:text-inherit",
            " text-slate-200 "
          )}
        />
      }
      readOnly
    />
  );
};
