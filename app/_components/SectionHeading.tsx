import React from "react";

export const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="font-text text-themeBlue font-semibold">{children}</h3>;
};
