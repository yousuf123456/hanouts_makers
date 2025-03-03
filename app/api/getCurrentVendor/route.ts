import { withSession } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

import prisma from "../../_libs/prismadb";

export async function POST(req: NextRequest) {
  return withSession(req, async (session) => {
    try {
      if (session === undefined) {
        return NextResponse.json(null);
      }

      const currentVendorId = session.getUserId();

      const currentVendor = await prisma.vendor.findUnique({
        where: {
          superTokensUserId: currentVendorId,
        },
      });

      return NextResponse.json(currentVendor);
    } catch (e) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });
}
