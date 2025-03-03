import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return new NextResponse("Authorization Required", { status: 401 });
    }

    return NextResponse.json(userId);
  } catch (e) {
    console.log(e);
    return new NextResponse("Error", { status: 500 });
  }
}
