import clsx from "clsx";
import React from "react";
import { HiChevronDown } from "react-icons/hi2";

interface FacetHeaderProps {
  facetName: string;
  collapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FacetHeader: React.FC<FacetHeaderProps> = ({
  facetName,
  collapsed,
  setIsCollapsed,
}) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-text font-semibold capitalize tracking-wider text-themeSecondary">
        {facetName}
      </h3>

      <HiChevronDown
        className={clsx(
          "h-3 w-3 cursor-pointer font-bold text-slate-900 sm:h-4 sm:w-4",
          collapsed && "rotate-180",
        )}
        onClick={() => setIsCollapsed((prev) => !prev)}
      />
    </div>
  );
};
