import { createImageUrlFromWebViewLink } from "@/app/dashboard/mediaCenter/components/Image";
import { getCurrentVendor } from "@/app/actions/getCurrentVendor";
import { NextResponse } from "next/server";
import { Readable } from "stream";

import googleDrive from "../../../_libs/googleDrive";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

    const files: any = [];
    const formData = await req.formData();

    const folderId = formData.get("folderId") as string;

    formData.forEach((_) => {
      if (typeof _ === "object") files.push(_);
    });

    if (!files || files.length === 0) {
      return new NextResponse("No files were recieved", { status: 400 });
    }

    const uploadPromises = files.map((file: any) => {
      const fileMetadata = {
        name: file.name,
        parents: [
          (folderId?.length || 0) > 0 ? folderId : currentVendor.rootFolderId,
        ],
      };

      const stream = file.stream();

      const media = {
        mimeType: file.type,
        body: Readable.from(stream),
      };

      return googleDrive.files
        .create({
          //@ts-ignore
          resource: fileMetadata,
          media: media,
          fields: "id",
        })
        .then((createRes: any) => {
          const permissions = {
            type: "anyone",
            role: "reader",
          };
          return googleDrive.permissions
            .create({
              //@ts-ignore
              resource: permissions,
              fileId: createRes.data.id,
              fields: "id",
            })
            .then(() => {
              return googleDrive.files.get({
                fileId: createRes.data.id,
                fields:
                  "webViewLink, webContentLink, size, createdTime, name, modifiedTime, id, imageMediaMetadata",
              });
            });
        });
    });

    const responses = await Promise.all(uploadPromises);

    const updatedMediaCenterImages = {
      ...((currentVendor.mediaCenterImages as any) || {}),
    };

    const imageUrls: string[] = [];

    responses.map((res) => {
      imageUrls.push(createImageUrlFromWebViewLink(res.data.webViewLink));

      const image = {
        imageUrl: createImageUrlFromWebViewLink(res.data.webViewLink),
        createdAt: new Date(Date.parse(res.data.createdTime)),
        width: res.data.imageMediaMetadata.width,
        height: res.data.imageMediaMetadata.height,
        downloadLink: res.data.webContentLink,
        updatedAt: res.data.modifiedTime,
        size: parseInt(res.data.size),
        name: res.data.name,
        id: res.data.id,
      };

      const folderIds = Object.keys(updatedMediaCenterImages);

      if (folderId?.length === 0 || !folderId) {
        return updatedMediaCenterImages["rootFolder"].push(image);
      }

      if (folderIds.includes(folderId || "")) {
        updatedMediaCenterImages[folderId].push(image);
      } else {
        updatedMediaCenterImages[folderId] = [image];
      }
    });

    await prisma?.vendor.update({
      where: {
        id: currentVendor.id,
      },
      data: {
        mediaCenterImages: updatedMediaCenterImages,
      },
    });

    return NextResponse.json({
      mediaCenterImages: updatedMediaCenterImages,
      imageUrls,
    });
  } catch (err) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
