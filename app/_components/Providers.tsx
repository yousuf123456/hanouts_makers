"use client";
import React from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { routes } from "../_config/routes";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      afterSignOutUrl={routes.home}
      signInFallbackRedirectUrl={routes.products}
      signUpFallbackRedirectUrl={routes.products}
    >
      <Toaster />
      {children}
    </ClerkProvider>
  );
};
