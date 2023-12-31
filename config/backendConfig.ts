import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import SessionNode from "supertokens-node/recipe/session";

import parsePhoneNumber from "libphonenumber-js/max";

import { TypeFramework } from "supertokens-node/lib/build/framework/types";
import { appInfo } from "./appInfo";

export const backendConfig = () => {
  console.log("Initializing");
  return {
    framework: "express" as TypeFramework,

    supertokens: {
      connectionURI: process.env.NEXT_PUBLIC_CONNECTION_URI!,
      apiKey: process.env.NEXT_PUBLIC_API_KEY!,
      // For demo/test purposes all you need is to use https://try.supertokens.com as connectionURI and there is no need for an apiKey.
    },

    appInfo,

    recipeList: [
      SessionNode.init({
        exposeAccessTokenToFrontendInCookieBasedAuth: true,
        useDynamicAccessTokenSigningKey: false,
      }),
      EmailPasswordNode.init({
        signUpFeature: {
          formFields: [
            {
              id: "email",
              validate: async (value) => {
                if (typeof value !== "string") {
                  return "Phone number is invalid";
                }

                let parsedPhoneNumber = parsePhoneNumber(value);
                if (
                  parsedPhoneNumber === undefined ||
                  !parsedPhoneNumber.isValid()
                ) {
                  return "Phone number is invalid";
                }
                return undefined;
              },
            },
          ],
        },
      }),
      Dashboard.init(),
    ],

    isInServerlessEnv: true,
  };
};
