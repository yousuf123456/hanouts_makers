import SuperTokens, { deleteUser, getUser } from "supertokens-node";

import EmailPasswordNode from "supertokens-node/recipe/emailpassword";
import UserMetadata, {
  getUserMetadata,
  updateUserMetadata,
} from "supertokens-node/recipe/usermetadata";
import Passwordless from "supertokens-node/recipe/passwordless";
import Dashboard from "supertokens-node/recipe/dashboard";
import SessionNode from "supertokens-node/recipe/session";

import { BooleanClaim } from "supertokens-node/recipe/session/claims";

import parsePhoneNumber from "libphonenumber-js/max";

import { TypeFramework } from "supertokens-node/lib/build/framework/types";
import { appInfo } from "./appInfo";
import getRemainingUrl from "@/app/utils/getRemainingUrl";
import { validateEmail } from "@/app/utils/validate";
import { SMSRateLimitPeriod, SMSSentRateLimit } from "@/app/constants/consts";

export const SecondFactorClaim = new BooleanClaim({
  fetchValue: async (userId, tenantId, _, userContext) => {
    if (userContext.isSignUp) return false;

    const res = await UserMetadata.getUserMetadata(userId);

    return !!res.metadata?.verified;
  },
  key: "2fa-completed",
});

export const backendConfig = () => {
  return {
    framework: "express" as TypeFramework,

    supertokens: {
      connectionURI: process.env.NEXT_PUBLIC_CONNECTION_URI!,
      apiKey: process.env.NEXT_PUBLIC_API_KEY!,
    },

    appInfo,

    recipeList: [
      SessionNode.init({
        exposeAccessTokenToFrontendInCookieBasedAuth: true,
        useDynamicAccessTokenSigningKey: false,
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              createNewSession: async (input) => {
                if (input.userContext.session !== undefined) {
                  return input.userContext.session;
                }

                let userMetadata = await UserMetadata.getUserMetadata(
                  input.userId
                );

                let phoneNumber: string | undefined = undefined;

                if (userMetadata.metadata.passwordlessUserId !== undefined) {
                  let passwordlessUserInfo = await SuperTokens.getUser(
                    userMetadata.metadata.passwordlessUserId as string,
                    input.userContext
                  );
                  phoneNumber = passwordlessUserInfo?.phoneNumbers[0];
                }

                if (input.userContext.phoneNumber) {
                  phoneNumber = input.userContext.phoneNumber;
                }

                return originalImplementation.createNewSession({
                  ...input,
                  accessTokenPayload: {
                    ...input.accessTokenPayload,
                    ...(await SecondFactorClaim.build(
                      input.userId,
                      input.recipeUserId,
                      input.tenantId,
                      input.userContext
                    )),
                    phoneNumber,
                    ...(input.userContext.isSignUp
                      ? { initialOTPSent: false }
                      : {}),
                  },
                });
              },
              getGlobalClaimValidators: (input) => [
                ...input.claimValidatorsAddedByOtherRecipes,
                SecondFactorClaim.validators.hasValue(true),
              ],
            };
          },
        },
      }),
      EmailPasswordNode.init({
        emailDelivery: {
          override: (oI) => {
            return {
              ...oI,
              async sendEmail(input) {
                if (input.type === "PASSWORD_RESET") {
                  const phoneNumber = input.user.email;
                  const passwordResetLink = input.passwordResetLink;

                  const apiUrl =
                    "https://graph.facebook.com/v17.0/173663212501587/messages";

                  const to = phoneNumber;

                  const headers = {
                    Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                  };

                  //Base url is configured in whatsapp message template
                  const cutPasswordResetLink = getRemainingUrl(
                    process.env.NEXT_PUBLIC_APP_DOMAIN!,
                    passwordResetLink
                  );

                  const body = JSON.stringify({
                    messaging_product: "whatsapp",
                    recipient_type: "individual",
                    to: to,
                    preview_url: true,
                    type: "template",
                    template: {
                      name: "reset_password_template",
                      language: {
                        code: "en_US",
                      },
                      components: [
                        {
                          type: "button",
                          sub_type: "url",
                          index: 0,
                          parameters: [
                            {
                              type: "text",
                              text: cutPasswordResetLink,
                            },
                          ],
                        },
                      ],
                    },
                  });

                  const res = await fetch(apiUrl, {
                    method: "POST",
                    headers,
                    body,
                  });
                } else {
                  return oI.sendEmail(input);
                }
              },
            };
          },
        },
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
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              signIn(input) {
                const resp = originalImplementation.signIn(input);
                input.userContext.phoneNumber = input.email;
                input.userContext.isSignUp = false;
                return resp;
              },
              signUp(input) {
                const resp = originalImplementation.signUp(input);
                input.userContext.isSignUp = true;
                input.userContext.phoneNumber = input.email;
                return resp;
              },
            };
          },
        },
      }),
      Passwordless.init({
        contactMethod: "EMAIL_OR_PHONE",
        flowType: "USER_INPUT_CODE",
        smsDelivery: {
          override: (oI) => {
            return {
              ...oI,
              async sendSms({
                codeLifetime,
                phoneNumber,
                urlWithLinkCode,
                userInputCode,
                userContext,
                type,
                tenantId,
                preAuthSessionId,
              }) {
                const apiUrl =
                  "https://graph.facebook.com/v17.0/173663212501587/messages";

                const to = phoneNumber;

                const headers = {
                  Authorization: `Bearer ${process.env.WHATSAPP_API_ACCESS_TOKEN}`,
                  "Content-Type": "application/json",
                };

                const body = JSON.stringify({
                  messaging_product: "whatsapp",
                  recipient_type: "individual",
                  to: to,
                  type: "template",
                  template: {
                    name: "otp_template",
                    language: {
                      code: "en",
                    },
                    components: [
                      {
                        type: "body",
                        parameters: [
                          {
                            type: "text",
                            text: userInputCode,
                          },
                        ],
                      },
                      {
                        type: "button",
                        sub_type: "url",
                        index: "0",
                        parameters: [
                          {
                            type: "text",
                            text: userInputCode,
                          },
                        ],
                      },
                    ],
                  },
                });

                const res = await fetch(apiUrl, {
                  method: "POST",
                  headers,
                  body,
                });

                if ((await res.json())?.error?.code === 131026) {
                  const userMetadata = (
                    await getUserMetadata(userContext.userId)
                  ).metadata;

                  let lastSMSSentOn = userMetadata.lastSMSSentOn;
                  const smsSentCount = userMetadata.smsSentCount;

                  const currentDate = new Date();

                  let timeDifferenceInMin;
                  if (lastSMSSentOn && smsSentCount) {
                    lastSMSSentOn = new Date(lastSMSSentOn);
                    timeDifferenceInMin =
                      currentDate.getMinutes() - lastSMSSentOn.getMinutes();

                    if (
                      timeDifferenceInMin <= SMSRateLimitPeriod &&
                      currentDate.getDate() === lastSMSSentOn.getDate()
                    ) {
                      if (smsSentCount === SMSSentRateLimit)
                        throw "SMS Rate Limit Exceeded. Please try again later (or) Use Whatsapp Number Instead.";
                    }
                  }

                  // Send sms on his sms
                  await oI.sendSms({
                    codeLifetime,
                    userContext,
                    type,
                    phoneNumber,
                    urlWithLinkCode,
                    userInputCode,
                    tenantId,
                    preAuthSessionId,
                  });

                  let newLastSMSSentOn = new Date().toString();

                  // This count gets reset on successfull otp flow completion
                  let newSMSSentCount;

                  if (
                    timeDifferenceInMin &&
                    (timeDifferenceInMin > SMSRateLimitPeriod ||
                      currentDate.getDate() !== lastSMSSentOn.getDate())
                  ) {
                    newSMSSentCount = 1;
                  } else {
                    newSMSSentCount = (userMetadata.smsSentCount || 0) + 1;
                  }

                  updateUserMetadata(userContext.userId, {
                    lastSMSSentOn: newLastSMSSentOn,
                    smsSentCount: newSMSSentCount,
                  });
                }
              },
            };
          },
        },
        override: {
          apis: (oI) => {
            return {
              ...oI,
              consumeCodePOST: async (input) => {
                let session = await SessionNode.getSession(
                  input.options.req,
                  input.options.res,
                  {
                    overrideGlobalClaimValidators: () => [],
                  }
                );

                const prevUser = await getUser(session.getUserId());

                input.userContext.session = session;
                let resp = await oI.consumeCodePOST!(input);

                if (resp.status === "OK") {
                  // Deleting the user created by the second factor
                  await deleteUser(resp.user.id);
                  resp.user = prevUser!;

                  await resp.session.setClaimValue(SecondFactorClaim, true);

                  await UserMetadata.updateUserMetadata(
                    session!.getUserId(), // this is the userId of the first factor login
                    {
                      passwordlessUserId: resp.user.id,
                      verified: true,
                    }
                  );
                }

                return resp;
              },

              createCodePOST: async (input) => {
                //@ts-ignore // Using email in passwordless to verify users email
                if (validateEmail(input.email || "")) {
                  const response = await oI.createCodePOST!(input);
                  return response;
                }

                let session = await SessionNode.getSession(
                  input.options.req,
                  input.options.res,
                  {
                    overrideGlobalClaimValidators: () => [],
                  }
                );

                let phoneNumber: string =
                  session!.getAccessTokenPayload().phoneNumber;

                // if (phoneNumber !== undefined) {
                //   // this means we found a phone number associated to this user.
                //   // we will check if the input phone number is the same as this one.
                //   if (
                //     !("phoneNumber" in input) ||
                //     input.phoneNumber !== phoneNumber
                //   ) {
                //     throw new Error(
                //       "Input phone number is not the same as the one saved for this user"
                //     );
                //   }
                // }

                const createVerifyIdentityCode =
                  input.options.req.getHeaderValue(
                    "createVerifyIdentityCode"
                  ) === "?1";

                input.userContext.userId = session.getUserId();

                try {
                  const resp = await oI.createCodePOST!(input);

                  if (resp.status === "OK") {
                    if (createVerifyIdentityCode) {
                      await session.mergeIntoAccessTokenPayload({
                        initialVerifyIdentityOTPSent: true,
                      });
                    } else {
                      await session.mergeIntoAccessTokenPayload({
                        initialOTPSent: true,
                      });
                    }
                  }

                  return resp;
                } catch (e) {
                  return {
                    status: "GENERAL_ERROR",
                    message: e,
                  } as any;
                }
              },

              resendCodePOST: async (input) => {
                let session = await SessionNode.getSession(
                  input.options.req,
                  input.options.res,
                  {
                    overrideGlobalClaimValidators: () => [],
                  }
                );

                input.userContext.userId = session.getUserId();

                try {
                  const resp = await oI.resendCodePOST!(input);

                  return resp;
                } catch (e) {
                  console.log(e);
                  return {
                    status: "GENERAL_ERROR",
                    message: e,
                  } as any;
                }
              },
            };
          },
        },
      }),
      Dashboard.init(),
      UserMetadata.init(),
    ],

    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
