import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { NextResponse } from "next/server";

import prisma from "@/app/_libs/prismadb";
import googleDrive from "@/app/_libs/googleDrive";
import { MediaCenterImageType, MediaCenterImagesType } from "@/app/types";
import { find } from "lodash";

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

    const { fileIds, folderId } = await req.json();

    const newMediaCenterImages = {
      ...(currentVendor.mediaCenterImages as MediaCenterImagesType),
    };

    fileIds.map((fileId: string) => {
      const folderIds = Object.keys(newMediaCenterImages);
      let imageData: any = {};

      let prevParentFolderId = folderIds.filter((folderId) => {
        const found = find(newMediaCenterImages[folderId], { id: fileId });
        if (found) {
          newMediaCenterImages[folderId].map((image) => {
            if (image.id === fileId) imageData = image;
          });
        }

        return found;
      })[0];

      googleDrive.files.update({
        fileId: fileId,
        addParents: folderId || (currentVendor.rootFolderId as string),
        removeParents:
          prevParentFolderId === "rootFolder"
            ? currentVendor.rootFolderId || ""
            : prevParentFolderId,
      });

      newMediaCenterImages[prevParentFolderId] = newMediaCenterImages[
        prevParentFolderId
      ].filter((image) => image.id !== fileId);

      if (folderIds.includes(folderId || "rootFolder")) {
        newMediaCenterImages[folderId || "rootFolder"].push(imageData);
      } else {
        newMediaCenterImages[folderId || "rootFolder"] = [imageData];
      }
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
