import React from "react";

import clsx from "clsx";
import { format } from "date-fns";

interface HeaderInfoProps {
  date: string;
  name: string;
  className?: string;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  date,
  name,
  className,
}) => {
  const ClassName =
    "text-xs flex-shrink-0 leading-[16px] font-roboto font-medium text-slate-600";

  return (
    <div className="flex gap-3">
      <p className={clsx(className, ClassName)}>{name}</p>

      <p className={clsx(className, ClassName)}>
        {format(new Date(date), "dd-MMM")}
      </p>
    </div>
  );
};
