import React from "react";

export const ModuleHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-base md:text-lg font-text font-semibold text-themeSecondary">
      {children}
    </h2>
  );
};
