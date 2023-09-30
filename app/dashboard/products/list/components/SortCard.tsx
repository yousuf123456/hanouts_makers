import { cn } from "@/lib/utils";
import React from "react";
import { HiArrowCircleUp } from "react-icons/hi";

interface SortCardProps {
  sort: {
    label: string;
    fieldName: string;
  };
  setServerSort: React.Dispatch<React.SetStateAction<{} | null>>;
  serverSort: { [key: string]: any } | null;
}

export const SortCard: React.FC<SortCardProps> = ({
  sort,
  setServerSort,
  serverSort,
}) => {
  const onSort = () => {
    if (serverSort !== null) {
      return setServerSort((prev) =>
        //@ts-ignore
        prev[sort.fieldName] === 1 ? { [sort.fieldName]: -1 } : null
      );
    }

    setServerSort({ [sort.fieldName]: 1 });
  };

  const thisSortSelected =
    serverSort !== null && serverSort[sort.fieldName] !== undefined;

  return (
    <div
      onClick={onSort}
      className={cn(
        "flex gap-3 items-center transition-all px-3 py-1.5 rounded-sm w-fit bg-blue-50 hover:bg-themeBlue group cursor-pointer",
        thisSortSelected && "bg-themeBlue"
      )}
    >
      <p
        className={cn(
          "text-sm font-medium transition-all text-themeBlue group-hover:text-white",
          thisSortSelected && "text-white"
        )}
      >
        {sort.label}
      </p>

      <HiArrowCircleUp
        className={cn(
          "text-themeBlue group-hover:text-white group-hover:opacity-100 w-5 h-5 opacity-50 transition-all rounded-full",
          thisSortSelected && "opacity-100 text-white",
          thisSortSelected &&
            //@ts-ignore
            serverSort[sort.fieldName] === -1 &&
            "rotate-180"
        )}
      />
    </div>
  );
};
