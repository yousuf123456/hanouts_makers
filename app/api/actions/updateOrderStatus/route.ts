import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { NextResponse } from "next/server";

import prisma from "../../../_libs/prismadb";
import { getServerSession } from "@/app/actions/getServerSession";

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { newStatus, packageId } = await req.json();

    if (!newStatus || !packageId) {
      return new NextResponse("Invalid Data", { status: 403 });
    }

    const updatedPackage = await prisma.package.update({
      where: {
        id: packageId,
      },
      data: {
        status: newStatus,
      },
    });

    return NextResponse.json("Updated Status Successfully");
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
