import { withSession } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // if (session === undefined) {
  //   console.log("Hello");
  //   return new NextResponse("Authentication required", {
  //     status: 401,
  //   });
  // }

  // console.log(session.getUserId());

  // await session!.updateSessionDataInDatabase({
  //   userId: userId,
  // });

  return NextResponse.json("Successfully updated the session data");
}
