import { cookies } from "next/headers";
import { Error as SuperTokensError } from "supertokens-node";
import Session, {
  SessionContainer,
  refreshSession,
} from "supertokens-node/recipe/session";

import supertokens from "supertokens-node";
import { backendConfig } from "../../config/backendConfig";
import { redirect } from "next/navigation";

supertokens.init(backendConfig());

export const getServerSession = async () => {
  const accessToken = cookies().get("sAccessToken")?.value;
  if (!accessToken) return null;

  let session: SessionContainer | undefined;

  try {
    session = await Session.getSessionWithoutRequestResponse(accessToken);
  } catch (e) {
    if (SuperTokensError.isErrorFromSuperTokens(e)) {
      if (e.type === Session.Error.TRY_REFRESH_TOKEN) {
        // Refresh Token Here
      }
      if (e.type === Session.Error.UNAUTHORISED) {
        return redirect("/");
      }
      if (e.type === Session.Error.INVALID_CLAIMS) {
      }
    }
  }

  return session;
};
