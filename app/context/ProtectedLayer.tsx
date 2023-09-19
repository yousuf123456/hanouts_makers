"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

interface ProtectedLayerProps {
  children: React.ReactNode;
}

export const ProtectedLayer: React.FC<ProtectedLayerProps> = ({ children }) => {
  const isAuthPage = usePathname() === "/" || usePathname() === "/verify-email";

  return <>{isAuthPage ? children : <SessionAuth>{children}</SessionAuth>}</>;
};
