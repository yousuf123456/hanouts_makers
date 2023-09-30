import React from "react";

export const InputHeading = ({
  children,
  subHeading,
}: {
  children: React.ReactNode;
  subHeading?: string;
}) => {
  return (
    <div className="flex flex-col gap-0">
      <p className=" text-themeSecondary text-sm font-semibold font-text capitalize">
        {children}
      </p>

      <p className="text-sm text-neutral-500">{subHeading}</p>
    </div>
  );
};
