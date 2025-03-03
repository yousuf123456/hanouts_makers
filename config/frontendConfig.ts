"use client";
import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import SessionReact from "supertokens-auth-react/recipe/session";

import { appInfo } from "./appInfo";
import { ResendOTPInterval } from "@/app/constants/consts";

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      SessionReact.init(),
      EmailPasswordReact.init(),
      Passwordless.init({
        contactMethod: "PHONE",
        signInUpFeature: {
          resendEmailOrSMSGapInSeconds: ResendOTPInterval,
        },
      }),
    ],
    // enableDebugLogs: true,
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
