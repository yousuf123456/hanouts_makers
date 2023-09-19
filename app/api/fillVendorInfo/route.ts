import { withSession } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function POST(req: NextRequest) {
  return withSession(req, async (session) => {
    try {
      if (session === undefined)
        return new NextResponse("Unauthorized", { status: 401 });

      const { profile, address, Id_BankInfo } = await req.json();

      const updatedData = await prisma.vendor.update({
        where: {
          superTokensUserId: session.getUserId(),
        },
        data: {
          ...(profile ? { profile: profile } : {}),
          ...(address ? { address: address } : {}),
          ...(Id_BankInfo
            ? { Id_BankInfo: Id_BankInfo, allInfoProvided: true }
            : {}),
        },
      });

      return NextResponse.json("Successfulyy updated Vendor Data");
    } catch (e) {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  });
}
