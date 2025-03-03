"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { BooleanClaim } from "supertokens-web-js/recipe/session";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { shouldShowSecondFactor } from "../utils/MFA";

interface ProtectedLayerProps {
  children: React.ReactNode;
}

const SecondFactorClaim = new BooleanClaim({
  id: "2fa-completed",
  refresh: (userContext) => userContext,
});

export const ProtectedLayer: React.FC<ProtectedLayerProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const doNotRequiresAuth =
    pathname === "/" ||
    pathname === "/verify-email" ||
    pathname === "/second-factor" ||
    pathname === "/reset-password";

  // useEffect(() => {
  //   shouldShowSecondFactor().then((should) => {
  //     if (should && pathname !== "second-factor") {
  //       router.push("second-factor");
  //     }
  //   });
  // }, []);

  return (
    <>
      {doNotRequiresAuth ? (
        children
      ) : (
        <SessionAuth
          overrideGlobalClaimValidators={(globalValidators) => [
            ...globalValidators,
            {
              ...SecondFactorClaim.validators.hasValue(true),
              onFailureRedirection: () => {
                return "/second-factor";
              },
            },
          ]}
        >
          {children}
        </SessionAuth>
      )}
    </>
  );
};
