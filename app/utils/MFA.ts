// import { SecondFactorClaim } from "@/config/backendConfig";
import Session, { BooleanClaim } from "supertokens-web-js/recipe/session";

export const SecondFactorClaim = new BooleanClaim({
  id: "2fa-completed",
  refresh: async () => {
    // no-op
  },
});

export const shouldShowFirstFactor = async () => {
  return !(await Session.doesSessionExist());
};

export const shouldShowSecondFactor = async () => {
  if (await shouldShowFirstFactor()) {
    return false;
  }

  return !(await Session.getClaimValue({ claim: SecondFactorClaim }));
};

export const getUserPhoneNumber = async (): Promise<string | undefined> => {
  if (!(await Session.doesSessionExist())) {
    return undefined;
  }

  let accessTokenPayload = await Session.getAccessTokenPayloadSecurely();

  return accessTokenPayload.phoneNumber;
};
