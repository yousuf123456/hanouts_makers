import { withSession } from "@/app/utils/withSession";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "supertokens-node";
import {
  signIn,
  updateEmailOrPassword,
} from "supertokens-node/recipe/emailpassword";

export async function POST(req: NextRequest) {
  return withSession(req, async (session) => {
    try {
      if (!session) return new NextResponse("Unauthorized", { status: 401 });

      const { oldPassword, newPassword } = await req.json();

      let userInfo = await getUser(session.getUserId());

      if (userInfo === undefined) {
        throw new NextResponse("Should never come here", { status: 403 });
      }

      let loginMethod = userInfo.loginMethods.find(
        (lM) =>
          lM.recipeUserId.getAsString() ===
            session!.getRecipeUserId().getAsString() &&
          lM.recipeId === "emailpassword",
      );

      if (loginMethod === undefined) {
        throw new NextResponse("Should never come here", { status: 403 });
      }

      const email = loginMethod.email!;

      let isPasswordValid = await signIn(
        session!.getTenantId(),
        email,
        oldPassword,
      );

      if (isPasswordValid.status !== "OK") {
        return new NextResponse("Incorrect Old Password", { status: 401 });
      }

      let response = await updateEmailOrPassword({
        password: newPassword,
        recipeUserId: session.getRecipeUserId(),
        tenantIdForPasswordPolicy: session.getTenantId(),
      });

      if (response.status === "PASSWORD_POLICY_VIOLATED_ERROR") {
        return new NextResponse(response.failureReason, { status: 401 });
      }

      return NextResponse.json("Updated Password Succesfully");
    } catch (e) {
      console.log(e);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });
}
