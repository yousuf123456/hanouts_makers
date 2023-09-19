"use client";
import React from "react";

import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import { frontendConfig } from "../../config/frontendConfig";

if (typeof window !== "undefined") {
  console.log("Initializing");
  SuperTokensReact.init(frontendConfig());
}

interface SuperTokensProviderProps {
  children: React.ReactNode;
}

export const SuperTokensProvider: React.FC<SuperTokensProviderProps> = ({
  children,
}) => {
  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;
};
