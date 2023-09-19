"use client";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import ThirdPartyPasswordless from "supertokens-web-js/recipe/thirdpartypasswordless";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import Router from "next/router";

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      SessionReact.init(),
      EmailPasswordReact.init(),
      ThirdPartyPasswordless.init(),
      // EmailVerification.init(),
    ],
    // this is so that the SDK uses the next router for navigation
    // windowHandler: (oI: any) => {
    //   return {
    //     ...oI,
    //     location: {
    //       ...oI.location,
    //       setHref: (href: any) => {
    //         Router.push(href);
    //       },
    //     },
    //   };
    // },
  };
};
