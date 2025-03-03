import { NextResponse } from "next/server";
import prisma from "../../../_libs/prismadb";
import googleDrive from "@/app/_libs/googleDrive";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { MediaCenterImagesType } from "@/app/types";

export async function POST(req: Request) {
  try {
    const userSTId = req.headers.get("x-user-id");

    if (!userSTId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const currentVendor = await getCurrentVendor({ userSTId: userSTId });
    if (!currentVendor) {
      return new NextResponse("Vendor Data Not Found", { status: 404 });
    }

    const { fileIds } = await req.json();

    fileIds.map((fileId: string) =>
      googleDrive.files.delete({ fileId: fileId })
    );

    const newMediaCenterImages = {
      ...(currentVendor.mediaCenterImages as MediaCenterImagesType),
    };

    const folders = Object.keys(newMediaCenterImages);

    folders.map((folder) => {
      newMediaCenterImages[folder] = newMediaCenterImages[folder].filter(
        (image) => {
          if (fileIds.includes(image.id)) {
            return false;
          }
          return true;
        }
      );
    });

    await prisma.vendor.update({
      where: {
        id: currentVendor.id,
      },

      data: {
        mediaCenterImages: newMediaCenterImages,
      },
    });

    return NextResponse.json(newMediaCenterImages);
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
