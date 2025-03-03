import { Response } from "express";
import googleDrive from "../../../_libs/googleDrive";

import { NextResponse } from "next/server";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { VendorType } from "@/app/types";
import prisma from "../../../_libs/prismadb";

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentVendor = (await getCurrentVendor({
      userSTId: userSTId,
    })) as VendorType;
    if (!currentVendor) {
      return new NextResponse("Vendor Data Not Found", { status: 404 });
    }

    if (currentVendor.mediaCenterCreated) {
      return NextResponse.json("Media center is already created");
    }

    var fileMetadata = {
      name: `${currentVendor.id}-mediaCenter`,
      mimeType: "application/vnd.google-apps.folder",
      parents: [process.env.MEDIA_CENTERS_ROOT_FOLDER_ID],
    };

    const response = (await googleDrive.files.create({
      //@ts-ignore
      resource: fileMetadata,
      fields: "id",
    })) as any;

    await prisma.vendor.update({
      where: {
        id: currentVendor.id,
      },
      data: {
        allImages: [],
        mediaCenterCreated: true,
        rootFolderId: response.data.id,
        mediaCenterFolderStructure: [],
        mediaCenterImages: { rootFolder: [] },
      },
    });

    return NextResponse.json(response);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
