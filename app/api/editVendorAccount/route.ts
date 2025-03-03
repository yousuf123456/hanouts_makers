import prisma from "@/app/_libs/prismadb";
import SuperTokens from "supertokens-node";
import { backendConfig } from "@/config/backendConfig";

import { NextResponse } from "next/server";
import { getSSRSession } from "@/app/utils/withSession";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";

SuperTokens.init(backendConfig());

export async function POST(req: Request) {
  try {
    const { session } = await getSSRSession();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const { data } = await req.json();

    const accessTokenPayload = await session.getAccessTokenPayload();
    const identityVerifiedOn = accessTokenPayload.identityVerifiedOn as
      | string
      | Date;

    if (!identityVerifiedOn)
      return new NextResponse("Identity Verification Required", {
        status: 403,
      });

    const currentTime = new Date().getTime();
    const verifiedTime = new Date(identityVerifiedOn).getTime();

    const timeDifference = currentTime - verifiedTime;
    const differenceInMinutes = timeDifference / (1000 * 60);

    if (differenceInMinutes > 20)
      return new NextResponse("Identity Verification Required", {
        status: 403,
      });

    const currentVendor = await getCurrentVendor({
      userSTId: session.getUserId(),
    });

    if (!currentVendor)
      return new NextResponse("Vendor Data Not Found", { status: 403 });

    await prisma.vendor.update({
      where: {
        id: currentVendor.id,
      },
      data,
    });

    return NextResponse.json("Succesfully Updated The Accounts Data");
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
