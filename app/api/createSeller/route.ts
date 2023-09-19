import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import { Vendor } from "@prisma/client";
import { withSession } from "@/middleware";

export async function POST(req: NextRequest) {
  return withSession(req, async (session) => {
    try {
      if (session === undefined) {
        console.log("Not Authorized");
        return new NextResponse("Authentication Required", { status: 401 });
      }

      const { phone } = await req.json();
      const superTokensUserId = session.getUserId();

      const createdVendor = await prisma.vendor.create({
        data: {
          superTokensUserId,
          phone: phone,
        },
      });
      console.log("Successfully Created");
      return NextResponse.json(createdVendor);
    } catch (e) {
      return new NextResponse("Internal Server Error", {
        status: 500,
      });
    }
  });
}
