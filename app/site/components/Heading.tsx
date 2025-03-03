import React from "react";

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="font-text text-3xl font-semibold text-themeSecondary">
      {children}
    </h2>
  );
};
