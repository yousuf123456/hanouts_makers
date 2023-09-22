import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="px-12 w-full py-8 bg-white">{children}</div>;
};
