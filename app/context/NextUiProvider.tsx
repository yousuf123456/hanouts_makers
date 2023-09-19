"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";

interface NextUiProviderProps {
  children: React.ReactNode;
}

export const NextUiProvider: React.FC<NextUiProviderProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
