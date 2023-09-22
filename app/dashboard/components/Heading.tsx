import React from "react";

interface HeadingProps {
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h3 className="text-lg text-themeSecondary font-text font-semibold">
      {children}
    </h3>
  );
};
