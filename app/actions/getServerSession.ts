import { cookies } from "next/headers";
import Session from "supertokens-node/recipe/session";

import supertokens from "supertokens-node";
import { backendConfig } from "../../config/backendConfig";

supertokens.init(backendConfig());

export const getServerSession = async () => {
  const accessToken = cookies().get("sAccessToken")?.value;
  if (!accessToken) return null;

  const session = await Session.getSessionWithoutRequestResponse(accessToken);
  return session;
};
