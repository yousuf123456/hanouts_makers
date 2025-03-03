import {
  defaultVendorDocFields,
  defaultStoreDocFields,
} from "./../../constants/default";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../_libs/prismadb";

export async function POST(req: NextRequest) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { phone } = await req.json();

    const createdVendor = await prisma.vendor.create({
      data: {
        superTokensUserId: userSTId,
        phone: phone,
        ...defaultVendorDocFields,
      },
    });

    const createdStore = await prisma.store.create({
      data: {
        ...defaultStoreDocFields,
        vendorId: createdVendor.id,
      },
    });

    console.log("Successfully Created");
    return NextResponse.json(createdVendor);
  } catch (e) {
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}
