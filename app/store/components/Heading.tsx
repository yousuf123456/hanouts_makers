import React from "react";

interface HeadingProps {
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h2 className="text-xl font-semibold font-text text-themeSecondary">
      {children}
    </h2>
  );
};
