import { withSession } from "@/app/utils/withSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withSession(req, async (session) => {
    console.log(req.headers);
    if (!session) return new NextResponse("Unauthorized");

    await session.mergeIntoAccessTokenPayload({
      initialVerifyIdentityOTPSent: undefined,
    });

    return NextResponse.json("Succesfully Restarted The Flow");
  });
}
