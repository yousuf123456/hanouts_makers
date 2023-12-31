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
  try {
    return NextResponse.json("Successfully updated the session data");
  } catch (e) {
    console.log(e);
    return new NextResponse("Error", { status: 500 });
  }
}
