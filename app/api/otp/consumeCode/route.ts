import { NextRequest, NextResponse } from "next/server";
import { consumeCode } from "supertokens-node/recipe/passwordless";
import SuperTokens, { deleteUser } from "supertokens-node";
import { backendConfig } from "@/config/backendConfig";
import { getSSRSession, withSession } from "@/app/utils/withSession";
import UserMetadata from "supertokens-node/recipe/usermetadata";

SuperTokens.init(backendConfig());

export async function POST(req: NextRequest) {
  return withSession(req, async (session) => {
    try {
      if (!session) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const {
        otp,
        email,
        deviceId,
        preAuthSessionId,
        verifyingUserEmail,
        verifyingUserIdentity,
      } = await req.json();

      const response = await consumeCode({
        preAuthSessionId: preAuthSessionId,
        deviceId: deviceId,
        userInputCode: otp,
        tenantId: "public",
      });

      if (response.status === "OK") {
        await deleteUser(response.user.id);

        if (verifyingUserIdentity) {
          await session.mergeIntoAccessTokenPayload({
            initialVerifyIdentityOTPSent: undefined,
            identityVerifiedOn: new Date().toString(),
          });
        }

        if (verifyingUserEmail) {
          const vendorMetadata = (
            await UserMetadata.getUserMetadata(session.getUserId())
          ).metadata;
          const verifiedEmails = vendorMetadata.verifiedEmails || [];

          verifiedEmails.push(email);
          await UserMetadata.updateUserMetadata(session.getUserId(), {
            verifiedEmails,
          });
        }
      }

      return NextResponse.json(response);
    } catch (e) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });
}
